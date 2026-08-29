# 销售领航 · 区域地图 (ndd-sales-web)

> 江门新会区产区志可视化 — 基于 Next.js + React 的移动端优先交互式地图

![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-private-lightgrey)

## 项目简介

本项目是一张 **新会区产区全景地图** 的前端可视化应用，将 11 个主要片区 + 9 个会城及周边子产区（含新增 `大洞`）共 **20 个区域** 以无缝拼接的矢量地图呈现。交互层基于 `mapGeometry` / `mapOutline` 的归一化坐标（`src/App.jsx:28`），叠加 Canvas 透明化底图，支持拖拽/缩放/点击查看。

相较早期“销售战区”版本，当前已统一术语为 **产区**，指标由“销售/万”转为 **产量/斤 + 热度 + 农场数 + 达标率** 四列，并在地图抽屉与详情页中贯通。17 个已文档化产区可通过“进入产区”直达独立叙事页，未文档化产区显示占位。

- 标题：`销售领航 · 区域地图`
- 技术：Next.js 16 App Router + React 19（`output: 'export'` 纯静态）
- 入口：`app/layout.jsx` → `app/page.jsx` → `src/App.jsx`

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.3.3 | App Router，Turbopack 构建，`output: 'export'` |
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
- **进入产区链路**：`Overview` 通过 `onEnterRegion` 回调至 `App.enterRegion`，对已文档化产区执行 `window.location.assign(baseUrl('/regions/${id}'))`（`src/App.jsx:448`，`baseUrl` 随 `basePath` 自动适配），其余回落至内置 `RegionDetail`。
- **产区志体系**：
  - 通用动态路由 `app/regions/[slug]/page.jsx` 基于 `src/regionStories.js`（15 个产区的完整风土叙事：东甲/梅江/天马/茶坑/三江/七堡/天禄/古井/大泽/司前/沙堆/睦洲/大洞/双水/崖门）渲染 4 章（来处/风土/柑香/入境）+ hero/价值/时令，`SeasonScale.jsx` 承载时令刻度。原 `shuangshui`/`yamen` 定制页已收口至该通用模板，hero 统一为 `public/assets/regions/shuangshui-hero.webp` / `yamen-hero.webp`。
  - `app/regions/huicheng` 为陈皮通识页（五段成熟刻度与四季使用），已拆分为 `ChenpiIntro.jsx` / `RipenessStages.jsx`。
  - `app/regions/nantan` 为真实路由页，服务端读取 `public/assets/nantan/nantan-origin.html` 并注入样式与内容（替代早期 `rewrites` 方案，兼容 `output: 'export'`）。
- **高清底图处理**：`TransparentMap` 通过 Canvas 将 `public/assets/sales-map-game.webp` 的深青色背景像素置为透明，叠加于矢量层之下。
- **响应式**：移动端全屏（`100svh`），桌面端居中卡片（`560px`），横竖屏与小高度屏幕适配。

## 目录结构

```
ndd-sales-web/
├── app/
│   ├── layout.jsx                # Root Layout，定义 metadata/viewport，引入 globals.css
│   ├── page.jsx                  # 客户端入口 ("use client")，渲染 src/App.jsx
│   ├── globals.css               # 全局样式与动效（含 .dock-enter / .dock-unavailable）
│   └── regions/
│       ├── [slug]/               # 通用产区故事模板（15 个 slug，含双水/崖门）
│       │   ├── page.jsx          # generateStaticParams + storyBySlug 渲染，图片 src 随 BASE_PATH 动态
│       │   ├── SeasonScale.jsx   # 成熟刻度/时令组件
│       │   └── story.module.css
│       ├── huicheng/             # 陈皮通识页（五段刻度）
│       │   ├── page.jsx
│       │   ├── page.module.css
│       │   ├── ChenpiIntro.jsx
│       │   └── RipenessStages.jsx
│       └── nantan/               # 南坦岛真实路由（读取 nantan-origin.html）
│           ├── page.jsx
│           └── SeasonHighlighter.jsx
├── public/
│   ├── .htaccess                 # Apache 静态部署模板（/ndd 子目录，构建时按 basePath 动态生成到 out）
│   └── assets/                   # 静态资源主份（Vercel 根部署直接使用）
│       ├── sales-map-game*.webp/png
│       ├── nantan/               # nantan-hero.png + nantan-origin.html
│       ├── regions/              # 16 个 hero
│       ├── shuangshui/           # orchard-hero.png
│       └── yamen/                # estuary-hero.png
│   └── ndd/assets/               # 子目录部署兼容份（与 assets 同步，out/ndd 自包含所需）
├── src/
│   ├── App.jsx                   # 核心：regions + mapGeometry + documentedRegionIds + Overview/RegionDetail
│   ├── config.js                 # BASE_PATH / baseUrl / assetUrl（由 next.config.mjs 注入）
│   └── regionStories.js          # 15 产区风土叙事数据集
├── scripts/
│   └── assemble-ndd.mjs          # basePath 感知组装：/ndd 时 out -> out/ndd 自包含，根时跳过并生成对应 .htaccess
├── docs/
│   └── introduce/                # 18 份 docx 产区介绍
├── next.config.mjs               # output:'export' + basePath 动态（NEXT_PUBLIC_BASE_PATH / VERCEL） + env 注入
├── package.json                  # build / build:static (/ndd) / build:vercel (/)
└── out/                          # 纯静态导出产物（npm run build 生成，out/ndd 为宝塔部署目录）
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
# 默认 http://localhost:3000/ndd/ （basePath=/ndd）
# 访问 http://localhost:3000/ndd/ 即可看到地图
```

