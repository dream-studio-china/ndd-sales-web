# 销售领航 · 区域地图 (ndd-sales-web)

> 江门新会区产区志可视化 — 基于 Next.js + React 的移动端优先交互式地图

![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-private-lightgrey)

## 项目简介

本项目是一张 **新会区产区全景地图** 的前端可视化应用，将 11 个主要片区 + 9 个会城及周边子产区（含新增 `大洞`）共 **20 个区域** 以无缝拼接的矢量地图呈现。交互层基于 `mapGeometry` / `mapOutline` 的归一化坐标（`src/App.jsx:28`），叠加 Canvas 透明化底图，支持拖拽/缩放/点击查看。

相较早期“销售战区”版本，当前已统一术语为 **产区**，指标由“销售/万”转为 **产量/斤 + 热度 + 农场数 + 达标率** 四列，并在地图抽屉与详情页中贯通。17 个已文档化产区可通过“进入产区”直达独立叙事页，未文档化产区显示占位。

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

- **完整无空隙地图**：所有区域共享同一坐标系，通过 `mapGeometry` 与 `mapOutline` 拼接为一张完整地图（`src/App.jsx:35`）。
- **20 个可交互区域**：11 个片区（司前/大泽/会城/三江/大鳌/罗坑/双水/崖门/古井/沙堆/睦洲）+ 9 个子产区（大洞/东甲/西甲/梅江/七堡/天禄/天马/南坦/茶坑），其中 `dadong` 为新增种源产区（`src/App.jsx:17`）。
- **地图交互**：拖拽平移、双指捏合缩放、滚轮/按钮缩放、双击放大、复位按钮；边界约束保证拖动不超过视口 25%（`clampView`）。
- **选中态动效**：光晕 `aura-wave` / 脉冲环 / 旋转虚线轨道 / 粒子星火，随选中区域类型（`sub` 尺寸不同）自适应。
- **底部信息抽屉**：`region-dock` 展示本月产量(斤)/热度/农场数/达标率；`documentedRegionIds`（`src/App.jsx:28`，17 个 id）控制分支：已文档化显示 `dock-enter`“进入产区”按钮，未文档化显示 `dock-unavailable`“暂无独立产区介绍”（`app/globals.css:176`）。
- **进入产区链路**：`Overview` 通过 `onEnterRegion` 回调至 `App.enterRegion`，对已文档化产区执行 `window.location.assign(/regions/${id})`（`src/App.jsx:393`），其余回落至内置 `RegionDetail`。
- **产区志体系**：
  - 通用动态路由 `app/regions/[slug]/page.jsx` 基于 `src/regionStories.js`（13 个产区的完整风土叙事：东甲/梅江/天马/茶坑/三江/七堡/天禄/古井/大泽/司前/沙堆/睦洲/大洞）渲染 4 章（来处/风土/柑香/入境）+ hero/价值/时令。
  - 定制页 `app/regions/shuangshui`（山地×平原双风土）与 `app/regions/yamen`（滨海咸田）为独立设计。
  - `app/regions/huicheng` 为陈皮通识页（五段成熟刻度与四季使用）。
  - `public/assets/nantan/nantan-origin.html` 经 `next.config.mjs:4` 的 `rewrites.beforeFiles` 映射至 `/regions/nantan`。
- **高清底图处理**：`TransparentMap` 通过 Canvas 将 `public/assets/sales-map-game-hd.webp` 的深青色背景像素置为透明，叠加于矢量层之下。
- **响应式**：移动端全屏（`100svh`），桌面端居中卡片（`560px`），横竖屏与小高度屏幕适配。

## 目录结构

