import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Set SITE_URL to the real address when it's live (e.g. on Vercel), so link previews work.
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const title = `${profile.name} · ${profile.headline.fullstack}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.specialty,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "profile",
    title,
    description: profile.specialty,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}: ${profile.headline.fullstack}` }],
  },
  twitter: { card: "summary_large_image", title, description: profile.specialty, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