### 构建

| 命令 | basePath | 产物 | 用途 |
|------|----------|------|------|
| `npm run build` | 自动：`VERCEL=1` 时 `''`，否则 `'/ndd'` | `out/` 或 `out/ndd` | 本地默认（等同 `build:static`） |
| `npm run build:static` | `'/ndd'` | `out/ndd/` | 宝塔 Apache 子目录部署 |
| `npm run build:vercel` | `''` | `out/` | Vercel 根域名部署 |
| `npm run build:static:root` | `''` | `out/` | 纯静态根部署（无子目录） |

```bash
# 宝塔子目录（默认）
npm run build:static
# Vercel 根域名
npm run build:vercel
```

### 生产预览

```bash
# 仅适用于未使用 output:'export' 的 SSR 模式；当前为纯静态，无需 next start
# 本地预览静态产物：
npx serve out/ndd      # 子目录
npx serve out          # 根
```

### 代码检查

```bash
npm run lint
```

### 验证环境

- Node `v22.23.1` + npm `10.9.8` 下 `npm run build:static` / `npm run build:vercel` 均已通过（Next.js 16.3.3 Turbopack，`✓ Compiled successfully`）

## 部署

本项目为 **纯静态导出**（`next.config.mjs: output:'export'`），支持两套部署形态，通过 `basePath` 区分，通过环境变量一键切换，无需改代码。

| 部署目标 | basePath | 访问前缀 | 构建命令 | 产物上传 | 适用场景 |
|----------|----------|----------|----------|----------|----------|
| **宝塔 Apache 子目录** | `'/ndd'` | `https://domain/ndd/` | `npm run build:static` | `out/ndd/` 全部内容 → 服务器 `/ndd/` | 线上正式（Apache2） |
| **Vercel 根域名** | `''` | `https://domain/` | `npm run build:vercel` 或 Vercel 自动 `npm run build` | `out/` 全部内容（Vercel 自动部署） | 预览/海外 CDN |

### 原理

- `next.config.mjs` 计算 `basePath` 优先级：`NEXT_PUBLIC_BASE_PATH` / `BASE_PATH` 显式值 > `VERCEL=1` 时自动 `''` > 默认 `'/ndd'`，并通过 `env.NEXT_PUBLIC_BASE_PATH` 注入客户端，确保 `src/config.js` 的 `BASE_PATH` 与路由一致。
- `src/App.jsx`、`app/regions/[slug]/page.jsx`、`app/regions/huicheng/page.jsx` 的图片与 `baseUrl()` 跳转均使用 `BASE_PATH` 动态拼接；`app/regions/nantan/page.jsx` 在服务端按 `BASE_PATH` 读取 `public/[basePath]/assets/...` 并替换 HTML 内硬编码 `/ndd/` 前缀。
- `public/assets` 为主份，`public/ndd/assets` 为子目录兼容份（构建前已同步），保证两种 `basePath` 下资源均可命中。
- `scripts/assemble-ndd.mjs` 按 `basePath` 感知组装：`/ndd` 时将 `out/_next`、`out/regions` 等拷贝至 `out/ndd/` 形成自包含目录并按前缀生成 `out/ndd/.htaccess`；根时跳过组装、仅在 `out/.htaccess` 生成根版。

### 宝塔 Apache2（子目录 /ndd）部署

1. **构建**
   ```bash
   npm run build:static
   # 产物：out/ndd/ （约 14 MB，自包含 _next + regions + assets + .htaccess）
   ```

2. **上传**
   - 将 `out/ndd/` 内全部文件（含隐藏 `.htaccess`）上传至宝塔站点目录 ` /www/wwwroot/<站点>/ndd/`（`out/ndd` 本身即对应 URL 前缀 `/ndd`，不要再套一层 `ndd/ndd`）

