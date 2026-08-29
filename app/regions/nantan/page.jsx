import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import SeasonHighlighter from './SeasonHighlighter'

// nantan 蓝本页：原为独立静态 HTML（此前经 next.config rewrites 暴露）。
// 静态导出不支持 rewrites，改为真实路由页面：服务端读取静态 HTML，
// 仅提取 <style> 与 <body> 内部内容注入（避免嵌套 html/head），
// 内嵌 script 不会被 React 执行，改由客户端组件复刻高亮逻辑。
const html = readFileSync(join(process.cwd(), 'public/assets/nantan/nantan-origin.html'), 'utf8')
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)

const styleCss = styleMatch ? styleMatch[1] : ''
const bodyHtml = bodyMatch ? bodyMatch[1].replace(/<\/?(?:html|head|body)[^>]*>/g, '') : ''

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