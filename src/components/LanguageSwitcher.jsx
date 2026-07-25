import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();

  return (
    <div className={`flex items-center rounded-full border border-white/10 bg-white/5 p-1 font-mono text-xs ${className}`}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          aria-current={i18n.resolvedLanguage === code}
          className={`rounded-full px-2.5 py-1 transition ${
            i18n.resolvedLanguage === code ? "bg-accent text-ink-950" : "text-slate-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
