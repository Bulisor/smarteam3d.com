import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Portfolio BabylonJS apps live in public/portfolio/ and are served as static files
  // Folder demos load assets relatively, so send bare folder URLs to their index.html
  async redirects() {
    return [
      { source: '/portfolio/:name(car_mx5|truck|cabinet)', destination: '/portfolio/:name/index.html', permanent: false },
      { source: '/the3dfactory/hat', destination: '/the3dfactory/hat/index.html', permanent: false },
    ]
  },
  // Allow extensionless links (e.g. /portfolio/car_config, /the3dfactory/hat/index) to resolve to the .html file
  async rewrites() {
    return [
      { source: '/:path*/index', destination: '/:path*/index.html' },
      { source: '/portfolio/:name', destination: '/portfolio/:name.html' },
    ]
  },
}

export default nextConfig
