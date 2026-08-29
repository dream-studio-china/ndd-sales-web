import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import SeasonHighlighter from './SeasonHighlighter'
import { BASE_PATH } from '../../../src/config'

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
let bodyHtml = bodyMatch ? bodyMatch[1].replace(/<\/?(?:html|head|body)[^>]*>/g, '') : ''

// 动态替换硬编码的 /ndd/ 前缀为当前 BASE_PATH（兼容 Vercel 根部署）
if (BASE_PATH !== '/ndd') {
  styleCss = styleCss.replaceAll('/ndd/', `${BASE_PATH}/`)
  bodyHtml = bodyHtml.replaceAll('"/ndd/', `"${BASE_PATH}/`)
  bodyHtml = bodyHtml.replaceAll("'/ndd/", `'${BASE_PATH}/`)
  bodyHtml = bodyHtml.replaceAll('href="/ndd/', `href="${BASE_PATH}/`)
}

export const metadata = { title: '南坦岛 · 新会陈皮产地志' }

export default function NantanPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleCss }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SeasonHighlighter />
    </>
  )
}
