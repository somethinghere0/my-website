"use client";

import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? "bg-[#1a1a1a]" : "bg-[#f5f0e8]"}`}>
      <main className="max-w-3xl mx-auto px-16 py-20">
        <header className={`border-b pb-8 mb-12 flex items-center justify-between ${dark ? "border-[#333]" : "border-[#e0d9ce]"}`}>
          <h1 className={`text-4xl font-semibold tracking-tight ${dark ? "text-[#f5f0e8]" : "text-[#1a1a1a]"}`}>
            Anubhav Sinha
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className={`w-9 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${dark ? "bg-[#f5f0e8]" : "bg-[#1a1a1a]"}`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 left-[3px] w-3 h-3 rounded-full transition-transform duration-300 ${dark ? "translate-x-[18px] bg-[#1a1a1a]" : "translate-x-[3px] bg-[#f5f0e8]"}`}
            />
          </button>
        </header>
      </main>
    </div>
  );
}