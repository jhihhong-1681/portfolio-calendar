// 讀取 data.js 提供的 window.PORTFOLIO_HISTORY，換算成「每日損益」並畫成月曆。

const rawHistory = [...(window.PORTFOLIO_HISTORY || [])].sort((a, b) =>
  a.date < b.date ? -1 : a.date > b.date ? 1 : 0
);

// dateStr(YYYY-MM-DD) -> { total, delta, pct, basisChange }
// basis 不同代表統計口徑換了（例如從「只算美股」換成「總資產」），
// 這種交界不能拿來算漲跌，跟資料的第一天一樣當作沒有前一天可比較。
const dailyMap = new Map();
for (let i = 0; i < rawHistory.length; i++) {
  const { date, total, basis } = rawHistory[i];
  const prev = i > 0 ? rawHistory[i - 1] : null;
  if (!prev || (prev.basis && basis && prev.basis !== basis)) {
    dailyMap.set(date, { total, delta: null, pct: null, basisChange: !!prev });
  } else {
    const prevTotal = prev.total;
    const delta = total - prevTotal;
    const pct = prevTotal !== 0 ? (delta / prevTotal) * 100 : null;
    dailyMap.set(date, { total, delta, pct, basisChange: false });
  }
}

// dateStr -> { taiex, sp500, nasdaq, sox } 當天漲跌幅(%)
const indexMap = new Map();
for (const row of window.INDEX_HISTORY || []) {
  indexMap.set(row.date, row);
}

const INDEX_SERIES = [
  { key: "taiex", label: "台股加權", color: "#4da3ff" },
  { key: "sp500", label: "S&P 500", color: "#2fbf6a" },
  { key: "nasdaq", label: "那斯達克", color: "#ff8a3d" },
  { key: "sox", label: "費城半導體", color: "#b96bff" }
];
const PORTFOLIO_SERIES = { key: "portfolio", label: "我的資產", color: "#f5c518" };

function fmtAmount(n) {
  if (n === null || n === undefined) return "";
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  return sign + "NT$" + Math.abs(Math.round(n)).toLocaleString("en-US");
}

// 日曆格子空間小，省略 NT$ 只留正負號跟數字
function fmtAmountShort(n) {
  if (n === null || n === undefined) return "";
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  return sign + Math.abs(Math.round(n)).toLocaleString("en-US");
}

function fmtPct(p) {
  if (p === null || p === undefined) return "";
  const sign = p > 0 ? "+" : p < 0 ? "-" : "";
  return sign + Math.abs(p).toFixed(2) + "%";
}

function levelClass(pct) {
  if (pct === null || pct === undefined || pct === 0) return "";
  const abs = Math.abs(pct);
  const dir = pct > 0 ? "gain" : "loss";
  let lvl = 1;
  if (abs >= 3) lvl = 4;
  else if (abs >= 1.5) lvl = 3;
  else if (abs >= 0.5) lvl = 2;
  return `lvl-${dir}-${lvl}`;
}

// 找出資料中最新的年月，作為預設顯示月份
let [viewYear, viewMonth] = (() => {
  if (rawHistory.length === 0) {
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1];
  }
  const [y, m] = rawHistory[rawHistory.length - 1].date.split("-").map(Number);
  return [y, m];
})();