3. **Apache 配置（已内置，无需手写）**
   - `public/.htaccess` 在构建时按 `basePath=/ndd` 动态生成到 `out/ndd/.htaccess`，包含：
     - `ErrorDocument 404 /ndd/404.html`、`DirectoryIndex index.html`、`DirectorySlash On`
     - `trailingSlash` 兼容重写：`/ndd/regions/huicheng` → `/ndd/regions/huicheng/`
     - `_next/static` 等哈希资源 `1y` 强缓存，`*.html` 不缓存，安全头与压缩
   - 确保站点已启用 `rewrite` / `expires` / `headers` / `deflate`（宝塔 → 软件商店 → Apache 设置）
   - 若站点根已存在 `.htaccess`，将 `out/ndd/.htaccess` 内容合并至现有文件

4. **验证**
   - 访问 `https://domain/ndd/` 地图首页
   - 点击任意产区抽屉 “进入产区” 应跳 `/ndd/regions/<slug>/`
   - 直接访问 `https://domain/ndd/regions/huicheng/` 应正常（`index.html` 直出）

### Vercel（根域名 /）部署

1. **自动（推荐）**
   - Vercel 导入 Git 仓库后保持默认 Build Command `npm run build`
   - Vercel 环境自动注入 `VERCEL=1`，`next.config.mjs` 将 `basePath` 识别为 `''`，产物为 `out/` 根目录，首页即 `https://<project>.vercel.app/`

2. **手动本地验证**
   ```bash
   npm run build:vercel
   # 或
   VERCEL=1 npm run build
   # 产物：out/ （根）
   npx serve out
   # 访问 http://localhost:3000/
   ```

3. **环境变量（可选覆盖）**
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_BASE_PATH=/ndd` → 强制子目录（不推荐，根域名应留空）
   - `NEXT_PUBLIC_BASE_PATH=`（空）→ 强制根
   - 未设置时按 `VERCEL` 自动判断，与上述自动逻辑一致

4. **验证**
   - `https://<project>.vercel.app/` 直接为地图
   - `https://<project>.vercel.app/regions/nantan/` 应正常；`url("/assets/nantan/...")` 等资源应为 `/assets/...` 而非 `/ndd/assets/...`

### 自定义 basePath

```bash
# 任意子目录，如 /sales
NEXT_PUBLIC_BASE_PATH=/sales npm run build
# 产物：out/sales/ （需同步调整 public/sales/assets 与上传路径）
```

## 核心代码说明

### `src/App.jsx` (`"use client"`)

- `regions: Array` — 20 个区域静态数据（`id/name/short/x/y/w/h/color/icon/sales/target/reps/trend/farms/heat/path`），新增 `farms/heat` 与 `dadong`；`kind: 'sub'` 标记子产区。
- `documentedRegionIds: Set<string>`（`src/App.jsx:28`）— 17 个已文档化 id：`huicheng/siqian/daze/sanjiang/shuangshui/yamen/gujing/shadui/muzhou/dadong/dongjia/meijiang/qibao/tianlu/tianma/nantan/chakeng`，用于 dock 分支与跳转判定。
- `mapGeometry: Record<string, {d, lx, ly}>` — 每个区域的 SVG `path` 与标签锚点坐标（归一化 0–100），新增 `dadong`。
- `mapOutline: string` — 整体外轮廓闭合路径，用于 `clipPath` 与描边。
- `Icon` — 轻量 SVG 图标集（back/bell/search/pin/chart/people/arrow/map/home/trophy/user/close）。
- `MapRegion` — 区域标签按钮（`--region` CSS 变量传递颜色，`aria-label` 已改为产量/斤）。
- `TransparentMap` — Canvas 透明化处理组件，`image.src` 使用 `${BASE_PATH}/assets/...` 动态。
- `Overview({onEnterRegion})` — 主视图：手势状态机（`pointers/startView/startDistance`）、`clampScale/clampView/zoomBy`、SVG 领地层、选中动效、缩放控件与信息抽屉（4 列 + 进入/占位分支）。
- `RegionDetail` — 内置详情回落页（数值为斤/热度/农场数，入口按钮已改为“快速录入产量”）。
- `App` — 顶层状态机，`documentedRegionIds.has(id)` 时走 `window.location.assign(baseUrl('/regions/${id}'))`，否则渲染 `RegionDetail`。

### `src/config.js`

- `BASE_PATH` 由 `next.config.mjs` 的 `env.NEXT_PUBLIC_BASE_PATH` 注入，`build:static` 时 `'/ndd'`，`build:vercel` / Vercel 云端时 `''`。
- `baseUrl(path)` / `assetUrl(path)` 统一拼接前缀，避免路由与资源在不同部署下错乱。

### `src/regionStories.js`

