import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty = served from the domain root (own domain). Set NEXT_PUBLIC_BASE_PATH=/techwallet to serve under a sub-path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
