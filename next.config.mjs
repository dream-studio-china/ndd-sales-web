/** @type {import('next').NextConfig} */
// BASE_PATH 可选：
// - 纯静态 Apache 默认 '/ndd'  (out/ndd 自包含目录)
// - Vercel 默认 '' (根域名)
// 优先级：NEXT_PUBLIC_BASE_PATH > BASE_PATH > 自动判断(Vercel 时为 ''，否则 '/ndd')
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH
const basePath = rawBasePath !== undefined
  ? rawBasePath
  : (process.env.VERCEL ? '' : '/ndd')

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
}

export default nextConfig
