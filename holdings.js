// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-27",
  totals: {
    invested: 942074,
    value: 754554,
    unrealizedPL: -187519.60,
    unrealizedPct: -19.90,
    realizedPL: 416836.63,
    cash: 244641,
    totalAssets: 999195
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 58.3, invested: 121861, value: 95770, pl: -26090.53, pct: -21.41, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 43.1, invested: 84508, value: 66852, pl: -17656.25, pct: -20.89, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.5, invested: 81945, value: 25150, pl: -56794.26, pct: -69.31, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 45.0, invested: 73961, value: 48814, pl: -25146.68, pct: -34.00, realized: -31372.00 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 131.5, invested: 59572, value: 61161, pl: 1589.78, pct: 2.67, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.5, invested: 57714, value: 67565, pl: 9850.25, pct: 17.07, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 66.9, invested: 47740, value: 31127, pl: -16612.90, pct: -34.80, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 47244, pl: 7874.00, pct: 20.00, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 102.3, invested: 35030, value: 31716, pl: -3313.90, pct: -9.46, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.7, invested: 34646, value: 19966, pl: -14680.05, pct: -42.37, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 216.3, invested: 33790, value: 33523, pl: -266.60, pct: -0.79, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 30225, pl: -1922.00, pct: -5.98, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 900.2, invested: 28830, value: 27906, pl: -923.80, pct: -3.20, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 79.6, invested: 25891, value: 24685, pl: -1205.90, pct: -4.66, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.1, invested: 24800, value: 27429, pl: 2628.80, pct: 10.60, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 383.2, invested: 23746, value: 23760, pl: 13.64, pct: 0.06, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21080, pl: -2790.00, pct: -11.69, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 26.3, invested: 20460, value: 16275, pl: -4185.00, pct: -20.45, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 10.5, invested: 17670, value: 19493, pl: 1822.80, pct: 10.32, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 10, avgCost: 51.4, price: 46.8, invested: 15934, value: 14508, pl: -1426.00, pct: -8.95, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 10695, pl: -3255.00, pct: -23.33, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 9610, pl: -3100.00, pct: -24.39, realized: null }
  ]
};
