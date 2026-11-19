import {
  boldParts,
  CV_FILES,
  formatMonth,
  groupByCompany,
  profile,
  PROJECT_IMAGES,
  shortUrl,
  type Project,
} from "@/lib/profile";
import { ArrowUpRightIcon, DownloadIcon, linkIcon, MailIcon, PinIcon } from "@/components/icons";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";
const btnPrimary = `${btn} bg-accent text-accent-fg hover:opacity-90`;
const btnGhost = `${btn} border border-line bg-card text-fg hover:border-faint`;

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

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-14 sm:py-20">
      <h2 className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.18em] text-faint">{title}</h2>
      {children}
    </section>
  );
}

function codeLabel(url: string) {
  if (/frontend$/i.test(url)) return "Frontend code";
  if (/backend$/i.test(url)) return "Backend code";
  return "Code";
}

function ProjectCard({ project }: { project: Project }) {
  const image = PROJECT_IMAGES[project.name];
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card">
      {image && (
        <a href={project.live} target="_blank" rel="noreferrer" className="block border-b border-line bg-[#1a1a1a]">
          {/* Plain <img>: the site is static files, so there's no image server. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} width={1280} height={800} loading="lazy" className="aspect-[16/9] w-full object-cover object-top" />
        </a>
      )}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="mt-1.5 text-muted">{project.oneLiner}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-faint" aria-hidden />
              <span>
                <Rich text={b} />
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
              Live site <ArrowUpRightIcon />
            </a>
          )}
          {project.code?.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              {linkIcon(url, "size-3.5")} {codeLabel(url)}
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
    jobTitle: profile.headline.fullstack.split(" · ")[0],
    email: `mailto:${profile.email}`,
    sameAs: profile.links.map((l) => l.url),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav aria-label="Sections" className="flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-md px-2.5 py-1.5 text-muted hover:text-fg ${n.href === "#contact" ? "" : "hidden sm:inline-block"}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden />
            Open to work
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-3 text-lg font-medium text-accent">{profile.headline.fullstack.split(" · ")[0]}</p>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-balance sm:text-2xl">{profile.specialty}</p>
          <p className="mt-6 flex items-center gap-1.5 text-sm text-muted">
            <PinIcon className="size-4 shrink-0" /> {profile.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={btnPrimary}>
              <MailIcon /> Email me
            </a>
            {CV_FILES.map((cv) => (
              <a key={cv.href} href={cv.href} download className={btnGhost}>
                <DownloadIcon /> {cv.label}
              </a>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {profile.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  {linkIcon(l.url)} {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* What I'm best at */}
        <section aria-label="What I build" className="grid gap-4 pb-14 sm:grid-cols-3 sm:pb-20">
          {profile.focus.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-card p-5">
              <h2 className="font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </section>

        <Section id="about" title="About">
          <p className="max-w-3xl text-lg leading-relaxed text-muted">{profile.summary.fullstack}</p>
        </Section>

        <Section id="work" title="Work">
          <ol className="space-y-12">
            {companies.map((c) => (
              <li key={c.company + c.roles[0].start}>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-xl font-semibold">{c.company}</h3>
                  {c.about && <p className="text-sm text-faint">{c.about}</p>}
                </div>
                <ol className="mt-5 space-y-8 border-l border-line pl-5">
                  {c.roles.map((r) => (
                    <li key={r.role + r.start} className="relative">
                      <span className="absolute top-2 -left-[23.5px] size-2 rounded-full border border-faint bg-bg" aria-hidden />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="font-medium">{r.role}</h4>
                        <p className="font-mono text-xs text-faint">
                          {formatMonth(r.start)} – {formatMonth(r.end)} · {r.location}
                        </p>
                      </div>
                      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
                        {r.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-faint" aria-hidden />
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
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-6">
            {profile.projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {profile.skills.fullstack.map((g) => (
              <div key={g.label}>
                <dt className="text-sm font-medium">{g.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 border-t border-line pt-6">
            {profile.education.map((e) => (
              <p key={e.degree} className="text-sm text-muted">
                <span className="font-medium text-fg">{e.degree}</span> · {e.school}, {e.place} · {e.start}–{e.end}
              </p>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Have a dashboard, map or report that needs building?
          </h3>
          <p className="mt-3 max-w-2xl text-muted">{profile.openTo}</p>
          <a href={`mailto:${profile.email}`} className={`${btnPrimary} mt-6`}>
            <MailIcon /> {profile.email}
          </a>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {profile.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                  {linkIcon(l.url)} {shortUrl(l.url)}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-4xl px-4 py-8 text-xs text-faint sm:px-6">
          © {profile.updatedAt.slice(0, 4)} {profile.name} · Updated {profile.updatedAt}
        </p>
      </footer>
    </>
  );
}
