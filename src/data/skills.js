const base = import.meta.env.BASE_URL;

export const skills = [
  { name: "JavaScript", image: `${base}images/js-logo.webp.png` },
  { name: "React", image: `${base}images/React.gif` },
  { name: "HTML5", image: `${base}images/HTML5_logo_and_wordmark.svg.png` },
  { name: "CSS3", image: `${base}images/css.png` },
  { name: "Python", image: `${base}images/Python_logo_51.svg.png` },
  { name: "Java", image: `${base}images/java-4.svg` },
  { name: "Spring Boot", image: `${base}images/Spring_Boot.svg.png` },
  { name: "Next.js", image: `${base}images/next-js-logo-freelogovectors.net_.png`, invertOnDark: true },
  { name: "MySQL", image: `${base}images/MySQL-Logo.wine.png` },
  { name: "PostgreSQL", image: `${base}images/postgresql_original_wordmark_logo_icon_146392.png.webp` },
  { name: "Oracle SQL Developer", image: `${base}images/Oracle-Logo.png` },
  { name: "TypeScript", image: `${base}images/lg-661dcd60dabf7-TypeScript.webp` },
  { name: "Tailwind CSS", image: `${base}images/tailwindcss_logo_icon_170649.png.webp`, lightChip: true },
  { name: "AWS", image: `${base}images/Amazon_Web_Services_Logo.svg.png`, lightChip: true },
  { name: "Kubernetes", image: `${base}images/Kubernetes_logo_without_workmark.svg.png` },
];

export default skills;
