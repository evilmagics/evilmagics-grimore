/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'phowtdshnvuegykpnoxg.supabase.co',
      },
    ],
  },
};

export default nextConfig;
