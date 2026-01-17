/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true, // ✅ allow build even if TS errors exist
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ disable ESLint blocking
  },
};

module.exports = nextConfig;
