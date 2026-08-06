// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-08-05",
  totals: {
    invested: 1051694,
    value: 905757,
    unrealizedPL: -145937,
    unrealizedPct: -13.88,
    realizedPL: 417066.03,
    cash: 135231,
    totalAssets: 1040988
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 68.4, invested: 121861, value: 112348, pl: -9512.66, pct: -7.81, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 47.9, invested: 84508, value: 74261, pl: -10247.25, pct: -12.13, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 9.4, invested: 81945, value: 27624, pl: -54320.46, pct: -66.29, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 48.6, invested: 73961, value: 52688, pl: -21273.23, pct: -28.76, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 74.8, invested: 66340, value: 57986, pl: -8354.50, pct: -12.59, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 2.63, invested: 65410, value: 32610.76, pl: -32799.24, pct: -50.14, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 20, avgCost: 94.0, price: 73.6, invested: 58280, value: 45607, pl: -12672.80, pct: -21.74, realized: null },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.5, invested: 57714, value: 67332, pl: 9617.75, pct: 16.66, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 277.9, invested: 46624, value: 51697, pl: 5072.84, pct: 10.88, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.5, invested: 42098, value: 41013, pl: -1085.00, pct: -2.58, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 9.66, invested: 39370, value: 29939.33, pl: -9430.67, pct: -23.95, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 9, avgCost: 128.1, price: 158.4, invested: 35743, value: 44202, pl: 8458.97, pct: 23.67, realized: 5541.56 },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 34.7, invested: 34720, value: 43065, pl: 8345.20, pct: 24.04, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.4, invested: 34646, value: 21210, pl: -13435.40, pct: -38.78, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 235.9, invested: 33790, value: 36568, pl: 2777.60, pct: 8.22, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 2.04, invested: 32147, value: 18970.90, pl: -13176.10, pct: -40.99, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 893.2, invested: 28830, value: 27689, pl: -1141.11, pct: -3.96, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 41.8, invested: 28024, value: 25916, pl: -2108.00, pct: -7.52, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 15.0, invested: 24025, value: 23266, pl: -759.50, pct: -3.16, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 7.30, invested: 23870, value: 22629.41, pl: -1240.59, pct: -5.20, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 8.70, invested: 16895, value: 26969.01, pl: 10074.01, pct: 59.63, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 5.00, invested: 13950, value: 15499.31, pl: 1549.31, pct: 11.11, realized: null },
    { symbol: "MRCY", name: "Mercury Systems", shares: 2, avgCost: 112.0, price: 107.4, invested: 6944, value: 6661, pl: -282.72, pct: -4.07, realized: null }
  ]
};
