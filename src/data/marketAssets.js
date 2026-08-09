// Kept intentionally small: Twelve Data's free plan caps at 8 API credits/minute,
// and a batched /quote call costs credits per symbol — a longer watchlist risks
// tripping the per-minute limit on a single page load.
export const etfs = [
  { symbol: "SPY", label: "S&P 500 ETF" },
  { symbol: "QQQ", label: "Nasdaq 100 ETF" },
];

export const stocks = [
  { symbol: "AAPL", label: "Apple" },
  { symbol: "TSLA", label: "Tesla" },
];

export const marketAssets = [...etfs, ...stocks];

export default marketAssets;
