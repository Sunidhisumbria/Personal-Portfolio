import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, site } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the site link is shared (LinkedIn, WhatsApp, Slack, X…).
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", profile.photo));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "#08080b",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(94,234,212,0.28), transparent 45%), radial-gradient(circle at 90% 10%, rgba(167,139,250,0.25), transparent 45%)",
          color: "#ededf2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#5eead4", textTransform: "uppercase" }}>
            {profile.role}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 20, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#a1a1b0", marginTop: 28 }}>
            Marketplaces, streaming platforms & payment flows — React, Next.js, Node.js, TypeScript.
          </div>
          <div style={{ fontSize: 24, color: "#8e8e9c", marginTop: 40 }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 6,
            borderRadius: 48,
            backgroundImage: "linear-gradient(135deg, #5eead4, #a78bfa)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={340}
            height={340}
            alt=""
            style={{ borderRadius: 42, objectFit: "cover", objectPosition: "50% 30%" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
