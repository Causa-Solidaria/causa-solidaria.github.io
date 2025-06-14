import type { NextConfig } from "next";


const isDeploy = process.env.NEXT_PUBLIC_DEPLOY === "true";

const nextConfig: NextConfig = {
  ...(isDeploy && { output: "export" }),
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
  
};


export default nextConfig;
