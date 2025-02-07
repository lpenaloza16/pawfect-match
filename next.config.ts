// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-take-home.fetch.com",
        pathname: "/dog-images/**",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
