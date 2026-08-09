import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";
import PriceChart from "../../components/PriceChart.jsx";
import cachedFetchJson from "../../utils/cachedFetch.js";

const RANGES = [
  { value: 1, label: "24h" },
  { value: 7, label: "7d" },
  { value: 30, label: "30d" },
  { value: 90, label: "90d" },
];

const priceFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);

const compactFormatter = (value) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value);

const CryptoDetail = () => {
  const { t } = useTranslation();
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [coinStatus, setCoinStatus] = useState("loading");
  const [range, setRange] = useState(7);
  const [history, setHistory] = useState([]);
  const [historyStatus, setHistoryStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setCoinStatus("loading");

    cachedFetchJson(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&price_change_percentage=24h`
    )
      .then((data) => {
        if (cancelled) return;
        setCoin(data[0] || null);
        setCoinStatus(data[0] ? "ready" : "error");
      })
      .catch(() => {
        if (!cancelled) setCoinStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [coinId]);

  useEffect(() => {
    let cancelled = false;
    setHistoryStatus("loading");

    cachedFetchJson(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${range}`)
      .then((data) => {
        if (cancelled) return;
        const points = data.prices.map(([timestamp, price]) => ({
          label:
            range === 1
              ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" }),
          value: price,
        }));
        setHistory(points);
        setHistoryStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setHistoryStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [coinId, range]);

  return (
    <PlaygroundShell
      title={coin ? coin.name : t("playground.crypto.title")}
      description={t("playground.crypto.detailDescription")}
      backTo="/playground/markets"
      backLabel={t("playground.crypto.backToTracker")}
    >
      {coinStatus === "loading" && <p className="text-sm text-slate-500">{t("playground.crypto.loading")}</p>}
      {coinStatus === "error" && <p className="text-sm text-rose-400">{t("playground.crypto.error")}</p>}

      {coinStatus === "ready" && coin && (
        <div className="card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt="" className="h-10 w-10" />
              <div>
                <p className="text-lg font-bold text-white">{coin.name}</p>
                <p className="font-mono text-xs uppercase text-slate-500">{coin.symbol}</p>
              </div>
              <div className="ml-2">
                <p className="font-mono text-xl text-white">{priceFormatter(coin.current_price)}</p>
                <p
                  className={`font-mono text-xs ${
                    (coin.price_change_percentage_24h ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {(coin.price_change_percentage_24h ?? 0) >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}% ({t("playground.crypto.columns.change")})
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs transition ${
                    range === r.value
                      ? "bg-accent text-ink-950"
                      : "border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {historyStatus === "loading" && (
            <div className="flex h-[280px] items-center justify-center text-sm text-slate-500">
              {t("playground.crypto.loading")}
            </div>
          )}
          {historyStatus === "error" && (
            <div className="flex h-[280px] items-center justify-center text-sm text-rose-400">
              {t("playground.crypto.error")}
            </div>
          )}
          {historyStatus === "ready" && <PriceChart data={history} height={280} />}

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 sm:grid-cols-4">
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.columns.marketCap")}</p>
              <p className="mt-1 font-mono text-white">${compactFormatter(coin.market_cap)}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.rank")}</p>
              <p className="mt-1 font-mono text-white">#{coin.market_cap_rank}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.high24h")}</p>
              <p className="mt-1 font-mono text-white">{priceFormatter(coin.high_24h)}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.low24h")}</p>
              <p className="mt-1 font-mono text-white">{priceFormatter(coin.low_24h)}</p>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 font-mono text-xs text-slate-600">{t("playground.crypto.attribution")}</p>
    </PlaygroundShell>
  );
};

export default CryptoDetail;
