import { cpSync, mkdirSync, rmSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

// basePath='/ndd' 静态导出后，Next 将页面引用写成 /ndd/_next/... 与 /ndd/assets/...，
// 但产物 _next 在 out/_next、public 资源在 out/ndd/assets。
// 这里把 out/ 组装成自包含的 out/ndd/ 部署目录（直接整目录上传到服务器 /ndd/）。
const root = resolve(import.meta.dirname, '..')
const out = resolve(root, 'out')
const target = resolve(out, 'ndd')

// 清空并重建 out/ndd（保留已生成的 assets）
mkdirSync(target, { recursive: true })
for (const entry of readdirSync(target)) {
  if (entry !== 'assets') rmSync(join(target, entry), { recursive: true, force: true })
}

let size = 0
for (const entry of readdirSync(out)) {
  if (entry === 'ndd') continue
  const source = join(out, entry)
  cpSync(source, join(target, entry), { recursive: true })
  size += dirBytes(source)
}

console.log('[assemble] out/ndd 已组装为自包含部署目录')
console.log(`[assemble] 部署体积约 ${(size / 1024 / 1024).toFixed(1)} MB（上传 out/ndd 内容到服务器 /ndd/）`)

function dirBytes(path) {
  let total = 0
  if (statSync(path).isFile()) return statSync(path).size
  for (const entry of readdirSync(path)) {
    total += dirBytes(join(path, entry))
  }
  return total
}