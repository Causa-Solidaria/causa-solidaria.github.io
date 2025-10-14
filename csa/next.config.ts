import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  // Ajuda Next a rastrear corretamente dependências em monorepo/raiz multi-lockfile
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
