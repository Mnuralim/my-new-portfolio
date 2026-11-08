import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://izzy.my.id"),
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Izzy — IT Engineer & Full Stack Developer",
    description:
      "IT Engineer & Full Stack Developer — building enterprise web apps and managing IT infrastructure from Indonesia.",
    type: "website",
    url: "/",
    siteName: "Izzy",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/07-izzy-susun-2x2.png",
    apple: "/07-izzy-susun-2x2.png",
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
    <html lang="id" className={`${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
