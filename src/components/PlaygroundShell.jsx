import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PlaygroundShell = ({ title, description, children }) => {
  const { t } = useTranslation();

  return (
    <div className="section">
      <Link to="/works" className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-slate-400 hover:text-accent">
        {t("playground.backToProjects")}
      </Link>
      <h1 className="heading-lg">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-slate-400">{description}</p>}
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default PlaygroundShell;
