import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable longer timeout for API routes on Netlify Pro
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
