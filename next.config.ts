import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.29.119"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
{ key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      ],
    },
  ],
};

export default nextConfig;
