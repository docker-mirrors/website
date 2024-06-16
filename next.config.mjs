/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    serverActions: {
      allowedOrigins: [process.env.DOCK_HUB_HOST, process.env.GITHUB_HOST],
    },
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

export default nextConfig;
