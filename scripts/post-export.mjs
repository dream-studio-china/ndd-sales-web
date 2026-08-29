import { cpSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// 静态导出后置处理：nantan 是独立静态 HTML（原由 next.config rewrites 暴露），
// 导出模式移除 rewrites 后，将其复制为 out/regions/nantan/index.html 保持路由可访问。
const root = resolve(import.meta.dirname, '..')
const outDir = resolve(root, 'out/regions/nantan')
const source = resolve(root, 'public/assets/nantan/nantan-origin.html')

mkdirSync(outDir, { recursive: true })
cpSync(source, resolve(outDir, 'index.html'))

console.log('[post-export] nantan → out/regions/nantan/index.html')