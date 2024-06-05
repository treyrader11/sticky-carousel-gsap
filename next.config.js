/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: `source.unsplash.com` },
      { hostname: `player.vimeo.com` },
    ],
  },
};

module.exports = nextConfig;
