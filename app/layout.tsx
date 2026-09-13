import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import content from "./content.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in your deployment env once you have a domain —
// this only affects absolute URLs in metadata/OG tags, not the page itself.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anubhav Sinha",
    template: "%s · Anubhav Sinha",
  },
  description: content.bio,
  openGraph: {
    title: "Anubhav Sinha",
    description: content.bio,
    url: siteUrl,
    siteName: "Anubhav Sinha",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anubhav Sinha",
    description: content.bio,
  },
};

// Runs before paint so the correct theme applies with no flash: an explicit
// choice in localStorage wins, otherwise fall back to the OS preference.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anubhav Sinha",
  email: content.contact.email,
  sameAs: [content.contact.linkedin],
  description: content.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
