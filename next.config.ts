import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.1.219:3000",
    "http://192.168.1.219",
    "https://localhost:3000",
    "https://192.168.1.219:3000",
    "https://192.168.1.219"
  ],
};

export default nextConfig;
