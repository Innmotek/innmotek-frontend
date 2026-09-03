/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
