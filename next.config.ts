// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringDevMode: true,
  },
  // Keep your existing image configuration
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
