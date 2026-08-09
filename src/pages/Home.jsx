import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useTypewriter from "../hooks/useTypewriter.js";
import useLocalizedProjects from "../hooks/useLocalizedProjects.js";
import skills from "../data/skills.js";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import StatCounter from "../components/StatCounter.jsx";
import TechMarquee from "../components/TechMarquee.jsx";
import CertificationBadge from "../components/CertificationBadge.jsx";
import CryptoMiniWidget from "../components/CryptoMiniWidget.jsx";

const Home = () => {
  const { t } = useTranslation();
  const roles = t("roles", { returnObjects: true });
  const typedText = useTypewriter(roles);
  const projects = useLocalizedProjects();
  const cryptoProject = projects.find((project) => project.slug === "crypto");
  const featured = projects.filter((project) => project.slug !== "crypto").slice(0, 3);
  const nextSectionRef = useRef(null);

  const stats = [
    { value: projects.length, suffix: "", label: t("stats.projectsBuilt") },
    { value: skills.length, suffix: "", label: t("stats.coreTechnologies") },
    { value: 1, suffix: "", label: t("stats.softwareInternship") },
  ];

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-accent-violet/20 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />

        <div className="section relative flex min-h-[calc(100vh-73px)] flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            {t("hero.greeting")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
          >
            Elian Barra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 h-8 font-mono text-lg text-accent sm:text-2xl"
          >
            {typedText}
            <span className="animate-pulse">_</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-slate-400"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <div className="flex flex-wrap gap-4">
              <Link to="/works" className="btn-primary">
                {t("hero.viewProjects")}
              </Link>
              <Link to="/contact" className="btn-secondary">
                {t("hero.getInTouch")}
              </Link>
            </div>
            <SocialLinks />
          </motion.div>

          <motion.button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 1.8, repeat: Infinity } }}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-500 transition hover:text-accent sm:block"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </motion.button>
        </div>
      </section>

      <section ref={nextSectionRef} className="border-t border-white/5">
        <div className="section py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {cryptoProject && (
        <section className="border-t border-white/5">
          <div className="section py-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="eyebrow mb-3">{t("home.cryptoEyebrow")}</p>
                <h2 className="heading-xl">{t("home.cryptoTitle")}</h2>
                <p className="mt-4 text-slate-400">{t("home.cryptoDescription")}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cryptoProject.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={cryptoProject.route} className="btn-primary mt-8 inline-flex">
                  {t("home.cryptoButton")}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CryptoMiniWidget />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/5">
        <div className="section py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="eyebrow mb-3">{t("home.aboutEyebrow")}</p>
            <h2 className="heading-lg">{t("home.aboutTitle")}</h2>
            <p className="mt-5 text-slate-400">{t("home.aboutText")}</p>
            <Link to="/about" className="btn-secondary mt-6 inline-flex">
              {t("home.moreAboutMe")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-16 min-w-0"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
              {t("home.techIWorkWith")}
            </p>
            <TechMarquee />
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section py-16"
        >
          <SectionHeading
            eyebrow={t("home.certEyebrow")}
            title={t("home.certTitle")}
            description={t("home.certDescription")}
          />
          <CertificationBadge />
          <Link to="/about" className="btn-secondary mt-8 inline-flex">
            {t("home.certSeeAll")}
          </Link>
        </motion.div>
      </section>

      <section className="border-t border-white/5">
        <div className="section">
          <SectionHeading
            eyebrow={t("home.featuredEyebrow")}
            title={t("home.featuredTitle")}
            description={t("home.featuredDescription")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
          <div className="mt-10">
            <Link to="/works" className="btn-secondary">
              {t("home.seeAllProjects")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section flex flex-col items-center py-24 text-center"
        >
          <p className="eyebrow mb-4">{t("home.ctaEyebrow")}</p>
          <h2 className="heading-xl max-w-2xl">{t("home.ctaTitle")}</h2>
          <p className="mt-4 max-w-md text-slate-400">{t("home.ctaDescription")}</p>
          <Link to="/contact" className="btn-primary mt-8">
            {t("home.ctaButton")}
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
