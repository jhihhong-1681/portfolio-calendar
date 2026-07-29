// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-28",
  totals: {
    invested: 916183,
    value: 710072,
    unrealizedPL: -206110.61,
    unrealizedPct: -22.50,
    realizedPL: 414666.63,
    cash: 268356,
    totalAssets: 978428
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 56.6, invested: 121861, value: 92912, pl: -28949.35, pct: -23.76, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 41.3, invested: 84508, value: 63984, pl: -20523.75, pct: -24.29, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.2, invested: 81945, value: 24208, pl: -57736.66, pct: -70.46, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 43.7, invested: 73961, value: 47447, pl: -26513.78, pct: -35.85, realized: -31372.00 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 123.5, invested: 59572, value: 57441, pl: -2130.22, pct: -3.58, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.7, invested: 57714, value: 68262, pl: 10547.75, pct: 18.28, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 63.9, invested: 47740, value: 29709, pl: -18031.15, pct: -37.77, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 36642, pl: -2728.00, pct: -6.93, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 91.9, invested: 35030, value: 28483, pl: -6547.20, pct: -18.69, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.3, invested: 34646, value: 19318, pl: -15327.95, pct: -44.24, realized: -12827.80 },
    { symbol: "HOOD", name: "HOOD 08/21/26 100 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 31930, value: 15655, pl: -16275.00, pct: -50.97, realized: null },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 227.6, invested: 33790, value: 35270, pl: 1480.25, pct: 4.38, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 16740, pl: -15407.00, pct: -47.93, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 820.5, invested: 28830, value: 25436, pl: -3393.57, pct: -11.77, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.6, invested: 24800, value: 28743, pl: 3943.20, pct: 15.90, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 380.9, invested: 23746, value: 23616, pl: -129.58, pct: -0.55, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 29915, pl: 6045.00, pct: 25.32, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 25.7, invested: 20460, value: 15903, pl: -4557.00, pct: -22.27, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 10.4, invested: 17670, value: 19381, pl: 1711.20, pct: 9.68, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 10, avgCost: 51.4, price: 44.5, invested: 15934, value: 13801, pl: -2132.80, pct: -13.39, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 13175, pl: -775.00, pct: -5.56, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 4030, pl: -8680.00, pct: -68.29, realized: null }
  ]
};
