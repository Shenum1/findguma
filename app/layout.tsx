import type { Metadata } from "next";
import { VT323, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getSiteSettings } from "@/lib/content/artist";

// Placeholder typographic direction (instruct.md Section 4) — swappable once
// real brand typography is chosen. VT323: pixel/system voice (nav, labels,
// timestamps). Fraunces: expressive display voice (artist name, headings).
// Inter: long-form editorial body copy.
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { artist } = await getSiteSettings();
  return {
    title: {
      default: artist.name,
      template: `%s — ${artist.name}`,
    },
    description: artist.tagline,
    openGraph: {
      title: artist.name,
      description: artist.tagline,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: artist.name,
      description: artist.tagline,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { artist, statusLine } = await getSiteSettings();

  return (
    <html lang="en" className={`${vt323.variable} ${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-canvas font-body text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-pixel focus:text-canvas"
        >
          Skip to content
        </a>
        <div id="app-root" className="flex min-h-screen flex-col">
          <Providers>
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter artistName={artist.name} statusLine={statusLine} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
