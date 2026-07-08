import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ably"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

