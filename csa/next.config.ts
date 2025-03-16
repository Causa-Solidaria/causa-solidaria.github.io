import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/causa-solidaria-js',
  assetPrefix: '/causa-solidaria-js/',
  eslint: {
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;
