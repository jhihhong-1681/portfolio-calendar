// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-21",
  totals: {
    invested: 1052101,
    value: 924226,
    unrealizedPL: -127875.50,
    unrealizedPct: -12.15,
    realizedPL: 386073.43,
    cash: 106493,
    totalAssets: 1030719
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 57.4, invested: 121861, value: 94341, pl: -27519.94, pct: -22.58, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 71, avgCost: 54.5, price: 45.7, invested: 120001, value: 100586, pl: -19415.30, pct: -16.18, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 27, avgCost: 128.1, price: 134.9, invested: 107229, value: 112869, pl: 5640.45, pct: 5.26, realized: 1877.36 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.0, invested: 81945, value: 23442, pl: -58502.36, pct: -71.39, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 43.4, invested: 73961, value: 47078, pl: -26882.68, pct: -36.35, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 17.0, invested: 75020, value: 79004, pl: 3983.50, pct: 5.31, realized: 4980.67 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.0, invested: 57714, value: 65054, pl: 7339.25, pct: 12.72, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 65.7, invested: 47740, value: 30569, pl: -17170.90, pct: -35.97, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 08/21/26 125 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 36270, value: 45105, pl: 8835.00, pct: 24.36, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 102.5, invested: 35030, value: 31787, pl: -3242.60, pct: -9.26, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.7, invested: 34646, value: 20017, pl: -14628.90, pct: -42.22, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 213.0, invested: 33790, value: 33015, pl: -775.00, pct: -2.29, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 272.4, invested: 31031, value: 42225, pl: 11194.10, pct: 36.07, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 865.5, invested: 28830, value: 26829, pl: -2000.74, pct: -6.94, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 80.6, invested: 25891, value: 24989, pl: -902.10, pct: -3.48, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.5, invested: 24800, value: 28520, pl: 3720.00, pct: 15.00, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 378.2, invested: 23746, value: 23446, pl: -300.08, pct: -1.26, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21235, pl: -2635.00, pct: -11.04, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 25.0, invested: 20460, value: 15475, pl: -4984.80, pct: -24.36, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 10.5, invested: 17670, value: 19474, pl: 1804.20, pct: 10.21, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 14105, value: 15500, pl: 1395.00, pct: 9.89, realized: null },
    { symbol: "NBIL", name: "2X Long NBIS", shares: 10, avgCost: 31.0, price: 22.3, invested: 9610, value: 6925, pl: -2684.60, pct: -27.94, realized: null },
    { symbol: "COP", name: "COP 08/21/26 115 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 6882, value: 16740, pl: 9858.00, pct: 143.24, realized: null }
  ]
};