const gridEl = document.getElementById("grid");
const monthLabelEl = document.getElementById("monthLabel");
const monthAmountEl = document.getElementById("monthAmount");
const monthPctEl = document.getElementById("monthPct");
const footerEl = document.getElementById("footer");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function render() {
  monthLabelEl.textContent = `${viewYear}/${pad2(viewMonth)} 報酬`;

  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth - 1, 1).getDay();

  gridEl.innerHTML = "";

  // 前面補空白格，對齊星期
  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "cell empty";
    gridEl.appendChild(empty);
  }

  let monthDelta = 0;
  let monthStartTotal = null;
  let hasAnyData = false;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${viewYear}-${pad2(viewMonth)}-${pad2(d)}`;
    const info = dailyMap.get(dateStr);

    const cell = document.createElement("div");
    cell.className = "cell";

    const dayNum = document.createElement("div");
    dayNum.className = "day-num";
    dayNum.textContent = d;
    cell.appendChild(dayNum);

    const amountEl = document.createElement("div");
    amountEl.className = "amount";
    const pctEl = document.createElement("div");
    pctEl.className = "pct";
    const totalEl = document.createElement("div");
    totalEl.className = "day-total";

    if (info && info.delta !== null) {
      hasAnyData = true;
      monthDelta += info.delta;
      if (monthStartTotal === null) {
        monthStartTotal = info.total - info.delta;
      }
      amountEl.textContent = fmtAmountShort(info.delta);
      pctEl.textContent = fmtPct(info.pct);
      totalEl.textContent = Math.round(info.total).toLocaleString("en-US");
      const cls = levelClass(info.pct);
      if (cls) cell.classList.add(cls);
    } else {
      cell.classList.add("no-data");
      amountEl.textContent = info ? (info.basisChange ? "基準變更" : "首筆") : "";
      pctEl.textContent = "";
      totalEl.textContent = info ? Math.round(info.total).toLocaleString("en-US") : "";
    }

    cell.appendChild(amountEl);
    cell.appendChild(pctEl);
    cell.appendChild(totalEl);
    gridEl.appendChild(cell);
  }

  if (hasAnyData && monthStartTotal) {
    const monthPct = (monthDelta / monthStartTotal) * 100;
    monthAmountEl.textContent = fmtAmount(monthDelta);
    monthAmountEl.className = "summary-amount " + (monthDelta > 0 ? "gain" : monthDelta < 0 ? "loss" : "flat");
    monthPctEl.textContent = fmtPct(monthPct);
    monthPctEl.className = "summary-pct " + (monthPct > 0 ? "gain" : monthPct < 0 ? "loss" : "flat");
  } else {
    monthAmountEl.textContent = "尚無資料";
    monthAmountEl.className = "summary-amount flat";
    monthPctEl.textContent = "--";
    monthPctEl.className = "summary-pct flat";
  }

  const lastRecord = rawHistory[rawHistory.length - 1];
  footerEl.textContent = lastRecord
    ? `最後更新：${lastRecord.date}　總資產：${fmtAmount(lastRecord.total).replace(/^[+-]/, "")}`
    : "尚無任何紀錄";

  renderCompareChart(viewYear, viewMonth);
  renderAssetChart();
}

// 幫圖表的 <svg> 加上滑鼠/觸控 hover：移到圖上會顯示垂直參考線、對應的點、跟一個顯示日期+數值的浮動提示框。
// dims: { width, height, padL, padR }；n: 資料點個數；updatePoints(idx) 負責把 hover-line/dot 移到對應位置；
// renderTooltipHtml(idx) 回傳提示框內容的 HTML。
function setupChartHover(svgEl, containerEl, tooltipEl, dims, n, updatePoints, renderTooltipHtml) {
  if (n < 1) return;
  const { width, height, padL, padR } = dims;
  const captureEl = svgEl.querySelector(".hover-capture");
  if (!captureEl) return;

  function idxFromClientX(clientX) {
    const rect = svgEl.getBoundingClientRect();
    const scaleX = rect.width / width;
    const mx = (clientX - rect.left) / scaleX;
    if (n === 1) return 0;
    const ratio = (mx - padL) / (width - padL - padR);
    return Math.max(0, Math.min(n - 1, Math.round(ratio * (n - 1))));
  }

  function handleMove(evt) {
    const idx = idxFromClientX(evt.clientX);
    updatePoints(idx);
    tooltipEl.innerHTML = renderTooltipHtml(idx);
    tooltipEl.style.display = "block";

    const contRect = containerEl.getBoundingClientRect();
    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;
    let left = evt.clientX - contRect.left + 14;
    let top = evt.clientY - contRect.top - th - 10;
    if (left + tw > contRect.width) left = evt.clientX - contRect.left - tw - 14;
    if (left < 0) left = 4;
    if (top < 0) top = evt.clientY - contRect.top + 14;
    tooltipEl.style.left = left + "px";
    tooltipEl.style.top = top + "px";
  }

  function handleLeave() {
    tooltipEl.style.display = "none";
    svgEl.querySelectorAll(".hover-guide").forEach((g) => g.setAttribute("opacity", "0"));
  }

  captureEl.addEventListener("pointermove", handleMove);
  captureEl.addEventListener("pointerleave", handleLeave);
}

const assetChartEl = document.getElementById("assetChart");
const assetChartWrapEl = document.getElementById("assetChartWrap");
const assetTooltipEl = document.getElementById("assetTooltip");

// 總資產走勢：畫出 rawHistory 裡「全部」快照日期的總資產金額折線圖（不分月份，看長期走勢）
function renderAssetChart() {
  if (rawHistory.length < 2) {
    assetChartEl.innerHTML = '<div class="flat" style="font-size:12px;padding:10px 0;">累積兩天以上的資料才能畫出走勢</div>';
    return;
  }

  const width = 380;
  const height = 130;
  const padL = 4;
  const padR = 4;
  const padT = 10;
  const padBottom = 10;

  const values = rawHistory.map((r) => r.total);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }

  const n = values.length;
  const xFor = (i) => (n === 1 ? padL : padL + (i / (n - 1)) * (width - padL - padR));
  const yFor = (v) => padT + (1 - (v - min) / (max - min)) * (height - padT - padBottom);

  const points = values.map((v, i) => `${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(" ");
  const areaPoints = `${xFor(0).toFixed(1)},${(height - padBottom).toFixed(1)} ${points} ${xFor(n - 1).toFixed(1)},${(height - padBottom).toFixed(1)}`;

  const lastValue = values[n - 1];
  const firstValue = values[0];
  const trendCls = lastValue >= firstValue ? "gain" : "loss";
  const trendColor = lastValue >= firstValue ? "#ff5c5c" : "#2fbf6a"; // 台股慣例：漲=紅, 跌=綠

  // 找出統計口徑改變的那一天（例如從「只算美股」換成「總資產」），畫一條虛線標記，
  // 提醒這條線左右兩段的數字基準不一樣，不是真的跳漲/跳跌。
  let basisChangeIndex = -1;
  for (let i = 1; i < rawHistory.length; i++) {
    if (rawHistory[i].basis && rawHistory[i - 1].basis && rawHistory[i].basis !== rawHistory[i - 1].basis) {
      basisChangeIndex = i;
      break;
    }
  }

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<polygon points="${areaPoints}" fill="${trendColor}" fill-opacity="0.12" />`;
  svg += `<polyline points="${points}" fill="none" stroke="${trendColor}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />`;
  if (basisChangeIndex >= 0) {
    const bx = xFor(basisChangeIndex).toFixed(1);
    svg += `<line x1="${bx}" y1="${padT}" x2="${bx}" y2="${height - padBottom}" stroke="#9aa0a8" stroke-width="1" stroke-dasharray="3,3" />`;
  }
  svg += `<circle cx="${xFor(n - 1).toFixed(1)}" cy="${yFor(lastValue).toFixed(1)}" r="3.5" fill="${trendColor}" />`;
  svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="transparent" class="hover-capture" style="cursor:crosshair;" />`;
  svg += `<g class="hover-guide" opacity="0" style="pointer-events:none;">`;
  svg += `<line class="hg-line" x1="0" y1="${padT}" x2="0" y2="${height - padBottom}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="2,2" />`;
  svg += `<circle class="hg-dot" r="4" fill="${trendColor}" stroke="#0d1117" stroke-width="1.5" />`;
  svg += `</g>`;
  svg += `</svg>`;

  assetChartEl.innerHTML = svg;
  assetChartEl.innerHTML += `
    <div class="compare-legend">
      <div class="legend-item">期間最高 <span class="legend-value">${fmtAmount(max).replace(/^[+-]/, "")}</span></div>
      <div class="legend-item">期間最低 <span class="legend-value">${fmtAmount(min).replace(/^[+-]/, "")}</span></div>
      <div class="legend-item">目前 <span class="legend-value ${trendCls}">${fmtAmount(lastValue).replace(/^[+-]/, "")}</span></div>
    </div>
  `;
  if (basisChangeIndex >= 0) {
    assetChartEl.innerHTML += `<div class="footer" style="margin-top:6px;">虛線左側是用交易紀錄推算的美股部位（不含台幣現金/期貨/加密貨幣），右側才是完整總資產</div>`;
  }

  const svgEl = assetChartEl.querySelector("svg");
  const hoverGuide = svgEl.querySelector(".hover-guide");
  const hgLine = svgEl.querySelector(".hg-line");
  const hgDot = svgEl.querySelector(".hg-dot");
  setupChartHover(
    svgEl,
    assetChartWrapEl,
    assetTooltipEl,
    { width, height, padL, padR },
    n,
    (idx) => {
      hoverGuide.setAttribute("opacity", "1");
      const x = xFor(idx).toFixed(1);
      hgLine.setAttribute("x1", x);
      hgLine.setAttribute("x2", x);
      hgDot.setAttribute("cx", x);
      hgDot.setAttribute("cy", yFor(values[idx]).toFixed(1));
    },
    (idx) => {
      const r = rawHistory[idx];
      return `<div class="tt-date">${r.date}</div><div class="tt-row"><span class="tt-dot" style="background:${trendColor}"></span><span class="tt-value">${fmtAmount(r.total).replace(/^[+-]/, "")}</span></div>`;
    }
  );
}

