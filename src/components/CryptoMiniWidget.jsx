import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sparkline from "./Sparkline.jsx";
import cachedFetchJson from "../utils/cachedFetch.js";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=true&price_change_percentage=24h";

const priceFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);

const CryptoMiniWidget = () => {
  const { t } = useTranslation();
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    cachedFetchJson(URL)
      .then((data) => {
        if (!cancelled) {
          setCoins(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p className="text-sm text-slate-500">{t("playground.crypto.loading")}</p>;
  }

  if (status === "error") {
    return <p className="text-sm text-rose-400">{t("playground.crypto.error")}</p>;
  }

  return (
    <div className="card divide-y divide-white/5">
      {coins.map((coin) => {
        const change = coin.price_change_percentage_24h ?? 0;
        const isUp = change >= 0;
        return (
          <div key={coin.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt="" className="h-7 w-7" />
              <div>
                <p className="text-sm font-semibold text-white">{coin.name}</p>
                <p className="font-mono text-xs uppercase text-slate-500">{coin.symbol}</p>
              </div>
            </div>
            {coin.sparkline_in_7d?.price && (
              <Sparkline values={coin.sparkline_in_7d.price} up={isUp} width={64} height={24} />
            )}
            <div className="text-right">
              <p className="font-mono text-sm text-slate-200">{priceFormatter(coin.current_price)}</p>
              <p className={`font-mono text-xs ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoMiniWidget;
