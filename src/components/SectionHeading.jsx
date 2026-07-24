const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mb-14 max-w-2xl">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="heading-lg">{title}</h2>
    {description && <p className="mt-4 text-slate-400">{description}</p>}
  </div>
);

export default SectionHeading;
