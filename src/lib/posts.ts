// My newest blog posts, saved by scripts/fetch-posts.mjs from my Hashnode RSS feed before each build.
import data from "@/data/posts.json";

export interface Post {
  title: string;
  summary: string;
  url: string;
  date: string; // "YYYY-MM-DD"
  tags: string[];
  cover?: string;
}

export const posts = data as Post[];

/** "2026-11-23" → "23 Nov 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}
