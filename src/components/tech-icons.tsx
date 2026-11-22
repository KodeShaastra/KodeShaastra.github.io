import {
  siGraphql,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { profile } from "@/lib/profile";

// Logo row for the Skills section. A logo only shows if that skill is really in my profile,
// so this can never claim more than my CV does.
const LOGOS: { icon: SimpleIcon; color?: string }[] = [
  { icon: siReact },
  { icon: siNextdotjs, color: "#eaeff6" }, // the official black is invisible on navy
  { icon: siTypescript },
  { icon: siJavascript },
  { icon: siNodedotjs },
  { icon: siGraphql },
  { icon: siPostgresql, color: "#6b8ff0" },
  { icon: siTailwindcss },
];

const allSkills = Object.values(profile.skills)
  .flat()
  .flatMap((g) => g.items)
  .join(" | ")
  .toLowerCase();

export function TechLogos() {
  const shown = LOGOS.filter((l) => allSkills.includes(l.icon.title.toLowerCase()));
  return (
    <ul className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8">
      {shown.map(({ icon, color }) => {
        const c = color ?? `#${icon.hex}`;
        return (
          <li key={icon.slug} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted">{icon.title}</span>
            <svg viewBox="0 0 24 24" className="size-9" fill={c} aria-hidden>
              <path d={icon.path} />
            </svg>
            <span className="h-1 w-12 rounded-full" style={{ background: c }} aria-hidden />
          </li>
        );
      })}
    </ul>
  );
}
