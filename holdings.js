// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-08-06",
  totals: {
    invested: 999560,
    value: 883181,
    unrealizedPL: -116378.73,
    unrealizedPct: -11.64,
    realizedPL: 341178.03,
    cash: 153266,
    totalAssets: 1036447
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 67.4, invested: 121861, value: 110672, pl: -11188.52, pct: -9.18, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 47.5, invested: 84508, value: 73610, pl: -10898.25, pct: -12.90, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 9.5, invested: 81945, value: 27889, pl: -54055.41, pct: -65.97, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 48.5, invested: 73961, value: 52655, pl: -21305.78, pct: -28.81, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 75.7, invested: 66340, value: 58644, pl: -7695.75, pct: -11.60, realized: 28585.10 },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 20, avgCost: 94.0, price: 68.1, invested: 58280, value: 42191, pl: -16089.00, pct: -27.61, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 275.2, invested: 46624, value: 51182, pl: 4557.62, pct: 9.78, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.2, invested: 42098, value: 39928, pl: -2170.00, pct: -5.15, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 9, avgCost: 128.1, price: 155.9, invested: 35743, value: 43502, pl: 7758.68, pct: 21.71, realized: 5541.56 },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 38.3, invested: 34720, value: 47504, pl: 12784.40, pct: 36.82, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.9, invested: 34646, value: 21995, pl: -12651.10, pct: -36.52, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 233.4, invested: 33790, value: 36182, pl: 2391.65, pct: 7.08, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 881.5, invested: 28830, value: 27326, pl: -1504.43, pct: -5.22, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 42.5, invested: 28024, value: 26325, pl: -1698.80, pct: -6.06, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 14.9, invested: 24025, value: 23018, pl: -1007.50, pct: -4.19, realized: null },
    { symbol: "MRCY", name: "Mercury Systems", shares: 2, avgCost: 112.0, price: 108.8, invested: 6944, value: 6747, pl: -196.54, pct: -2.83, realized: null },
    { symbol: "HOOD", name: "HOOD 09/18/26 100 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 57350, value: 55490, pl: -1860.00, pct: -3.24, realized: -41850.00 },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 36084, pl: -3286.00, pct: -8.35, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 22413, pl: -9734.00, pct: -30.28, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 24490, pl: 620.00, pct: 2.60, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 16895, value: 27590, pl: 10695.00, pct: 63.30, realized: null },
    { symbol: "SBET", name: "SBET 01/15/27 5 Call", type: "option", shares: 200, avgCost: null, price: null, invested: 13640, value: 12896, pl: -744.00, pct: -5.45, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 14849, pl: 899.00, pct: 6.44, realized: null }
  ]
};
