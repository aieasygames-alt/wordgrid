# WordGrid.games 开发文档

> 本文档记录项目的架构、技术决策、模块说明和升级指南，便于后续迭代维护。

---

## 1. 项目概述

**WordGrid.games** 是一款基于 Boggle 玩法的网页单词搜索游戏。玩家在 4×4 字母网格中拖拽相邻字母组成单词，限时得分。

- **线上地址**: https://wordgrid.games
- **GitHub**: https://github.com/aieasygames-alt/wordgrid
- **部署**: Cloudflare Pages (自动构建)
- **构建产物**: 390 个静态 HTML 页面

---

## 2. 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js 14 (App Router) | 14.2.5 |
| 语言 | TypeScript (strict mode) | ^5 |
| 样式 | Tailwind CSS | 3.4.6 |
| 部署 | Cloudflare Pages (SSG) | — |
| 字典数据 | /public/data/words.txt (~55k words) | — |
| 外部 API | Free Dictionary API (dictionaryapi.dev) | 构建时调用 |

**依赖极简**: 仅 next / react / react-dom，零运行时第三方库。

### 部署配置

- `next.config.mjs` → `output: "export"` + `trailingSlash: true`
- `wrangler.toml` → `pages_build_output_dir = "./out"`
- Cloudflare Pages Git 集成: push → 自动 `npm run build` → 部署 `out/`
- 构建命令: `npm run build`
- 输出目录: `out`

---

## 3. 项目结构

```
wordgrid/
├── src/
│   ├── app/                          # Next.js App Router 页面
│   │   ├── layout.tsx                # 根布局 + 全局 SEO metadata
│   │   ├── page.tsx                  # 首页 (SSG, JSON-LD)
│   │   ├── play/
│   │   │   ├── page.tsx              # Server Component (metadata)
│   │   │   └── PlayClient.tsx        # Client Component (随机游戏)
│   │   ├── daily/
│   │   │   ├── page.tsx              # Server Component (metadata)
│   │   │   └── DailyClient.tsx       # Client Component (每日挑战 + Streak)
│   │   ├── words/[word]/page.tsx     # SSG 单词详情页 (300 页, 构建时获取释义)
│   │   ├── guides/                   # SEO 内容页 (2 篇攻略)
│   │   ├── globals.css               # 全局样式 + touch-action
│   │   ├── sitemap.ts                # XML Sitemap 生成
│   │   └── robots.ts                 # robots.txt
│   ├── components/                   # React 组件
│   │   ├── GameBoard.tsx             # 主游戏面板 (476 行, 核心交互)
│   │   ├── ResultScreen.tsx          # 结果页 (分数/遗漏词/分享)
│   │   ├── Timer.tsx                 # 倒计时器
│   │   ├── StreakDisplay.tsx         # 连续打卡显示
│   │   ├── Confetti.tsx             # CSS 撒花动画
│   │   └── ...
│   └── lib/                          # 核心逻辑库
│       ├── boggle.ts                 # 骰子/PRNG/网格生成/验证/计分
│       ├── dictionary.ts             # Trie 字典 + Web Worker 加载
│       ├── dict-worker.ts            # Web Worker (后台构建 Trie)
│       ├── solver.ts                 # DFS 求解器 (找全棋盘所有单词)
│       ├── sounds.ts                 # Web Audio API 音效合成
│       ├── streak.ts                 # 连续打卡系统 (localStorage)
│       ├── shareCard.ts              # Canvas 分享图片生成
│       └── worddata.ts               # 构建时单词释义获取 (Free Dictionary API)
├── public/
│   ├── data/words.txt                # 英文字典 (~55k 词, 3-7 字母)
│   ├── share-card-bg.png             # 分享卡片背景图
│   ├── manifest.json                 # PWA manifest
│   └── icon-192.png / icon-512.png   # PWA 图标
├── next.config.mjs                   # Next.js 配置 (SSG)
├── wrangler.toml                     # Cloudflare Pages 配置
├── tailwind.config.ts
└── tsconfig.json
```

**总代码量**: ~2,955 行 (24 个源文件)

---

## 4. 架构分层与数据流

