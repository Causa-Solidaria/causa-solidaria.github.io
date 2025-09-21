import type { NextConfig } from "next";

const buildTarget = process.env.BUILD_TARGET;
const isGithubPages = !!process.env.GITHUB_ACTIONS;
const isExport = isGithubPages || buildTarget === "export";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  // Evita processamento de imagens pelo Next no modo export
  images: { unoptimized: isExport },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
