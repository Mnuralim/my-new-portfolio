import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/ui/navbar";
import Cursor from "./_components/ui/cursor";

export const metadata: Metadata = {
  title: "Izzy — Full Stack Developer & IT Support",
  description:
    "Portfolio of Muhamad Nur Fatahil Alim — Full Stack Developer & IT Support based in Cilacap, Indonesia. Building scalable web apps and solving IT problems.",
  keywords: [
    "full stack developer",
    "IT support",
    "Next.js",
    "React",
    "TypeScript",
    "blockchain",
    "Solidity",
    "Indonesia",
  ],
  openGraph: {
    title: "Izzy — Full Stack Developer & IT Support",
    description:
      "Building scalable web apps and solving IT problems from Indonesia.",
    type: "website",
  },
  icons: {
    icon: "/izzy-dev-nobg2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="max-w-7xl mx-auto">
        <Navbar />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
