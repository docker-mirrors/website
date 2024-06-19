import withMDX from '@next/mdx'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const mdxs = {
  en: readFileSync(resolve(import.meta.dirname, 'README.md'), { encoding: 'utf-8' }),
  zh: readFileSync(resolve(import.meta.dirname, 'README.CN.md'), { encoding: 'utf-8' }),
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '/repo-logos/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
  env: {
    mdxs: JSON.stringify(mdxs)
  },
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    serverActions: {
      allowedOrigins: [process.env.DOCK_HUB_HOST, process.env.GITHUB_HOST],
    },
    mdxRs: true
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
};

export default withMDX({
  extension: /\.(md|mdx)$/,
})(nextConfig);
