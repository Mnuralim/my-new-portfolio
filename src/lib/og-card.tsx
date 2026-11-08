import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// shared 1200x630 share card in the brand colours (forest / cream / mustard)
export async function ogCard({ title, kicker }: { title: string; kicker: string }) {
  const logo = await readFile(join(process.cwd(), "public/07-izzy-susun-2x2.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#234030",
          color: "#F5F0E6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={logoSrc} width={72} height={72} alt="" />
          <div style={{ fontSize: 30, color: "#B9C2B5" }}>{kicker}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, color: "#B9C2B5" }}>izzy.my.id</div>
          <div style={{ width: 160, height: 18, borderRadius: 999, background: "#E8B94A" }} />
        </div>
      </div>
    ),
    ogSize
  );
}
