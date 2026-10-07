import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site moved from Render to Vercel; send anyone using the old address to the new one.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sunidhi-portfolio-k5ii.onrender.com" }],
        destination: "https://sunidhisumbria.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
