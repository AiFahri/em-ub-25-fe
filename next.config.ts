import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  basePath: "",

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: true,
    domains: ["em.ub.ac.id"],
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
