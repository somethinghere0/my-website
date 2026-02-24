"use client";

import { useState } from "react";
import content from "./content.json";

const LIGHT_BG = "#eceae3";
const LIGHT_CARD = "#e5e3dc";
const LIGHT_BORDER = "#d9d7d0";

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300`} style={{ background: dark ? "#1a1a1a" : LIGHT_BG }}>
      <main className="max-w-3xl mx-auto px-16 py-20">

        {/* Header */}
        <header className={`border-b pb-8 mb-12 flex items-center justify-between`} style={{ borderColor: dark ? "#333" : LIGHT_BORDER }}>
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

        {/* Resume + Contact */}
        <section className="mt-16">
          <div className="flex divide-x" style={{ borderColor: dark ? "#333" : LIGHT_BORDER }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 pr-8 transition-opacity duration-200 hover:opacity-60"
            >
              <p className={`text-xs uppercase tracking-widest mb-2 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>Resume</p>
              <p className={`font-medium ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>View PDF</p>
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="flex-1 px-8 transition-opacity duration-200 hover:opacity-60"
            >
              <p className={`text-xs uppercase tracking-widest mb-2 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>Email</p>
              <p className={`font-medium ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>{content.contact.email}</p>
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 pl-8 transition-opacity duration-200 hover:opacity-60"
            >
              <p className={`text-xs uppercase tracking-widest mb-2 ${dark ? "text-[#a8a8a8]" : "text-[#6e6e6e]"}`}>LinkedIn</p>
              <p className={`font-medium ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>View Profile</p>
            </a>
          </div>
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
                className="block p-5 rounded-lg border transition-colors duration-200"
                style={{ borderColor: dark ? "#333" : LIGHT_BORDER, background: dark ? "#222" : LIGHT_CARD }}
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



      </main>
    </div>
  );
}