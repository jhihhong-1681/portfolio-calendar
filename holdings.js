// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-08-05",
  totals: {
    invested: 1028444,
    value: 887420.70,
    unrealizedPL: -141023.30,
    unrealizedPct: -13.71,
    realizedPL: 417066.03,
    cash: 139324,
    totalAssets: 1026744.70
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 68.6, invested: 121861, value: 112693, pl: -9167.63, pct: -7.52, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 47.6, invested: 84508, value: 73811, pl: -10696.75, pct: -12.66, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 9.4, invested: 81945, value: 27654, pl: -54291.01, pct: -66.25, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 48.4, invested: 73961, value: 52557, pl: -21403.43, pct: -28.94, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 75.4, invested: 66340, value: 58443, pl: -7897.25, pct: -11.90, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 2.63, invested: 65410, value: 32610.75, pl: -32799.25, pct: -50.14, realized: null },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.5, invested: 57714, value: 67286, pl: 9571.25, pct: 16.58, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 280.2, invested: 46624, value: 52110, pl: 5485.76, pct: 11.77, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.5, invested: 42098, value: 41013, pl: -1085.00, pct: -2.58, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 9.66, invested: 39370, value: 29939.33, pl: -9430.67, pct: -23.95, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 9, avgCost: 128.1, price: 160.0, invested: 35743, value: 44646, pl: 8902.58, pct: 24.91, realized: 5541.56 },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 78.3, invested: 35030, value: 24285, pl: -10744.60, pct: -30.67, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 34.6, invested: 34720, value: 42904, pl: 8184.00, pct: 23.57, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.7, invested: 34646, value: 21705, pl: -12940.95, pct: -37.35, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 237.7, invested: 33790, value: 36837, pl: 3047.30, pct: 9.02, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 2.04, invested: 32147, value: 18970.90, pl: -13176.10, pct: -40.99, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 924.6, invested: 28830, value: 28662, pl: -167.71, pct: -0.58, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 42.3, invested: 28024, value: 26201, pl: -1822.80, pct: -6.50, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 14.9, invested: 24025, value: 23157, pl: -868.00, pct: -3.61, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 7.30, invested: 23870, value: 22629.41, pl: -1240.59, pct: -5.20, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 8.70, invested: 16895, value: 26969.00, pl: 10074.00, pct: 59.63, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 5.00, invested: 13950, value: 15499.31, pl: 1549.31, pct: 11.11, realized: null },
    { symbol: "MRCY", name: "Mercury Systems", shares: 2, avgCost: 112.0, price: 110.3, invested: 6944, value: 6838, pl: -106.02, pct: -1.53, realized: null }
  ]
};
