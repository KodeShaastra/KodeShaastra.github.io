import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain files in /out, so the site can be hosted free anywhere (Vercel, GitHub Pages, Cloudflare).
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
