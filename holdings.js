// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-24",
  totals: {
    invested: 1035754,
    value: 886954,
    unrealizedPL: -148800.40,
    unrealizedPct: -14.37,
    realizedPL: 417253.23,
    cash: 193867,
    totalAssets: 1080821
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 59.9, invested: 121861, value: 98432, pl: -23428.87, pct: -19.23, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 71, avgCost: 54.5, price: 44.7, invested: 120001, value: 98319, pl: -21682.33, pct: -18.07, realized: null },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.8, invested: 81945, value: 26034, pl: -55910.76, pct: -68.23, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 44.3, invested: 73961, value: 48011, pl: -25949.58, pct: -35.09, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 15.2, invested: 75020, value: 70866, pl: -4154.00, pct: -5.54, realized: 4980.67 },
    { symbol: "PLTR", name: "Palantir", shares: 15, avgCost: 128.1, price: 121.9, invested: 59572, value: 56697, pl: -2874.22, pct: -4.82, realized: -391.84 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.2, invested: 57714, value: 66030, pl: 8315.75, pct: 14.41, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 69.9, invested: 47740, value: 32485, pl: -15255.10, pct: -31.95, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 09/18/26 145 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 39370, value: 47244, pl: 7874.00, pct: 20.00, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 108.5, invested: 35030, value: 33623, pl: -1407.40, pct: -4.02, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.1, invested: 34646, value: 20665, pl: -13981.00, pct: -40.35, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 204.5, invested: 33790, value: 31704, pl: -2086.30, pct: -6.17, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 300, avgCost: null, price: null, invested: 32147, value: 30225, pl: -1922.00, pct: -5.98, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 264.5, invested: 31031, value: 40994, pl: 9963.40, pct: 32.11, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 997.1, invested: 28830, value: 30910, pl: 2079.79, pct: 7.21, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 83.6, invested: 25891, value: 25907, pl: 15.50, pct: 0.06, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 10.2, invested: 24800, value: 25370, pl: 570.40, pct: 2.30, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 391.5, invested: 23746, value: 24271, pl: 524.52, pct: 2.21, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21080, pl: -2790.00, pct: -11.69, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 26.7, invested: 20460, value: 16523, pl: -3937.00, pct: -19.24, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 11.4, invested: 17670, value: 21260, pl: 3589.80, pct: 20.32, realized: null },
    { symbol: "BMNR", name: "BMNR 09/18/26 14 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 13950, value: 10695, pl: -3255.00, pct: -23.33, realized: null },
    { symbol: "BULL", name: "BULL 09/18/26 10 Call", type: "option", shares: 1000, avgCost: null, price: null, invested: 12710, value: 9610, pl: -3100.00, pct: -24.39, realized: null }
  ]
};
