import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel deployment ready
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
