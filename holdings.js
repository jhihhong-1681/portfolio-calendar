// 目前持股快照（不是歷史紀錄，每天會被最新資料整個覆蓋掉）。
// 只列「目前還有部位」的股票/期權（總投入、現值有值的），已經全部賣光的舊部位不會出現在這裡，
// 但它們的已實現損益仍計入 totals.realizedPL。
window.HOLDINGS = {
  asOf: "2026-07-22",
  totals: {
    invested: 1045219,
    value: 936327,
    unrealizedPL: -108892.03,
    unrealizedPct: -10.42,
    realizedPL: 396396.43,
    cash: 123697,
    totalAssets: 1060024
  },
  positions: [
    { symbol: "ASTS", name: "AST Spacemobile", shares: 53, avgCost: 74.2, price: 63.3, invested: 121861, value: 104068, pl: -17793.38, pct: -14.60, realized: null },
    { symbol: "MP", name: "MP Materials", shares: 71, avgCost: 54.5, price: 46.3, invested: 120001, value: 101906, pl: -18094.70, pct: -15.08, realized: null },
    { symbol: "PLTR", name: "Palantir", shares: 27, avgCost: 128.1, price: 132.7, invested: 107229, value: 111036, pl: 3807.42, pct: 3.55, realized: 1877.36 },
    { symbol: "SMR", name: "NuScale Power", shares: 95, avgCost: 27.8, price: 8.7, invested: 81945, value: 25651, pl: -56293.61, pct: -68.70, realized: -106338.51 },
    { symbol: "UGL", name: "2x Long Gold", shares: 35, avgCost: 68.2, price: 45.1, invested: 73961, value: 48890, pl: -25070.73, pct: -33.90, realized: -31372.00 },
    { symbol: "MSFL", name: "2x Long MicroSoft", shares: 150, avgCost: 16.1, price: 16.6, invested: 75020, value: 77051, pl: 2030.50, pct: 2.71, realized: 4980.67 },
    { symbol: "NU", name: "Nu Holdings", shares: 150, avgCost: 12.4, price: 14.4, invested: 57714, value: 66914, pl: 9199.25, pct: 15.94, realized: null },
    { symbol: "RKLB", name: "Rocket Lab Corporation", shares: 15, avgCost: 102.7, price: 69.1, invested: 47740, value: 32141, pl: -15599.20, pct: -32.68, realized: 28585.10 },
    { symbol: "XOM", name: "XOM 08/21/26 125 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 36270, value: 52452, pl: 16182.00, pct: 44.62, realized: null },
    { symbol: "VPG", name: "Vishay Precision Group", shares: 10, avgCost: 113.0, price: 112.4, invested: 35030, value: 34850, pl: -179.80, pct: -0.51, realized: null },
    { symbol: "UUUU", name: "Energy Fuels", shares: 55, avgCost: 20.3, price: 12.4, invested: 34646, value: 21057, pl: -13588.85, pct: -39.22, realized: -12827.80 },
    { symbol: "IBM", name: "IBM", shares: 5, avgCost: 218.0, price: 210.5, invested: 33790, value: 32628, pl: -1162.50, pct: -3.44, realized: null },
    { symbol: "NET", name: "CloudFlare", shares: 5, avgCost: 200.2, price: 272.3, invested: 31031, value: 42208, pl: 11177.05, pct: 36.02, realized: null },
    { symbol: "MU", name: "Micron", shares: 1, avgCost: 930.0, price: 970.8, invested: 28830, value: 30095, pl: 1265.42, pct: 4.39, realized: null },
    { symbol: "BHE", name: "BenchMark", shares: 10, avgCost: 83.5, price: 84.7, invested: 25891, value: 26242, pl: 350.30, pct: 1.35, realized: null },
    { symbol: "FVRR", name: "Fiverr International", shares: 80, avgCost: 10.0, price: 11.0, invested: 24800, value: 27354, pl: 2554.40, pct: 10.30, realized: null },
    { symbol: "AVGO", name: "Broadcom", shares: 2, avgCost: 383.0, price: 386.5, invested: 23746, value: 23963, pl: 217.00, pct: 0.91, realized: null },
    { symbol: "GSK", name: "GSK 11/20/26 45 Call", type: "option", shares: null, avgCost: null, price: null, invested: 23870, value: 21235, pl: -2635.00, pct: -11.04, realized: null },
    { symbol: "VOYG", name: "Voyager Technologies", shares: 20, avgCost: 33.0, price: 26.9, invested: 20460, value: 16703, pl: -3757.20, pct: -18.36, realized: null },
    { symbol: "CRGY", name: "Crescent Energy", shares: 60, avgCost: 9.5, price: 11.0, invested: 17670, value: 20534, pl: 2864.40, pct: 16.21, realized: null },
    { symbol: "HAL", name: "HAL 10/16/26 32 Call", type: "option", shares: 100, avgCost: null, price: null, invested: 14105, value: 9827, pl: -4278.00, pct: -30.33, realized: null },
    { symbol: "NBIL", name: "2X Long NBIS", shares: 10, avgCost: 31.0, price: 30.7, invested: 9610, value: 9523, pl: -86.80, pct: -0.90, realized: null }
  ]
};
