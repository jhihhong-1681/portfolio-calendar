// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-31",
  totals: {
    invested: 1069075,
    value: 839723.87,
    unrealizedPL: -229351.13,
    unrealizedPct: -21.45,
    realizedPL: 408776.63,
    cash: 109564,
    totalAssets: 949287.87
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 59.0, invested: 121861, value: 96904, pl: -24956.86, pct: -20.48, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 41.4, invested: 84508, value: 64124, pl: -20384.25, pct: -24.12, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.4, invested: 81945, value: 24797, pl: -57147.66, pct: -69.74, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.2, invested: 73961, value: 47946, pl: -26014.68, pct: -35.17, realized: -31372.00 },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 25, avgCost: 85.6, price: 65.0, invested: 66340, value: 50336, pl: -16003.75, pct: -24.12, realized: 28585.10 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 400, avgCost: null, price: 1.58, invested: 65410, value: 19591.25, pl: -45818.75, pct: -70.05, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 123.1, invested: 59572, value: 57223, pl: -2348.77, pct: -3.94, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.3, invested: 57714, value: 66635, pl: 8920.25, pct: 15.46, realized: null },
    { symbol: "VRT", name: "Vertiv Holding", shares: 6, avgCost: 250.7, price: 241.6, invested: 46624, value: 44932, pl: -1691.98, pct: -3.63, realized: 75717.50 },
    { symbol: "FVRR", name: "Fiverr International", shares: 140, avgCost: 9.7, price: 8.9, invested: 42098, value: 38756, pl: -3341.80, pct: -7.94, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: 13.50, invested: 39370, value: 41849.37, pl: 2479.37, pct: 6.30, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 92.1, invested: 35030, value: 28536, pl: -6494.50, pct: -18.54, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 40, avgCost: 28.0, price: 24.5, invested: 34720, value: 30417, pl: -4302.80, pct: -12.39, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.4, invested: 34646, value: 19505, pl: -15140.40, pct: -43.70, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 223.7, invested: 33790, value: 34666, pl: 875.75, pct: 2.59, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: 2.30, invested: 32147, value: 21388.91, pl: -10758.09, pct: -33.47, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 823.0, invested: 28830, value: 25514, pl: -3316.07, pct: -11.50, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 20, avgCost: 45.2, price: 41.5, invested: 28024, value: 25730, pl: -2294.00, pct: -8.19, realized: null },
    { symbol: "CAG", name: "ConAgra Brands", shares: 50, avgCost: 15.5, price: 14.5, invested: 24025, value: 22491, pl: -1534.50, pct: -6.39, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 389.3, invested: 23746, value: 24135, pl: 389.36, pct: 1.64, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: 8.20, invested: 23870, value: 25419.55, pl: 1549.55, pct: 6.49, realized: null },
    { symbol: "B", name: "B 10/16/26 33 Call", type: "option", shares: 100, avgCost: null, price: 5.30, invested: 16895, value: 16429.34, pl: -465.66, pct: -2.76, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: 4.00, invested: 13950, value: 12399.45, pl: -1550.55, pct: -11.12, realized: null }
  ]
};
