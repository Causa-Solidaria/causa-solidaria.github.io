import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/csa',
  assetPrefix: '/csa/',
  eslint: {
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;
