// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-28",
  totals: {
    invested: 942074,
    value: 747268,
    unrealizedPL: -194805.53,
    unrealizedPct: -20.68,
    realizedPL: 416836.63,
    cash: 244641,
    totalAssets: 991909
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 57.6, invested: 121861, value: 94571, pl: -27289.92, pct: -22.39, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 41.1, invested: 84508, value: 63690, pl: -20818.25, pct: -24.63, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.2, invested: 81945, value: 24178, pl: -57766.11, pct: -70.49, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.1, invested: 73961, value: 47859, pl: -26101.48, pct: -35.29, realized: -31372.00 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 124.1, invested: 59572, value: 57716, pl: -1855.87, pct: -3.12, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.7, invested: 57714, value: 68495, pl: 10780.25, pct: 18.68, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 64.1, invested: 47740, value: 29783, pl: -17956.75, pct: -37.61, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 40610, pl: 1240.00, pct: 3.15, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 89.3, invested: 35030, value: 27677, pl: -7353.20, pct: -20.99, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.3, invested: 34646, value: 19181, pl: -15464.35, pct: -44.64, realized: -12827.80 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 31930, value: 19685, pl: -12245.00, pct: -38.35, realized: null },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 226.4, invested: 33790, value: 35097, pl: 1306.65, pct: 3.87, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 21855, pl: -10292.00, pct: -32.02, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 820.7, invested: 28830, value: 25440, pl: -3389.54, pct: -11.76, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 76.0, invested: 25891, value: 23566, pl: -2325.00, pct: -8.98, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.6, invested: 24800, value: 28867, pl: 4067.20, pct: 16.40, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 381.1, invested: 23746, value: 23626, pl: -119.66, pct: -0.50, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 26040, pl: 2170.00, pct: 9.09, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 26.1, invested: 20460, value: 16201, pl: -4259.40, pct: -20.82, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 10.3, invested: 17670, value: 19139, pl: 1469.40, pct: 8.32, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 10, avgCost: 51.4, price: 44.2, invested: 15934, value: 13687, pl: -2247.50, pct: -14.11, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 13795, pl: -155.00, pct: -1.11, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 6510, pl: -6200.00, pct: -48.78, realized: null }
  ]
};
