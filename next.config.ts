import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["az", "en", "ru"],
    defaultLocale: "az",
    localeDetection: false,
  },
  images: {
    domains: ["elita.markup.az"],
  },
};

export default nextConfig;
