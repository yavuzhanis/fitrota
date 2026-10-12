import type { NextConfig } from 'next';
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  experimental: {
    devtoolSegmentExplorer: false,
  },
};
export default config;
