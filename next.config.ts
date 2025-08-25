import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the workspace root to silence the lockfile warning
  outputFileTracingRoot: __dirname,
  
  // Optimize for production
  experimental: {
    optimizePackageImports: ['@privy-io/react-auth', 'ethers', 'framer-motion']
  },
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_CHAIN_NAME: process.env.NEXT_PUBLIC_CHAIN_NAME,
  }
};

export default nextConfig;
