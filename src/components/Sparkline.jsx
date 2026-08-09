import buildLinePath from "../utils/chartPath.js";

const Sparkline = ({ values, up = true, width = 96, height = 32 }) => {
  const { line } = buildLinePath(values, width, height, 2);
  if (!line) return <span className="text-xs text-slate-600">—</span>;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <path
        d={line}
        fill="none"
        stroke={up ? "#34d399" : "#fb7185"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
