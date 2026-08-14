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
