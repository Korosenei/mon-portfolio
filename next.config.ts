import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Nouvelle syntaxe (remplace images.domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jcutamijeeciwdwptxb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: true,
  },
  output: 'standalone',
  reactStrictMode: false,
};

export default nextConfig;