```
┌─────────────────────────────────────────────┐
│                  页面层                        │
│  page.tsx (SSG metadata) + Client.tsx        │
├─────────────────────────────────────────────┤
│                组件层                          │
│  GameBoard ← Timer, sounds                   │
│  ResultScreen ← solver, Confetti, shareCard  │
│  StreakDisplay ← streak                       │
├─────────────────────────────────────────────┤
│                逻辑层                          │
│  boggle.ts (引擎) ← 核心依赖                   │
│  dictionary.ts + dict-worker.ts (字典)        │
│  solver.ts (求解器) ← boggle + dictionary     │
│  streak.ts ← boggle (todayDateString)        │
│  shareCard.ts ← boggle (Grid 类型)            │
│  worddata.ts (SEO 构建时数据)                  │
└─────────────────────────────────────────────┘
```

### 核心数据流 (一局游戏)

```
generateGrid(seed) → Grid (4×4)
    ↓
GameBoard 渲染棋盘
    ↓
用户拖拽 → isValidPath → trie.contains → scoreWord
    ↓                                          ↓
Timer 到期 / 用户结束                    sounds.correct/error
    ↓
onComplete(foundWords, totalScore, trie)
    ↓
ResultScreen → solveBoard(grid, trie) → 找出所有可能的词
    ↓                                    ↓
显示分数/百分比/遗漏词              shareCard 生成分享图
```

---

## 5. 核心技术决策

### 5.1 确定性每日棋盘 (Mulberry32 + UTC+8)

```typescript
// boggle.ts
seedFromDate("2026-06-19") → 数字种子
  → mulberry32(种子) → Fisher-Yates 洗骰子 + 选面 → 确定性 Grid
```

- `todayDateString()` 使用 **UTC+8** 时区，确保全球玩家同一天看到同一棋盘
- 种子算法: `Math.floor(dateMs / 86400000) ^ 0x574f5244` (XOR "WORD" 盐值)
- 升级注意: 修改种子算法会导致所有历史 Daily Challenge 棋盘变化

### 5.2 Q 压缩 (Q Compression)

字典加载时将所有 `QU` 替换为 `Q`:
- `QUEEN → QEEN`, `QAT → QAT` (无 QU 的不变)
- 棋盘 `Qu` 面 → 映射为 `Q`，单节点匹配
- TrieNode 存储原始单词 `originalWord`，solver 返回正确显示形式
- `contains()` / `hasPrefix()` 内部自动 bogglify，调用方无感知
- **升级注意**: 修改字典或 solver 时，Q 压缩必须保持一致，否则 Qu 相关单词验证会出错

### 5.3 Web Worker 字典加载

- `dict-worker.ts` 在后台线程 fetch + 解析 ~55k 词，构建 Trie
- 通过 structuredClone (Map 兼容) 传回主线程
- 主线程 `rebuildFromWorkerData()` 重建 Trie 对象
- 10 秒超时 + 自动降级到主线程加载
- Promise 缓存 (`_promise`) 防止 React StrictMode 双重加载

### 5.4 Pointer Events 拖拽选词

- 统一 mouse / touch / pen 事件处理
- `#game-board { touch-action: none; }` 防止移动端滚动干扰
- SVG path overlay 实时绘制选中字母间的连线
- **Release-to-submit**: 松手即提交，无需点击 Submit 按钮
- `e.button === 0` 限制鼠标左键

### 5.5 Timer 实现

- 基于 `Date.now()` 差值计算，不受后台 tab setInterval 节流影响
- 250ms tick，<=30s 变橙，<=10s 变红 + 脉冲
- 支持暂停/恢复 (Zen 模式)

### 5.6 SSG SEO 架构

| 页面 | 渲染方式 | 数量 |
|---|---|---|
| `/` | SSG (Server Component) | 1 |
| `/play` | SSG + Client | 1 |
| `/daily` | SSG + Client | 1 |
| `/words/[word]` | SSG (构建时 fetch 释义) | 300 |
| `/guides/*` | SSG | 2 |

- Server Component 负责 metadata + JSON-LD
- Client Component 负责游戏交互
- 单词详情页在构建时从 Free Dictionary API 获取释义，直接嵌入 HTML
- `HIGH_VALUE_WORDS` (300 词) 经过人工筛选，避免 thin content penalty

### 5.7 JSON-LD 结构化数据

