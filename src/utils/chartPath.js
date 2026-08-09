// Builds SVG line/area path strings from a flat array of numeric values,
// scaled to fit a width x height viewBox. Used by Sparkline and the larger
// crypto detail chart so both share the same scaling logic.
export function buildLinePath(values, width, height, padding = 4) {
  if (!values || values.length < 2) return { line: "", area: "", points: [] };

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (values.length - 1);

  const points = values.map((value, index) => {
    const x = padding + index * stepX;
    const y = padding + (height - padding * 2) * (1 - (value - min) / range);
    return { x, y, value };
  });

  const line = points.map((p, index) => `${index === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const area = `${line} L${lastPoint.x.toFixed(2)},${height} L${firstPoint.x.toFixed(2)},${height} Z`;

  return { line, area, min, max, points };
}

export default buildLinePath;