const compareChartEl = document.getElementById("compareChart");
const compareChartWrapEl = document.getElementById("compareChartWrap");
const compareTooltipEl = document.getElementById("compareTooltip");
const compareLegendEl = document.getElementById("compareLegend");

function renderCompareChart(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dateStrs = [];
  for (let d = 1; d <= daysInMonth; d++) dateStrs.push(`${year}-${pad2(month)}-${pad2(d)}`);

  // 只保留這個月裡「有任一資料」的日期，依序建立每個序列的累積報酬曲線
  const relevantDates = dateStrs.filter(
    (ds) => (dailyMap.get(ds) && dailyMap.get(ds).pct !== null) || indexMap.has(ds)
  );

  const allSeries = [PORTFOLIO_SERIES, ...INDEX_SERIES];

  if (relevantDates.length === 0) {
    compareChartEl.innerHTML = '<div class="flat" style="font-size:12px;padding:10px 0;">本月尚無可比較的資料</div>';
    compareLegendEl.innerHTML = "";
    return;
  }

  const cumSeries = {};
  for (const s of allSeries) {
    let cum = 1;
    cumSeries[s.key] = relevantDates.map((ds) => {
      let pct = null;
      if (s.key === "portfolio") {
        const info = dailyMap.get(ds);
        pct = info ? info.pct : null;
      } else {
        const row = indexMap.get(ds);
        pct = row ? row[s.key] : null;
      }
      if (pct !== null && pct !== undefined) cum *= 1 + pct / 100;
      return (cum - 1) * 100;
    });
  }

  const width = 380;
  const height = 130;
  const padL = 4;
  const padR = 4;
  const padT = 8;
  const padBottom = 8;

  let min = 0;
  let max = 0;
  for (const s of allSeries) {
    for (const v of cumSeries[s.key]) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  if (min === max) {
    min -= 1;
    max += 1;
  }

  const n = relevantDates.length;
  const xFor = (i) => (n === 1 ? padL : padL + (i / (n - 1)) * (width - padL - padR));
  const yFor = (v) => padT + (1 - (v - min) / (max - min)) * (height - padT - padBottom);

  const zeroY = yFor(0);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="#33394a" stroke-width="1" stroke-dasharray="3,3" />`;

  for (const s of allSeries) {
    const points = cumSeries[s.key]
      .map((v, i) => `${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`)
      .join(" ");
    svg += `<polyline points="${points}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />`;
  }
  svg += `<rect x="0" y="0" width="${width}" height="${height}" fill="transparent" class="hover-capture" style="cursor:crosshair;" />`;
  svg += `<g class="hover-guide" opacity="0" style="pointer-events:none;">`;
  svg += `<line class="hg-line" x1="0" y1="${padT}" x2="0" y2="${height - padBottom}" stroke="#8a8f98" stroke-width="1" stroke-dasharray="2,2" />`;
  for (const s of allSeries) {
    svg += `<circle class="hg-dot" data-key="${s.key}" r="3.5" fill="${s.color}" stroke="#0d1117" stroke-width="1.2" />`;
  }
  svg += `</g>`;
  svg += `</svg>`;

  compareChartEl.innerHTML = svg;

  compareLegendEl.innerHTML = allSeries
    .map((s) => {
      const last = cumSeries[s.key][cumSeries[s.key].length - 1];
      const cls = last > 0 ? "gain" : last < 0 ? "loss" : "flat";
      return `<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label} <span class="legend-value ${cls}">${fmtPct(last)}</span></div>`;
    })
    .join("");

  const svgEl = compareChartEl.querySelector("svg");
  const hoverGuide = svgEl.querySelector(".hover-guide");
  const hgLine = svgEl.querySelector(".hg-line");
  const hgDots = svgEl.querySelectorAll(".hg-dot");
  setupChartHover(
    svgEl,
    compareChartWrapEl,
    compareTooltipEl,
    { width, height, padL, padR },
    n,
    (idx) => {
      hoverGuide.setAttribute("opacity", "1");
      const x = xFor(idx).toFixed(1);
      hgLine.setAttribute("x1", x);
      hgLine.setAttribute("x2", x);
      hgDots.forEach((dot) => {
        const key = dot.getAttribute("data-key");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", yFor(cumSeries[key][idx]).toFixed(1));
      });
    },
    (idx) => {
      const rows = allSeries
        .map((s) => {
          const v = cumSeries[s.key][idx];
          const cls = v > 0 ? "gain" : v < 0 ? "loss" : "flat";
          return `<div class="tt-row"><span class="tt-dot" style="background:${s.color}"></span>${s.label} <span class="tt-value ${cls}">${fmtPct(v)}</span></div>`;
        })
        .join("");
      return `<div class="tt-date">${relevantDates[idx]}</div>${rows}`;
    }
  );
}

const holdingsSummaryEl = document.getElementById("holdingsSummary");
const themeExposureEl = document.getElementById("themeExposure");
const holdingsListEl = document.getElementById("holdingsList");
const holdingsFooterEl = document.getElementById("holdingsFooter");

// 股票代號 -> 主題分類，手動維護。新增持股時要記得補上對照，不然會被歸到「未分類」。
const THEME_MAP = {
  MU: "AI基建/半導體",
  AVGO: "AI基建/半導體",
  IBM: "AI基建/半導體",
  NBIL: "AI基建/半導體",
  NET: "資安/軟體",
  PLTR: "資安/軟體",
  MSFL: "資安/軟體",
  SMR: "核能",
  UUUU: "核能",
  ASTS: "國防太空",
  RKLB: "國防太空",
  VOYG: "國防太空",
  MP: "稀土關鍵金屬",
  NU: "金融科技",
  VPG: "機器人",
  BHE: "機器人",
  XOM: "其他-能源/石油",
  CRGY: "其他-能源/石油",
  HAL: "其他-能源/石油",
  GSK: "其他-醫療保健",
  FVRR: "其他-消費網路",
  UGL: "其他-貴金屬避險"
};

const THEME_COLORS = [
  "#4da3ff", "#2fbf6a", "#ff8a3d", "#b96bff", "#f5c518",
  "#ff5c5c", "#3ddad7", "#e879b9", "#9aa0a8", "#7ee787", "#ffb454"
];

function fmtUsd(n) {
  if (n === null || n === undefined) return "-";
  return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
}

// 依 THEME_MAP 把持股現值分組加總，畫成橫向比例條，看整體主題曝險集中度。
function renderThemeExposure(positions) {
  if (!positions.length) {
    themeExposureEl.innerHTML = "";
    return;
  }

  const totals = new Map();
  for (const p of positions) {
    const theme = THEME_MAP[p.symbol] || "未分類";
    totals.set(theme, (totals.get(theme) || 0) + (p.value || 0));
  }

  const grandTotal = [...totals.values()].reduce((a, b) => a + b, 0);
  if (grandTotal <= 0) {
    themeExposureEl.innerHTML = "";
    return;
  }

  const rows = [...totals.entries()].sort((a, b) => b[1] - a[1]);

  themeExposureEl.innerHTML = rows
    .map(([theme, value], i) => {
      const pct = (value / grandTotal) * 100;
      const color = THEME_COLORS[i % THEME_COLORS.length];
      return `
        <div class="theme-row">
          <div class="theme-row-label">
            <span class="legend-dot" style="background:${color}"></span>${theme}
            <span class="theme-row-value">${fmtAmount(value).replace(/^[+-]/, "")}（${pct.toFixed(1)}%）</span>
          </div>
          <div class="theme-bar-track">
            <div class="theme-bar-fill" style="width:${pct.toFixed(2)}%;background:${color};"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderHoldings() {
  const h = window.HOLDINGS;
  if (!h) {
    holdingsSummaryEl.innerHTML = "";
    holdingsListEl.innerHTML = '<div class="flat" style="font-size:12px;">尚無持股資料</div>';
    holdingsFooterEl.textContent = "";
    return;
  }

  const t = h.totals || {};
  const unrealizedCls = t.unrealizedPL > 0 ? "gain" : t.unrealizedPL < 0 ? "loss" : "flat";
  const realizedCls = t.realizedPL > 0 ? "gain" : t.realizedPL < 0 ? "loss" : "flat";

  holdingsSummaryEl.innerHTML = `
    <div class="metric">
      <div class="metric-label">總投入</div>
      <div class="metric-value">${fmtAmount(t.invested).replace(/^[+-]/, "")}</div>
    </div>
    <div class="metric">
      <div class="metric-label">現值</div>
      <div class="metric-value">${fmtAmount(t.value).replace(/^[+-]/, "")}</div>
    </div>
    <div class="metric">
      <div class="metric-label">現金</div>
      <div class="metric-value">${fmtAmount(t.cash).replace(/^[+-]/, "")}</div>
      <div class="metric-sub flat">水位 ${t.totalAssets ? ((t.cash / t.totalAssets) * 100).toFixed(1) : "0.0"}%</div>
    </div>
    <div class="metric wide">
      <div class="metric-label">總資產（含現金/期貨/加密貨幣）</div>
      <div class="metric-value">${fmtAmount(t.totalAssets).replace(/^[+-]/, "")}</div>
    </div>
    <div class="metric">
      <div class="metric-label">未實現損益</div>
      <div class="metric-value ${unrealizedCls}">${fmtAmount(t.unrealizedPL)}</div>
      <div class="metric-sub ${unrealizedCls}">${fmtPct(t.unrealizedPct)}</div>
    </div>
    <div class="metric">
      <div class="metric-label">已實現損益</div>
      <div class="metric-value ${realizedCls}">${fmtAmount(t.realizedPL)}</div>
    </div>
  `;

  renderThemeExposure(h.positions || []);

  const positions = h.positions || [];
  holdingsListEl.innerHTML = positions
    .map((p) => {
      const borderCls = p.pl > 0 ? "gain-border" : p.pl < 0 ? "loss-border" : "";
      const plCls = p.pl > 0 ? "gain" : p.pl < 0 ? "loss" : "flat";
      const isOption = p.type === "option";
      const sharesTxt = p.shares !== null && p.shares !== undefined ? `${p.shares} 股` : "";
      const optionTag = isOption ? '<span class="h-tag">期權</span>' : "";
      const nameTxt = p.name && p.name !== p.symbol ? `<div class="h-name">${p.name}</div>` : "";
      const costLine = p.avgCost !== null && p.avgCost !== undefined
        ? `成本 ${fmtUsd(p.avgCost)} → 現價 ${fmtUsd(p.price)}`
        : "";
      const investLine = `投入 ${fmtAmount(p.invested).replace(/^[+-]/, "")} → 現值 ${fmtAmount(p.value).replace(/^[+-]/, "")}`;
      const realizedLine = p.realized !== null && p.realized !== undefined
        ? `<div class="h-line3">已實現：<span class="${p.realized > 0 ? "gain" : p.realized < 0 ? "loss" : "flat"}">${fmtAmount(p.realized)}</span></div>`
        : "";
      return `
        <div class="holding-row ${borderCls}">
          <div class="h-line1">
            <span><span class="h-symbol">${p.symbol}</span><span class="h-shares">${sharesTxt}</span>${optionTag}</span>
            <span class="h-pl ${plCls}">${fmtAmount(p.pl)} <span style="font-size:10.5px;">(${fmtPct(p.pct)})</span></span>
          </div>
          ${nameTxt}
          <div class="h-line2">
            <span>${costLine}</span>
            <span>${investLine}</span>
          </div>
          ${realizedLine}
        </div>
      `;
    })
    .join("");

  holdingsFooterEl.textContent = `快照時間：${h.asOf}`;
}

renderHoldings();

document.getElementById("prevBtn").addEventListener("click", () => {
  viewMonth -= 1;
  if (viewMonth < 1) {
    viewMonth = 12;
    viewYear -= 1;
  }
  render();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  viewMonth += 1;
  if (viewMonth > 12) {
    viewMonth = 1;
    viewYear += 1;
  }
  render();
});

render();
