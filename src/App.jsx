'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { baseUrl, BASE_PATH } from './config'

const regions = [
  { id: 'siqian', name: '司前片区', short: '司前', x: 1, y: 25, w: 24, h: 20, color: '#208d63', icon: '🥥', sales: 82, target: 92, reps: 12, trend: '+12.4%', farms: 32, heat: 86, path: 'M7 12 25 3l21 7 4 25-12 29-27-7L2 38Z' },
  { id: 'daze', name: '大泽片区', short: '大泽', x: 17, y: 16, w: 25, h: 18, color: '#70aa43', icon: '🍊', sales: 64, target: 80, reps: 9, trend: '+8.2%', farms: 28, heat: 72, path: 'M4 24 11 7l26-5 13 19-9 28-29-2L1 36Z' },
  { id: 'huicheng', name: '会城片区', short: '会城', x: 38, y: 5, w: 37, h: 30, color: '#18a46e', icon: '🏮', sales: 126, target: 140, reps: 18, trend: '+18.6%', farms: 58, heat: 93, path: 'M5 25 18 3l25 2 8 14-2 34-16 19-23-7L1 43Z' },
  { id: 'sanjiang', name: '三江片区', short: '三江', x: 61, y: 36, w: 24, h: 23, color: '#168f6b', icon: '🐉', sales: 97, target: 110, reps: 13, trend: '+15.1%', farms: 36, heat: 81, path: 'M9 4 34 1l15 21-4 30-27 10L2 43 1 18Z' },
  { id: 'daao', name: '大鳌片区', short: '大鳌', x: 82, y: 27, w: 17, h: 20, color: '#38a65d', icon: '🌽', sales: 55, target: 72, reps: 7, trend: '+5.7%', farms: 21, heat: 68, path: 'M14 2 39 10l8 25-15 31L5 55 1 18Z' },
  { id: 'luokeng', name: '罗坑片区', short: '罗坑', x: 8, y: 43, w: 28, h: 20, color: '#399e5e', icon: '🌸', sales: 71, target: 76, reps: 10, trend: '+21.3%', farms: 26, heat: 88, path: 'M4 7 34 1l15 23-7 27-29 8L1 39Z' },
  { id: 'shuangshui', name: '双水片区', short: '双水', x: 29, y: 57, w: 27, h: 21, color: '#299765', icon: '🌾', sales: 89, target: 100, reps: 11, trend: '+11.8%', farms: 34, heat: 84, path: 'M7 3 40 5l10 27-19 29L5 53 1 21Z' },
  { id: 'yamen', name: '崖门片区', short: '崖门', x: 37, y: 75, w: 31, h: 23, color: '#16885f', icon: '🗼', sales: 88, target: 105, reps: 10, trend: '+10.8%', farms: 31, heat: 79, path: 'M8 2 38 4l12 22-4 29-19 22L7 63 1 26Z' },
  { id: 'gujing', name: '古井片区', short: '古井', x: 56, y: 61, w: 24, h: 25, color: '#188d63', icon: '🏯', sales: 104, target: 118, reps: 14, trend: '+16.9%', farms: 42, heat: 90, path: 'M7 3 38 4l11 25-6 31-24 14L3 57 1 23Z' },
  { id: 'shadui', name: '沙堆片区', short: '沙堆', x: 73, y: 55, w: 23, h: 25, color: '#23965d', icon: '🦐', sales: 68, target: 82, reps: 8, trend: '+7.9%', farms: 29, heat: 75, path: 'M10 2 41 9l8 25-10 30-26 8L2 48 1 20Z' },
  { id: 'muzhou', name: '睦洲片区', short: '睦洲', x: 82, y: 41, w: 17, h: 20, color: '#2c995a', icon: '🍠', sales: 76, target: 90, reps: 8, trend: '+9.6%', farms: 33, heat: 82, path: 'M12 2 41 9l8 27-13 31-25-9L1 26Z' },
  { id: 'dadong', kind: 'sub', name: '大洞产区', short: '大洞', x: 53, y: 8, w: 12, h: 9, color: '#45b47a', icon: '✦', sales: 12, target: 15, reps: 2, trend: '+10.2%', farms: 5, heat: 73, path: 'M4 9 30 2l18 17-8 30-27 7L1 31Z' },
  { id: 'dongjia', kind: 'sub', name: '东甲产区', short: '东甲', x: 60, y: 8, w: 14, h: 10, color: '#4dba79', icon: '✦', sales: 18, target: 22, reps: 3, trend: '+13.2%', farms: 9, heat: 77, path: 'M5 12 23 2l23 8 4 28-18 28L5 53 1 26Z' },
  { id: 'xijia', kind: 'sub', name: '西甲产区', short: '西甲', x: 64, y: 18, w: 13, h: 10, color: '#42ad71', icon: '✦', sales: 16, target: 20, reps: 3, trend: '+8.8%', farms: 8, heat: 71, path: 'M7 5 38 3l12 22-8 36-29 7L1 37Z' },
  { id: 'meijiang', kind: 'sub', name: '梅江产区', short: '梅江', x: 36, y: 20, w: 15, h: 10, color: '#4ab678', icon: '✦', sales: 15, target: 18, reps: 2, trend: '+15.6%', farms: 7, heat: 83, path: 'M5 7 34 1l15 23-8 37-28 7L1 36Z' },
  { id: 'qibao', kind: 'sub', name: '七堡产区', short: '七堡', x: 27, y: 28, w: 14, h: 11, color: '#3da86d', icon: '✦', sales: 14, target: 17, reps: 2, trend: '+6.4%', farms: 6, heat: 69, path: 'M4 9 35 2l15 24-9 35-28 6L1 35Z' },
  { id: 'tianlu', kind: 'sub', name: '天禄产区', short: '天禄', x: 46, y: 27, w: 14, h: 10, color: '#48b274', icon: '✦', sales: 17, target: 21, reps: 3, trend: '+12.1%', farms: 8, heat: 80, path: 'M8 2 39 6l11 24-9 32-28 5L1 34Z' },
  { id: 'tianma', kind: 'sub', name: '天马产区', short: '天马', x: 58, y: 30, w: 14, h: 10, color: '#36a26a', icon: '✦', sales: 19, target: 23, reps: 3, trend: '+19.3%', farms: 10, heat: 89, path: 'M5 8 36 2l14 25-9 34-29 5L1 35Z' },
  { id: 'nantan', kind: 'sub', name: '南坦产区', short: '南坦', x: 34, y: 36, w: 15, h: 10, color: '#319d66', icon: '✦', sales: 13, target: 16, reps: 2, trend: '+9.7%', farms: 7, heat: 74, path: 'M4 7 35 1l15 25-8 34-29 7L1 36Z' },
  { id: 'chakeng', kind: 'sub', name: '茶坑产区', short: '茶坑', x: 46, y: 40, w: 14, h: 10, color: '#279562', icon: '✦', sales: 16, target: 19, reps: 2, trend: '+11.5%', farms: 8, heat: 78, path: 'M6 3 38 5l12 23-9 34-29 5L1 34Z' },
]

