import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: "export",  //comentei isso pq estava dando erro no cadastro
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental : {
    optimizePackageImports: ["@chakra-ui/react"],
  }
};


export default nextConfig;
