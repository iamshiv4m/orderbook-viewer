import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  env: {
    NEXT_PUBLIC_API_RATE_LIMIT: process.env.NEXT_PUBLIC_API_RATE_LIMIT || "100",
    NEXT_PUBLIC_UPDATE_INTERVAL:
      process.env.NEXT_PUBLIC_UPDATE_INTERVAL || "2000",
    NEXT_PUBLIC_ENABLE_REAL_APIS:
      process.env.NEXT_PUBLIC_ENABLE_REAL_APIS || "true",
    NEXT_PUBLIC_ENABLE_MOCK_DATA:
      process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA || "true",
    NEXT_PUBLIC_ENABLE_WEBSOCKET:
      process.env.NEXT_PUBLIC_ENABLE_WEBSOCKET || "true",
  },
  images: {
    domains: ["www.okx.com", "api.bybit.com", "www.deribit.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
