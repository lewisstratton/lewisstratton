import type { Metadata, Viewport } from "next";
import { Space_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import { getArticles, getSiteSettings } from "@/lib/sanity/queries";
import { FALLBACK_SETTINGS } from "@/lib/sanity/fallback";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getSiteSettings()) ?? FALLBACK_SETTINGS;

  return {
    title: settings.name,
    description: settings.metaDescription ?? settings.tagline ?? undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, articles] = await Promise.all([getSiteSettings(), getArticles()]);

  return (
    <html lang="en">
      <body className={`${spaceMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}>
        <PageTransition>
          <Navigation settings={settings ?? FALLBACK_SETTINGS} articles={articles} />
          <SmoothScroll>{children}</SmoothScroll>
          <FilmGrain />
        </PageTransition>
      </body>
    </html>
  );
}
