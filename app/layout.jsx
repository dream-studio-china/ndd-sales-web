import './globals.css'

export const metadata = {
  title: '销售领航 · 区域地图',
  description: '新会区销售战区可视化 — 交互式区域地图',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#071b22',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
