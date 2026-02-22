/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co"
      },
      {
        protocol: "https",
        hostname: "onlydanse.com"
      }
    ]
  },

  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
