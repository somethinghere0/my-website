import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anubhav Sinha",
  description: "Personal website of Anubhav Sinha",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.style.background = "#1a1a1a";
              } else {
                document.documentElement.style.background = "#eceae3";
              }
            })();
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}