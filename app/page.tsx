"use client";

import { useEffect, useState } from "react";
import content from "./content.json";

const quickLinks = [
  { label: "Resume", value: "View PDF", href: "/resume.pdf", external: true },
  { label: "Email", value: content.contact.email, href: `mailto:${content.contact.email}`, external: false },
  { label: "LinkedIn", value: "Profile", href: content.contact.linkedin, external: true },
  { label: "GitHub", value: "Profile", href: content.contact.github, external: true },
];

export default function Home() {
  const [dark, setDark] = useState(false);

  // Sync React state with the theme the inline script in <head> already
  // applied to <html> before hydration (localStorage choice, or OS default).
  // This is a legitimate one-shot read of a browser-only value on mount, not
  // state that belongs in React — hence the lint override.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage can be unavailable (private mode, disabled storage) — theme just won't persist.
    }
  }

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-background">
      <main className="max-w-3xl mx-auto px-6 sm:px-10 md:px-16 py-16 sm:py-20">

        {/* Header */}
        <header className="border-b border-border pb-8 mb-12 flex items-center justify-between animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Anubhav Sinha
          </h1>
          <button
            onClick={toggleTheme}
            className="w-9 h-5 rounded-full relative transition-colors duration-300 bg-foreground shrink-0"
            aria-label="Toggle dark mode"
            aria-pressed={dark}
          >
            <span
              className="absolute top-1/2 left-[3px] w-3 h-3 rounded-full bg-background transition-transform duration-300"
              style={{ transform: `translateY(-50%) translateX(${dark ? 18 : 0}px)` }}
            />
          </button>
        </header>

        {/* Bio */}
        <p
          className="text-lg leading-8 max-w-[640px] -mt-9 text-foreground/80 animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          {content.bio}
        </p>

        {/* Open to */}
        <div
          className="mt-5 inline-flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/70" />
          </span>
          <p className="text-sm text-muted">{content.openTo}</p>
        </div>

        {/* Resume + Contact */}
        <section className="mt-12 animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <div className="flex flex-col sm:flex-row sm:divide-x divide-border">
            {quickLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`flex-1 py-4 sm:py-0 transition-opacity duration-200 hover:opacity-60 ${
                  i === 0 ? "sm:pr-8" : i === quickLinks.length - 1 ? "sm:pl-8" : "sm:px-8"
                } ${i < quickLinks.length - 1 ? "border-b sm:border-b-0 border-border" : ""}`}
              >
                <p className="text-xs uppercase tracking-widest mb-2 text-muted">{link.label}</p>
                <p className="font-medium text-foreground">{link.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Experience
          </h2>
          <div className="flex flex-col gap-8">
            {content.experience.map((job) => (
              <div key={`${job.org}-${job.role}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <p className="font-medium text-foreground">
                    {job.role} <span className="font-normal text-muted">· {job.org}</span>
                  </p>
                  <p className="text-sm text-muted shrink-0">{job.dates}</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-6 text-muted">
                      <span aria-hidden="true" className="text-muted/60">–</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "280ms" }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Projects
          </h2>
          <div className="flex flex-col gap-4">
            {content.projects.map((project) => {
              const Card = project.url ? "a" : "div";
              const linkProps = project.url
                ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
              <Card
                key={project.name}
                {...linkProps}
                className={`group block p-5 rounded-lg border bg-card transition-all duration-200 ${
                  project.url ? "hover:-translate-y-0.5 hover:shadow-md" : ""
                } ${project.featured ? "border-foreground/30" : "border-border"}`}
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="font-medium text-foreground">
                    {project.name}
                  </p>
                  {project.url && (
                    <span
                      aria-hidden="true"
                      className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  )}
                </div>
                {project.highlight && (
                  <p className="text-xs font-medium text-foreground/70 mb-2">
                    {project.highlight}
                  </p>
                )}
                <p className="text-sm leading-6 text-muted mb-3">
                  {project.description}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full border border-border text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "340ms" }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Skills
          </h2>
          <div className="flex flex-col gap-5">
            {content.skills.map((group) => (
              <div key={group.category}>
                <p className="text-xs uppercase tracking-widest mb-2 text-muted">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 rounded-full border border-border text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted">
          <p>© 2026 Anubhav Sinha</p>
          <div className="flex gap-6">
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="transition-colors duration-200 hover:text-foreground"
            >
              Email
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
