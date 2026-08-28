/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/regions/nantan',
        destination: '/assets/nantan/nantan-origin.html',
      },
    ]
  },
}

export default nextConfig
