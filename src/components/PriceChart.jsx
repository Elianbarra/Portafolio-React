import { useRef, useState } from "react";
import buildLinePath from "../utils/chartPath.js";

const priceLabel = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);

// data: [{ label, value }, ...] — label is shown in the hover tooltip (e.g. a date),
// value is the price at that point.
const PriceChart = ({ data, height = 240 }) => {
  const width = 800;
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const values = data ? data.map((point) => point.value) : [];
  const { line, area, min, max, points } = buildLinePath(values, width, height, 12);
  const up = values.length > 1 && values[values.length - 1] >= values[0];
  const stroke = up ? "#34d399" : "#fb7185";

  if (!line) return null;

  const handleMove = (event) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * width;

    let closest = 0;
    let closestDistance = Infinity;
    points.forEach((point, index) => {
      const distance = Math.abs(point.x - relativeX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });
    setHoverIndex(closest);
  };

  const handleLeave = () => setHoverIndex(null);

  const hoverPoint = hoverIndex !== null ? points[hoverIndex] : null;
  const hoverData = hoverIndex !== null ? data[hoverIndex] : null;
  const tooltipLeftPct = hoverPoint ? Math.min(92, Math.max(8, (hoverPoint.x / width) * 100)) : 0;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full cursor-crosshair"
        preserveAspectRatio="none"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <defs>
          <linearGradient id="priceChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#priceChartFill)" />
        <path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {hoverPoint && (
          <>
            <line
              x1={hoverPoint.x}
              y1="0"
              x2={hoverPoint.x}
              y2={height}
              stroke="#94a3b8"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
            />
            <circle cx={hoverPoint.x} cy={hoverPoint.y} r="4.5" fill={stroke} stroke="#05060a" strokeWidth="2" />
          </>
        )}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-1 font-mono text-xs text-slate-500">
        <span>{priceLabel(max)}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-1 font-mono text-xs text-slate-500">
        <span>{priceLabel(min)}</span>
      </div>

      {hoverPoint && hoverData && (
        <div
          className="pointer-events-none absolute top-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/95 px-3 py-2 shadow-lg"
          style={{ left: `${tooltipLeftPct}%` }}
        >
          <p className="font-mono text-xs text-slate-400">{hoverData.label}</p>
          <p className="font-mono text-sm font-semibold text-white">{priceLabel(hoverData.value)}</p>
        </div>
      )}
    </div>
  );
};

export default PriceChart;
