# 销售领航 · 区域地图 (ndd-sales-web)

> 江门新会区销售战区可视化 — 基于 Next.js + React 的移动端优先交互式地图

![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-private-lightgrey)

## 项目简介

本项目是一张 **新会区销售区域地图** 的前端可视化应用，将 11 个主要片区 + 会城内部 8 个产区（共 19 个区域）以无缝拼接的矢量地图呈现。用户可通过拖拽/缩放/点击与地图交互，查看各片区的销售、目标进度、人员与增长数据。

设计风格为深色科技风，适配移动端 `viewport-fit=cover` 与安全区域，支持指针手势（单指拖拽、双指缩放、滚轮缩放、双击放大）。

- 标题：`销售领航 · 区域地图`
- 技术：Next.js 16 App Router + React 19
- 入口：`app/layout.jsx` → `app/page.jsx` → `src/App.jsx`

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.3.3 | App Router，Turbopack 构建 |
| React | 19.0.0 | 函数组件 + Hooks，需 `"use client"` |
| React DOM | 19.0.0 | 渲染 |
| 原生 CSS | — | `app/globals.css`，无框架依赖 |
| SVG / Canvas | — | 矢量区域 + Canvas 图片透明化处理 |

> 已从 Vite 迁移至 Next.js，详见下方「迁移说明」。

## 功能特性

- **完整无空隙地图**：所有区域共享同一坐标系，通过 `mapGeometry` 与 `mapOutline` 拼接为一张完整地图（`src/App.jsx:37`）。
- **19 个可交互区域**：11 个片区（司前/大泽/会城/三江/大鳌/罗坑/双水/崖门/古井/沙堆/睦洲）+ 8 个会城子产区（东甲/西甲/梅江/七堡/天禄/天马/南坦/茶坑）。
- **地图交互**：拖拽平移、双指捏合缩放、滚轮/按钮缩放、双击放大、复位按钮；边界约束保证拖动不超过视口 25%（`clampView`）。
- **选中态动效**：光晕 `aura-wave` / 脉冲环 / 旋转虚线轨道 / 粒子星火，随选中区域类型（`sub` 尺寸不同）自适应。
- **底部信息抽屉**：选中后滑入 `region-dock`，展示销售/目标进度/人数/增长率，支持关闭与震动反馈（`navigator.vibrate`）。
- **高清底图处理**：`TransparentMap` 通过 Canvas 将 `public/assets/sales-map-game-hd.webp` 的深青色背景像素置为透明，叠加于矢量层之下。
- **响应式**：移动端全屏（`100svh`），桌面端居中卡片（`560px`），横竖屏与小高度屏幕适配。

## 目录结构

