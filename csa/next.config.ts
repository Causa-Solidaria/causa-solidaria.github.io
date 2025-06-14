import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
};


export default nextConfig;
