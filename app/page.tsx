"use client";

import { useState } from "react";
import content from "./content.json";

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? "bg-[#1a1a1a]" : "bg-[#f5f0e8]"}`}>
      <main className="max-w-3xl mx-auto px-16 py-20">

        {/* Header */}
        <header className={`border-b pb-8 mb-12 flex items-center justify-between ${dark ? "border-[#333]" : "border-[#e0d9ce]"}`}>
          <h1 className={`text-4xl font-semibold tracking-tight ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
            Anubhav Sinha
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className={`w-9 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${dark ? "bg-[#f5f0e8]" : "bg-[#1a1a1a]"}`}
            aria-label="Toggle dark mode"
          >
            <span className={`absolute top-1/2 -translate-y-1/2 left-[3px] w-3 h-3 rounded-full transition-transform duration-300 ${dark ? "translate-x-[18px] bg-[#1a1a1a]" : "translate-x-[3px] bg-[#f5f0e8]"}`} />
          </button>
        </header>

        {/* Bio */}
        <p className={`text-lg leading-8 max-w-[660px] -mt-9 ${dark ? "text-[#d1d1d1]" : "text-[#3a3a3a]"}`}>
          {content.bio}
        </p>

        {/* Resume */}
        <section className="mt-16">
          <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
            Resume
          </h2>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block p-5 rounded-lg border transition-colors duration-200 ${dark ? "border-[#333] hover:border-[#555] bg-[#222]" : "border-[#e0d9ce] hover:border-[#c8bfb0] bg-[#faf7f2]"}`}
          >
            <p className={`font-medium mb-1 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>View Resume</p>
            <p className={`text-sm leading-6 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>Opens as PDF</p>
          </a>
        </section>

        {/* Projects */}
        <section className="mt-16">
          <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
            Projects
          </h2>
          <div className="flex flex-col gap-4">
            {content.projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-5 rounded-lg border transition-colors duration-200 ${dark ? "border-[#333] hover:border-[#555] bg-[#222]" : "border-[#e0d9ce] hover:border-[#c8bfb0] bg-[#faf7f2]"}`}
              >
                <p className={`font-medium mb-1 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
                  {project.name}
                </p>
                <p className={`text-sm leading-6 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>
                  {project.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16">
          <h2 className={`text-xl font-semibold mb-6 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
            Contact
          </h2>
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${content.contact.email}`}
              className={`block p-5 rounded-lg border transition-colors duration-200 ${dark ? "border-[#333] hover:border-[#555] bg-[#222]" : "border-[#e0d9ce] hover:border-[#c8bfb0] bg-[#faf7f2]"}`}
            >
              <p className={`font-medium mb-1 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>Email</p>
              <p className={`text-sm leading-6 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>{content.contact.email}</p>
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-5 rounded-lg border transition-colors duration-200 ${dark ? "border-[#333] hover:border-[#555] bg-[#222]" : "border-[#e0d9ce] hover:border-[#c8bfb0] bg-[#faf7f2]"}`}
            >
              <p className={`font-medium mb-1 ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>LinkedIn</p>
              <p className={`text-sm leading-6 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>{content.contact.linkedin}</p>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}