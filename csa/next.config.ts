import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compiler : {
    styledComponents : true
  }
};

// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   }
  
// }

export default nextConfig;
