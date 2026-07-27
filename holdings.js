// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-24",
  totals: {
    invested: 1089975,
    value: 889805,
    unrealizedPL: -200169.77,
    unrealizedPct: -18.36,
    realizedPL: 409115.73,
    cash: 131494,
    totalAssets: 1021299
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 56.2, invested: 121861, value: 92337, pl: -29524.40, pct: -24.23, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 50, avgCost: 54.5, price: 41.3, invested: 84508, value: 64015, pl: -20492.75, pct: -24.25, realized: -8137.50 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.1, invested: 81945, value: 23825, pl: -58119.51, pct: -70.93, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.4, invested: 73961, value: 48152, pl: -25808.53, pct: -34.89, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 15.3, invested: 75020, value: 70913, pl: -4107.50, pct: -5.48, realized: 4980.67 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 122.9, invested: 59572, value: 57158, pl: -2413.87, pct: -4.05, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.1, invested: 57714, value: 65519, pl: 7804.25, pct: 13.52, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 63.9, invested: 47740, value: 29718, pl: -18021.85, pct: -37.75, realized: 28585.10 },
    { symbol: "TSLR", name: "2x Long TSLA", shares: 100, avgCost: 13.5, price: 12.8, invested: 41850, value: 39649, pl: -2201.00, pct: -5.26, realized: null },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 47244, pl: 7874.00, pct: 20.00, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 104.4, invested: 35030, value: 32376, pl: -2653.60, pct: -7.58, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 11.3, invested: 34646, value: 19267, pl: -15379.10, pct: -44.39, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 214.2, invested: 33790, value: 33199, pl: -590.55, pct: -1.75, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 30225, pl: -1922.00, pct: -5.98, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 262.2, invested: 31031, value: 40633, pl: 9602.25, pct: 30.94, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 921.0, invested: 28830, value: 28549, pl: -280.55, pct: -0.97, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 81.1, invested: 25891, value: 25141, pl: -750.20, pct: -2.90, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 10.5, invested: 24800, value: 25941, pl: 1140.80, pct: 4.60, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 381.9, invested: 23746, value: 23679, pl: -66.96, pct: -0.28, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21080, pl: -2790.00, pct: -11.69, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 25.2, invested: 20460, value: 15649, pl: -4811.20, pct: -23.52, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 11.3, invested: 17670, value: 20962, pl: 3292.20, pct: 18.63, realized: null },
    { symbol: "ALGM", name: "Allegro MicroSystems", shares: 10, avgCost: 51.4, price: 46.0, invested: 15934, value: 14269, pl: -1664.70, pct: -10.45, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 10695, pl: -3255.00, pct: -23.33, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 9610, pl: -3100.00, pct: -24.39, realized: null }
  ]
};
