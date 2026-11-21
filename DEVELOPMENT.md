# WordGrid.games 开发文档

> 本文档记录项目的架构、技术决策、模块说明和升级指南，便于后续迭代维护。
> 当前状态核对：2026-11-21。Complete 的早期 beta/noindex 验收记录属于历史版本，当前页面已可索引并进入 sitemap。

---

## 1. 项目概述

**WordGrid.games** 是一款基于 Boggle 玩法的网页单词搜索游戏，支持 4×4/5×5/6×6、Timed/Zen、每日共享棋盘、每周主题和 Pattern Sprint。Complete 是独立的每日 4×4 无计时找全词模式，使用自己的编辑词表。

- **线上地址**: https://wordgrid.games
- **GitHub**: https://github.com/aieasygames-alt/wordgrid
- **部署**: Cloudflare Pages (自动构建)
- **构建产物**: 静态页面导出到 `out/`；页面数量随保留的每日归档增长。排行榜由 Pages Functions + D1 提供。

---

## 2. 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js 15 (App Router，静态导出) | 15.5.29 |
| 语言 | TypeScript (strict mode) | ^5 |
| 样式 | Tailwind CSS | 3.4.x |
| 部署 | Cloudflare Pages (SSG) | — |
| 排行榜 | Pages Functions + Cloudflare D1 | 可选 |
| 本地 / CI | Node.js | 24 LTS；测试最低 22.13 |
| 字典数据 | /public/data/words.txt（普通玩法 3–6 字母） | 源文件 55,538 条，含不参与普通玩法的 2 字母词 |
| 外部 API | Free Dictionary API (dictionaryapi.dev) | 默认关闭；仅显式启用时在构建中调用 |

**依赖极简**: 仅 next / react / react-dom，零运行时第三方库。

### 部署配置

- `next.config.mjs` → `output: "export"` + `trailingSlash: true`
- `wrangler.toml` → `pages_build_output_dir = "./out"`
- Cloudflare Pages Git 集成: push → 自动 `npm run build` → 部署 `out/`
- 构建命令: `npm run build`
- 输出目录: `out`
- `.node-version` 固定 Node 24；GitHub 归档工作流同样使用 Node 24。
- 动态路径的 `params` 按 Next.js 15 API 使用 Promise，并在页面和 metadata 中 await；仍通过 `generateStaticParams` 静态生成。
- `postcss` override 与直接开发依赖共用已更新的 8.x 版本，覆盖 Next 内部固定的旧版本。升级后重新运行 audit、导出及 Functions 打包。
- Wrangler 4.166.0 固定为项目开发依赖；`npm run check:functions` 在本地打包 Pages Functions，归档 CI 也执行该检查，不修改远程数据库。

### 已上线能力与边界

