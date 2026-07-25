import { useState } from "react";
import Values from "values.js";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";

const SwatchCard = ({ hex }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`#${hex}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex h-28 flex-col justify-end overflow-hidden rounded-xl border border-white/10 p-3 text-left transition hover:border-white/30"
      style={{ backgroundColor: `#${hex}` }}
    >
      <span className="rounded bg-black/40 px-2 py-1 font-mono text-xs text-white">#{hex}</span>
      <span
        className={`absolute inset-0 flex items-center justify-center bg-black/50 font-mono text-sm text-white transition-opacity ${
          copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {copied ? t("playground.colors.copied") : t("playground.colors.clickToCopy")}
      </span>
    </button>
  );
};

const Colors = () => {
  const { t } = useTranslation();
  const [color, setColor] = useState("blue");
  const [palette, setPalette] = useState(() => new Values("blue").all(8));
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setPalette(new Values(color).all(8));
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <PlaygroundShell title={t("playground.colors.title")} description={t("playground.colors.description")}>
      <form onSubmit={handleSubmit} className="mb-8 flex max-w-md gap-3">
        <input
          type="text"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder={t("playground.colors.placeholder")}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
        />
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm">
          {t("playground.colors.generate")}
        </button>
      </form>
      {error && <p className="mb-6 text-sm text-rose-400">{t("playground.colors.invalidColor")}</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {palette.map((shade, index) => (
          <SwatchCard key={index} hex={shade.hex} />
        ))}
      </div>
    </PlaygroundShell>
  );
};

export default Colors;
