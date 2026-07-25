import { useTranslation } from "react-i18next";
import SocialLinks from "./SocialLinks.jsx";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-8">
        <p>{t("footer.builtWith", { year: new Date().getFullYear() })}</p>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
