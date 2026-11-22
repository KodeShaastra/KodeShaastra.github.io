import {
  boldParts,
  CV_FILES,
  formatMonth,
  groupByCompany,
  PHOTO,
  profile,
  PROJECT_IMAGES,
  shortUrl,
  type Project,
} from "@/lib/profile";
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, HashnodeIcon, LinkedInIcon, linkIcon, MailIcon, PinIcon } from "@/components/icons";
import { HeroArt } from "@/components/hero-art";
import { InboxArt } from "@/components/inbox-art";
import { NavLinks, type NavItem } from "@/components/nav-links";
import { formatDate, posts } from "@/lib/posts";
import { Skyline } from "@/components/skyline";
import { TechLogos } from "@/components/tech-icons";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors";
const btnSolid = `${btn} bg-accent text-accent-fg hover:bg-accent-strong`;
const btnOutline = `${btn} border border-accent text-accent hover:bg-accent-soft`;

const role = profile.headline.fullstack.split(" · ")[0];
const github = profile.links.find((l) => l.url.includes("github.com"));
const linkedin = profile.links.find((l) => l.url.includes("linkedin.com"));
// Link to the blog only once it has a post, so nobody lands on an empty blog.
const blog = posts.length ? profile.blog || undefined : undefined;

// "Writing" only appears once there are posts on the blog.
const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  ...(posts.length ? [{ id: "writing", label: "Writing" }] : []),
  { id: "contact", label: "Contact" },
];

