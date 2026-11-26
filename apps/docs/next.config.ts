import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@kreattix-ui/tokens', '@kreattix-ui/theme', '@kreattix-ui/react', '@kreattix-ui/sections'],
};

export default nextConfig;
