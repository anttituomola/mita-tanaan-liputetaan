/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: false
  },
  async redirects() {
    return [
      {
        source: '/kaikkiSuomenLiputuspaivat',
        destination: '/kaikki-suomen-liputuspäivät',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
