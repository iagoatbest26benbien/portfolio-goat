/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'user-images.githubusercontent.com',
      'repository-images.githubusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  },
  // Optimisations de performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
}

module.exports = nextConfig 