const documentedRegionIds = new Set([
  'huicheng', 'siqian', 'daze', 'sanjiang', 'shuangshui', 'yamen', 'gujing', 'shadui', 'muzhou',
  'dadong', 'dongjia', 'meijiang', 'qibao', 'tianlu', 'tianma', 'nantan', 'chakeng',
])

// 会城（huicheng）不是产区，而是新会陈皮介绍页，顶部按钮引导进入，地图上隐藏。
const hiddenRegionIds = new Set(['huicheng'])
// 暂无独立产区介绍的区域：隐藏其地图名字标签（色块保留）。
const unnamedRegionIds = new Set(['daao', 'luokeng', 'xijia'])
const visibleRegions = regions.filter((region) => !hiddenRegionIds.has(region.id))
const labeledRegions = visibleRegions.filter((region) => !unnamedRegionIds.has(region.id))

// 所有区域使用同一套坐标系和共享顶点，组合后是一张无空隙的完整地图。
const mapGeometry = {
  huicheng: { d: 'M38 16 45 3 65 4 61 20 55 24 42 32Z', lx: 50, ly: 24 },
  dadong: { d: 'M52 6 61 5 64 11 59 16 51 14Z', lx: 58, ly: 10 },
  dongjia: { d: 'M65 4 75 15 70 28 61 20Z', lx: 68, ly: 12 },
  daze: { d: 'M20 20 38 16 42 32 34 43 18 38Z', lx: 29, ly: 28 },
  meijiang: { d: 'M42 32 55 24 50 37 43 47 34 43Z', lx: 44, ly: 36 },
  tianlu: { d: 'M55 24 61 20 70 28 60 36 50 37Z', lx: 59, ly: 29 },
  xijia: { d: 'M70 28 79 42 71 44 60 36Z', lx: 70, ly: 36 },
  siqian: { d: 'M3 38 18 38 34 43 28 60 12 62 3 52Z', lx: 16, ly: 49 },
  qibao: { d: 'M34 43 43 47 42 59 28 60Z', lx: 35, ly: 52 },
  tianma: { d: 'M50 37 60 36 71 44 79 42 72 56 62 48 42 59 43 47Z', lx: 55, ly: 48 },
  daao: { d: 'M79 42 98 38 96 62 78 70 72 56Z', lx: 87, ly: 52 },
  nantan: { d: 'M28 60 42 59 48 76 44 78 36 72Z', lx: 37, ly: 67 },
  chakeng: { d: 'M42 59 62 48 72 56 57 62 48 76Z', lx: 52, ly: 63 },
  luokeng: { d: 'M12 62 28 60 36 72 30 88 15 83Z', lx: 23, ly: 74 },
  sanjiang: { d: 'M48 76 57 62 72 56 78 70 78 86 64 96 55 89Z', lx: 65, ly: 77 },
  muzhou: { d: 'M78 70 96 62 99 85 92 98 78 86Z', lx: 89, ly: 79 },
  shuangshui: { d: 'M30 88 36 72 44 78 48 76 55 89 64 96 52 110 36 115 25 102Z', lx: 40, ly: 98 },
  shadui: { d: 'M64 96 78 86 92 98 89 120 72 127 76 108Z', lx: 79, ly: 108 },
  gujing: { d: 'M52 110 64 96 76 108 72 127 60 142 61 121Z', lx: 64, ly: 121 },
  yamen: { d: 'M36 115 52 110 61 121 60 142 50 150 38 138Z', lx: 49, ly: 134 },
}

