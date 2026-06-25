import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/surrendasoft-logistics-portal";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? repoBasePath : undefined,
  assetPrefix: isGithubPages ? repoBasePath : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
