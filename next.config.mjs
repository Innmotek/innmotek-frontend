/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fqrmvgfbrcgyszgefzlp.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/categories', destination: '/category', permanent: true },
      { source: '/radiators', destination: '/radiator-and-fancoil', permanent: true }
    ];
  }
};

export default nextConfig;
