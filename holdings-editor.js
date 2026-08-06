// 「持股更新」頁面：取代原本的 Google Sheet。登入後每一格都能直接改，
// 改動即時算出損益/報酬率/總計、存回 Firestore，報酬日曆頁面會透過 onSnapshot 立刻同步看到。
//
// 任何失敗（初始化、登入、讀寫）都只印 console + 更新狀態文字，絕不讓整頁壞掉。

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { FIREBASE_CONFIG, OWNER_EMAIL, PORTFOLIO_DOC_PATH } from "./firebase-config.js";

const authBtn = document.getElementById("authBtn");
const authStatusEl = document.getElementById("authStatus");
const sheetBody = document.getElementById("sheetBody");
const sheetFoot = document.getElementById("sheetFoot");
const addRowBtn = document.getElementById("addRowBtn");
const sheetFooterEl = document.getElementById("sheetFooter");
const fxInputEl = document.getElementById("fxInput");

let holdings = null; // 目前畫面上的資料，來自 Firestore
let editMode = false;
let db = null;

function setStatus(text) {
  authStatusEl.textContent = text;
}

function num(v) {
  return v === null || v === undefined ? "" : v;
}

function getNumOrNull(str) {
  if (str === "" || str === null || str === undefined) return null;
  const n = Number(str);
  return Number.isNaN(n) ? null : n;
}

