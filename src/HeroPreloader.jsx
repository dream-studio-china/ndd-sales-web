'use client'
import { useEffect } from 'react'
import { BASE_PATH } from './config'
import { regionStories } from './regionStories'

// 平衡预加载：在空闲时以 low 优先级预取全量 Hero（约 3.6MB → 压缩后约 2.2MB），首屏 Hero 已通过 priority 高优并行
export default function HeroPreloader({ currentSlug }) {
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = idle(() => {
      // 当前页的相邻 2 张优先，其他全量低优
      const idx = currentSlug ? regionStories.findIndex(s => s.slug === currentSlug) : -1
      const ordered = idx >= 0
        ? [regionStories[idx + 1], regionStories[idx - 1], ...regionStories.filter((_, i) => i !== idx && i !== idx + 1 && i !== idx - 1)].filter(Boolean)
        : regionStories
      // 额外加入 huicheng 与 nantan（不在 regionStories）
      const extra = [{ slug: 'huicheng-chenpi' }, { slug: 'nantan' }]
      const all = [...ordered, ...extra]
      let i = 0
      const loadNext = () => {
        if (i >= all.length) return
        const slug = all[i].slug
        const src = slug === 'huicheng-chenpi'
          ? `${BASE_PATH}/assets/regions/huicheng-chenpi.webp`
          : slug === 'nantan'
            ? `${BASE_PATH}/assets/nantan/nantan-hero.webp`
            : `${BASE_PATH}/assets/regions/${slug}-hero.webp`
        const img = new Image()
        // @ts-ignore
        if ('fetchPriority' in img) img.fetchPriority = 'low'
        img.decoding = 'async'
        img.loading = 'eager'
        img.src = src
        i++
        // 节流：每 120ms 预取一张，避免并发争用首屏
        setTimeout(loadNext, 120)
      }
      loadNext()
    }, { timeout: 2500 })
    return () => cancel(id)
  }, [currentSlug])
  return null
}
