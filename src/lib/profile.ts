// The facts on this site come from ONE file in the Career Hub app (~/career-hub/src/profile/profile.ts).
// Don't edit src/data/profile.json by hand: change profile.ts there and run `npm run portfolio`.
import data from "@/data/profile.json";

export type Variant = "fullstack" | "frontend";

export interface Job {
  company: string;
  about?: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Project {
  name: string;
  oneLiner: string;
  stack: string[];
  live?: string;
  code?: string[];
  bullets: string[];
}

export interface PublicProfile {
  name: string;
  headline: Record<Variant, string>;
  specialty: string;
  openTo: string;
  location: string;
  email: string;
  links: { label: string; url: string }[];
  summary: Record<Variant, string>;
  focus: { title: string; text: string }[];
  experience: Job[];
  projects: Project[];
  skills: Record<Variant, { label: string; items: string[] }[]>;
  education: { degree: string; school: string; place: string; start: string; end: string }[];
  updatedAt: string;
}

export const profile = data as PublicProfile;

/** Pictures for projects (looks only, not facts, so they live here). Paths are inside /public. */
export const PROJECT_IMAGES: Record<string, { src: string; alt: string }> = {
  "DSA Sheet": {
    src: "/projects/dsa-sheet.webp",
    alt: "DSA Sheet app: progress cards for easy, medium and hard problems above a checklist of array problems.",
  },
};

/** Same photo as my GitHub profile picture (already public). Replace public/me.webp to change it. */
export const PHOTO = { src: "/me.webp", alt: "Prashant Singh" };

export const CV_FILES: { variant: Variant; label: string; href: string }[] = [
  { variant: "fullstack", label: "Full-stack CV", href: "/cv/Prashant_Singh_FullStack.pdf" },
  { variant: "frontend", label: "Frontend CV", href: "/cv/Prashant_Singh_Frontend.pdf" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-04" → "Apr 2024", "present" → "Present". */
export function formatMonth(value: string): string {
  if (value === "present") return "Present";
  const [y, m] = value.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

/** Roles at the same company in a row go under one heading (shows the promotion). */
export function groupByCompany(jobs: Job[]) {
  const groups: { company: string; about?: string; roles: Job[] }[] = [];
  for (const job of jobs) {
    const last = groups[groups.length - 1];
    if (last && last.company === job.company) last.roles.push(job);
    else groups.push({ company: job.company, about: job.about, roles: [job] });
  }
  return groups;
}

/** "Built **this** thing" → plain and bold parts. */
export function boldParts(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**") ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false },
    );
}

export function plain(text: string): string {
  return text.replace(/\*\*/g, "");
}

export function shortUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
