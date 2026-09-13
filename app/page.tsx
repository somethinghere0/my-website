"use client";

import { useEffect, useState } from "react";
import content from "./content.json";

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

        {/* Resume + Contact */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <div className="flex flex-col sm:flex-row sm:divide-x divide-border">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 sm:py-0 sm:pr-8 border-b sm:border-b-0 border-border transition-opacity duration-200 hover:opacity-60"
            >
              <p className="text-xs uppercase tracking-widest mb-2 text-muted">Resume</p>
              <p className="font-medium text-foreground">View PDF</p>
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="flex-1 py-4 sm:py-0 sm:px-8 border-b sm:border-b-0 border-border transition-opacity duration-200 hover:opacity-60"
            >
              <p className="text-xs uppercase tracking-widest mb-2 text-muted">Email</p>
              <p className="font-medium text-foreground">{content.contact.email}</p>
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 sm:py-0 sm:pl-8 transition-opacity duration-200 hover:opacity-60"
            >
              <p className="text-xs uppercase tracking-widest mb-2 text-muted">LinkedIn</p>
              <p className="font-medium text-foreground">View Profile</p>
            </a>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-16 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
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
                className={`group block p-5 rounded-lg border border-border bg-card transition-all duration-200 ${
                  project.url ? "hover:-translate-y-0.5 hover:shadow-md" : ""
                }`}
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

      </main>
    </div>
  );
}
