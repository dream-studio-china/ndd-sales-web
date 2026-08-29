// 部署子目录：与 next.config.mjs 的 basePath 保持一致。
// 由 next.config.mjs 通过 env.NEXT_PUBLIC_BASE_PATH 注入，Vercel 时为 ''，纯静态默认 '/ndd'。
// 原生 <a> / window.location 跳转不会自动加 basePath，需用此常量拼接。
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/ndd'
export const baseUrl = (path) => `${BASE_PATH}${path}`
export const assetUrl = (path) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
