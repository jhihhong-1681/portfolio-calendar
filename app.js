// 讀取 data.js 提供的 window.PORTFOLIO_HISTORY，換算成「每日損益」並畫成月曆。

const rawHistory = [...(window.PORTFOLIO_HISTORY || [])].sort((a, b) =>
  a.date < b.date ? -1 : a.date > b.date ? 1 : 0
);

// dateStr(YYYY-MM-DD) -> { total, delta, pct }
const dailyMap = new Map();
for (let i = 0; i < rawHistory.length; i++) {
  const { date, total } = rawHistory[i];
  if (i === 0) {
    dailyMap.set(date, { total, delta: null, pct: null });
  } else {
    const prevTotal = rawHistory[i - 1].total;
    const delta = total - prevTotal;
    const pct = prevTotal !== 0 ? (delta / prevTotal) * 100 : null;
    dailyMap.set(date, { total, delta, pct });
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
      amountEl.textContent = info ? "首筆" : "";
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

const assetChartEl = document.getElementById("assetChart");

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
  const trendColor = lastValue >= firstValue ? "#2fbf6a" : "#ff5c5c";

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<polygon points="${areaPoints}" fill="${trendColor}" fill-opacity="0.12" />`;
  svg += `<polyline points="${points}" fill="none" stroke="${trendColor}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />`;
  svg += `<circle cx="${xFor(n - 1).toFixed(1)}" cy="${yFor(lastValue).toFixed(1)}" r="3.5" fill="${trendColor}" />`;
  svg += `</svg>`;

  assetChartEl.innerHTML = svg;
  assetChartEl.innerHTML += `
    <div class="compare-legend">
      <div class="legend-item">期間最高 <span class="legend-value">${fmtAmount(max).replace(/^[+-]/, "")}</span></div>
      <div class="legend-item">期間最低 <span class="legend-value">${fmtAmount(min).replace(/^[+-]/, "")}</span></div>
      <div class="legend-item">目前 <span class="legend-value ${trendCls}">${fmtAmount(lastValue).replace(/^[+-]/, "")}</span></div>
    </div>
  `;
}

const compareChartEl = document.getElementById("compareChart");
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
  svg += `</svg>`;

  compareChartEl.innerHTML = svg;

  compareLegendEl.innerHTML = allSeries
    .map((s) => {
      const last = cumSeries[s.key][cumSeries[s.key].length - 1];
      const cls = last > 0 ? "gain" : last < 0 ? "loss" : "flat";
      return `<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label} <span class="legend-value ${cls}">${fmtPct(last)}</span></div>`;
    })
    .join("");
}

const holdingsSummaryEl = document.getElementById("holdingsSummary");
const holdingsListEl = document.getElementById("holdingsList");
const holdingsFooterEl = document.getElementById("holdingsFooter");

function fmtUsd(n) {
  if (n === null || n === undefined) return "-";
  return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
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
