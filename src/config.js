// 部署子目录：与 next.config.mjs 的 basePath 保持一致。
// 原生 <a> / window.location 跳转不会自动加 basePath，需用此常量拼接。
// 优先级：NEXT_PUBLIC_BASE_PATH / BASE_PATH > VERCEL 自动判断 > 默认 '/ndd'（纯静态）
const getRaw = () => {
  if (typeof process === 'undefined') return undefined
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) return process.env.NEXT_PUBLIC_BASE_PATH
  if (process.env.BASE_PATH !== undefined) return process.env.BASE_PATH
  if (process.env.VERCEL) return ''
  return undefined
}
const raw = getRaw()
export const BASE_PATH = raw !== undefined ? raw : '/ndd'
export const baseUrl = (path) => `${BASE_PATH}${path}`
export const assetUrl = (path) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
