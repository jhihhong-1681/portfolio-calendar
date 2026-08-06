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

// 從原本 Sheet 上「已經平倉/停損出場」的股票原封不動搬過來（只在畫面上還沒有任何已平倉紀錄時，
// 用「匯入已平倉紀錄」按鈕一次性匯入）。這些沒有總投入/現值/損益/報酬率（已經賣光了），
// 只留股數/成本/現價/平倉備註/已實現損益當歷史紀錄，讓「已實現損益」的總數對得起來。
const CLOSED_SEED = [
  { market: "美股", symbol: "AVGO", name: "Broadcom", shares: 2, firstEntry: "383", avgCost: 383.0, currency: "USD", price: 418.3, closedNotes: "421賣出2股", realized: 2356.00 },
  { market: "美股", symbol: "CRGY", name: "Crescent Energy", shares: 60, firstEntry: "9.5", avgCost: 9.5, currency: "USD", price: 11.0, closedNotes: "11賣出60股", realized: 2790.00 },
  { market: "期權", symbol: "BULL", name: "BULL 09/18/2026 10 Call", shares: 1000, firstEntry: "", avgCost: null, currency: "USD", price: null, closedNotes: "", realized: -8680.00 },
  { market: "美股", symbol: "BHE", name: "BenchMark", shares: 10, firstEntry: "83.52", avgCost: 83.5, currency: "USD", price: 84.1, closedNotes: "76.5賣出10股", realized: -2170.00 },
  { market: "美股", symbol: "NET", name: "CloudFlare", shares: 5, firstEntry: "199", avgCost: 200.2, currency: "USD", price: 293.0, closedNotes: "271賣出15股", realized: 10974.00 },
  { market: "美股", symbol: "TSLR", name: "2x Long TSLA", shares: 100, firstEntry: "13.5", avgCost: 13.5, currency: "USD", price: 13.4, closedNotes: "12.5賣出100股", realized: -3100.00 },
  { market: "美股", symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, firstEntry: "21", avgCost: 16.1, currency: "USD", price: 24.2, closedNotes: "17.8賣出20股 17.15賣出50股 19.2賣出80股 16賣出150股", realized: 4827.57 },
  { market: "期權", symbol: "XOM", name: "XOM 08/21/26 125 Call", shares: 100, firstEntry: "", avgCost: null, currency: "USD", price: null, closedNotes: "", realized: 23436.00 },
  { market: "美股", symbol: "NBIL", name: "2X Long NBIS", shares: 10, firstEntry: "31", avgCost: 31.0, currency: "USD", price: 27.4, closedNotes: "30賣出", realized: -310.00 },
  { market: "期權", symbol: "COP", name: "COP 08/21/26 115 CALL", shares: 100, firstEntry: "", avgCost: null, currency: "USD", price: null, closedNotes: "", realized: 10323.00 },
  { market: "期權", symbol: "XOM", name: "XOM 08/21/2026 125 Call", shares: 100, firstEntry: "", avgCost: null, currency: "USD", price: null, closedNotes: "", realized: 23249.38 },
  { market: "美股", symbol: "J", name: "Jacobs Solutions Inc", shares: 6, firstEntry: "124", avgCost: 124.0, currency: "USD", price: 144.7, closedNotes: "126賣出6股", realized: 372.00 },
  { market: "美股", symbol: "DXYZ", name: "Destiny Tech100", shares: 40, firstEntry: "26.5", avgCost: 36.3, currency: "USD", price: 23.9, closedNotes: "28.4賣出 27.5賣出40股", realized: -9326.00 },
  { market: "美股", symbol: "GCT", name: "GigaCloud Technology", shares: 30, firstEntry: "38", avgCost: 36.2, currency: "USD", price: 46.2, closedNotes: "33.3賣出", realized: -2697.00 },
  { market: "美股", symbol: "MDA", name: "MDA Space", shares: 20, firstEntry: "38", avgCost: 38.0, currency: "USD", price: 33.9, closedNotes: "39賣出20股", realized: 620.00 },
  { market: "美股", symbol: "BKSY", name: "BlackSky Technology", shares: 20, firstEntry: "27.5", avgCost: 27.5, currency: "USD", price: 25.2, closedNotes: "26賣出", realized: -930.00 },
  { market: "美股", symbol: "ALAB", name: "Astera Labs", shares: 9, firstEntry: "161", avgCost: 139.1, currency: "USD", price: 318.4, closedNotes: "169賣出5股 118.5賣出4股 285賣出6股 393賣6股 450賣出9股", realized: 164501.50 },
  { market: "美股", symbol: "AVAV", name: "AeroVironment", shares: 4, firstEntry: "260", avgCost: 237.5, currency: "USD", price: 168.1, closedNotes: "175賣出4股 145賣出4股", realized: -19220.00 },
  { market: "美股", symbol: "KTOS", name: "Kratos Defense", shares: 10, firstEntry: "90", avgCost: 78.0, currency: "USD", price: 55.3, closedNotes: "59賣出10股 52賣出10股", realized: -13950.00 },
  { market: "美股", symbol: "VICR", name: "Vicor Corp", shares: 5, firstEntry: "273", avgCost: 273.0, currency: "USD", price: 219.1, closedNotes: "360賣出5股", realized: 13485.00 },
  { market: "美股", symbol: "ENPH", name: "Enphase Energy", shares: 21, firstEntry: "36", avgCost: 34.4, currency: "USD", price: 39.0, closedNotes: "53.4賣出7股 61.5賣出7股 52.5賣出21股", realized: 21786.80 },
  { market: "美股", symbol: "ZS", name: "Zscaler", shares: 5, firstEntry: "131", avgCost: 131.0, currency: "USD", price: 161.7, closedNotes: "128.4賣出5股", realized: -403.00 },
  { market: "美股", symbol: "ANET", name: "Arista Networks", shares: 5, firstEntry: "145", avgCost: 145.0, currency: "USD", price: 197.3, closedNotes: "152賣出5股", realized: 1085.00 },
  { market: "美股", symbol: "ABSI", name: "Absci Corporation", shares: 50, firstEntry: "5.8", avgCost: 5.8, currency: "USD", price: 8.4, closedNotes: "6.8賣出50股", realized: 1395.00 },
  { market: "美股", symbol: "BWXT", name: "BWX Technologies", shares: 3, firstEntry: "203", avgCost: 203.0, currency: "USD", price: 168.3, closedNotes: "183.2賣出", realized: -1841.40 },
  { market: "美股", symbol: "VST", name: "Vistra Corp.", shares: 4, firstEntry: "145", avgCost: 145.0, currency: "USD", price: 140.6, closedNotes: "144賣出4股", realized: -124.00 },
  { market: "美股", symbol: "MAIR", name: "Madison Air Solution", shares: 10, firstEntry: "32.45", avgCost: 32.5, currency: "USD", price: 31.7, closedNotes: "40賣出", realized: 2340.50 },
  { market: "美股", symbol: "CRWD", name: "CrowdStrike", shares: 2, firstEntry: "377", avgCost: 389.0, currency: "USD", price: 209.9, closedNotes: "615賣出1股 675.5賣出2股", realized: 24769.00 },
  { market: "美股", symbol: "NBIZ", name: "2X Short NBIS", shares: 100, firstEntry: "2.55", avgCost: 2.6, currency: "USD", price: 13.5, closedNotes: "1.97賣出100股", realized: -1798.00 },
  { market: "美股", symbol: "EOSE", name: "Eos Energy Enterprises Inc", shares: 60, firstEntry: "11.2", avgCost: 7.8, currency: "USD", price: 3.8, closedNotes: "5.55賣出20股 5.25賣出70股 5.85賣出60股", realized: -10710.50 },
  { market: "美股", symbol: "XLU", name: "Utilities Select Sector ETF", shares: 15, firstEntry: "47.4", avgCost: 47.4, currency: "USD", price: 43.7, closedNotes: "46.04賣出135股 46.4賣出15股", realized: -6156.60 },
  { market: "美股", symbol: "SOFI", name: "SoFi Technologies Inc.", shares: 80, firstEntry: "21.46", avgCost: 19.26, currency: "USD", price: 18.3, closedNotes: "17.7賣出10股 17.05賣出80股", realized: -5964.40 },
  { market: "美股", symbol: "LAC", name: "Lithium Americas Corp", shares: 100, firstEntry: "5.9", avgCost: 5.1, currency: "USD", price: 3.1, closedNotes: "4.8賣出150股 4.65賣出100股", realized: -2480.00 },
  { market: "美股", symbol: "NBIS", name: "Nebius", shares: 5, firstEntry: "111", avgCost: 96.0, currency: "USD", price: 219.0, closedNotes: "95賣出18股 94賣出5股", realized: -868.00 },
  { market: "美股", symbol: "RXRX", name: "Recursion Pharmaceuticals", shares: 200, firstEntry: "4.28", avgCost: 3.9, currency: "USD", price: 3.2, closedNotes: "3.65賣出", realized: -1271.00 },
  { market: "美股", symbol: "SERV", name: "Serve Robotics", shares: 100, firstEntry: "9.4", avgCost: 9.4, currency: "USD", price: 5.7, closedNotes: "10賣出", realized: 1860.00 },
  { market: "美股", symbol: "CRWV", name: "CoreWeave", shares: 10, firstEntry: "127.5", avgCost: 76.9, currency: "USD", price: 89.9, closedNotes: "126.06賣出13股 135賣出10股 124賣出10股 80賣出14股 90.5賣出10股 101賣出10股", realized: 24731.73 },
  { market: "美股", symbol: "IREN", name: "IREN Limited", shares: 20, firstEntry: "41.72", avgCost: 41.72, currency: "USD", price: 38.9, closedNotes: "40賣出20股", realized: -1066.40 },
  { market: "美股", symbol: "CEG", name: "Constellation Energy", shares: 3, firstEntry: "300", avgCost: 300.0, currency: "USD", price: 265.1, closedNotes: "330賣出 295賣出", realized: 2790.06 },
  { market: "美股", symbol: "TSLA", name: "Tesla", shares: 2, firstEntry: "", avgCost: 430.0, currency: "USD", price: 321.6, closedNotes: "343.3賣出7股 315.85賣出4股 320.11賣出3股 306.21賣出1股 414賣出2股", realized: 27947.74 },
  { market: "美股", symbol: "USAR", name: "USA Rare Earth", shares: 70, firstEntry: "13.6", avgCost: 16.0, currency: "USD", price: 17.2, closedNotes: "21.3201賣出", realized: 11544.62 },
  { market: "美股", symbol: "OKLO", name: "Oklo Inc. Class A", shares: 15, firstEntry: "52.75", avgCost: 88.7, currency: "USD", price: 43.0, closedNotes: "69.25賣出 88賣出", realized: 4805.00 },
  { market: "美股", symbol: "CRDO", name: "Credo Technology", shares: 5, firstEntry: "137", avgCost: 140.2, currency: "USD", price: 224.6, closedNotes: "205賣出6股 150賣出5股", realized: 13571.80 },
  { market: "美股", symbol: "WMB", name: "Williams Companies", shares: 30, firstEntry: "59.25", avgCost: 59.3, currency: "USD", price: 71.8, closedNotes: "59.4賣出30股", realized: 135.00 },
  { market: "美股", symbol: "HIMS", name: "Hims & Hers Health", shares: 10, firstEntry: "47.6", avgCost: 38.5, currency: "USD", price: 31.7, closedNotes: "43.33賣出35股 65.13賣出20股 44.64賣出20股 47.9賣出15股 34.55賣出50股 37.1賣出10股", realized: -4295.05 },
  { market: "美股", symbol: "CHYM", name: "Chime Financial", shares: 90, firstEntry: "24.45", avgCost: 22.6, currency: "USD", price: 25.9, closedNotes: "18.5賣出", realized: -11160.00 },
  { market: "美股", symbol: "IONQ", name: "IonQ", shares: 20, firstEntry: "58.8", avgCost: 58.8, currency: "USD", price: 39.9, closedNotes: "45賣出", realized: -8556.00 },
  { market: "美股", symbol: "OUST", name: "Ouster", shares: 40, firstEntry: "28", avgCost: 28.0, currency: "USD", price: 45.1, closedNotes: "22.5賣出", realized: -6820.00 },
  { market: "美股", symbol: "ONDS", name: "Ondas Holding", shares: 300, firstEntry: "3.6", avgCost: 5.6, currency: "USD", price: 8.9, closedNotes: "5.81賣出350股 7.60賣出260股 9.12賣出90股 6.1賣出400股 5.6賣出300股", realized: 63428.66 },
  { market: "美股", symbol: "LEU", name: "Centrus Energy", shares: 11, firstEntry: "177", avgCost: 239.5, currency: "USD", price: 187.6, closedNotes: "297.5賣出2股 280賣出11股", realized: 21281.50 },
  { market: "美股", symbol: "FLY", name: "Firefly Aerospace", shares: 40, firstEntry: "29", avgCost: 29.0, currency: "USD", price: 22.8, closedNotes: "26.21賣出", realized: -3459.60 },
  { market: "美股", symbol: "NVTS", name: "Navitas Semiconductor", shares: 160, firstEntry: "6.71", avgCost: 6.5, currency: "USD", price: 12.4, closedNotes: "10賣出300股 12.8賣出160股", realized: 63798.00 },
  { market: "美股", symbol: "APLD", name: "Applied Digital", shares: 70, firstEntry: "", avgCost: 14.3, currency: "USD", price: 29.9, closedNotes: "19.78賣出", realized: 11891.60 },
  { market: "美股", symbol: "PATH", name: "UiPath", shares: 100, firstEntry: "", avgCost: 10.9, currency: "USD", price: 13.8, closedNotes: "11.3賣出", realized: 1240.00 },
  { market: "美股", symbol: "OKTA", name: "Okta", shares: 18, firstEntry: "", avgCost: 91.1, currency: "USD", price: 147.0, closedNotes: "94賣出", realized: 1618.20 },
  { market: "美股", symbol: "ACHR", name: "Archer Aviation", shares: 150, firstEntry: "", avgCost: 9.7, currency: "USD", price: 5.2, closedNotes: "9.2賣出", realized: -2325.00 },
  { market: "美股", symbol: "MSTR", name: "MicroStrategy", shares: 3, firstEntry: "", avgCost: 340.0, currency: "USD", price: 98.4, closedNotes: "346賣出", realized: 558.00 },
  { market: "美股", symbol: "GRAB", name: "Grab Holding", shares: 100, firstEntry: "", avgCost: 4.8, currency: "USD", price: 3.7, closedNotes: "5.05賣出", realized: 801.38 },
  { market: "美股", symbol: "GOOG", name: "Alphabet", shares: 5, firstEntry: "", avgCost: 168.4, currency: "USD", price: 360.1, closedNotes: "203賣出", realized: 5363.00 },
  { market: "美股", symbol: "UNH", name: "United Health", shares: 4, firstEntry: "", avgCost: 283.4, currency: "USD", price: 412.8, closedNotes: "240.76賣出4股 308.12賣出4股", realized: -2222.08 },
  { market: "美股", symbol: "BKTI", name: "BK Technologies", shares: 43, firstEntry: "", avgCost: 43.4, currency: "USD", price: 78.0, closedNotes: "60賣出", realized: 22127.80 },
  { market: "美股", symbol: "ASML", name: "ASML Holding", shares: 1, firstEntry: "", avgCost: 730.9, currency: "USD", price: 1678.2, closedNotes: "725賣出", realized: -182.90 },
  { market: "美股", symbol: "OSCR", name: "Oscar Health", shares: 100, firstEntry: "", avgCost: 13.6, currency: "USD", price: 30.1, closedNotes: "13.85賣出100股", realized: 775.00 },
  { market: "美股", symbol: "APP", name: "Applovin", shares: 2, firstEntry: "", avgCost: 343.3, currency: "USD", price: 417.8, closedNotes: "384.44賣出", realized: 2550.68 },
  { market: "美股", symbol: "RGTI", name: "Rigetti Computing", shares: 50, firstEntry: "", avgCost: 11.1, currency: "USD", price: 16.8, closedNotes: "13.16賣出", realized: 3193.00 },
  { market: "美股", symbol: "VNET", name: "VNET Group", shares: 100, firstEntry: "", avgCost: 6.0, currency: "USD", price: 7.2, closedNotes: "5.9賣出", realized: -310.00 },
  { market: "美股", symbol: "KC", name: "Kingsoft Cloud", shares: 40, firstEntry: "", avgCost: 13.6, currency: "USD", price: 12.5, closedNotes: "13.2賣出", realized: -496.00 },
  { market: "美股", symbol: "INTC", name: "Intel", shares: 12, firstEntry: "", avgCost: 20.5, currency: "USD", price: 101.1, closedNotes: "20.55賣出", realized: 6.20 },
  { market: "美股", symbol: "DOCS", name: "Doximity", shares: 10, firstEntry: "", avgCost: 52.1, currency: "USD", price: 21.6, closedNotes: "59.35賣出", realized: 2247.50 },
  { market: "美股", symbol: "TEM", name: "Tempus AI", shares: 8, firstEntry: "", avgCost: 40.2, currency: "USD", price: 46.7, closedNotes: "51.8賣出2股 64.3賣出8股", realized: 2213.40 }
].map((p) => ({ ...p, closed: true, type: p.market === "期權" ? "option" : undefined, invested: null, value: null, pl: null, pct: null }));