const mapOutline = 'M45 3 Q55 1 65 4 Q72 7 75 15 L70 28 Q76 33 79 42 Q89 39 98 38 Q99 50 96 62 Q99 73 99 85 Q96 92 92 98 Q92 110 89 120 Q80 125 72 127 Q65 137 60 142 Q55 148 50 150 Q43 145 38 138 Q36 126 36 115 Q29 110 25 102 Q19 94 15 83 Q13 72 12 62 Q5 58 3 52 L3 38 Q10 37 18 38 Q17 28 20 20 Q28 18 38 16 Q41 8 45 3Z'

function Icon({ name, size = 20 }) {
  const paths = {
    back: <path d="m15 18-6-6 6-6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function MapRegion({ region, selected, onClick }) {
  const geometry = mapGeometry[region.id]
  return (
    <button
      className={`map-region ${region.kind === 'sub' ? 'is-subregion' : ''} ${selected ? 'is-selected' : ''}`}
      style={{ '--x': `${geometry.lx}%`, '--y': `${geometry.ly / 1.5}%`, '--region': region.color }}
      onClick={() => onClick(region)}
      aria-label={`进入${region.name}，当前产量${(region.sales * 1000).toLocaleString()}斤`}
    >
      <span className="region-landmark">{region.icon}</span>
      <span className="region-label">
        <span>{region.short}</span>
      </span>
    </button>
  )
}

function isMiniProgram() {
  if (typeof window === 'undefined') return false
  // 真实小程序环境
  if (window.__wxjs_environment === 'miniprogram') return true
  // 本地模拟：?mock=miniprogram 或 ?miniprogram 或 localStorage mockMiniProgram=1
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.get('mock') === 'miniprogram' || params.has('miniprogram') || params.has('mockMiniProgram')) return true
    if (window.localStorage?.getItem('mockMiniProgram') === '1') return true
  } catch {}
  return false
}

