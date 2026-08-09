import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";
import PriceChart from "../../components/PriceChart.jsx";
import cachedFetchJson from "../../utils/cachedFetch.js";

const TWELVE_DATA_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

const RANGES = [
  { value: "1M", label: "1M", interval: "1day", outputsize: 22 },
  { value: "3M", label: "3M", interval: "1day", outputsize: 66 },
  { value: "6M", label: "6M", interval: "1day", outputsize: 130 },
  { value: "1Y", label: "1Y", interval: "1week", outputsize: 52 },
];

const priceFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const StockDetail = () => {
  const { t } = useTranslation();
  const { symbol } = useParams();
  const [quote, setQuote] = useState(null);
  const [quoteStatus, setQuoteStatus] = useState("loading");
  const [range, setRange] = useState(RANGES[0]);
  const [history, setHistory] = useState([]);
  const [historyStatus, setHistoryStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setQuoteStatus("loading");

    cachedFetchJson(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_DATA_KEY}`, 120000)
      .then((data) => {
        if (cancelled) return;
        if (data.code) throw new Error(data.message);
        setQuote(data);
        setQuoteStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setQuoteStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [symbol]);

  useEffect(() => {
    let cancelled = false;
    setHistoryStatus("loading");

    cachedFetchJson(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${range.interval}&outputsize=${range.outputsize}&apikey=${TWELVE_DATA_KEY}`,
      120000
    )
      .then((data) => {
        if (cancelled) return;
        if (!data.values) throw new Error("No data");
        const points = data.values
          .map((point) => ({
            label: new Date(point.datetime).toLocaleDateString([], { month: "short", day: "numeric" }),
            value: Number(point.close),
          }))
          .reverse();
        setHistory(points);
        setHistoryStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setHistoryStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [symbol, range]);

  return (
    <PlaygroundShell
      title={quote ? quote.name : symbol}
      description={t("playground.stocks.detailDescription")}
      backTo="/playground/markets"
      backLabel={t("playground.crypto.backToTracker")}
    >
      {quoteStatus === "loading" && <p className="text-sm text-slate-500">{t("playground.stocks.loading")}</p>}
      {quoteStatus === "error" && <p className="text-sm text-rose-400">{t("playground.stocks.error")}</p>}

      {quoteStatus === "ready" && quote && (
        <div className="card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-lg font-bold text-white">{quote.name}</p>
                <p className="font-mono text-xs uppercase text-slate-500">
                  {symbol} · {quote.exchange}
                </p>
              </div>
              <div className="ml-2">
                <p className="font-mono text-xl text-white">{priceFormatter(Number(quote.close))}</p>
                <p
                  className={`font-mono text-xs ${
                    Number(quote.percent_change ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {Number(quote.percent_change ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(Number(quote.percent_change ?? 0)).toFixed(2)}%
                </p>
              </div>
              <span
                className={`ml-2 rounded-full px-2.5 py-1 font-mono text-xs ${
                  quote.is_market_open ? "bg-emerald-400/10 text-emerald-400" : "bg-white/5 text-slate-500"
                }`}
              >
                {quote.is_market_open ? t("playground.stocks.marketOpen") : t("playground.stocks.marketClosed")}
              </span>
            </div>
            <div className="flex gap-2">
              {RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs transition ${
                    range.value === r.value
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
              {t("playground.stocks.loading")}
            </div>
          )}
          {historyStatus === "error" && (
            <div className="flex h-[280px] items-center justify-center text-sm text-rose-400">
              {t("playground.stocks.error")}
            </div>
          )}
          {historyStatus === "ready" && <PriceChart data={history} height={280} />}

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 sm:grid-cols-4">
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.stocks.open")}</p>
              <p className="mt-1 font-mono text-white">{priceFormatter(Number(quote.open))}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.high24h")}</p>
              <p className="mt-1 font-mono text-white">{priceFormatter(Number(quote.high))}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.crypto.low24h")}</p>
              <p className="mt-1 font-mono text-white">{priceFormatter(Number(quote.low))}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">{t("playground.stocks.volume")}</p>
              <p className="mt-1 font-mono text-white">
                {new Intl.NumberFormat("en-US", { notation: "compact" }).format(Number(quote.volume))}
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 font-mono text-xs text-slate-600">{t("playground.stocks.attribution")}</p>
    </PlaygroundShell>
  );
};

export default StockDetail;
