import type { NextConfig } from "next";


const isGithubPages = process.env.GITHUB_ACTIONS || false;
const repo = isGithubPages ? '/causa-solidaria-js' : ''

const nextConfig: NextConfig = {
  basePath: repo,
  assetPrefix: repo,
  env: {
    NEXT_PUBLIC_BASE_PATH: repo
  },
  output: (isGithubPages ?  "export" : undefined),
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
  
};


export default nextConfig;
