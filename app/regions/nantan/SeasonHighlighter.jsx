'use client'

import { useEffect } from 'react'

// 复刻 nantan 原静态页内联的季节高亮脚本（注入的 script 不会被 React 执行）。
export default function SeasonHighlighter() {
  useEffect(() => {
    const items = document.querySelectorAll('.season-item')
    if (!items.length) return
    const m = new Date().getMonth() + 1
    let activeIndex = -1
    if (m >= 8 && m <= 9) activeIndex = 0
    else if (m >= 10 && m <= 11) activeIndex = 1
    else if (m === 12) activeIndex = 2
    else if (m === 1) activeIndex = 3
    if (activeIndex >= 0) {
      for (let i = 0; i < items.length; i++) items[i].classList.remove('active')
      items[activeIndex].classList.add('active')
    }
  }, [])
  return null
}