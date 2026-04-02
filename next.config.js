/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || process.env.PAGES_BASE_PATH;
const basePath = process.env.PAGES_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubActions ? basePath : '',
  assetPrefix: isGithubActions ? `${basePath}/` : '',
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;
