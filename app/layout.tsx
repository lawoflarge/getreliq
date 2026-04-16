import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AntikFinder — Antiquitäten sofort erkennen",
  description: "Foto hochladen → KI identifiziert dein Stück → Sofort zum Kauf auf eBay, Catawiki & Pamono",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-stone-50 text-stone-900">{children}</body>
    </html>
  );
}
