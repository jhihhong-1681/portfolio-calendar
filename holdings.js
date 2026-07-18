// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-18",
  totals: {
    invested: 1052101,
    value: 914065,
    unrealizedPL: -138036.68,
    unrealizedPct: -13.12,
    realizedPL: 386073.43,
    cash: 106493,
    totalAssets: 1020558
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 57.8, invested: 121861, value: 94965, pl: -26895.60, pct: -22.07, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 71, avgCost: 54.5, price: 45.2, invested: 120001, value: 99573, pl: -20427.76, pct: -17.02, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 27, avgCost: 128.1, price: 132.4, invested: 107229, value: 110802, pl: 3573.06, pct: 3.33, realized: 1877.36 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 7.7, invested: 81945, value: 22735, pl: -59209.16, pct: -72.26, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 43.6, invested: 73961, value: 47273, pl: -26687.38, pct: -36.08, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 16.3, invested: 75020, value: 75656, pl: 635.50, pct: 0.85, realized: 4980.67 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 13.6, invested: 57714, value: 63194, pl: 5479.25, pct: 9.49, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 67.6, invested: 47740, value: 31443, pl: -16296.70, pct: -34.14, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 08/21/26 125 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 36270, value: 43710, pl: 7440.00, pct: 20.51, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 103.9, invested: 35030, value: 32206, pl: -2824.10, pct: -8.06, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.5, invested: 34646, value: 19590, pl: -15055.15, pct: -43.45, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 212.7, invested: 33790, value: 32964, pl: -826.15, pct: -2.44, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 277.7, invested: 31031, value: 43037, pl: 12006.30, pct: 38.69, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 849.0, invested: 28830, value: 26317, pl: -2512.55, pct: -8.72, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 78.5, invested: 25891, value: 24320, pl: -1571.70, pct: -6.07, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.2, invested: 24800, value: 27826, pl: 3025.60, pct: 12.20, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 370.8, invested: 23746, value: 22991, pl: -754.54, pct: -3.18, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 27435, pl: 3565.00, pct: 14.94, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 25.9, invested: 20460, value: 16058, pl: -4402.00, pct: -21.52, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 10.8, invested: 17670, value: 19995, pl: 2325.00, pct: 13.16, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 14105, value: 14105, pl: 0.00, pct: 0.00, realized: null },
    { symbol: "NBIL", name: "2X Long NBIS", shares: 10, avgCost: 31.0, price: 21.1, invested: 9610, value: 6553, pl: -3056.60, pct: -31.81, realized: null },
    { symbol: "COP", name: "COP 08/21/26 115 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 6882, value: 11315, pl: 4433.00, pct: 64.41, realized: null }
  ]
};
