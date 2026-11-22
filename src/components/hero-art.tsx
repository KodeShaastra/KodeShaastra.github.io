// The hero picture: a small dashboard window in front of a live map, drawn in SVG.
// It shows what I build (dashboards + maps) instead of a generic "person at a desk".

const BARS = [38, 62, 48, 80, 56, 92, 70];
const DOTS = [
  [262, 92], [281, 118], [300, 84], [318, 132], [346, 101], [372, 146], [398, 92], [420, 128],
  [290, 160], [336, 176], [384, 190], [430, 170], [262, 198], [312, 206],
];

export function HeroArt() {
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full max-w-[460px]" role="img" aria-label="A dashboard with charts next to a live map with clustered points">
      <defs>
        <radialGradient id="heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id="map">
          <rect x="230" y="50" width="230" height="190" rx="12" />
        </clipPath>
      </defs>

      {/* Map card (back) */}
      <g className="float-slow" style={{ transformBox: "fill-box" }}>
        <rect x="230" y="50" width="230" height="190" rx="12" fill="#2f3849" stroke="#3c475b" />
        <g clipPath="url(#map)" stroke="#3c475b" strokeWidth="1.5">
          <path d="M230 110 L460 90 M230 170 L460 200 M290 50 L270 240 M370 50 L400 240 M230 220 Q330 150 460 130" fill="none" />
        </g>
        <circle cx="360" cy="140" r="60" fill="url(#heat)" clipPath="url(#map)" />
        {DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill="#5eead4" opacity="0.9" />
        ))}
        <circle cx="300" cy="124" r="15" fill="#283041" stroke="#5eead4" strokeWidth="2" />
        <text x="300" y="128.5" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5eead4">12</text>
        <circle cx="404" cy="168" r="19" fill="#283041" stroke="#5eead4" strokeWidth="2" />
        <text x="404" y="172.5" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5eead4">48</text>
        {/* map pin */}
        <path d="M352 70c-9 0-15 7-15 15 0 11 15 24 15 24s15-13 15-24c0-8-6-15-15-15Z" fill="#5eead4" />
        <circle cx="352" cy="85" r="5" fill="#283041" />
      </g>

      {/* Dashboard window (front) */}
      <g className="float" style={{ transformBox: "fill-box" }}>
        <rect x="20" y="130" width="300" height="240" rx="14" fill="#323c4e" stroke="#46526a" />
        <circle cx="40" cy="150" r="4" fill="#ff7b72" />
        <circle cx="54" cy="150" r="4" fill="#f2cc60" />
        <circle cx="68" cy="150" r="4" fill="#5eead4" />
        <line x1="20" y1="166" x2="320" y2="166" stroke="#46526a" />
        {/* KPI tiles */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${36 + i * 92} 180)`}>
            <rect width="80" height="46" rx="8" fill="#283041" />
            <rect x="10" y="10" width="34" height="5" rx="2.5" fill="#7e899c" />
            <rect x="10" y="24" width={[50, 38, 44][i]} height="11" rx="3" fill={i === 1 ? "#5eead4" : "#eaeff6"} opacity={i === 1 ? 1 : 0.85} />
          </g>
        ))}
        {/* bar chart */}
        <rect x="36" y="238" width="264" height="118" rx="8" fill="#283041" />
        {BARS.map((h, i) => (
          <rect key={i} x={52 + i * 34} y={344 - h} width="20" height={h} rx="4" fill="url(#bar)" />
        ))}
        <polyline
          points={BARS.map((h, i) => `${62 + i * 34},${330 - h * 0.9}`).join(" ")}
          fill="none"
          stroke="#eaeff6"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </g>

      {/* Code chip */}
      <g className="float-slow" style={{ transformBox: "fill-box" }}>
        <rect x="40" y="52" width="92" height="44" rx="10" fill="#283041" stroke="#5eead4" strokeWidth="1.5" />
        <text x="86" y="80" textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="700" fill="#5eead4">{"</>"}</text>
      </g>

      {/* Drag handle hint: dashboards are drag-and-resize */}
      <g className="float" style={{ transformBox: "fill-box" }}>
        <rect x="262" y="300" width="96" height="58" rx="10" fill="#2f3849" stroke="#5eead4" strokeDasharray="5 4" />
        <path d="M344 344 l8 8 m-14 0 h14 v-14" stroke="#5eead4" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="290" cy="329" r="13" fill="none" stroke="#5eead4" strokeWidth="5" strokeDasharray="52 30" />
      </g>
    </svg>
  );
}
