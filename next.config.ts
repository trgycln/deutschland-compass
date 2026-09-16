import type { NextConfig } from "next";
// @ts-expect-error next-pwa lacks type declarations
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);