const authBtn = document.getElementById("authBtn");
const authStatusEl = document.getElementById("authStatus");
const sheetBody = document.getElementById("sheetBody");
const sheetFoot = document.getElementById("sheetFoot");
const addRowBtn = document.getElementById("addRowBtn");
const importClosedBtn = document.getElementById("importClosedBtn");
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

// 輸入框失去焦點時顯示的格式：帶千分位逗點。取值時要先把逗點拿掉才能轉數字。
function fmtInputNum(n) {
  if (n === null || n === undefined || n === "") return "";
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function getNumOrNull(str) {
  if (str === "" || str === null || str === undefined) return null;
  const n = Number(String(str).replace(/,/g, ""));
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
// 已平倉的部位不管美股還是期權，都沒有總投入/現值（已經賣光了），只留已實現損益當歷史紀錄。
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
    if (!isOptionRow(p) && !p.closed && p.shares && p.avgCost && p.invested) {
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
    if (p.closed) {
      // 已平倉：不管股數/成本填多少都不算現值，維持跟 Sheet 一樣是空白。
      p.invested = null;
      p.value = null;
      p.pl = null;
      p.pct = null;
      continue;
    }
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
  // 已實現損益 = 目前持有中部位的已實現(部分賣出) + 已平倉部位的已實現，兩邊加總才是完整數字。
  totals.realizedPL = positions.reduce((s, p) => s + (p.realized || 0), 0);
}

function render() {
  if (!holdings) {
    sheetBody.innerHTML = `<tr><td colspan="16" style="text-align:center;color:#80868b;padding:24px;">${
      db ? "雲端尚無資料" + (editMode ? "，按下面「＋新增一列」開始建立" : "，登入後可以建立") : "雲端連線中，稍後再試"
    }</td></tr>`;
    sheetFoot.innerHTML = "";
    addRowBtn.style.display = editMode ? "block" : "none";
    importClosedBtn.style.display = "none";
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
      const realizedCls = p.realized > 0 ? "gain-text" : p.realized < 0 ? "loss-text" : "";
      const isOption = isOptionRow(p);
      // 已平倉：總投入/現值一律唯讀空白。持有中的期權維持手動輸入；持有中的美股是公式算出來的唯讀欄位。
      const investedCell = p.closed
        ? `<span class="cell-readonly">-</span>`
        : isOption
          ? `<input type="text" inputmode="decimal" class="money-input" data-field="invested" data-idx="${idx}" value="${fmtInputNum(p.invested)}" ${dis} />`
          : `<span class="cell-readonly">${fmtMoney(p.invested)}</span>`;
      const valueCell = p.closed
        ? `<span class="cell-readonly">-</span>`
        : isOption
          ? `<input type="text" inputmode="decimal" class="money-input" data-field="value" data-idx="${idx}" value="${fmtInputNum(p.value)}" ${dis} />`
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
          <td><input type="text" inputmode="decimal" class="money-input" data-field="shares" data-idx="${idx}" value="${fmtInputNum(p.shares)}" ${dis} /></td>
          <td><input data-field="firstEntry" data-idx="${idx}" value="${num(p.firstEntry)}" ${dis} /></td>
          <td><input type="text" inputmode="decimal" class="money-input" data-field="avgCost" data-idx="${idx}" value="${fmtInputNum(p.avgCost)}" ${dis} /></td>
          <td><input data-field="currency" data-idx="${idx}" value="${p.currency || "USD"}" ${dis} /></td>
          <td><input type="text" inputmode="decimal" class="money-input" data-field="price" data-idx="${idx}" value="${fmtInputNum(p.price)}" ${dis} /></td>
          <td>${investedCell}</td>
          <td>${valueCell}</td>
          <td><span class="cell-readonly ${plCls}">${fmtMoney(p.pl)}</span></td>
          <td><span class="cell-readonly ${plCls}">${fmtPct(p.pct)}</span></td>
          <td><input data-field="closedNotes" data-idx="${idx}" value="${p.closedNotes || ""}" ${dis} /></td>
          <td><input type="text" inputmode="decimal" class="money-input ${realizedCls}" data-field="realized" data-idx="${idx}" value="${fmtInputNum(p.realized)}" ${dis} /></td>
          <td style="text-align:center;"><input type="checkbox" data-field="closed" data-idx="${idx}" ${p.closed ? "checked" : ""} ${dis} /></td>
          <td>${editMode ? `<button class="del-cell-btn" type="button" data-del-idx="${idx}">✕</button>` : ""}</td>
        </tr>
      `;
    })
    .join("");

  const unrealCls = t.unrealizedPL > 0 ? "gain-text" : t.unrealizedPL < 0 ? "loss-text" : "";
  const realizedTotalCls = t.realizedPL > 0 ? "gain-text" : t.realizedPL < 0 ? "loss-text" : "";
  sheetFoot.innerHTML = `
    <tr>
      <td colspan="8" style="text-align:right;">CASH 現金</td>
      <td><input type="text" inputmode="decimal" class="money-input" data-total-field="cash" value="${fmtInputNum(t.cash)}" ${dis} /></td>
      <td colspan="6"></td>
    </tr>
    <tr>
      <td colspan="8" style="text-align:right;">Total 總計</td>
      <td>${fmtMoney(t.invested)}</td>
      <td>${fmtMoney(t.value)}</td>
      <td class="${unrealCls}">${fmtMoney(t.unrealizedPL)}</td>
      <td class="${unrealCls}">${fmtPct(t.unrealizedPct)}</td>
      <td></td>
      <td class="${realizedTotalCls}">${fmtMoney(t.realizedPL)}</td>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td colspan="8" style="text-align:right;">總資產</td>
      <td colspan="2"><input type="text" inputmode="decimal" class="money-input" data-total-field="totalAssets" value="${fmtInputNum(t.totalAssets)}" ${dis} /></td>
      <td colspan="5"></td>
    </tr>
    <tr>
      <td colspan="8" style="text-align:right;">現金水位（%，手動填）</td>
      <td colspan="2"><input type="text" inputmode="decimal" class="money-input" data-total-field="cashRatio" value="${fmtInputNum(t.cashRatio)}" ${dis} /></td>
      <td colspan="5"></td>
    </tr>
  `;

  addRowBtn.style.display = editMode ? "block" : "none";
  importClosedBtn.style.display = editMode && !positions.some((p) => p.closed) ? "block" : "none";
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

// 數字欄位平常顯示千分位逗點；點進去編輯時先拿掉逗點方便打字，離開時再補回去。
function bindMoneyInputFormatting(container) {
  container.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("money-input")) {
      e.target.value = e.target.value.replace(/,/g, "");
    }
  });
  container.addEventListener("focusout", (e) => {
    if (e.target.classList.contains("money-input")) {
      e.target.value = fmtInputNum(getNumOrNull(e.target.value));
    }
  });
}
bindMoneyInputFormatting(sheetBody);
bindMoneyInputFormatting(sheetFoot);

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
  } else if (field === "closed") {
    p.closed = t.checked;
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
    realized: null,
    closed: false
  });
  persist();
});

importClosedBtn.addEventListener("click", () => {
  if (!holdings || !editMode) return;
  if (!confirm(`確定要匯入 ${CLOSED_SEED.length} 筆已平倉紀錄嗎？（只能匯入一次，之後這顆按鈕會消失）`)) return;
  holdings.positions.push(...JSON.parse(JSON.stringify(CLOSED_SEED)));
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
