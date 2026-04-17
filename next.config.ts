import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactive la vérification TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Images : autorise les domaines externes
  images: {
    domains: ['jcutamijeeciwdwptxb.supabase.co'],
    unoptimized: true,
  },
  // Pour le déploiement sur Vercel
  output: 'standalone',
  // Désactive le linting (via une variable d'env ou configuration séparée)
  // Pour ESLint, utilise un fichier .eslintrc.json séparé
};

export default nextConfig;