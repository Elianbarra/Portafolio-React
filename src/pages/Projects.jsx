import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../data/projects.js";

const Projects = () => (
  <div className="section">
    <SectionHeading
      eyebrow="Playground"
      title="Projects"
      description="Hands-on projects I've built to practice React, game logic, forms and API integration. Each one is fully playable — click through to try it."
    />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  </div>
);

export default Projects;
