// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-29",
  totals: {
    invested: 1057760,
    value: 821968.68,
    unrealizedPL: -235791.32,
    unrealizedPct: -22.29,
    realizedPL: 405986.63,
    cash: 118090,
    totalAssets: 940058.68
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 53.0, invested: 121861, value: 87128, pl: -34732.71, pct: -28.50, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 38.1, invested: 84508, value: 59055, pl: -25452.75, pct: -30.12, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 7.6, invested: 81945, value: 22353, pl: -59592.01, pct: -72.72, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.1, invested: 73961, value: 47892, pl: -26068.93, pct: -35.25, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 58.6, invested: 66340, value: 45415, pl: -20925.00, pct: -31.54, realized: 28585.10 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 123.0, invested: 59572, value: 57195, pl: -2376.67, pct: -3.99, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.0, invested: 57714, value: 65286, pl: 7571.75, pct: 13.12, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 223.0, invested: 46624, value: 41485, pl: -5138.56, pct: -11.02, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 9.2, invested: 42098, value: 39971, pl: -2126.60, pct: -5.05, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 14.60, invested: 39370, value: 45259.27, pl: 5889.27, pct: 14.96, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 81.3, invested: 35030, value: 25191, pl: -9839.40, pct: -28.09, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 22.6, invested: 34720, value: 28049, pl: -6671.20, pct: -19.21, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 10.7, invested: 34646, value: 18312, pl: -16333.90, pct: -47.15, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 226.4, invested: 33790, value: 35098, pl: 1308.20, pct: 3.87, realized: null },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 3.50, invested: 65410, value: 43399.63, pl: -22010.37, pct: -33.65, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 1.78, invested: 32147, value: 16553.05, pl: -15593.95, pct: -48.52, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 739.0, invested: 28830, value: 22909, pl: -5921.00, pct: -20.54, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 15.5, invested: 24025, value: 24025, pl: 0.00, pct: 0.00, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 370.3, invested: 23746, value: 22960, pl: -786.16, pct: -3.31, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 9.13, invested: 23870, value: 28302.28, pl: 4432.28, pct: 18.57, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 11.1, invested: 17670, value: 20553, pl: 2883.00, pct: 16.32, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 10, avgCost: 51.4, price: 42.2, invested: 15934, value: 13085, pl: -2848.90, pct: -17.88, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 4.03, invested: 13950, value: 12492.45, pl: -1457.55, pct: -10.45, realized: null }
  ]
};