- Daily 使用 UTC+8，每日归档从 2026-06-10 起保留；Actions 每日 00:15/12:15 推进构建标记，触发 Pages Git 部署。
- Weekly 在构建时生成并传入客户端，避免首屏棋盘不一致。从 2026-11-23 起，按实际游戏字典求解筛选，保证至少 3 个主题词；之前已发布棋盘保留原样。Weekly 沿用周一 UTC 切周规则。
- Complete 已有首玩教程、提示、旋转、编号路径回看、进度合并、分享及可选排行榜；题库覆盖 2026-10-14 至 2027-10-13。
- Complete 提示以目标词数计算 20%/40%/60% 门槛，并显示距离下一阶段还差几个词；奖励词不推进解锁。
- 普通玩法的 Long Word 成就从 6 字母开始，与现有 3–6 字母词表一致。
- 已接入主题切换、Cookie Banner 和 GA4 `G-MLZV98LG8Z`。同意状态先于 GA 配置排队，生产配置限正式站域名。
- manifest 与安装提示提供桌面快捷入口，尚无 Service Worker 离线缓存。

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
│   │   ├── complete/                # 独立找全词玩法
│   │   ├── weekly/                  # 每周主题棋盘
│   │   ├── training/                # Pattern Sprint
│   │   ├── solver/                  # 输入棋盘、求解和路径复盘
│   │   ├── words/[word]/page.tsx     # 精选词条 SSG，默认使用本地内容
│   │   ├── guides/                   # 规则、词汇及在线玩法攻略
│   │   ├── globals.css               # 全局样式 + touch-action
│   │   ├── sitemap.ts                # XML Sitemap 生成
│   │   └── robots.ts                 # robots.txt
│   ├── components/                   # React 组件
│   │   ├── GameBoard.tsx             # 主游戏面板和核心交互
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
│   ├── data/words.txt                # 普通玩法可接受 3–6 字母词
│   ├── data/complete/               # 版本化编辑词表和每日题库
│   ├── share-card-bg.png             # 分享卡片背景图
│   ├── manifest.json                 # PWA manifest
│   └── icon-192.png / icon-512.png   # PWA 图标
├── next.config.mjs                   # Next.js 配置 (SSG)
├── functions/api/                    # Challenge 和 Complete 排行榜
├── schema.sql                       # D1 增量建表脚本
├── tests/                           # 规则、SQLite API 与站点升级回归
├── eslint.config.mjs                # ESLint 9 flat config
├── wrangler.toml                     # Cloudflare Pages 配置
├── tailwind.config.ts
└── tsconfig.json
```

上图为主要模块，完整页面和组件以当前源码为准。

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
| `/words/[word]` | SSG (精选可索引词页，默认不依赖远程 API) | 256 |
| `/words/*-boggle-words` | SSG 词表聚合页 | 8 |
| `/guides/*` | SSG | 以当前路由为准 |
| `/daily/archive/[date]` | SSG，含棋盘/词数/分数/复玩 | 随每日发布增长 |
| `/complete`、`/weekly`、`/training`、`/solver` | SSG + Client | 独立玩法/工具 |

- Server Component 负责 metadata + JSON-LD
- Client Component 负责游戏交互
- 单词详情页默认使用本地静态内容和玩法信息，远程释义为 opt-in
- `INDEXABLE_WORDS` 是当前提交给 sitemap 的精选词页集合；不要盲目扩大薄词页
- 词表聚合页优先承接 long-tail 查询，例如 3-letter words、Qu words、high-scoring words

### 5.7 JSON-LD 结构化数据

- 首页: `WebSite` + `FAQPage`
- 单词页: `DefinedWord` + `BreadcrumbList`
- 标记须与可见内容一致；不把 FAQ 标记视为富结果展示的保证。

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

### 6.4 GameBoard.tsx — 核心交互组件

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

- `INDEXABLE_WORDS`: 精选可索引 3-5 字母常用英文词
- `fetchWordData()`: 只有 `WORDGRID_ENABLE_REMOTE_DICTIONARY=1` 时调用 Free Dictionary API；默认不依赖外网释义
- `loadWordList()`: 从文件系统读取 words.txt (仅服务端)
- 用于生成 `/words/[word]` 静态页面

---

## 7. localStorage 使用清单

| Key | 用途 | 格式 |
|---|---|---|
| `wordgrid-streak` | 连续打卡数据 | JSON `{ currentStreak, longestStreak, totalPlayed, lastPlayedDate }` |
| `daily-{YYYY-MM-DD}` | 当天 Daily 成绩缓存 | JSON `{ words, total }` |
| `wordgrid-muted` | 静音偏好 | `"1"` / `"0"` |
| `wordgrid-duration` | 计时模式偏好 | `180` / `300` / `0` |
| `wordgrid-theme` | 主题 | `dark` / `light` |
| `wordgrid-game-history` | 最近普通游戏统计 | JSON，最多 60 局 |
| `wordgrid-complete-v1:…` | 分题、分版本的 Complete 进度 | found/revealed/hintLevel；练习使用独立命名空间 |
| `wordgrid-complete-tutorial-v1` | Complete 教程完成状态 | `done` |

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

# 规则、词条、题库和 SQLite API 回归
npm test

# 类型检查
npx tsc --noEmit --incremental false

# Pages Functions 本地打包检查
npm run check:functions
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

### 现有棋盘尺寸与扩展
1. 已支持 4×4/5×5/6×6，统一调用 `generateSizedGrid(seed, size)`；solver 按实际尺寸处理。
2. 4×4 使用经典骰子，较大尺寸使用字母权重；所有 Q 面均规范为 Qu。
3. 修改尺寸时核对 board-link 编解码、选择路径、分享图及生成器；不要为了增加一个尺寸修改历史 Daily 的骰子和种子算法。

### 替换字典
1. 替换 `public/data/words.txt`
2. 格式: 每行一个词，大写或小写均可，3 字母以上
3. 自动在加载时应用 Q 压缩

### 添加新音效
1. `sounds.ts` → 添加新方法，用 `playTone()` 或 `getCtx()` 合成
2. 在 `GameBoard.tsx` 对应事件中调用

### 维护已有 GA4
1. `analytics-config.ts` 维护同意队列和现有 Measurement ID；`layout.tsx` 加载 tag，CookieBanner 更新同意状态。
2. 行为事件通过 `trackEvent()` 发送。事件字典和漏斗说明见 `plans/growth-measurement-runbook-2026-09.md`、`plans/SEO_UPGRADES_2026-11-21.md`。
3. 不发送玩家姓名、完整输入词或原始分享 URL；部署后用正式属性 Realtime/DebugView 验证，区分 QA 与真实用户数据。

---

## 10. 已知限制与未来计划

### 已知限制
- **进度保存在本机**: 可选排行榜有后端，但 Streak 和游戏进度仍保存在 localStorage，清缓存/换设备不会同步。
- **词表范围**: 普通玩法 3–6 字母；Complete 使用独立有限编辑词表。两种模式都不声称是官方完整比赛词典。
- **无实时多人对战**: 可分享同盘挑战和成绩，不是同时在线对战。
- **无账号系统**: 无法同步进度
- **无完整离线缓存**: 安装入口不保证断网可玩。

### 未来可以考虑的方向
- PWA 离线模式 (Service Worker 缓存)
- Complete 编辑词表、难度分档与路径多样性升级
- Complete 历史复盘、独立重玩和个人统计
- 通用验收流程与系统分享真机补验
- Solver 查询到 URL 的意图映射与入口转化评估
- 基于实测的性能优化；多语言和账号同步需另验证需求

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
| 2026-11-21 | Weekly 按真实求解结果筛选主题盘 | 避免主题没有可玩词；已发布周盘不变 |
| 2026-11-21 | Next.js 15 维护版本与 ESLint 9 | 更新受影响依赖，保留 Pages 静态导出架构 |
| 2026-11-21 | Complete 显示提示解锁所需目标数 | 精确展示下一步门槛，避免将奖励词误计入 |

---

*最后更新: 2026-11-21*
