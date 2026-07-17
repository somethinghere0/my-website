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
          __html: `document.documentElement.style.background = "#f0ede0";`
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}