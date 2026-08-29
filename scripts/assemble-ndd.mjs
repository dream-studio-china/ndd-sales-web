import { cpSync, mkdirSync, rmSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH
const basePath = raw !== undefined ? raw : (process.env.VERCEL ? '' : '/ndd')

const root = resolve(import.meta.dirname, '..')
const out = resolve(root, 'out')

function dirBytes(path) {
  let total = 0
  if (statSync(path).isFile()) return statSync(path).size
  for (const entry of readdirSync(path)) {
    total += dirBytes(join(path, entry))
  }
  return total
}

function htaccessFor(prefix) {
  const p = prefix || ''
  const base = p || '/'
  const errDoc = p ? `${p}/404.html` : '/404.html'
  const rewriteBase = p || '/'
  const regionRule = p ? `^${p}/regions/[^/]+$` : `^/regions/[^/]+$`
  return `# ndd-sales-web · 纯静态 Apache 部署${p ? `（${p} 子目录）` : '（根目录）'}
# 产物为 ${p ? `out${p}/` : 'out/'}，整目录上传到服务器 ${base} 即可
# 对应 next.config.mjs: output='export', trailingSlash=true, basePath='${p}'

DirectoryIndex index.html
Options -Indexes
DirectorySlash On

# 404 兜底（静态导出已生成 404.html）
ErrorDocument 404 ${errDoc}

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${rewriteBase}/

  # 兼容无尾斜杠访问：${p || ''}/regions/huicheng -> ${p || ''}/regions/huicheng/
  # trailingSlash:true 下真实文件为 regions/huicheng/index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} ${regionRule}
  RewriteRule ^(.*)$ $1/ [R=301,L]
</IfModule>

# 长缓存：Next 哈希资源 + 图片字体
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  # _next/static 哈希文件名可强缓存；HTML 不缓存
  <FilesMatch "\\.(js|css|webp|png|jpg|jpeg|svg|woff2?)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 禁止访问敏感文件
<FilesMatch "^\\.">
  Require all denied
</FilesMatch>
<FilesMatch "(__next|_next\\.txt)">
  Require all denied
</FilesMatch>

# 压缩
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
`
}

if (!existsSync(out)) {
  console.log('[assemble] out 目录不存在，跳过组装')
  process.exit(0)
}

if (!basePath || basePath === '/') {
  // Vercel / 根部署：out 即为最终产物，无需组装子目录
  const ht = htaccessFor('')
  writeFileSync(join(out, '.htaccess'), ht)
  let size = 0
  for (const entry of readdirSync(out)) {
    if (entry === '.htaccess') continue
    size += dirBytes(join(out, entry))
  }
  console.log('[assemble] 检测到 basePath 为空（Vercel/根部署），跳过 out/ndd 组装')
  console.log(`[assemble] out 已为根部署目录，体积约 ${(size / 1024 / 1024).toFixed(1)} MB`)
  console.log('[assemble] 已生成 out/.htaccess（根部署）')
  process.exit(0)
}

// basePath='/ndd' 等子目录：组装为自包含 out/<basePath> 部署目录
const cleanName = basePath.replace(/^\//, '')
const target = resolve(out, cleanName)

mkdirSync(target, { recursive: true })
for (const entry of readdirSync(target)) {
  if (entry !== 'assets' && entry !== '.htaccess') rmSync(join(target, entry), { recursive: true, force: true })
}

let size = 0
for (const entry of readdirSync(out)) {
  if (entry === cleanName) continue
  const source = join(out, entry)
  cpSync(source, join(target, entry), { recursive: true })
  size += dirBytes(source)
}

// 生成子目录专属 .htaccess
writeFileSync(join(target, '.htaccess'), htaccessFor(basePath))
writeFileSync(join(out, '.htaccess'), htaccessFor(basePath))

console.log(`[assemble] out/${cleanName} 已组装为自包含部署目录 (basePath=${basePath})`)
console.log(`[assemble] 部署体积约 ${(size / 1024 / 1024).toFixed(1)} MB（上传 out/${cleanName} 内容到服务器 ${basePath}/）`)
