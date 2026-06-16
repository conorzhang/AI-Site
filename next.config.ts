import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = configuredBasePath === undefined ? "/enterprise-ux-demo" : configuredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
