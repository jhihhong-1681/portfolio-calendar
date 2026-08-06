// 報酬日曆頁面只需要「唯讀即時顯示」：訂閱 Firestore 上的 portfolio/current 文件，
// 一旦「持股更新」頁面改了資料，這裡會自動收到並重新畫面板，不用重新整理。
// 編輯功能都在 holdings-editor.html／holdings-editor.js，這個檔案不處理登入、不寫入。
//
// 任何失敗（初始化、讀取）都只印 console，畫面繼續顯示 holdings.js 提供的靜態備援資料，絕不白屏。

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { FIREBASE_CONFIG, PORTFOLIO_DOC_PATH } from "./firebase-config.js";

function safeRerender() {
  if (typeof window.renderHoldings === "function") {
    try {
      window.renderHoldings();
    } catch (err) {
      console.error("重新渲染持股面板失敗", err);
    }
  }
}

try {
  const app = initializeApp(FIREBASE_CONFIG);
  const db = getFirestore(app);
  const portfolioRef = doc(db, ...PORTFOLIO_DOC_PATH);

  onSnapshot(
    portfolioRef,
    (snap) => {
      if (snap.exists()) {
        window.HOLDINGS = snap.data();
        safeRerender();
      }
      // 文件還不存在：保留 holdings.js 提供的靜態資料，不做任何事。
    },
    (err) => {
      console.error("Firestore 讀取失敗，畫面保留最後一次成功的資料，不清空、不報錯", err);
    }
  );
} catch (err) {
  console.error("Firebase 初始化失敗，網站繼續顯示 holdings.js 的最後靜態快照（唯讀）", err);
}
