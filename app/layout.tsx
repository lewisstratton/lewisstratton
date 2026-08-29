import type { Metadata, Viewport } from "next";
import { Space_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Lewis Stratton",
  description: "London based stylist and fashion editor, contributing to a number of publications.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}>
        <PageTransition>
          <Navigation />
          <SmoothScroll>{children}</SmoothScroll>
          <FilmGrain />
        </PageTransition>
      </body>
    </html>
  );
}