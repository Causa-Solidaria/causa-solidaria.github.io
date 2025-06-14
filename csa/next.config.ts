import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/csa",
  output: "export",  
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compiler : {
    styledComponents : true,
    
  },
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
};


export default nextConfig;
