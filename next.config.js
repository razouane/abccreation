/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Images ────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },

  // ── Compression & Performance ──────────────────────────────
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  // ── Headers de sécurité & performance ─────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // ── Redirections SEO ────────────────────────────────────────
  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/accueil', destination: '/', permanent: true },
      { source: '/publicite', destination: '/impression-flyers-tunis', permanent: true },
      { source: '/bureau', destination: '/cartes-visite-tunis', permanent: true },
      { source: '/packaging', destination: '/packaging-personnalise-tunisie', permanent: true },
    ]
  },
}

module.exports = nextConfig
