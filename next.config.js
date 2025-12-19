/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2j3yisnywcb30.cloudfront.net',
        pathname: '/pix/**',
      },
    ],
  },
};

module.exports = nextConfig;
