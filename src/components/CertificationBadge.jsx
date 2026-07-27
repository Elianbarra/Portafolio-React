import { useTranslation } from "react-i18next";
import socials from "../data/socials.js";

const base = import.meta.env.BASE_URL;

const CertificationBadge = () => {
  const { t } = useTranslation();
  const certifications = t("about.awsCertifications", { returnObjects: true });

  return (
    <div className="space-y-4">
      {certifications.map((cert) => (
        <div
          key={cert.title}
          className="card flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left"
        >
          <img
            src={`${base}images/${cert.image}`}
            alt={cert.title}
            className="h-32 w-auto flex-shrink-0 object-contain"
          />
          <div>
            <h4 className="font-bold text-white">{cert.title}</h4>
            <p className="mt-1 font-mono text-xs text-accent">{cert.badge}</p>
            <p className="mt-2 text-sm text-slate-400">{cert.description}</p>
            <a
              href={socials.credly}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
            >
              {cert.viewCredential} →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationBadge;
