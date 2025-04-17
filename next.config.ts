import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: true,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
};

export default nextConfig;
