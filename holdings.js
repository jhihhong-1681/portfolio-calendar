// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-08-04",
  totals: {
    invested: 1069075,
    value: 873258.96,
    unrealizedPL: -195816.04,
    unrealizedPct: -18.32,
    realizedPL: 408776.63,
    cash: 109564,
    totalAssets: 982822.96
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 63.5, invested: 121861, value: 104363, pl: -17497.64, pct: -14.36, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 43.8, invested: 84508, value: 67952, pl: -16555.75, pct: -19.59, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 9.0, invested: 81945, value: 26534, pl: -55410.11, pct: -67.62, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.2, invested: 73961, value: 47957, pl: -26003.83, pct: -35.16, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 70.4, invested: 66340, value: 54583, pl: -11756.75, pct: -17.72, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 2.35, invested: 65410, value: 29138.90, pl: -36271.10, pct: -55.45, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 125.7, invested: 59572, value: 58427, pl: -1144.42, pct: -1.92, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.4, invested: 57714, value: 67146, pl: 9431.75, pct: 16.34, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 263.1, invested: 46624, value: 48927, pl: 2303.30, pct: 4.94, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.5, invested: 42098, value: 41056, pl: -1041.60, pct: -2.47, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 12.10, invested: 39370, value: 37509.41, pl: -1860.59, pct: -4.73, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 91.6, invested: 35030, value: 28396, pl: -6634.00, pct: -18.94, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 28.0, invested: 34720, value: 34732, pl: 12.40, pct: 0.04, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.2, invested: 34646, value: 20716, pl: -13929.85, pct: -40.21, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 226.3, invested: 33790, value: 35078, pl: 1288.05, pct: 3.81, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 1.95, invested: 32147, value: 18133.95, pl: -14013.05, pct: -43.60, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 829.5, invested: 28830, value: 25715, pl: -3115.50, pct: -10.81, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 41.5, invested: 28024, value: 25742, pl: -2281.60, pct: -8.14, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 14.9, invested: 24025, value: 23111, pl: -914.50, pct: -3.81, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 392.2, invested: 23746, value: 24318, pl: 572.26, pct: 2.41, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 7.50, invested: 23870, value: 23250.10, pl: -619.90, pct: -2.60, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 5.72, invested: 16895, value: 17731.17, pl: 836.17, pct: 4.95, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 4.11, invested: 13950, value: 12740.43, pl: -1209.57, pct: -8.67, realized: null }
  ]
};
