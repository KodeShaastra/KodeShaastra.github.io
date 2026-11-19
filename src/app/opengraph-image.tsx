import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

// The picture LinkedIn, WhatsApp, Slack etc. show when someone shares your link. Made at build time.
export const alt = `${profile.name}: ${profile.headline.fullstack}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static"; // needed for the static build

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0c0c0e",
          color: "#ececef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ marginTop: 12, fontSize: 36, color: "#7c9cff" }}>{profile.headline.fullstack}</div>
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.4, color: "#a1a1aa", maxWidth: 1000 }}>
          {profile.focus.map((f) => f.title).join(" · ")}
        </div>
      </div>
    ),
    size,
  );
}