function jumpToMiniProgram(region) {
  const url = `/pages/sale/region?slug=${region.id}`
  try {
    if (window.wx?.miniprogram?.navigateTo) {
      window.wx.miniprogram.navigateTo({ url })
      return
    }
  } catch {}
  // 模拟环境：无真实 wx 对象时给出反馈，便于本地验证
  if (isMiniProgram()) {
    // 注入 mock wx 以便二次点击也能走真实分支
    try {
      window.wx = window.wx || {}
      window.wx.miniprogram = window.wx.miniprogram || {
        navigateTo: ({ url: u }) => {
          // eslint-disable-next-line no-alert
          alert(`[模拟小程序] 跳转 ${u || url}`)
          console.log('[mock miniprogram] navigateTo', u || url)
        },
      }
      window.wx.miniprogram.navigateTo({ url })
    } catch {
      // eslint-disable-next-line no-alert
      alert(`[模拟小程序] 跳转 ${url}`)
    }
  }
}

// 暴露调试切换到全局，便于控制台快速模拟
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.enableMockMiniProgram = () => {
    try { window.localStorage.setItem('mockMiniProgram', '1'); window.location.reload() } catch {}
  }
  // @ts-ignore
  window.disableMockMiniProgram = () => {
    try {
      window.localStorage.removeItem('mockMiniProgram')
      const url = new URL(window.location.href)
      url.searchParams.delete('mock'); url.searchParams.delete('miniprogram'); url.searchParams.delete('mockMiniProgram')
      window.history.replaceState({}, '', url.toString())
      window.location.reload()
    } catch {}
  }
}

let audioContext = null

function playClickSound() {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    audioContext = audioContext || new AudioCtx()
    if (audioContext.state === 'suspended') audioContext.resume()
    const now = audioContext.currentTime
    // 双音：主音 660Hz 短促发声 + 泛音 1320Hz，柔和衰减
    ;[660, 1320].forEach((freq, index) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      const start = now + index * 0.008
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.14 : 0.06, start + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18)
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.start(start)
      osc.stop(start + 0.2)
    })
  } catch {
    // 忽略音频不可用场景
  }
}

function TransparentMap({ onReady }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { willReadFrequently: true })
    const image = new Image()

    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, 0, 0)
      const frame = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = frame.data

      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const isDarkTealBackground = red < 38 && green < 78 && blue < 90 && blue >= green * 0.9

        if (isDarkTealBackground) pixels[index + 3] = 0
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.putImageData(frame, 0, 0)
      onReady?.()
    }

    image.onerror = () => onReady?.()
    image.src = `${BASE_PATH}/assets/sales-map-game.webp`
    return () => { image.onload = null }
  }, [onReady])

  return <canvas ref={canvasRef} className="map-art" aria-hidden="true" />
}

