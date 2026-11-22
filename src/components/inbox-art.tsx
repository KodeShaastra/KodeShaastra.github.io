// Picture for Career Glider (no live site to screenshot): job emails being sorted into types.
// It's a drawing of the idea, not a screenshot, and the alt text says so.

const ROWS = [
  { tag: "Interview", color: "#5eead4", w: 150 },
  { tag: "Applied", color: "#7aa2ff", w: 190 },
  { tag: "Rejected", color: "#ff8a80", w: 120 },
  { tag: "Recruiter", color: "#f2cc60", w: 170 },
  { tag: "Applied", color: "#7aa2ff", w: 140 },
];

export function InboxArt() {
  return (
    <svg viewBox="0 0 640 400" className="aspect-[16/10] w-full rounded" role="img" aria-label="Drawing of an inbox where each job email gets a label such as Interview, Applied or Rejected">
      <rect width="640" height="400" fill="#232a37" />
      {/* side filters */}
      <rect x="24" y="24" width="150" height="352" rx="10" fill="#2a3242" />
      {["All mail", "Interview", "Applied", "Rejected", "Recruiter"].map((t, i) => (
        <g key={t} transform={`translate(40 ${48 + i * 40})`}>
          <rect width="118" height="28" rx="6" fill={i === 1 ? "rgba(94,234,212,0.14)" : "transparent"} />
          <text x="12" y="19" fontSize="13" fill={i === 1 ? "#5eead4" : "#a7b1c2"} fontFamily="sans-serif">
            {t}
          </text>
        </g>
      ))}
      {/* mail list */}
      {ROWS.map((r, i) => (
        <g key={i} transform={`translate(192 ${24 + i * 70})`}>
          <rect width="424" height="58" rx="10" fill="#2f3849" stroke="#3c475b" />
          <circle cx="28" cy="29" r="13" fill="#3c475b" />
          <rect x="52" y="17" width={r.w} height="9" rx="4.5" fill="#eaeff6" opacity="0.85" />
          <rect x="52" y="34" width={r.w + 60} height="7" rx="3.5" fill="#7e899c" opacity="0.7" />
          <rect x={424 - 104} y="18" width="88" height="22" rx="11" fill="none" stroke={r.color} />
          <text x={424 - 60} y="33.5" textAnchor="middle" fontSize="11" fontWeight="600" fill={r.color} fontFamily="sans-serif">
            {r.tag.toUpperCase()}
          </text>
        </g>
      ))}
      {/* AI badge */}
      <g transform="translate(41 324)">
        <rect width="116" height="36" rx="18" fill="#5eead4" />
        <text x="58" y="23" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10231f" fontFamily="sans-serif">
          SORTED BY AI
        </text>
      </g>
    </svg>
  );
}
