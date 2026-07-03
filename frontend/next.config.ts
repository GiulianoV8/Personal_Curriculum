import type { NextConfig } from "next";

const repoName = "Personal_Curriculum";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? `/${repoName}` : "";
const assetPrefix = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
};

export default nextConfig;
