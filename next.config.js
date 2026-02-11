/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = process.env.GITHUB_REPO_NAME;
const repoPath = isGithubPages && repo ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: repoPath,
  assetPrefix: repoPath ? `${repoPath}/` : undefined,
};

module.exports = nextConfig;
