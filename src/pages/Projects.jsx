import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import useLocalizedProjects from "../hooks/useLocalizedProjects.js";

const Projects = () => {
  const { t } = useTranslation();
  const projects = useLocalizedProjects();

  return (
    <div className="section">
      <SectionHeading
        eyebrow={t("projectsPage.eyebrow")}
        title={t("projectsPage.title")}
        description={t("projectsPage.description")}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
