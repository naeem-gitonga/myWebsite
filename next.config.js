/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
