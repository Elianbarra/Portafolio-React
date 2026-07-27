import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading.jsx";
import CertificationBadge from "../components/CertificationBadge.jsx";
import skills from "../data/skills.js";

const About = () => {
  const { t } = useTranslation();
  const timeline = t("about.timeline", { returnObjects: true });
  const tools = t("about.tools", { returnObjects: true });
  const certifications = t("about.certifications", { returnObjects: true });
  const languageTags = t("about.languageTags", { returnObjects: true });

  return (
    <div className="section">
      <SectionHeading
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.subtitle")}
      />

      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 text-slate-300">
          <p>{t("about.bio1")}</p>
          <p>{t("about.bio2")}</p>

          <h3 className="pt-4 text-xl font-bold text-white">{t("about.timelineTitle")}</h3>
          <ol className="space-y-6 border-l border-white/10 pl-6">
            {timeline.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-accent shadow-glow" />
                <p className="font-mono text-xs text-accent">{item.period}</p>
                <p className="mt-1 font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-6 text-xl font-bold text-white">{t("about.skillsTitle")}</h3>
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="card flex flex-col items-center justify-center gap-3 p-5 text-center"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center ${
                    skill.lightChip ? "rounded-md bg-white p-1" : ""
                  }`}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className={`h-full w-full object-contain ${skill.invertOnDark ? "invert" : ""}`}
                  />
                </span>
                <span className="text-sm text-slate-300">{skill.name}</span>
              </div>
            ))}
          </div>

          <h3 className="mb-4 mt-10 text-sm font-mono uppercase tracking-widest text-slate-500">
            {t("about.toolsTitle")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t border-white/5 pt-12 sm:grid-cols-2">
        <div>
          <h3 className="mb-5 text-xl font-bold text-white">{t("about.certificationsTitle")}</h3>
          <CertificationBadge />
          <ul className="mt-5 space-y-3">
            {certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold text-white">{t("about.languagesTitle")}</h3>
          <div className="flex flex-wrap gap-2">
            {languageTags.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
