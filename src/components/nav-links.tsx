"use client";

import { useEffect, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/** Top menu. Underlines the section you're looking at. */
export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setActive(NAV.find((n) => seen.get(n.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="flex items-center gap-1 text-sm">
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          aria-current={active === n.id ? "true" : undefined}
          className={`relative px-3 py-2 transition-colors hover:text-fg ${active === n.id ? "text-fg" : "text-muted"} ${
            n.id === "contact" ? "" : "hidden md:inline-block"
          }`}
        >
          {n.label}
          <span
            className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${active === n.id ? "opacity-100" : "opacity-0"}`}
            aria-hidden
          />
        </a>
      ))}
    </nav>
  );
}