- `regionStories: Array` — 15 个产区的结构化叙事，每项含 `slug/name/mark/variant/motif/colors/eyebrow/headline/summary/foundation/facts/terroirTitle/terroirIntro/terrain/soilStory/fruitName/fruitDescription/tasting/rank/valueTitle/valueCopy/journey`（新增 `soilStory` 与 `shuangshui`/`yamen`）。
- `storyBySlug` — 以 `slug` 为键的索引，供 `[slug]` 模板与 `generateStaticParams` 使用。

### `app/regions/[slug]/page.jsx`

- 服务端组件，`generateStaticParams` 枚举 15 个 slug，`generateMetadata` 取 `summary`，`RegionStoryPage` 按 `variant/motif` 与 `colors` 主题渲染 hero/来处/风土/柑香/价值/入境/时令，`SeasonScale.jsx` 复用时令刻度。图片 `src` 使用 `${BASE_PATH}/assets/...`。

### `app/regions/huicheng/page.jsx` / `app/regions/nantan/page.jsx`

- `huicheng` 陈皮通识页聚焦五段成熟刻度，已拆分为 `ChenpiIntro.jsx` 与 `RipenessStages.jsx`，hero 图片同样动态前缀。
- `nantan` 为真实路由页，服务端按 `BASE_PATH` 读取 `public/[basePath]/assets/nantan/nantan-origin.html`，提取 `<style>` 与 `<body>` 注入，并将硬编码 `/ndd/` 替换为当前 `BASE_PATH`，兼容两种部署。

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
| `/regions/huicheng` | 陈皮通识页 | `app/regions/huicheng/page.jsx` + `ChenpiIntro.jsx`/`RipenessStages.jsx` |
| `/regions/nantan` | 真实路由页 | `app/regions/nantan/page.jsx`（读取 `public/assets/nantan/nantan-origin.html`） |
| `/regions/[slug]` | 通用动态页 (15) | `app/regions/[slug]/page.jsx` → `dongjia/meijiang/tianma/chakeng/sanjiang/qibao/tianlu/gujing/daze/siqian/shadui/muzhou/dadong/shuangshui/yamen` |

未在 `documentedRegionIds` 中的 `daao/luokeng/xijia` 暂落入内置 `RegionDetail`，抽屉显示“暂无独立产区介绍”。实际 URL 会按 `basePath` 自动加前缀：宝塔为 `/ndd/regions/...`，Vercel 为 `/regions/...`。

## 产区内容体系

- 数据源：`src/regionStories.js`（15 条，含双水/崖门）+ `docs/introduce/*.docx`（18 份原始介绍，含新会陈皮总述）
- 视效资源：`public/assets/regions/*.webp`（16 个 hero）+ `public/assets/nantan/nantan-hero.png` + `public/ndd/assets` 同步份（子目录部署兼容）
- 模板：`[slug]` 通用模板承载 15 个产区（含双水/崖门），`huicheng` 单独承载陈皮知识（拆分为 `ChenpiIntro`/`RipenessStages`），`nantan` 为真实路由过渡

## 迁移说明（Vite → Next.js）

| 变更项 | 之前 (Vite) | 之后 (Next.js) |
|--------|-------------|----------------|
| 框架 | `vite@6.4.3` SPA | `next@16.3.3` App Router + `output:'export'` |
| 入口 | `index.html` + `src/main.jsx` (`createRoot`) | `app/layout.jsx` + `app/page.jsx` |
| 样式 | `src/styles.css` 由 `main.jsx` 引入 | `app/globals.css` 由 `layout.jsx` 引入 |
| 脚本 | `vite` / `vite build` / `vite preview` | `next dev` / `next build`（含 `build:static`/`build:vercel`） |
| 产物 | `dist/` | `out/`（`out/ndd/` 为子目录自包含） |
| 组件 | 无需指令 | `src/App.jsx` 与 `app/page.jsx` 顶部添加 `"use client"` |
| 路由 | 单页 | `/regions/*` 多页，`basePath` 感知 |
| 部署 | 单一 | 双形态：宝塔 `/ndd` 子目录 + Vercel `/` 根 |

如需回滚，恢复 `index.html`/`src/main.jsx`/`src/styles.css` 并将 `package.json` 依赖切回 `vite` 即可。

## 浏览器支持

- 现代浏览器（Chrome/Edge/Firefox/Safari 最新版）
- 移动端 Safari / Chrome（支持 `env(safe-area-inset-*)` 与 Pointer Events）

## 后续规划

- [x] `RegionDetail` 路由打通（`app/regions/[slug]` + 定制页 + 真实 `nantan` 页）
- [x] 纯静态双部署（宝塔 `/ndd` + Vercel `/`）与 `basePath` 可配置
- [ ] 接入真实接口替换静态 `regions` / `regionStories` 数据
- [ ] 搜索与筛选（按名称/热度/达标率）
- [ ] 埋点与分享

## 许可证

私有项目，未声明开源许可。

---

如有问题请提交 Issue 或联系维护者。
