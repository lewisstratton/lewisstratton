import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/sanity/imageLoader.ts",
  },
};

export default nextConfig;
