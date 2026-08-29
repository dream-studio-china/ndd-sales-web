// 部署子目录：与 next.config.mjs 的 basePath 保持一致。
// 原生 <a> / window.location 跳转不会自动加 basePath，需用此常量拼接。
export const BASE_PATH = '/ndd'
export const baseUrl = (path) => `${BASE_PATH}${path}`