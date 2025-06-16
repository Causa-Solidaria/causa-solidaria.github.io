import type { NextConfig } from "next";


const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: (isGithubPages ?  "export" : undefined),
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
  
};


export default nextConfig;
