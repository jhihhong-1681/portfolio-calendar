// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-08-04",
  totals: {
    invested: 1028444,
    value: 893455.81,
    unrealizedPL: -134988.19,
    unrealizedPct: -13.13,
    realizedPL: 417066.03,
    cash: 139324,
    totalAssets: 1032779.81
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 70.3, invested: 121861, value: 115519, pl: -6341.67, pct: -5.20, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 47.5, invested: 84508, value: 73579, pl: -10929.25, pct: -12.93, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 9.5, invested: 81945, value: 27948, pl: -53996.51, pct: -65.89, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.8, invested: 73961, value: 48586, pl: -25374.53, pct: -34.31, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 74.5, invested: 66340, value: 57722, pl: -8618.00, pct: -12.99, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 3.26, invested: 65410, value: 40422.36, pl: -24987.64, pct: -38.20, realized: null },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.3, invested: 57714, value: 66635, pl: 8920.25, pct: 15.46, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 269.9, invested: 46624, value: 50207, pl: 3582.98, pct: 7.68, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.6, invested: 42098, value: 41838, pl: -260.40, pct: -0.62, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 11.44, invested: 39370, value: 35463.44, pl: -3906.56, pct: -9.92, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 9, avgCost: 128.1, price: 162.7, invested: 35743, value: 45382, pl: 9639.14, pct: 26.97, realized: 5541.56 },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 101.0, invested: 35030, value: 31310, pl: -3720.00, pct: -10.62, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 33.5, invested: 34720, value: 41528, pl: 6807.60, pct: 19.61, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.9, invested: 34646, value: 21926, pl: -12719.30, pct: -36.71, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 235.2, invested: 33790, value: 36448, pl: 2658.25, pct: 7.87, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 2.00, invested: 32147, value: 18598.93, pl: -13548.07, pct: -42.15, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 892.7, invested: 28830, value: 27673, pl: -1157.23, pct: -4.01, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 42.9, invested: 28024, value: 26567, pl: -1457.00, pct: -5.20, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 15.0, invested: 24025, value: 23250, pl: -775.00, pct: -3.23, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 7.17, invested: 23870, value: 22226.42, pl: -1643.58, pct: -6.89, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 6.50, invested: 16895, value: 20149.26, pl: 3254.26, pct: 19.26, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 4.35, invested: 13950, value: 13484.40, pl: -465.60, pct: -3.34, realized: null },
    { symbol: "MRCY", name: "Mercury Systems", shares: 2, avgCost: 112.0, price: 112.8, invested: 6944, value: 6994, pl: 49.60, pct: 0.71, realized: null }
  ]
};
