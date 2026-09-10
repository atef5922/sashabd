import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/static-image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
