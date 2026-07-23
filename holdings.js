// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-23",
  totals: {
    invested: 1044041,
    value: 912173,
    unrealizedPL: -131868.61,
    unrealizedPct: -12.63,
    realizedPL: 419522.43,
    cash: 147990,
    totalAssets: 1060163
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 63.6, invested: 121861, value: 104413, pl: -17448.35, pct: -14.32, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 71, avgCost: 54.5, price: 46.5, invested: 120001, value: 102347, pl: -17654.50, pct: -14.71, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 27, avgCost: 128.1, price: 125.9, invested: 107229, value: 105362, pl: -1867.44, pct: -1.74, realized: 1877.36 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.7, invested: 81945, value: 25474, pl: -56470.31, pct: -68.91, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 46.5, invested: 73961, value: 50398, pl: -23562.58, pct: -31.86, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 15.8, invested: 75020, value: 73656, pl: -1364.00, pct: -1.82, realized: 4980.67 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.0, invested: 57714, value: 65286, pl: 7571.75, pct: 13.12, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 71.9, invested: 47740, value: 33410, pl: -14329.75, pct: -30.02, realized: 28585.10 },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 111.0, invested: 35030, value: 34398, pl: -632.40, pct: -1.81, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.5, invested: 34646, value: 21330, pl: -13316.05, pct: -38.44, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 208.0, invested: 33790, value: 32240, pl: -1550.00, pct: -4.59, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 32147, value: 30225, pl: -1922.00, pct: -5.98, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 269.6, invested: 31031, value: 41791, pl: 10760.10, pct: 34.68, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 975.7, invested: 28830, value: 30247, pl: 1417.32, pct: 4.92, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 83.8, invested: 25891, value: 25972, pl: 80.60, pct: 0.31, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 10.8, invested: 24800, value: 26660, pl: 1860.00, pct: 7.50, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 397.3, invested: 23746, value: 24633, pl: 886.60, pct: 3.73, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21235, pl: -2635.00, pct: -11.04, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 26.8, invested: 20460, value: 16604, pl: -3856.40, pct: -18.85, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 11.3, invested: 17670, value: 21074, pl: 3403.80, pct: 19.26, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 13950, pl: 0.00, pct: 0.00, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 11470, pl: -1240.00, pct: -9.76, realized: null }
  ]
};
