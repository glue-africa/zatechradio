const withPWA = require("next-pwa")(
  {
    dest: "public",
    register: true,
    skipWaiting: true,
  }
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = withPWA(nextConfig)