function Rich({ text }: { text: string }) {
  return (
    <>
      {boldParts(text).map((p, i) =>
        p.bold ? (
          <strong key={i} className="font-semibold text-fg">
            {p.text}
          </strong>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

/** Section heading with the small square icon, like the design. */
function Title({ children, sub, center = true }: { children: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className={`inline-flex items-center gap-3 text-2xl font-semibold ${center ? "justify-center" : ""}`}>
        <span className="grid size-4 place-items-center border-2 border-accent" aria-hidden>
          <span className="size-1.5 bg-accent" />
        </span>
        {children}
      </h2>
      {sub && <p className="mt-2 text-muted">{sub}</p>}
    </div>
  );
}

function Dot() {
  return <span className="mt-[0.6rem] size-1.5 shrink-0 rotate-45 bg-accent" aria-hidden />;
}

function codeLabel(url: string) {
  if (/frontend$/i.test(url)) return "Frontend code";
  if (/backend$/i.test(url)) return "Backend code";
  return "Code";
}

function ProjectCard({ project }: { project: Project }) {
  const image = PROJECT_IMAGES[project.name];
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border-t-4 border-accent bg-surface shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
      {image ? (
        <a href={project.live} target="_blank" rel="noreferrer" className="block p-4 pb-0">
          {/* Plain <img>: the site is static files, so there's no image server. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} width={1280} height={800} loading="lazy" className="aspect-[16/10] w-full rounded object-cover object-top" />
        </a>
      ) : project.name === "Career Glider" ? (
        <div className="p-4 pb-0">
          <InboxArt />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.oneLiner}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <Dot />
              <span>
                <Rich text={b} />
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-accent/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className={btnOutline}>
              View live <ArrowUpRightIcon />
            </a>
          )}
          {project.code?.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent">
              {linkIcon(url, "size-4")} {codeLabel(url)}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const companies = groupByCompany(profile.experience);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: role,
    email: `mailto:${profile.email}`,
    image: PHOTO.src,
    sameAs: [...profile.links.map((l) => l.url), ...(blog ? [blog] : [])],
  };
  const contactRows = [
    { href: `mailto:${profile.email}`, text: profile.email, icon: <MailIcon className="size-5" /> },
    ...(github ? [{ href: github.url, text: shortUrl(github.url), icon: <GitHubIcon className="size-5" /> }] : []),
    ...(linkedin ? [{ href: linkedin.url, text: shortUrl(linkedin.url), icon: <LinkedInIcon className="size-5" /> }] : []),
    ...(blog ? [{ href: blog, text: shortUrl(blog), icon: <HashnodeIcon className="size-5" /> }] : []),
    { href: undefined, text: profile.location, icon: <PinIcon className="size-5" /> },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
          <a href="#top" className="flex items-center gap-1 font-semibold">
            <span className="font-mono text-accent">{"</"}</span>
            {profile.name}
            <span className="font-mono text-accent">{">"}</span>
          </a>
          <NavLinks items={NAV} />
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_25%_40%,var(--bg-glow),transparent)]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-6 sm:px-8 md:grid-cols-[1.1fr_1fr] md:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
                Open to work
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{role}</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.specialty}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className={btnSolid}>
                  <MailIcon /> Email me
                </a>
                {CV_FILES.map((cv) => (
                  <a key={cv.href} href={cv.href} download className={btnOutline}>
                    <DownloadIcon /> {cv.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <HeroArt />
            </div>
          </div>
          <Skyline />
        </section>

        {/* About */}
        <section id="about" className="bg-bg-deep">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-[260px_1fr] md:py-20">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full border-4 border-accent p-1 shadow-[0_0_40px_-8px_rgba(94,234,212,0.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTO.src} alt={PHOTO.alt} width={176} height={176} className="size-40 rounded-full object-cover sm:size-44" />
              </div>
              <p className="mt-5 text-lg font-medium">{profile.name}</p>
              <div className="mt-3 flex gap-4 text-accent">
                <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-fg">
                  <MailIcon className="size-6" />
                </a>
                {github && (
                  <a href={github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg">
                    <GitHubIcon className="size-6" />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin.url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg">
                    <LinkedInIcon className="size-6" />
                  </a>
                )}
                {blog && (
                  <a href={blog} target="_blank" rel="noreferrer" aria-label="Blog" className="hover:text-fg">
                    <HashnodeIcon className="size-6" />
                  </a>
                )}
              </div>
            </div>
            <div>
              <Title center={false}>About</Title>
              <p className="mt-6 font-semibold">A little about me</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{profile.summary.fullstack}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {profile.focus.map((f) => (
                  <li key={f.title} className="rounded-lg border border-line bg-bg p-4">
                    <p className="font-medium text-accent">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="relative">
          <Skyline edge="top" />
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
            <Title sub="The tools I use every day">Skills</Title>
            <div className="mx-auto mt-12 max-w-4xl">
              <TechLogos />
            </div>
            <dl className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
              {profile.skills.fullstack.map((g) => (
                <div key={g.label} className="border-l-2 border-accent/50 pl-4">
                  <dt className="text-sm font-semibold">{g.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{g.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Skyline />
        </section>

        {/* Work */}
        <section id="work" className="bg-bg-deep">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8 md:py-20">
            <Title sub="Where I've built things that people use every day">Work</Title>
            <ol className="mt-12 space-y-12">
              {companies.map((c) => (
                <li key={c.company + c.roles[0].start}>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-xl font-semibold">{c.company}</h3>
                    {c.about && <p className="text-sm text-faint">{c.about}</p>}
                  </div>
                  <ol className="mt-5 space-y-8 border-l-2 border-line pl-6">
                    {c.roles.map((r) => (
                      <li key={r.role + r.start} className="relative">
                        <span className="absolute top-1.5 -left-[33px] size-3.5 rounded-full border-2 border-accent bg-bg-deep" aria-hidden />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="font-medium text-accent">{r.role}</h4>
                          <p className="font-mono text-xs text-faint">
                            {formatMonth(r.start)} – {formatMonth(r.end)} · {r.location}
                          </p>
                        </div>
                        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
                          {r.bullets.map((b) => (
                            <li key={b} className="flex gap-3">
                              <Dot />
                              <span>
                                <Rich text={b} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-lg border border-line bg-bg p-4 text-sm text-muted">
              {profile.education.map((e) => (
                <p key={e.degree}>
                  <span className="font-medium text-fg">{e.degree}</span> · {e.school}, {e.place} · {e.start}–{e.end}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative">
          <Skyline edge="top" />
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
            <Title sub="Things I built end to end, on my own">Projects</Title>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {profile.projects.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Writing: my newest blog posts (hidden until there is at least one) */}
        {posts.length > 0 && (
          <section id="writing" className="relative">
            <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-8">
              <Title sub="Notes on real problems I've solved">Writing</Title>
              <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.url}>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent"
                    >
                      {post.cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.cover} alt="" width={1600} height={840} loading="lazy" className="aspect-[40/21] w-full object-cover" />
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="font-mono text-xs text-faint">{formatDate(post.date)}</p>
                        <h3 className="mt-2 font-semibold leading-snug group-hover:text-accent">{post.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.summary}</p>
                        <p className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                          Read post <ArrowUpRightIcon />
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {blog && (
                <div className="mt-10 flex justify-center">
                  <a href={blog} target="_blank" rel="noreferrer" className={btnOutline}>
                    <HashnodeIcon /> All posts
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="relative">
          <div className="mx-auto max-w-4xl px-4 pt-6 pb-20 sm:px-8">
            <Title>Contact</Title>
            <p className="mx-auto mt-5 max-w-xl text-center text-xl font-medium text-balance">
              Have a dashboard, map or report that needs building?
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">{profile.openTo}</p>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-x-10 gap-y-5 sm:grid-cols-2">
              {contactRows.map((r) => (
                <li key={r.text} className="flex items-center gap-3 text-muted">
                  <span className="text-accent">{r.icon}</span>
                  {r.href ? (
                    <a
                      href={r.href}
                      {...(r.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="break-all underline-offset-4 hover:text-fg hover:underline"
                    >
                      {r.text}
                    </a>
                  ) : (
                    <span>{r.text}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <a href={`mailto:${profile.email}`} className={btnSolid}>
                <MailIcon /> Get in touch
              </a>
            </div>
          </div>
          <Skyline />
        </section>
      </main>

      <footer className="border-b-4 border-accent bg-bg-deep">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-faint sm:px-8">
          © {profile.updatedAt.slice(0, 4)} {profile.name} · Updated {profile.updatedAt}
        </p>
      </footer>
    </>
  );
}