function fmtMoney(n) {
  if (n === null || n === undefined || n === "") return "";
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function fmtPct(n) {
  if (n === null || n === undefined || n === "") return "";
  return Number(n).toFixed(2) + "%";
}

// 原本 Sheet 裡：美股的「總投入」= 股數×成本均價×匯率，「現值」= 股數×現價×匯率(GOOGLEFINANCE)，
// 都是公式；期權因為沒有 GOOGLEFINANCE 報價，Sheet 裡本來就是手動填總投入/現值，維持手動。
function isOptionRow(p) {
  return p.market === "期權" || p.type === "option";
}

// 如果還沒有存過匯率，從既有美股資料反推一個初始值（用「總投入 ÷ (股數×成本均價)」的平均），
// 這樣第一次載入就有一個貼近現況的數字，而不是憑空塞一個 31。
function estimateFxRate() {
  const positions = (holdings && holdings.positions) || [];
  let sum = 0;
  let count = 0;
  for (const p of positions) {
    if (!isOptionRow(p) && p.shares && p.avgCost && p.invested) {
      sum += p.invested / (p.shares * p.avgCost);
      count++;
    }
  }
  return count ? sum / count : 31;
}

// 損益/報酬率/總計都是公式算出來的，跟原本 Sheet 一樣不能直接編輯。
function recompute() {
  if (!holdings) return;
  if (holdings.fxRate === null || holdings.fxRate === undefined) {
    holdings.fxRate = Number(estimateFxRate().toFixed(4));
  }
  const fx = holdings.fxRate;
  const positions = holdings.positions || [];
  for (const p of positions) {
    if (!isOptionRow(p)) {
      if (p.shares !== null && p.shares !== undefined && p.avgCost !== null && p.avgCost !== undefined) {
        p.invested = p.shares * p.avgCost * fx;
      }
      if (p.shares !== null && p.shares !== undefined && p.price !== null && p.price !== undefined) {
        p.value = p.shares * p.price * fx;
      }
    }
    if (p.invested !== null && p.invested !== undefined && p.value !== null && p.value !== undefined) {
      p.pl = p.value - p.invested;
      p.pct = p.invested ? (p.pl / p.invested) * 100 : null;
    }
  }
  const totals = holdings.totals || (holdings.totals = {});
  totals.invested = positions.reduce((s, p) => s + (p.invested || 0), 0);
  totals.value = positions.reduce((s, p) => s + (p.value || 0), 0);
  totals.unrealizedPL = totals.value - totals.invested;
  totals.unrealizedPct = totals.invested ? (totals.unrealizedPL / totals.invested) * 100 : null;
}

function render() {
  if (!holdings) {
    sheetBody.innerHTML = `<tr><td colspan="15" style="text-align:center;color:#80868b;padding:24px;">${
      db ? "雲端尚無資料" + (editMode ? "，按下面「＋新增一列」開始建立" : "，登入後可以建立") : "雲端連線中，稍後再試"
    }</td></tr>`;
    sheetFoot.innerHTML = "";
    addRowBtn.style.display = editMode ? "block" : "none";
    sheetFooterEl.textContent = "";
    return;
  }

  recompute();

  const positions = holdings.positions || [];
  const t = holdings.totals || {};
  const dis = editMode ? "" : "disabled";

  fxInputEl.value = num(holdings.fxRate);
  fxInputEl.disabled = !editMode;

  sheetBody.innerHTML = positions
    .map((p, idx) => {
      const plCls = p.pl > 0 ? "gain-text" : p.pl < 0 ? "loss-text" : "";
      const isOption = isOptionRow(p);
      // 美股的總投入/現值是公式(股數×成本均價/現價×匯率)算出來的，跟損益/報酬率一樣唯讀；
      // 期權沒有公式，維持跟 Sheet 一樣可以直接輸入。
      const investedCell = isOption
        ? `<input type="number" step="1" data-field="invested" data-idx="${idx}" value="${num(p.invested)}" ${dis} />`
        : `<span class="cell-readonly">${fmtMoney(p.invested)}</span>`;
      const valueCell = isOption
        ? `<input type="number" step="1" data-field="value" data-idx="${idx}" value="${num(p.value)}" ${dis} />`
        : `<span class="cell-readonly">${fmtMoney(p.value)}</span>`;
      return `
        <tr data-idx="${idx}">
          <td>
            <select data-field="market" data-idx="${idx}" ${dis}>
              <option value="美股" ${!isOption ? "selected" : ""}>美股</option>
              <option value="期權" ${isOption ? "selected" : ""}>期權</option>
            </select>
          </td>
          <td><input data-field="symbol" data-idx="${idx}" value="${p.symbol || ""}" ${dis} /></td>
          <td><input data-field="name" data-idx="${idx}" value="${p.name || ""}" ${dis} /></td>
          <td><input type="number" step="1" data-field="shares" data-idx="${idx}" value="${num(p.shares)}" ${dis} /></td>
          <td><input data-field="firstEntry" data-idx="${idx}" value="${num(p.firstEntry)}" ${dis} /></td>
          <td><input type="number" step="0.01" data-field="avgCost" data-idx="${idx}" value="${num(p.avgCost)}" ${dis} /></td>
          <td><input data-field="currency" data-idx="${idx}" value="${p.currency || "USD"}" ${dis} /></td>
          <td><input type="number" step="0.01" data-field="price" data-idx="${idx}" value="${num(p.price)}" ${dis} /></td>
          <td>${investedCell}</td>
          <td>${valueCell}</td>
          <td><span class="cell-readonly ${plCls}">${fmtMoney(p.pl)}</span></td>
          <td><span class="cell-readonly ${plCls}">${fmtPct(p.pct)}</span></td>
          <td><input data-field="closedNotes" data-idx="${idx}" value="${p.closedNotes || ""}" ${dis} /></td>
          <td><input type="number" step="1" data-field="realized" data-idx="${idx}" value="${num(p.realized)}" ${dis} /></td>
          <td>${editMode ? `<button class="del-cell-btn" type="button" data-del-idx="${idx}">✕</button>` : ""}</td>
        </tr>
      `;
    })
    .join("");

  const unrealCls = t.unrealizedPL > 0 ? "gain-text" : t.unrealizedPL < 0 ? "loss-text" : "";
  sheetFoot.innerHTML = `
    <tr>
      <td colspan="8" style="text-align:right;">CASH 現金</td>
      <td><input type="number" step="1" data-total-field="cash" value="${num(t.cash)}" ${dis} /></td>
      <td colspan="5"></td>
    </tr>
    <tr>
      <td colspan="8" style="text-align:right;">Total 總計</td>
      <td>${fmtMoney(t.invested)}</td>
      <td>${fmtMoney(t.value)}</td>
      <td class="${unrealCls}">${fmtMoney(t.unrealizedPL)}</td>
      <td class="${unrealCls}">${fmtPct(t.unrealizedPct)}</td>
      <td></td>
      <td><input type="number" step="1" data-total-field="realizedPL" value="${num(t.realizedPL)}" ${dis} /></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="8" style="text-align:right;">總資產</td>
      <td colspan="2"><input type="number" step="1" data-total-field="totalAssets" value="${num(t.totalAssets)}" ${dis} /></td>
      <td colspan="4"></td>
    </tr>
  `;

  addRowBtn.style.display = editMode ? "block" : "none";
  sheetFooterEl.textContent = holdings.asOf ? `最後更新：${holdings.asOf}` : "";
}

async function persist() {
  recompute();
  holdings.asOf = new Date().toISOString().slice(0, 10);
  render();
  if (!editMode || !db) return;
  try {
    await setDoc(doc(db, ...PORTFOLIO_DOC_PATH), holdings);
  } catch (err) {
    console.error("寫入雲端失敗，這次修改暫時只留在畫面上", err);
    alert("同步到雲端失敗，請檢查網路連線再試一次（這筆修改還沒存起來，重新整理可能會遺失）");
  }
}

sheetBody.addEventListener("change", (e) => {
  const t = e.target;
  const idx = t.dataset.idx;
  const field = t.dataset.field;
  if (idx === undefined || !field || !holdings) return;
  const p = holdings.positions[Number(idx)];
  if (!p) return;
  if (field === "market") {
    p.market = t.value;
    p.type = t.value === "期權" ? "option" : undefined;
  } else if (["symbol", "name", "firstEntry", "currency", "closedNotes"].includes(field)) {
    p[field] = t.value;
  } else {
    p[field] = getNumOrNull(t.value);
  }
  persist();
});

sheetBody.addEventListener("click", (e) => {
  const delIdx = e.target.dataset.delIdx;
  if (delIdx !== undefined && holdings) {
    if (!confirm("確定要刪除這一列嗎？")) return;
    holdings.positions.splice(Number(delIdx), 1);
    persist();
  }
});

fxInputEl.addEventListener("change", (e) => {
  if (!holdings) return;
  const v = getNumOrNull(e.target.value);
  holdings.fxRate = v === null ? undefined : v;
  persist();
});

sheetFoot.addEventListener("change", (e) => {
  const field = e.target.dataset.totalField;
  if (field && holdings) {
    holdings.totals[field] = getNumOrNull(e.target.value);
    persist();
  }
});

addRowBtn.addEventListener("click", () => {
  if (!holdings) holdings = { asOf: new Date().toISOString().slice(0, 10), totals: {}, positions: [] };
  if (!holdings.positions) holdings.positions = [];
  holdings.positions.push({
    market: "美股",
    symbol: "NEW",
    name: "",
    shares: null,
    firstEntry: "",
    avgCost: null,
    currency: "USD",
    price: null,
    invested: 0,
    value: 0,
    pl: 0,
    pct: 0,
    closedNotes: "",
    realized: null
  });
  persist();
});

try {
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = getAuth(app);
  db = getFirestore(app);

  onAuthStateChanged(
    auth,
    (user) => {
      const isOwner = !!user && user.email === OWNER_EMAIL;
      editMode = isOwner;
      authBtn.textContent = user ? "登出" : "登入編輯";
      if (!user) setStatus("唯讀模式（登入才能編輯）");
      else if (isOwner) setStatus(`已登入：${user.email}`);
      else setStatus(`${user.email} 沒有編輯權限`);
      render();
    },
    (err) => {
      console.error("登入狀態監聽失敗", err);
      setStatus("登入狀態讀取失敗（唯讀模式）");
    }
  );

  authBtn.addEventListener("click", async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      } else {
        await signInWithPopup(auth, new GoogleAuthProvider());
      }
    } catch (err) {
      console.error("登入/登出失敗", err);
      alert("操作失敗：" + (err && err.message ? err.message : err));
    }
  });

  const portfolioRef = doc(db, ...PORTFOLIO_DOC_PATH);
  onSnapshot(
    portfolioRef,
    (snap) => {
      if (snap.exists()) {
        holdings = snap.data();
        if (!holdings.positions) holdings.positions = [];
        if (!holdings.totals) holdings.totals = {};
      } else {
        holdings = null;
      }
      render();
    },
    (err) => {
      console.error("Firestore 讀取失敗", err);
      setStatus("讀取雲端資料失敗");
    }
  );
} catch (err) {
  console.error("Firebase 初始化失敗", err);
  setStatus("雲端連線失敗");
  authBtn.style.display = "none";
  render();
}
