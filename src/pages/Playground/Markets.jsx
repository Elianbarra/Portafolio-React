import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";
import Sparkline from "../../components/Sparkline.jsx";
import cachedFetchJson from "../../utils/cachedFetch.js";
import marketAssets from "../../data/marketAssets.js";

const CRYPTO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h";

const TWELVE_DATA_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;
const STOCKS_URL = `https://api.twelvedata.com/quote?symbol=${marketAssets
  .map((asset) => asset.symbol)
  .join(",")}&apikey=${TWELVE_DATA_KEY}`;

const priceFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);

const compactFormatter = (value) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value);

const CryptoTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    cachedFetchJson(CRYPTO_URL)
      .then((data) => {
        if (cancelled) return;
        setCoins(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = coins.filter((coin) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
  });

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("playground.crypto.searchPlaceholder")}
        className="mb-6 w-full max-w-sm rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
      />

      {status === "loading" && <p className="text-sm text-slate-500">{t("playground.crypto.loading")}</p>}
      {status === "error" && <p className="text-sm text-rose-400">{t("playground.crypto.error")}</p>}

      {status === "ready" && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 font-mono">#</th>
                <th className="px-4 py-3 font-mono">{t("playground.crypto.columns.name")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.crypto.columns.price")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.crypto.columns.change")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.crypto.columns.marketCap")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.crypto.columns.trend")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((coin) => {
                const change = coin.price_change_percentage_24h ?? 0;
                const isUp = change >= 0;
                return (
                  <tr
                    key={coin.id}
                    onClick={() => navigate(`/playground/markets/crypto/${coin.id}`)}
                    className="cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 font-mono text-slate-500">{coin.market_cap_rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt="" className="h-6 w-6 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white">{coin.name}</p>
                          <p className="font-mono text-xs uppercase text-slate-500">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-200">{priceFormatter(coin.current_price)}</td>
                    <td className={`px-4 py-3 font-mono ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                      {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">${compactFormatter(coin.market_cap)}</td>
                    <td className="px-4 py-3">
                      {coin.sparkline_in_7d?.price && <Sparkline values={coin.sparkline_in_7d.price} up={isUp} />}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                    {t("playground.crypto.noResults")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 font-mono text-xs text-slate-600">{t("playground.crypto.attribution")}</p>
    </>
  );
};

const StocksTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    cachedFetchJson(STOCKS_URL, 120000)
      .then((data) => {
        if (cancelled) return;
        // Twelve Data returns a flat object when a single symbol errors out;
        // normalize to always key by symbol.
        const bySymbol = data.symbol ? { [data.symbol]: data } : data;
        setQuotes(bySymbol);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {status === "loading" && <p className="text-sm text-slate-500">{t("playground.stocks.loading")}</p>}
      {status === "error" && <p className="text-sm text-rose-400">{t("playground.stocks.error")}</p>}

      {status === "ready" && quotes && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 font-mono">{t("playground.stocks.columns.name")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.stocks.columns.exchange")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.stocks.columns.price")}</th>
                <th className="px-4 py-3 font-mono">{t("playground.stocks.columns.change")}</th>
              </tr>
            </thead>
            <tbody>
              {marketAssets.map((asset) => {
                const quote = quotes[asset.symbol];
                if (!quote || quote.code) {
                  return (
                    <tr key={asset.symbol} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 text-slate-500" colSpan={4}>
                        {asset.symbol} — {t("playground.stocks.error")}
                      </td>
                    </tr>
                  );
                }
                const change = Number(quote.percent_change ?? 0);
                const isUp = change >= 0;
                return (
                  <tr
                    key={asset.symbol}
                    onClick={() => navigate(`/playground/markets/stock/${asset.symbol}`)}
                    className="cursor-pointer border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{quote.name}</p>
                      <p className="font-mono text-xs uppercase text-slate-500">{asset.symbol}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{quote.exchange}</td>
                    <td className="px-4 py-3 font-mono text-slate-200">{priceFormatter(Number(quote.close))}</td>
                    <td className={`px-4 py-3 font-mono ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                      {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 font-mono text-xs text-slate-600">{t("playground.stocks.attribution")}</p>
    </>
  );
};

const Markets = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("crypto");

  return (
    <PlaygroundShell title={t("playground.marketsTitle")} description={t("playground.marketsDescription")}>
      <div className="mb-6 flex w-fit rounded-full border border-white/10 bg-white/5 p-1">
        {["crypto", "stocks"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === key ? "bg-accent text-ink-950" : "text-slate-400 hover:text-white"
            }`}
          >
            {t(`playground.tabs.${key}`)}
          </button>
        ))}
      </div>

      {tab === "crypto" ? <CryptoTable /> : <StocksTable />}
    </PlaygroundShell>
  );
};

export default Markets;
