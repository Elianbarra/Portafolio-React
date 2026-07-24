import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTypewriter from "../hooks/useTypewriter.js";
import projects from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const roles = ["Computer Engineering student.", "Web Developer.", "UI/UX Designer."];

const Home = () => {
  const typedText = useTypewriter(roles);
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="section flex min-h-[calc(100vh-73px)] flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-6"
        >
          Hi, I&apos;m
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
          I build clean, functional web interfaces and enjoy turning small technical
          challenges into working products — from games to API-driven tools.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link to="/works" className="btn-primary">
            View Projects
          </Link>
          <Link to="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </motion.div>
      </section>

      <section className="section pt-0">
        <SectionHeading
          eyebrow="Featured"
          title="A few things I've built"
          description="Small, self-contained projects built to practice React patterns, game logic and API integration."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/works" className="btn-secondary">
            See all projects
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
