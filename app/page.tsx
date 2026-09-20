"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import content from "./content.json";

const rotatingPhrases = ["mathematical solutions", "machine learning", "research"];

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const quickLinks = [
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "LinkedIn", href: content.contact.linkedin, external: true },
  { label: "GitHub", href: content.contact.github, external: true },
];

/** Fades and slides children in once they scroll into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Two-column section: index + label on the left, content on the right. */
function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ scrollMarginTop: "4rem" }}
      className="border-t border-border pt-6 pb-20 md:grid md:grid-cols-[200px_1fr] md:gap-10"
    >
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-8 md:mb-0 md:sticky md:top-20">
          <span className="text-accent">{number}</span>
          <span className="mx-2">/</span>
          {title}
        </p>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  // The theme follows the OS preference (the inline script in <head> applies
  // it before paint) and keeps following it if the OS switches, until the
  // visitor flips the toggle. That choice lasts for the visit only.
  const manualTheme = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (isDark: boolean) => {
      setDark(isDark);
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    const onChange = (e: MediaQueryListEvent) => {
      if (!manualTheme.current) apply(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPhraseIndex((i) => (i + 1) % rotatingPhrases.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Highlight the menu item for the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    manualTheme.current = true;
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  }

  return (
    <div id="top" className="min-h-screen font-sans bg-background">
      {/* ---------- Menu ---------- */}
      <nav
        aria-label="Sections"
        className="fixed top-0 inset-x-0 z-40 border-b border-border bg-background/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-12 max-w-5xl items-center gap-6 pl-6 pr-14 sm:pl-10 sm:pr-16">
          <a href="#top" className="hidden sm:block shrink-0 font-display text-xl leading-none">
            Anubhav Sinha
          </a>
          <ul className="flex flex-1 items-center gap-5 overflow-x-auto sm:justify-end">
            {navItems.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 hover:text-accent ${
                    active === item.id
                      ? "text-accent underline underline-offset-[6px] decoration-2"
                      : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ---------- Theme toggle ---------- */}
      <button
        onClick={toggleTheme}
        className="fixed right-0 top-0 z-50 flex h-[49px] w-12 items-center justify-center border-b border-l border-border bg-background/85 text-foreground backdrop-blur-md transition-colors duration-200 hover:bg-foreground hover:text-background"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {dark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          ) : (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          )}
        </svg>
      </button>

      <main className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* ---------- Hero ---------- */}
        <header className="pt-36 sm:pt-44 pb-20 sm:pb-28">
          <p
            className="animate-fade-in-up font-mono text-xs uppercase tracking-[0.18em] text-muted"
            style={{ animationDelay: "0ms" }}
          >
            Computer science, Tufts University
          </p>

          <h1
            className="animate-fade-in-up mt-6 font-display text-[3.4rem] leading-[0.98] tracking-tight sm:text-8xl md:text-[8.5rem]"
            style={{ animationDelay: "100ms" }}
          >
            Anubhav
            <br />
            Sinha<span className="text-accent">.</span>
          </h1>

          <p
            className="animate-fade-in-up mt-10 max-w-xl font-display text-2xl leading-snug sm:text-4xl"
            style={{ animationDelay: "220ms" }}
          >
            <span className="block">I&apos;m interested in applying</span>
            <em className="block h-[1.25em] overflow-hidden text-accent">
              <span key={phraseIndex} className="word-in">
                {rotatingPhrases[phraseIndex]}
              </span>
            </em>
            <span className="block">to market problems.</span>
          </p>

          <div
            className="animate-fade-in-up mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10"
            style={{ animationDelay: "340ms" }}
          >
            <p className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 bg-accent" aria-hidden="true" />
              {content.openTo}
            </p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="link-underline pb-0.5 font-medium"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* ---------- About ---------- */}
        <Section id="about" number="01" title="About">
          <Reveal delay={60}>
            <p className="font-display text-2xl leading-[1.35] sm:text-[1.9rem]">{content.bio}</p>
          </Reveal>
        </Section>

        {/* ---------- Experience ---------- */}
        <Section id="experience" number="02" title="Experience">
          <div className="flex flex-col">
            {content.experience.map((job, i) => (
              <Reveal
                key={`${job.org}-${job.role}`}
                delay={i * 80}
                className={i > 0 ? "mt-12 border-t border-border pt-12" : ""}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-3xl sm:text-4xl">{job.role}</h3>
                  <p className="font-display text-xl italic text-muted">
                    {job.dates}
                  </p>
                </div>
                <p className="mt-1 text-accent">{job.org}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-4 leading-7 text-foreground/80">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- Projects ---------- */}
        <Section id="projects" number="03" title="Projects">
          <ul className="flex flex-col border-b border-border">
            {content.projects.map((project, i) => {
              const Row = project.url ? "a" : "div";
              const linkProps = project.url
                ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <li key={project.name} className="border-t border-border first:border-t-0">
                  <Reveal delay={i * 70}>
                    <Row
                      {...linkProps}
                      className="group grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3
                            className={`font-display text-3xl transition-colors duration-200 sm:text-4xl ${
                              project.url ? "group-hover:text-accent" : ""
                            }`}
                          >
                            {project.name}
                          </h3>
                          {"highlight" in project && project.highlight && (
                            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                              {project.highlight}
                            </span>
                          )}
                        </div>
                        <p className="mt-3 max-w-xl leading-7 text-foreground/75">
                          {project.description}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                            {project.tags.join("  /  ")}
                          </p>
                        )}
                      </div>
                      {project.url && (
                        <span
                          aria-hidden="true"
                          className="hidden font-display text-4xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent sm:block"
                        >
                          ↗
                        </span>
                      )}
                    </Row>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ---------- Skills ---------- */}
        <Section id="skills" number="04" title="Skills">
          <div className="flex flex-col gap-10">
            {content.skills.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 80}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {group.category}
                </p>
                <p className="mt-3 font-display text-2xl leading-relaxed sm:text-3xl">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < group.items.length - 1 && (
                        <span className="mx-3 text-accent" aria-hidden="true">
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- Contact ---------- */}
        <Section id="contact" number="05" title="Contact">
          <Reveal>
            <p className="font-display text-4xl leading-tight sm:text-6xl">
              Say hello<span className="text-accent">.</span>
            </p>
            <a
              href={`mailto:${content.contact.email}`}
              className="link-underline mt-6 inline-block break-all pb-1 font-display text-2xl sm:text-3xl"
            >
              {content.contact.email}
            </a>
          </Reveal>
        </Section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© 2026 Anubhav Sinha</p>
          <a href="#top" className="transition-colors duration-200 hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
