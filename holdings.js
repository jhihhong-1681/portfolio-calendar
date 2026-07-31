// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-30",
  totals: {
    invested: 1069075,
    value: 849046.42,
    unrealizedPL: -220028.58,
    unrealizedPct: -20.58,
    realizedPL: 408776.63,
    cash: 118090,
    totalAssets: 967136.42
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 58.4, invested: 121861, value: 96017, pl: -25844.08, pct: -21.21, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 41.7, invested: 84508, value: 64573, pl: -19934.75, pct: -23.59, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.6, invested: 81945, value: 25327, pl: -56617.56, pct: -69.09, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 45.6, invested: 73961, value: 49422, pl: -24539.08, pct: -33.18, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 64.7, invested: 66340, value: 50127, pl: -16213.00, pct: -24.44, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 1.83, invested: 65410, value: 22691.61, pl: -42718.39, pct: -65.32, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 122.3, invested: 59572, value: 56851, pl: -2720.77, pct: -4.57, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.5, invested: 57714, value: 67379, pl: 9664.25, pct: 16.74, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 227.5, invested: 46624, value: 42315, pl: -4309.00, pct: -9.24, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.2, invested: 42098, value: 39841, pl: -2256.80, pct: -5.36, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 14.59, invested: 39370, value: 45228.98, pl: 5858.98, pct: 14.88, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 87.9, invested: 35030, value: 27255, pl: -7774.80, pct: -22.19, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 24.0, invested: 34720, value: 29723, pl: -4997.20, pct: -14.39, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.7, invested: 34646, value: 19966, pl: -14680.05, pct: -42.37, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 221.7, invested: 33790, value: 34370, pl: 579.70, pct: 1.72, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 2.08, invested: 32147, value: 19343.83, pl: -12803.17, pct: -39.83, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 874.7, invested: 28830, value: 27114, pl: -1715.54, pct: -5.95, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 41.5, invested: 28024, value: 25699, pl: -2325.00, pct: -8.30, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 15.0, invested: 24025, value: 23297, pl: -728.50, pct: -3.03, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 387.8, invested: 23746, value: 24046, pl: 300.08, pct: 1.26, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 8.20, invested: 23870, value: 25419.96, pl: 1549.96, pct: 6.49, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 5.95, invested: 16895, value: 18445.05, pl: 1550.05, pct: 9.17, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 4.71, invested: 13950, value: 14595.99, pl: 645.99, pct: 4.63, realized: null }
  ]
};
