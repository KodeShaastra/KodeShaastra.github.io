// Blocky "pixel skyline" shapes used as dividers between sections.
// Heights come from a fixed seed, so the shape is the same on every build.

function blocks(seed: number, count: number, min: number, max: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: { x: number; w: number; h: number }[] = [];
  let x = 0;
  for (let i = 0; i < count && x < 1440; i++) {
    const w = 40 + Math.round(rand() * 90);
    out.push({ x, w, h: Math.round(min + rand() * (max - min)) });
    x += w;
  }
  out[out.length - 1].w += Math.max(0, 1440 - x);
  return out;
}

const BACK = blocks(7, 40, 40, 130);
const FRONT = blocks(23, 40, 15, 80);

/** `edge="bottom"`: blocks rise from the bottom. `edge="top"`: they hang from the top. */
export function Skyline({ edge = "bottom", className = "" }: { edge?: "top" | "bottom"; className?: string }) {
  const H = 140;
  const y = (h: number) => (edge === "bottom" ? H - h : 0);
  return (
    <svg
      viewBox={`0 0 1440 ${H}`}
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none block h-20 w-full sm:h-28 ${className}`}
    >
      {BACK.map((b) => (
        <rect key={`b${b.x}`} x={b.x} y={y(b.h)} width={b.w + 0.5} height={b.h} fill="var(--bg-deep)" opacity={0.55} />
      ))}
      {FRONT.map((b) => (
        <rect key={`f${b.x}`} x={b.x} y={y(b.h)} width={b.w + 0.5} height={b.h} fill="var(--bg-deep)" />
      ))}
    </svg>
  );
}
