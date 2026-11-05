import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [],
  output: 'standalone',
  distDir: process.env.NEXT_DIST_DIR || '.next',
};
export default nextConfig;