function Overview({ onEnterRegion }) {
  const [selected, setSelected] = useState(null)
  const [mapReady, setMapReady] = useState(false)
  const [view, setView] = useState({ scale: 1.32, x: 0, y: 0 })
  const selectedGeometry = selected ? mapGeometry[selected.id] : null
  const mapSectionRef = useRef(null)
  const mapStageRef = useRef(null)
  const gesture = useRef({ pointers: new Map(), startView: null, startDistance: 0, startCenter: null, moved: false })

  const clampScale = (scale) => Math.min(2.5, Math.max(.82, scale))
  const clampView = (nextView) => {
    const section = mapSectionRef.current
    const stage = mapStageRef.current
    if (!section || !stage) return nextView

    const scale = clampScale(nextView.scale)
    const sectionWidth = section.clientWidth
    const sectionHeight = section.clientHeight
    const scaledWidth = stage.offsetWidth * scale
    const scaledHeight = stage.offsetHeight * scale
    // 拖到极限时，每一侧露出的背景都不能超过屏幕尺寸的 25%。
    const maxX = Math.max(0, scaledWidth / 2 - sectionWidth * .25)
    const maxY = Math.max(0, scaledHeight / 2 - sectionHeight * .25)

    return {
      scale,
      x: Math.min(maxX, Math.max(-maxX, nextView.x)),
      y: Math.min(maxY, Math.max(-maxY, nextView.y)),
    }
  }
  const zoomBy = (amount) => setView(current => clampView({ ...current, scale: current.scale + amount }))

  useEffect(() => {
    const keepMapInBounds = () => setView(current => clampView(current))
    window.addEventListener('resize', keepMapInBounds)
    return () => window.removeEventListener('resize', keepMapInBounds)
  }, [])

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const pointers = gesture.current.pointers
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    gesture.current.moved = false
    gesture.current.startView = view
    if (pointers.size === 1) gesture.current.startCenter = { x: event.clientX, y: event.clientY }
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]
      gesture.current.startDistance = Math.hypot(a.x - b.x, a.y - b.y)
      gesture.current.startCenter = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
    }
  }

  const handlePointerMove = (event) => {
    const state = gesture.current
    if (!state.pointers.has(event.pointerId)) return
    state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const points = [...state.pointers.values()]
    if (points.length === 1) {
      const dx = points[0].x - state.startCenter.x
      const dy = points[0].y - state.startCenter.y
      if (Math.abs(dx) + Math.abs(dy) > 5) state.moved = true
      setView(clampView({ ...state.startView, x: state.startView.x + dx, y: state.startView.y + dy }))
    } else if (points.length === 2) {
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
      const center = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      state.moved = true
      setView(clampView({
        scale: state.startView.scale * distance / state.startDistance,
        x: state.startView.x + center.x - state.startCenter.x,
        y: state.startView.y + center.y - state.startCenter.y,
      }))
    }
  }

  const handlePointerUp = (event) => {
    const state = gesture.current
    state.pointers.delete(event.pointerId)
    if (state.pointers.size === 1) {
      const remaining = [...state.pointers.values()][0]
      state.startView = view
      state.startCenter = remaining
    }
    if (state.pointers.size === 0) setTimeout(() => { state.moved = false }, 0)
  }

  const choose = (region) => {
    if (gesture.current.moved) {
      gesture.current.moved = false
      return
    }
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12)
    playClickSound()
    setSelected(region)
  }

  return (
    <main className="app-shell overview-screen">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Link className="chenpi-entry" href="/regions/huicheng" aria-label="了解新会陈皮">
        <span className="chenpi-entry-dot" aria-hidden="true" />
        <b>了解新会陈皮</b>
        <Icon name="arrow" size={14} />
      </Link>
      <section
        ref={mapSectionRef}
        className="map-section"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={() => zoomBy(.32)}
        onWheel={(event) => zoomBy(event.deltaY < 0 ? .12 : -.12)}
      >
        <div ref={mapStageRef} className="map-stage" style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }}>
          <div className="map-grid" />
          <div className="map-radar" />
          <TransparentMap onReady={() => setMapReady(true)} />
          <svg className="route-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M22 32 C35 25 48 27 57 31 S73 40 86 38 M22 53 C36 50 42 64 57 68 S74 61 86 61 M52 32 C48 45 51 55 63 60" />
          </svg>
          <svg className="territory-map" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid meet" aria-label="新会完整销售区域地图">
            <defs>
              <clipPath id="map-outline"><path d={mapOutline} /></clipPath>
              {visibleRegions.map(region => (
                <linearGradient key={region.id} id={`terrain-${region.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={region.color} />
                  <stop offset="1" stopColor="#11634f" />
                </linearGradient>
              ))}
              <linearGradient id="outline-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#43ad6e" />
                <stop offset=".52" stopColor="#23815d" />
                <stop offset="1" stopColor="#146348" />
              </linearGradient>
              <pattern id="terrain-dots" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r=".18" fill="#d8ffcb" opacity=".22" />
                <circle cx="4" cy="3.5" r=".12" fill="#062d27" opacity=".3" />
              </pattern>
            </defs>
            <path className="territory-base" d={mapOutline} />
            <g clipPath="url(#map-outline)">
              {visibleRegions.map(region => (
                <path
                  key={region.id}
                className={`territory-shape ${region.kind === 'sub' ? 'is-subregion' : ''} ${selected?.id === region.id ? 'is-selected' : ''}`}
                  style={{ '--region': region.color, '--terrain': `url(#terrain-${region.id})` }}
                  d={mapGeometry[region.id].d}
                  role="button"
                  tabIndex="0"
                  aria-label={`选择${region.name}`}
                  onClick={() => choose(region)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') choose(region)
                  }}
                />
              ))}
              <g className="map-roads" aria-hidden="true">
                <path d="M18 43 Q34 52 43 65 T59 91 Q67 108 58 137" />
                <path d="M39 20 Q51 34 64 43 T88 54" />
                <path d="M21 74 Q37 71 50 79 T82 92" />
              </g>
              <path className="terrain-texture" d={mapOutline} />
            </g>
            {selected && (
              <g
                key={`effect-${selected.id}`}
                className={`selection-effect ${selected.kind === 'sub' ? 'is-subregion' : ''}`}
                transform={`translate(${selectedGeometry.lx} ${selectedGeometry.ly})`}
                aria-hidden="true"
              >
                <circle className="selection-aura" r={selected.kind === 'sub' ? 6 : 12} />
                <circle className="selection-ring" r={selected.kind === 'sub' ? 3.5 : 8} />
                <circle className="selection-orbit" r={selected.kind === 'sub' ? 5 : 10.5} />
                <g className="selection-sparks">
                  <circle cx="-10" cy="-4" r=".7" />
                  <circle cx="9" cy="-7" r=".55" />
                  <circle cx="11" cy="5" r=".65" />
                  <circle cx="-8" cy="8" r=".5" />
                </g>
              </g>
            )}
            <path className="territory-outline" d={mapOutline} />
          </svg>
          {labeledRegions.map((region) => <MapRegion key={region.id} region={region} selected={selected?.id === region.id} onClick={choose} />)}
          <div className="map-compass"><b>N</b><i /></div>
        </div>

        {/* 地图加载态 */}
        <div className={`map-loading ${mapReady ? 'is-ready' : ''}`} aria-hidden={mapReady} role="status">
          <div className="map-loading-spinner" />
          <p>地图加载中…</p>
        </div>
      </section>

      <div className="zoom-controls" aria-label="地图缩放控制">
        <button aria-label="放大地图" onClick={() => zoomBy(.2)}>+</button>
        <button aria-label="缩小地图" onClick={() => zoomBy(-.2)}>−</button>
        <button className="zoom-reset" aria-label="复位地图" onClick={() => setView({ scale: 1.32, x: 0, y: 0 })}><span /></button>
      </div>

      {selected && (
        <section className="region-dock" key={selected.id} aria-live="polite">
            <div className="dock-grip" />
            <div className="dock-copy">
              <div><small>已选择产区</small><h3>{selected.name}</h3></div>
              <span className="trend">{selected.trend}</span>
              <button className="dock-close" aria-label="关闭区域信息" onClick={() => setSelected(null)}><Icon name="close" size={17} /></button>
            </div>
            <div className="dock-stats">
              <div><span>本月产量</span><strong>{(selected.sales * 1000).toLocaleString()}<small>斤</small></strong></div>
              <div><span>热度</span><strong>{selected.heat}<small>°</small></strong></div>
              <div><span>农场数</span><strong>{selected.farms}<small>家</small></strong></div>
              <div><span>达标率</span><strong>{Math.round(selected.sales / selected.target * 100)}<small>%</small></strong></div>
            </div>
            <div className="dock-actions">
              {isMiniProgram() && (
                <button className="dock-buy" onClick={() => jumpToMiniProgram(selected)}>立即购买 <Icon name="arrow" size={14} /></button>
              )}
              {documentedRegionIds.has(selected.id)
                ? <button className="dock-enter" onClick={() => onEnterRegion?.(selected)}>进入产区 <Icon name="arrow" size={14} /></button>
                : <div className="dock-unavailable">暂无独立产区介绍</div>}
            </div>
        </section>
      )}
    </main>
  )
}

