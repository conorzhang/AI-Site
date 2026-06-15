import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/enterprise-ux-demo",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
