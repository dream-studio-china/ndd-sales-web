/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [{
        source: '/regions/nantan',
        destination: '/assets/nantan/nantan-origin.html',
      }],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
