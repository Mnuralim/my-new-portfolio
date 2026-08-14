import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-family-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-family-mono",
});

export const metadata: Metadata = {
  title: "Izzy — IT Engineer & Full Stack Developer",
  description:
    "Portfolio of Muhamad Nur Fatahil Alim — IT Engineer & Full Stack Developer based in Kolaka, Southeast Sulawesi, Indonesia. Building scalable web apps, managing IT infrastructure, and network administration.",
  keywords: [
    "IT engineer",
    "full stack developer",
    "IT support",
    "network administration",
    "MikroTik",
    "Next.js",
    "React",
    "TypeScript",
    "blockchain",
    "Solidity",
    "Indonesia",
  ],
  openGraph: {
    title: "Izzy — IT Engineer & Full Stack Developer",
    description:
      "IT Engineer & Full Stack Developer — building enterprise web apps and managing IT infrastructure from Indonesia.",
    type: "website",
  },
  icons: {
    icon: "/izzy-dev-nobg2.png",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
