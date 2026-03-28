import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {}
})

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  /*   output: 'export', // 👈 esto activa el static export en next build*/
  eslint: {
    ignoreDuringBuilds: true
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  sassOptions: {
    compiler: 'modern',
    silenceDeprecations: ['legacy-js-api']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/devicons/devicon/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'vitejs.dev',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**'
      }
    ],
  }
}

export default withMDX(nextConfig)
