import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nik-be.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
  serverExternalPackages: ['pdfkit'],
  transpilePackages: ['lucide-react', 'framer-motion'],
};

export default nextConfig;
