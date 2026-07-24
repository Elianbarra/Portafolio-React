import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
  >
    <Link
      to={project.route}
      className="card group flex h-full flex-col overflow-hidden hover:border-accent/40 hover:shadow-glow"
    >
      <div className="aspect-video overflow-hidden bg-ink-800">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow mb-1">{project.subtitle}</p>
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
