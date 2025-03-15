import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig;
