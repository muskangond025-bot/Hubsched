import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@swc/helpers"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
