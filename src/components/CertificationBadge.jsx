import { useTranslation } from "react-i18next";

const base = import.meta.env.BASE_URL;

const resolveImage = (image) => (image.startsWith("http") ? image : `${base}images/${image}`);

const CertificationBadge = () => {
  const { t } = useTranslation();
  const certifications = t("about.certificationBadges", { returnObjects: true });
  const viewCredentialLabel = t("about.viewCredentialLabel");

  return (
    <div className="space-y-4">
      {certifications.map((cert) => (
        <div
          key={cert.title}
          className="card flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left"
        >
          <span
            className={`flex h-32 flex-shrink-0 items-center justify-center ${
              cert.lightChip ? "rounded-lg bg-white p-3" : ""
            }`}
          >
            <img src={resolveImage(cert.image)} alt={cert.title} className="h-full w-auto object-contain" />
          </span>
          <div>
            <h4 className="font-bold text-white">{cert.title}</h4>
            <p className="mt-1 font-mono text-xs text-accent">{cert.badge}</p>
            <p className="mt-2 text-sm text-slate-400">{cert.description}</p>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
            >
              {viewCredentialLabel} →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationBadge;