- 首页: `WebSite` + `FAQPage`
- 单词页: `DefinedWord` + `BreadcrumbList`
- 帮助 Google 理解内容，争取 rich snippet

---

## 6. 模块详细说明

### 6.1 boggle.ts — 游戏引擎

| 导出 | 功能 |
|---|---|
| `BOGGLE_DICE` | 标准 16 骰子定义 |
| `Cell` / `Grid` | 类型定义 |
| `generateGrid(seed)` | 种子 → 确定性 4×4 网格 |
| `seedFromDate(dateStr)` | 日期字符串 → 种子 |
| `todayDateString()` | UTC+8 今天日期 |
| `isValidPath(cells)` | 验证路径: 相邻 + 不重复 |
| `scoreWord(word)` | 计分: 3字=1, 4字=2, 5字=4, 6字=6, 7+字=8+(len-7)×2 |

**计分表** (修改此处可调整游戏难度):

| 词长 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|
| 分数 | 1 | 2 | 4 | 6 | 8 | 10 | 12 |

### 6.2 dictionary.ts — Trie 字典

```
loadDictionary()
  ├── Worker 可用 → dict-worker.ts (后台构建) → structuredClone 回传
  └── Worker 不可用 → 主线程 fetch + parse (降级)
```

- Trie 查找: O(k), k=词长
- Q 压缩: `QU→Q` 在 insert/contains/hasPrefix 内部处理
- `originalWord` 字段: 存储 Q 压缩前的原始单词，用于显示

### 6.3 solver.ts — DFS 求解器

- 从每个格子出发 DFS，走 8 方向
- 不能重复使用同一格子
- 用 Trie 剪枝: 当前路径不是有效前缀则回溯
- 返回: 所有有效单词 + 路径 + 分数，按分数降序

### 6.4 GameBoard.tsx — 核心交互组件 (476 行)

**状态管理**:
- `foundWords`, `trie`, `selected` → 同时用 `useRef` 镜像，避免闭包陷阱
- `isDragging` → 控制拖拽状态
- `muted` / `duration` → localStorage 持久化

**关键交互**:
- `handlePointerDown` → 开始选词
- `handlePointerEnter` → 拖入格子 (追加到 selected)
- `handlePointerUp` → 松手提交 (trySubmit)
- SVG path → `selected` 数组的中心点连成 polyline

**计时模式**:
- 3 分钟 (默认)
- 5 分钟
- Zen 模式 (无限时，手动结束)

### 6.5 streak.ts — 连续打卡系统

- localStorage key: `"wordgrid-streak"`
- 记录: `currentStreak`, `longestStreak`, `totalPlayed`, `lastPlayedDate`
- 规则: 昨天玩了 → streak+1; 断了一天 → 重置为 1; 同一天重玩 → 幂等不计数
- `getStreakStatus()`: 返回 `isActive` / `isAtRisk` / `isBroken` 状态

### 6.6 shareCard.ts — 分享图片生成

- Canvas 1200×630 (社交媒体 OG 比例)
- 加载 `/share-card-bg.png` 背景图
- 右侧叠加: 分数、满分、百分比、找到/遗漏数、模式
- 右下角: 4×4 迷你棋盘缩略图
- `navigator.share` 支持时直接分享图片，否则下载

### 6.7 sounds.ts — Web Audio 音效

- 无音频文件，纯 OscillatorNode 合成
- `correct()`: C5+G5 正弦上升
- `error()`: 低频锯齿波
- `select()`: 三角波短促点击声
- `gameEnd()`: 下降琶音

### 6.8 worddata.ts — 构建时 SEO 数据

- `HIGH_VALUE_WORDS`: 300 个精选 3-5 字母常用英文词
- `fetchWordData()`: 调用 Free Dictionary API，Next.js `revalidate` 缓存
- `loadWordList()`: 从文件系统读取 words.txt (仅服务端)
- 用于生成 `/words/[word]` 静态页面

---

## 7. localStorage 使用清单

| Key | 用途 | 格式 |
|---|---|---|
| `wordgrid-streak` | 连续打卡数据 | JSON `{ currentStreak, longestStreak, totalPlayed, lastPlayedDate }` |
| `daily-{YYYY-MM-DD}` | 当天 Daily 成绩缓存 | JSON `{ words, total }` |
| `wordgrid-muted` | 静音偏好 | `"true"` / `"false"` |
| `wordgrid-duration` | 计时模式偏好 | `180` / `300` / `0` |