function RegionDetail({ region, onBack }) {
  const completion = Math.round(region.sales / region.target * 100)
  const tasks = [
    { title: '重点客户回访', detail: '今日待跟进 8 家', done: 5 },
    { title: '新品铺货挑战', detail: '覆盖率提升至 85%', done: 7 },
    { title: '终端陈列巡检', detail: '还剩 3 个门店', done: 9 },
  ]
  return (
    <main className="app-shell detail-screen" style={{ '--region': region.color }}>
      <div className="detail-glow" />
      <header className="detail-header">
        <button className="icon-button" onClick={onBack} aria-label="返回地图"><Icon name="back" /></button>
        <span>产区详情</span>
        <button className="icon-button" aria-label="搜索"><Icon name="search" /></button>
      </header>
      <section className="region-hero">
        <div className="hero-grid" />
        <div className="hero-landmark">{region.icon}</div>
        <p><Icon name="pin" size={15} /> 江门 · 新会</p>
        <h1>{region.name}</h1>
        <span className="hero-pill">本月增长 {region.trend} · 热度 {region.heat}° · {region.farms} 家农场</span>
      </section>
      <section className="score-card">
        <div className="score-ring" style={{ '--score': `${completion * 3.6}deg` }}><span><b>{completion}</b>%</span></div>
        <div><small>本月产量</small><h2>{(region.sales * 1000).toLocaleString()} <span>/ {(region.target * 1000).toLocaleString()} 斤</span></h2><p>热度 {region.heat}° · {region.farms} 家农场在产</p></div>
      </section>
      <section className="detail-content">
        <div className="section-title"><div><small>MISSION BOARD</small><h2>今日产区任务</h2></div><button>全部任务</button></div>
        <div className="task-list">
          {tasks.map((task, index) => (
            <button className="task-card" key={task.title}>
              <span className="task-level">0{index + 1}</span>
              <div><h3>{task.title}</h3><p>{task.detail}</p><div className="task-progress"><i style={{ width: `${task.done * 10}%` }} /></div></div>
              <strong>{task.done}/10</strong>
            </button>
          ))}
        </div>
        <div className="team-card">
          <span className="team-icon"><Icon name="people" /></span>
          <div><small>产区小队</small><h3>{region.reps} 名成员 · {region.farms} 家农场</h3></div>
          <button><Icon name="arrow" /></button>
        </div>
      </section>
      <button className="floating-action"><span>+</span> 快速录入产量</button>
    </main>
  )
}

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null)
  const enterRegion = (region) => {
    if (documentedRegionIds.has(region.id)) {
      // trailingSlash:true 要求以 / 结尾，避免 308 重定向（尤其静态导出）
      window.location.assign(baseUrl(`/regions/${region.id}/`))
      return
    }
    setActiveRegion(region)
  }
  if (activeRegion) {
    return <RegionDetail region={activeRegion} onBack={() => setActiveRegion(null)} />
  }
  return <Overview onEnterRegion={enterRegion} />
}
