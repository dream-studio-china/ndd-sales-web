import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import SeasonHighlighter from './SeasonHighlighter'
import { BASE_PATH } from '../../../src/config'
import HeroPreloader from '../../../src/HeroPreloader'

// nantan 蓝本页：原为独立静态 HTML（此前经 next.config rewrites 暴露）。
// 静态导出不支持 rewrites，改为真实路由页面：服务端读取静态 HTML，
// 仅提取 <style> 与 <body> 内部内容注入（避免嵌套 html/head），
// 内嵌 script 不会被 React 执行，改由客户端组件复刻高亮逻辑。

function loadHtml() {
  const candidates = [
    join(process.cwd(), 'public', BASE_PATH.replace(/^\//, ''), 'assets/nantan/nantan-origin.html'),
    join(process.cwd(), 'public/assets/nantan/nantan-origin.html'),
    join(process.cwd(), 'public/ndd/assets/nantan/nantan-origin.html'),
  ].filter(Boolean)

  for (const p of candidates) {
    if (p && existsSync(p)) return readFileSync(p, 'utf8')
  }
  // fallback: first candidate (will throw if missing)
  return readFileSync(candidates[0], 'utf8')
}

const html = loadHtml()
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)

let styleCss = styleMatch ? styleMatch[1] : ''
let bodyHtml = bodyMatch ? bodyMatch[1].replace(/<\/?(?:html|head|body)\b[^>]*>/g, '') : ''

// 动态替换硬编码的 /ndd/ 前缀为当前 BASE_PATH（兼容 Vercel 根部署）
// 需处理 style url()、href、src 等多种写法，且 BASE_PATH 为 '' 时避免产生 // 
if (BASE_PATH !== '/ndd') {
  const normalizedBase = BASE_PATH || ''
  const prefix = normalizedBase ? `${normalizedBase}/` : '/'
  styleCss = styleCss.replaceAll('/ndd/', prefix)
  // 统一替换所有 "/ndd/ 前缀（含 href/src/url）
  bodyHtml = bodyHtml.replaceAll('/ndd/', prefix)
}

export const metadata = { title: '南坦岛 · 新会陈皮产地志' }

export default function NantanPage() {
  const heroSrc = `${BASE_PATH}/assets/nantan/nantan-hero.webp`
  return (
    <>
      {/* 平衡预加载：首屏 Hero 立即高优（CSS 背景需显式 preload），其余低优空闲预取 */}
      <link rel="preload" as="image" href={heroSrc} imageSrcSet={heroSrc} fetchPriority="high" />
      <HeroPreloader currentSlug="nantan" />
      <style dangerouslySetInnerHTML={{ __html: styleCss }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SeasonHighlighter />
    </>
  )
}
