// Reads my newest blog posts from my Hashnode RSS feed and saves them to src/data/posts.json.
// Runs before every build (see "prebuild" in package.json), so new posts show up on the next build.
// GitHub also rebuilds the site once a day (.github/workflows/deploy.yml).
//
// Hashnode's GraphQL API needs a paid plan since May 2026, so this uses the free RSS feed.
// If the feed can't be read, the last saved posts are kept and the build carries on.
//
// Test with another blog:  BLOG_URL=https://blog.example.com node scripts/fetch-posts.mjs --dry-run

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src", "data", "posts.json");
const MAX_POSTS = 6;
const DRY_RUN = process.argv.includes("--dry-run");

const profile = JSON.parse(readFileSync(path.join(ROOT, "src", "data", "profile.json"), "utf8"));
const blog = (process.env.BLOG_URL ?? profile.blog ?? "").trim().replace(/\/$/, "");

function save(posts) {
  if (DRY_RUN) return console.log(JSON.stringify(posts, null, 2));
  writeFileSync(OUT, JSON.stringify(posts, null, 2) + "\n");
}

function keepOld(reason) {
  console.warn(`⚠ Blog posts not updated (${reason}). Keeping the last saved list.`);
  if (!existsSync(OUT) && !DRY_RUN) save([]);
}

/** "<![CDATA[x]]>" or plain text → x, with basic entities decoded. */
function clean(raw = "") {
  const text = raw.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1");
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function tag(item, name) {
  return item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1];
}

/** Only real https links. A feed is outside data, so never trust it blindly. */
function httpsUrl(value, allowedHosts) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    if (allowedHosts && !allowedHosts.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

async function main() {
  if (!blog) {
    if (!DRY_RUN) save([]);
    console.log("No blog address in the profile yet, so no posts to show.");
    return;
  }
  const blogHost = new URL(blog).hostname;
  let xml;
  try {
    const res = await fetch(`${blog}/rss.xml`, {
      headers: { "User-Agent": "portfolio-site (reads my own blog feed)" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return keepOld(`feed answered ${res.status}`);
    xml = await res.text();
  } catch (err) {
    return keepOld(err.message);
  }
  if (!xml.includes("<rss")) return keepOld("the answer was not an RSS feed");

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const posts = items
    .map((item) => {
      const date = new Date(clean(tag(item, "pubDate")));
      return {
        title: clean(tag(item, "title")),
        summary: clean(tag(item, "description")).slice(0, 220),
        url: httpsUrl(clean(tag(item, "link")), [blogHost]),
        date: Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10),
        tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => clean(m[1])).slice(0, 3),
        cover: httpsUrl(item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ?? "", ["hashnode.com", "hashnode.dev"]),
      };
    })
    .filter((p) => p.title && p.url && p.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_POSTS);

  save(posts);
  console.log(`✓ ${posts.length} blog post${posts.length === 1 ? "" : "s"} from ${blog}`);
}

main().catch((err) => keepOld(err.message));
