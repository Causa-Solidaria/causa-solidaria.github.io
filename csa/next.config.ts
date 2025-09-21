import type { NextConfig } from "next";

const buildTarget = process.env.BUILD_TARGET;
const forceStandalone = true;

const nextConfig: NextConfig = {
  ...(forceStandalone ? { output: "standalone" } : {}),
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: { unoptimized: false },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  // Ajuda Next a rastrear corretamente dependências em monorepo/raiz multi-lockfile
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
