// 把「目前持股」面板接上 Firebase：
// - 唯讀訪客：即時看到雲端最新資料（沒有雲端資料或連線失敗時，維持 holdings.js 內建的靜態備援，絕不白屏）。
// - 阿紘用 Google 帳號登入後：畫面上的欄位變成可編輯 <input>，改動會存回 Firestore，
//   其他裝置上開著的分頁會透過 onSnapshot 即時收到更新。
//
// 任何一步失敗（Firebase 初始化、登入、讀取、寫入）都只印 console + 顯示狀態文字，
// 絕對不讓例外往外丟到把整個網站噴掉——這是這次改版最重要的原則。

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

const firebaseConfig = {
  apiKey: "AIzaSyAcj24QP1xLOFReTCzj0EyLqDsm0C4tNSg",
  authDomain: "portfolio-calendar-1f1c7.firebaseapp.com",
  projectId: "portfolio-calendar-1f1c7",
  storageBucket: "portfolio-calendar-1f1c7.firebasestorage.app",
  messagingSenderId: "699401670138",
  appId: "1:699401670138:web:102eaa63a756ae537a6843",
  measurementId: "G-CC53RJC2TZ"
};

// 只有這個帳號登入後才有編輯權限（Firestore 規則那邊也要鎖同一個 email，這裡只是控制畫面）。
const OWNER_EMAIL = "jhihhong0810@gmail.com";
const PORTFOLIO_DOC = ["portfolio", "current"];

const authBtn = document.getElementById("authBtn");
const authStatusEl = document.getElementById("authStatus");
const syncBtn = document.getElementById("syncBtn");

function setStatus(text) {
  if (authStatusEl) authStatusEl.textContent = text;
}

function safeRerender() {
  if (typeof window.renderHoldings === "function") {
    try {
      window.renderHoldings();
    } catch (err) {
      console.error("重新渲染持股面板失敗", err);
    }
  }
}

let auth = null;
let db = null;

try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.error("Firebase 初始化失敗，網站會繼續顯示 holdings.js 的最後靜態快照（唯讀）", err);
  setStatus("雲端連線失敗，顯示最後同步資料");
  if (authBtn) authBtn.style.display = "none";
  if (syncBtn) syncBtn.style.display = "none";
}

if (auth && db) {
  onAuthStateChanged(
    auth,
    (user) => {
      const isOwner = !!user && user.email === OWNER_EMAIL;
      window.EDIT_MODE = isOwner;
      if (authBtn) authBtn.textContent = user ? "登出" : "登入編輯";
      if (syncBtn) syncBtn.style.display = isOwner ? "inline-block" : "none";
      if (!user) setStatus("唯讀模式");
      else if (isOwner) setStatus(`已登入：${user.email}`);
      else setStatus(`${user.email} 無編輯權限`);
      safeRerender();
    },
    (err) => {
      console.error("登入狀態監聽失敗", err);
      setStatus("登入狀態讀取失敗（唯讀模式）");
    }
  );

  if (authBtn) {
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
  }

  const portfolioRef = doc(db, ...PORTFOLIO_DOC);

  onSnapshot(
    portfolioRef,
    (snap) => {
      if (snap.exists()) {
        window.HOLDINGS = snap.data();
        safeRerender();
      }
      // 文件還不存在（尚未初始化）：保留 holdings.js 提供的靜態資料，不做任何事。
    },
    (err) => {
      console.error("Firestore 讀取失敗，畫面保留最後一次成功的資料，不清空、不報錯", err);
    }
  );

  window.savePortfolio = async function (updatedHoldings) {
    if (!window.EDIT_MODE) return;
    try {
      await setDoc(doc(db, ...PORTFOLIO_DOC), updatedHoldings);
    } catch (err) {
      console.error("寫入雲端失敗，這次修改暫時只留在畫面上", err);
      alert("同步到雲端失敗，請檢查網路連線再試一次（這筆修改還沒存起來，重新整理可能會遺失）");
    }
  };

  if (syncBtn) {
    syncBtn.addEventListener("click", async () => {
      if (!window.EDIT_MODE || !window.HOLDINGS) return;
      if (!confirm("確定要用目前畫面上的資料覆蓋雲端資料嗎？")) return;
      await window.savePortfolio(window.HOLDINGS);
      alert("已同步到雲端");
    });
  }
}
