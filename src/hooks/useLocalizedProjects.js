import { useTranslation } from "react-i18next";
import projects from "../data/projects.js";

const useLocalizedProjects = () => {
  const { t } = useTranslation();
  const localizedData = t("projectData", { returnObjects: true });

  return projects.map((project) => ({
    ...project,
    ...localizedData[project.slug],
  }));
};

export default useLocalizedProjects;