```
ndd-sales-web/
├── app/
│   ├── layout.jsx                # Root Layout，定义 metadata/viewport，引入 globals.css
│   ├── page.jsx                  # 客户端入口 ("use client")，渲染 src/App.jsx
│   ├── globals.css               # 全局样式与动效（含 .dock-enter / .dock-unavailable）
│   └── regions/
│       ├── [slug]/               # 通用产区故事模板（13 个 slug）
│       │   ├── page.jsx          # generateStaticParams + storyBySlug 渲染
│       │   └── story.module.css
│       ├── huicheng/             # 陈皮通识页（五段刻度）
│       ├── shuangshui/           # 双水定制页（古兜山×潭江平原）
│       └── yamen/                # 崖门定制页（滨海咸田/富硒）
├── public/
│   └── assets/
│       ├── sales-map-game-hd.webp
│       ├── nantan/               # nantan-hero.png + nantan-origin.html（经 rewrites 暴露）
│       ├── shuangshui/orchard-hero.png
│       ├── yamen/estuary-hero.png
│       └── regions/              # 14 个 hero 视效（chakeng/dadong/daze/.../huicheng-chenpi.webp）
├── src/
│   ├── App.jsx                   # 核心：regions + mapGeometry + documentedRegionIds + Overview/RegionDetail
│   └── regionStories.js          # 13 产区风土叙事数据集（storyBySlug）
├── docs/
│   └── introduce/                # 18 份 docx 产区介绍（司前/大泽/.../新会陈皮）
├── next.config.mjs               # rewrites.beforeFiles 映射 /regions/nantan
├── package.json
└── .next/                        # 构建产物（next build 生成）
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

- `regions: Array` — 20 个区域静态数据（`id/name/short/x/y/w/h/color/icon/sales/target/reps/trend/farms/heat/path`），新增 `farms/heat` 与 `dadong`；`kind: 'sub'` 标记子产区。
- `documentedRegionIds: Set<string>`（`src/App.jsx:28`）— 17 个已文档化 id：`huicheng/siqian/daze/sanjiang/shuangshui/yamen/gujing/shadui/muzhou/dadong/dongjia/meijiang/qibao/tianlu/tianma/nantan/chakeng`，用于 dock 分支与跳转判定。
- `mapGeometry: Record<string, {d, lx, ly}>` — 每个区域的 SVG `path` 与标签锚点坐标（归一化 0–100），新增 `dadong`。
- `mapOutline: string` — 整体外轮廓闭合路径，用于 `clipPath` 与描边。
- `Icon` — 轻量 SVG 图标集（back/bell/search/pin/chart/people/arrow/map/home/trophy/user/close）。
- `MapRegion` — 区域标签按钮（`--region` CSS 变量传递颜色，`aria-label` 已改为产量/斤）。
- `TransparentMap` — Canvas 透明化处理组件。
- `Overview({onEnterRegion})` — 主视图：手势状态机（`pointers/startView/startDistance`）、`clampScale/clampView/zoomBy`、SVG 领地层、选中动效、缩放控件与信息抽屉（4 列 + 进入/占位分支）。
- `RegionDetail` — 内置详情回落页（数值为斤/热度/农场数，入口按钮已改为“快速录入产量”）。
- `App` — 顶层状态机，`documentedRegionIds.has(id)` 时走 `window.location.assign(/regions/${id})`，否则渲染 `RegionDetail`。

### `src/regionStories.js`

- `regionStories: Array` — 13 个产区的结构化叙事，每项含 `slug/name/mark/variant/motif/colors/eyebrow/headline/summary/foundation/facts/terroirTitle/terroirIntro/terrain/fruitName/fruitDescription/tasting/rank/valueTitle/valueCopy/journey`。
- `storyBySlug` — 以 `slug` 为键的索引，供 `[slug]` 模板与 `generateStaticParams` 使用。

### `app/regions/[slug]/page.jsx`

- 服务端组件，`generateStaticParams` 枚举 13 个 slug，`generateMetadata` 取 `summary`，`RegionStoryPage` 按 `variant/motif` 与 `colors` 主题渲染 hero/来处/风土/柑香/价值/入境/时令。

### `app/regions/huicheng/page.jsx` / `shuangshui` / `yamen` / `public/assets/nantan/nantan-origin.html`

- 定制叙事页：`huicheng` 聚焦陈皮五段成熟刻度；`shuangshui` 为山地×平原双风土；`yamen` 为滨海咸田与富硒；`nantan` 为静态 HTML 经 `next.config.mjs` rewrites 暴露。

### `app/layout.jsx`

- 服务端组件，导出 `metadata`（title/description）与 `viewport`（themeColor/viewportFit）。
- 引入 `app/globals.css`，包裹 `<html lang="zh-CN">`。

### `app/globals.css`

- CSS 变量：`--lime #bdf44b` / `--mint #30e89d` / `--panel`。
- 背景：多层径向渐变 + 点阵/同心圆纹理 + 模糊光斑（`ambient-one/two`）。
- 地图舞台：`map-stage` 以 `transform: translate3d + scale` 实现硬件加速平移缩放。
- 抽屉：`dock-stats` 已改为 4 列（`repeat(4,1fr)`），新增 `dock-enter`（渐变按钮）与 `dock-unavailable`（占位）。
- 动效：`ambient-drift` / `radar` / `float` / `aura-wave` / `ring-pop` / `sparks` / `orbit` / `dock-in`，均在 `prefers-reduced-motion: no-preference` 下生效。

