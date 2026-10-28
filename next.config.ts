import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "images", hostname: "**" }] },
  poweredByHeader: false,
};
export default nextConfig;