---

## 8. 开发命令

```bash
# 开发
npm run dev                    # 启动开发服务器 (localhost:3000)

# 构建
npm run build                  # SSG 构建到 out/

# 部署 (已配置 Git 自动部署，通常不需要手动执行)
npx wrangler pages deploy ./out --project-name wordgrid

# Lint
npm run lint
```

---

## 9. 升级指南

### 添加新的计时模式
1. `GameBoard.tsx` → `DURATIONS` 数组添加新选项
2. Timer 自动适配 (基于秒数)

### 修改计分规则
1. `boggle.ts` → `scoreWord()` 函数
2. 无需修改其他文件 (solver 和 GameBoard 都调用此函数)

### 增加单词详情页
1. `worddata.ts` → `HIGH_VALUE_WORDS` 数组添加词
2. 运行 `npm run build`，SSG 自动生成新页面
3. sitemap.ts 自动包含新页面

### 修改棋盘大小 (如 5×5)
1. `boggle.ts` → 增加 `BOGGLE_DICE` 到 25 骰子，`generateGrid` 改循环范围
2. `solver.ts` → DIRECTIONS 不变 (仍是 8 方向)，改边界检查 `nr < 0 || nr >= 5`
3. `GameBoard.tsx` → CSS grid 改为 5 列
4. `shareCard.ts` → `drawMiniBoard` 改循环范围

### 替换字典
1. 替换 `public/data/words.txt`
2. 格式: 每行一个词，大写或小写均可，3 字母以上
3. 自动在加载时应用 Q 压缩

### 添加新音效
1. `sounds.ts` → 添加新方法，用 `playTone()` 或 `getCtx()` 合成
2. 在 `GameBoard.tsx` 对应事件中调用

### 添加分析统计 (Plausible/GA4)
1. `layout.tsx` → 在 `<head>` 中添加 script 标签
2. 推荐使用 `<Script strategy="afterInteractive">`
3. Cloudflare Pages 兼容 Plausible 自托管

---

## 10. 已知限制与未来计划

### 已知限制
- **无后端**: 所有数据存在 localStorage，换设备/清缓存会丢失 Streak
- **字典大小固定**: ~55k 词 (3-7 字母)，部分专业词汇可能缺失
- **无多人对战**: 仅单人游戏
- **无账号系统**: 无法同步进度

### 未来可以考虑的方向
- PWA 离线模式 (Service Worker 缓存)
- 多语言棋盘 (中文成语版?)
- 排行榜 (需要后端: Cloudflare Workers + D1/KV)
- 自定义棋盘大小 (5×5 Big Boggle)
- 暗色/亮色主题切换
- 分析统计接入 (Plausible / GA4)
- Cookie Banner (GDPR 合规)

---

## 11. 开发决策记录

| 日期 | 决策 | 原因 |
|---|---|---|
| 2026-06-19 | 选择 Next.js SSG 而非 SSR | Cloudflare Pages 静态托管，SEO 需要预渲染 |
| 2026-06-19 | 使用 Trie 而非 Set | O(k) 查找 + 前缀剪枝加速 solver |
| 2026-06-19 | Q 压缩方案 | 消除 solver 中 Qu 特殊分支，简化代码 |
| 2026-06-19 | UTC+8 时区 | 中国用户主要群体，全球同板 |
| 2026-06-19 | Web Worker 加载字典 | ~55k 词解析不阻塞主线程 |
| 2026-06-19 | Release-to-submit | 减少操作摩擦，提升移动端体验 |
| 2026-06-19 | Pointer Events 而非 Touch/Mouse | 统一输入处理，一套代码覆盖所有设备 |
| 2026-06-19 | 300 词 SSG 页面而非 2000 词 | 避免 Google thin content penalty |
| 2026-06-19 | Canvas 分享卡片 | 纯前端生成，无需图片服务器 |
| 2026-06-19 | 纯 CSS Confetti | 零依赖，60 粒子够用 |
| 2026-06-19 | Streak 系统 | 提升 Daily Challenge 留存率 |

---

*最后更新: 2026-06-19*
