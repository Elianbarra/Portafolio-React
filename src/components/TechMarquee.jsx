import skills from "../data/skills.js";

const track = [...skills, ...skills];

const TechMarquee = () => (
  <div className="marquee-pause relative w-full min-w-0 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <div className="animate-marquee flex w-max items-center gap-12">
      {track.map((skill, index) => (
        <div key={`${skill.name}-${index}`} className="flex items-center gap-3 opacity-80 transition hover:opacity-100">
          <span
            className={`flex h-8 w-8 items-center justify-center ${skill.lightChip ? "rounded bg-white p-0.5" : ""}`}
          >
            <img
              src={skill.image}
              alt=""
              className={`h-full w-full object-contain ${skill.invertOnDark ? "invert" : ""}`}
            />
          </span>
          <span className="font-mono text-sm text-slate-400">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TechMarquee;
