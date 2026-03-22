import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
