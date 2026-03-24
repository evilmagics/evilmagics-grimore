import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cinzel, JetBrains_Mono, Crimson_Text } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: "The Silent Architect | Backend Developer Portfolio",
  description: "Digital Grimoire of a Backend Developer — conjuring APIs, architecting databases, and weaving distributed systems from the void.",
  keywords: ["backend developer", "portfolio", "API", "Next.js", "Supabase", "fullstack"],
  authors: [{ name: "The Silent Architect" }],
  openGraph: {
    title: "The Silent Architect's Grimoire",
    description: "Conjuring systems from the void — a Backend Developer's digital sanctum.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${jetbrainsMono.variable} ${crimsonText.variable}`} suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
