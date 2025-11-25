import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {}
})

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
  images: {
    // mantenés tus remotePatterns
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
    // y esto evita problemas con next/image en export estático
    unoptimized: true
  }
}

export default withMDX(nextConfig)
