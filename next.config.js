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
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:id(\\d+)',
        destination: '/episodes/:id',
        permanent: true,
      },
      {
        source: '/episode/:slug',
        destination: '/episodes/:slug',
        permanent: true,
      },
      {
        source: '/episodes/:slug/amp',
        destination: '/episodes/:slug',
        permanent: true,
      }
    ];
  },
}

module.exports = withPWA(nextConfig)