## 地图数据格式

```js
{
  id: 'huicheng',       // 唯一标识，对应 mapGeometry key 与 documentedRegionIds
  name: '会城片区',
  short: '会城',
  kind: 'sub',          // 可选，子产区标记
  x, y, w, h,           // 预留布局参数（当前标签定位使用 mapGeometry.lx/ly）
  color: '#18a46e',
  icon: '🏮',
  sales: 126,           // 本月产量基数（展示为 sales*1000 斤）
  target: 140,
  reps: 18,
  trend: '+18.6%',
  farms: 58,            // 农场数（新增）
  heat: 93,             // 热度（新增，°）
  path: 'M...'          // 预留路径（当前渲染使用 mapGeometry.d）
}
```

## 路由总览

| 路径 | 类型 | 产物 |
|------|------|------|
| `/` | 客户端地图 | `src/App.jsx` Overview + dock 分支 |
| `/regions/shuangshui` | 定制 App Router 页 | `app/regions/shuangshui/page.jsx` |
| `/regions/yamen` | 定制 App Router 页 | `app/regions/yamen/page.jsx` |
| `/regions/huicheng` | 陈皮通识页 | `app/regions/huicheng/page.jsx` |
| `/regions/nantan` | 静态 HTML rewrites | `public/assets/nantan/nantan-origin.html` via `next.config.mjs:6` |
| `/regions/[slug]` | 通用动态页 (13) | `app/regions/[slug]/page.jsx` → `dongjia/meijiang/tianma/chakeng/sanjiang/qibao/tianlu/gujing/daze/siqian/shadui/muzhou/dadong` |

未在 `documentedRegionIds` 中的 `daao/luokeng/xijia` 暂落入内置 `RegionDetail`，抽屉显示“暂无独立产区介绍”。

## 产区内容体系

- 数据源：`src/regionStories.js` + `docs/introduce/*.docx`（18 份原始介绍，含新会陈皮总述）
- 视效资源：`public/assets/regions/*.webp`（13 个通用 hero）+ `shuangshui/yamen/nantan` 专属 hero
- 模板：`[slug]` 通用模板承载 13 个产区，`huicheng` 单独承载陈皮知识，`shuangshui/yamen` 为早期定制，`nantan` 为静态 HTML 过渡

## 迁移说明（Vite → Next.js）

| 变更项 | 之前 (Vite) | 之后 (Next.js) |
|--------|-------------|----------------|
| 框架 | `vite@6.4.3` SPA | `next@16.3.3` App Router |
| 入口 | `index.html` + `src/main.jsx` (`createRoot`) | `app/layout.jsx` + `app/page.jsx` |
| 样式 | `src/styles.css` 由 `main.jsx` 引入 | `app/globals.css` 由 `layout.jsx` 引入 |
| 脚本 | `vite` / `vite build` / `vite preview` | `next dev` / `next build` / `next start` |
| 产物 | `dist/` | `.next/` |
| 组件 | 无需指令 | `src/App.jsx` 与 `app/page.jsx` 顶部添加 `"use client"` |
| 路由 | 单页 | `/regions/*` 多页 + rewrites |

如需回滚，恢复 `index.html`/`src/main.jsx`/`src/styles.css` 并将 `package.json` 依赖切回 `vite` 即可。

## 浏览器支持

- 现代浏览器（Chrome/Edge/Firefox/Safari 最新版）
- 移动端 Safari / Chrome（支持 `env(safe-area-inset-*)` 与 Pointer Events）

## 后续规划

- [x] `RegionDetail` 路由打通（`app/regions/[slug]` + 定制页 + rewrites）
- [ ] 接入真实接口替换静态 `regions` / `regionStories` 数据
- [ ] 搜索与筛选（按名称/热度/达标率）
- [ ] 埋点与分享

## 许可证

私有项目，未声明开源许可。

---

如有问题请提交 Issue 或联系维护者。
