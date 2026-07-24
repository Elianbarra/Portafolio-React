import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import skills from "../data/skills.js";

const timeline = [
  {
    title: "Computer Engineering — Duoc UC",
    period: "2024 — Present",
    description:
      "First year of the Computer Engineering program, building a foundation in programming, data structures and web development.",
  },
  {
    title: "Software Development Intern — Pulso Escolar",
    period: "2023",
    description:
      "Used Python (pandas) to automate data workflows and simplify recurring processes for uploading data to HubSpot. Learned Retool for building internal tools on top of a basic database.",
  },
  {
    title: "Professional Programming Technician — Liceo Arturo Matte Larraín",
    period: "2022 — 2023",
    description:
      "Completed secondary education with a technical specialization in programming.",
  },
];

const About = () => (
  <div className="section">
    <SectionHeading
      eyebrow="About"
      title="A bit about me"
      description="Student, developer and hands-on learner — I like understanding how things work by building them."
    />

    <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 text-slate-300">
        <p>
          I&apos;m a Computer Engineering student with a strong interest in learning
          and a hands-on approach to programming. I like picking apart problems,
          building small working demos to understand a concept, and gradually
          shaping that understanding into real projects.
        </p>
        <p>
          Outside of coursework, I spend time building side projects — games,
          UI experiments and small tools that integrate with public APIs — as a
          way to keep learning by doing.
        </p>

        <h3 className="pt-4 text-xl font-bold text-white">Timeline</h3>
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
        <h3 className="mb-6 text-xl font-bold text-white">Programming languages &amp; tools</h3>
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="card flex flex-col items-center justify-center gap-3 p-5 text-center"
            >
              <img src={skill.image} alt={skill.name} className="h-12 w-12 object-contain" />
              <span className="text-sm text-slate-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