```
ndd-sales-web/
├── app/
│   ├── layout.jsx          # Root Layout，定义 metadata/viewport，引入 globals.css
│   ├── page.jsx            # 客户端入口 ("use client")，渲染 src/App.jsx
│   └── globals.css         # 全局样式与动效（原 src/styles.css）
├── public/
│   └── assets/
│       └── sales-map-game-hd.webp  # 高清底图资源
├── src/
│   └── App.jsx             # 核心：数据定义、地图、交互、详情页 ("use client")
├── next.config.mjs         # Next.js 配置
├── package.json            # 依赖与脚本
└── .next/                  # 构建产物（next build 生成）
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm / yarn / pnpm

### 安装

```bash
npm install
```

### 本地开发

```bash
npm run dev
# 默认 http://localhost:3000
```

### 构建

```bash
npm run build
```

### 生产预览

```bash
npm run start
# 需先执行 npm run build
```

### 代码检查

```bash
npm run lint
```

### 验证环境

- Node `v22.23.1` + npm `10.9.8` 下 `npm run build` 已通过（Next.js 16.3.3 Turbopack，`✓ Compiled successfully`，静态路由 `○ /`）

## 核心代码说明

### `src/App.jsx` (`"use client"`)

- `regions: Array` — 区域静态数据（`id/name/short/x/y/w/h/color/icon/sales/target/reps/trend/path`），`kind: 'sub'` 标记子产区。
- `mapGeometry: Record<string, {d, lx, ly}>` — 每个区域的 SVG `path` 与标签锚点坐标（归一化 0–100）。
- `mapOutline: string` — 整体外轮廓闭合路径，用于 `clipPath` 与描边。
- `Icon` — 轻量 SVG 图标集（back/bell/search/pin/chart/people/arrow/map/home/trophy/user/close）。
- `MapRegion` — 区域标签按钮（`--region` CSS 变量传递颜色）。
- `TransparentMap` — Canvas 透明化处理组件。
- `Overview` — 主视图：手势状态机（`pointers/startView/startDistance`）、`clampScale/clampView/zoomBy`、SVG 领地层、道路虚线、地形纹理、选中动效、缩放控件与信息抽屉。
- `RegionDetail` — 预留的战区详情页（任务看板/团队卡片/悬浮录入按钮），当前 `App` 仅渲染 `Overview`。

### `app/layout.jsx`

- 服务端组件，导出 `metadata`（title/description）与 `viewport`（themeColor/viewportFit）。
- 引入 `app/globals.css`，包裹 `<html lang="zh-CN">`。

### `app/globals.css`

- CSS 变量：`--lime #bdf44b` / `--mint #30e89d` / `--panel`。
- 背景：多层径向渐变 + 点阵/同心圆纹理 + 模糊光斑（`ambient-one/two`）。
- 地图舞台：`map-stage` 以 `transform: translate3d + scale` 实现硬件加速平移缩放。
- 动效：`ambient-drift` / `radar` / `float` / `aura-wave` / `ring-pop` / `sparks` / `orbit` / `dock-in`，均在 `prefers-reduced-motion: no-preference` 下生效。

## 地图数据格式

```js
{
  id: 'huicheng',       // 唯一标识，对应 mapGeometry key
  name: '会城片区',      // 全称
  short: '会城',         // 标签简称
  kind: 'sub',          // 可选，子产区标记
  x, y, w, h,           // 预留布局参数（当前标签定位使用 mapGeometry.lx/ly）
  color: '#18a46e',     // 区域主色
  icon: '🏮',            // 地标 emoji
  sales: 126,           // 本月销售（万）
  target: 140,          // 目标（万）
  reps: 18,             // 销售人数
  trend: '+18.6%',      // 增长率
  path: 'M...'          // 预留路径（当前渲染使用 mapGeometry.d）
}
```

## 迁移说明（Vite → Next.js）

| 变更项 | 之前 (Vite) | 之后 (Next.js) |
|--------|-------------|----------------|
| 框架 | `vite@6.4.3` SPA | `next@16.3.3` App Router |
| 入口 | `index.html` + `src/main.jsx` (`createRoot`) | `app/layout.jsx` + `app/page.jsx` |
| 样式 | `src/styles.css` 由 `main.jsx` 引入 | `app/globals.css` 由 `layout.jsx` 引入 |
| 脚本 | `vite` / `vite build` / `vite preview` | `next dev` / `next build` / `next start` |
| 产物 | `dist/` | `.next/` |
| 组件 | 无需指令 | `src/App.jsx` 与 `app/page.jsx` 顶部添加 `"use client"` |

如需回滚，恢复 `index.html`/`src/main.jsx`/`src/styles.css` 并将 `package.json` 依赖切回 `vite` 即可。

## 浏览器支持

- 现代浏览器（Chrome/Edge/Firefox/Safari 最新版）
- 移动端 Safari / Chrome（支持 `env(safe-area-inset-*)` 与 Pointer Events）

## 后续规划

- [ ] 接入真实接口替换静态 `regions` 数据
- [ ] `RegionDetail` 路由打通（`app/region/[id]/page.jsx`）
- [ ] 搜索与筛选（按名称/进度/增长率）
- [ ] 埋点与分享

## 许可证

私有项目，未声明开源许可。

---

如有问题请提交 Issue 或联系维护者。
