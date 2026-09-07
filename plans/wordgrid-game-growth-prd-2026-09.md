# PRD: WordGrid 游戏增长闭环

## 文档状态

- 日期：2026-09-07
- 目标：将 WordGrid 从“游戏与工具集合”强化为“搜索进入、立即游玩、结果复盘、持续回访”的产品闭环。
- 参考：Solitaire Associations 的在线试玩、关卡答案、攻略、下载和交叉推荐结构。
- 数据：Google Search Console 最近 28 天（2026-08-09 至 2026-09-05）与既有 Bing Webmaster 基线。

## 1. 背景与问题

WordGrid 已具备 Play、Daily、Challenge、Zen、Solver、Words、Guides、Stats、分享卡片和连胜等能力。问题不在功能数量，而在这些能力尚未形成统一的用户旅程。

Solitaire Associations 的可借鉴部分是：以一个明确的游戏为核心，把搜索落地页、可复玩内容、攻略和结果后的下一步动作连成漏斗。WordGrid 应借鉴这个闭环，不照搬其大规模模板化答案页或泛内容策略。

当前搜索数据说明：站点已有稳定曝光，但不同意图的页面表现差异较大。

## 2. 数据证据与解释边界

### 2.1 GSC 最近 28 天

GSC 导出文件的时间范围是 `Last 28 days`，日期序列为 2026-08-09 至 2026-09-05。按设备汇总为 8,905 次展示、168 次点击，整体 CTR 约 1.89%。这是月度优先级数据，比单日快照稳定，但仍属于早期站点样本，不应用单个低量词直接决定新页面。

| 维度 | 展示 | 点击 | CTR | 平均排名 | 解释 |
| --- | ---: | ---: | ---: | ---: | --- |
| Mobile | 6,112 | 113 | 1.85% | 7.62 | 主要流量来源，适合强化即时游玩和 Daily 回访 |
| Desktop | 3,230 | 50 | 1.55% | 30.73 | CTR略低且排名明显弱，需检查桌面 SERP 意图和页面匹配 |
| Tablet | 163 | 5 | 3.07% | 6.72 | 样本较小，不作为首要优化依据 |

高价值查询：

| 查询 | 展示 | 点击 | CTR | 平均排名 | 意图 |
| --- | ---: | ---: | ---: | ---: | --- |
| `wordgrid` | 1,571 | 5 | 0.32% | 6.68 | 品牌/导航 |
| `word grid` | 389 | 0 | 0% | 10.42 | 类别认知或游戏寻找 |
| `boggle dictionary` | 392 | 9 | 2.30% | 10.36 | 词典/规则工具 |
| `word grid solver` | 94 | 6 | 6.38% | 6.85 | 解题工具 |
| `word grid puzzle` | 108 | 4 | 3.70% | 9.58 | 游戏/谜题 |
| `word grid game` | 134 | 3 | 2.24% | 8.85 | 在线游戏 |
| `boggle words list` | 51 | 4 | 7.84% | 7.84 | 词汇学习 |
| `word grid game online free` | 19 | 2 | 10.53% | 6.37 | 强游戏意图 |

高曝光页面：

| 页面 | 展示 | 点击 | CTR | 平均排名 | 结论 |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 3,070 | 43 | 1.40% | 8.95 | 最大入口，品牌词和泛词混合 |
| `/guides/boggle-dictionary/` | 2,201 | 20 | 0.91% | 7.92 | 高曝光低CTR，需明确“查词/验证/立即练习” |
| `/guides/boggle-word-lists/` | 743 | 26 | 3.50% | 12.15 | 词汇意图成立，可导流 Play/Solver |
| `/guides/play-boggle-online-free/` | 722 | 11 | 1.52% | 32.80 | 相关性有但排名弱，需强化首屏行动和内部链接 |
| `/guides/most-common-boggle-words/` | 690 | 38 | 5.51% | 10.96 | 当前最强内容入口，应作为流量枢纽 |
| `/guides/boggle-rules-beginners/` | 606 | 0 | 0% | 31.28 | 规则需求未转化，需重写摘要/首屏，不应盲目扩页 |
| `/solver/` | 574 | 12 | 2.09% | 36.61 | 工具需求成立，但排名和页面意图不够强 |
| `/daily/` | 76 | 0 | 0% | 33.34 | GSC月度曝光仍小，先做产品闭环，不以CTR单独判断 |

### 2.2 Bing Webmaster 既有基线

Bing 基线显示 `word grid` 曾有 3,542 展示、19 点击、0.54% CTR、平均排名 4.94；首页 3,635 展示、45 点击、1.24% CTR；`/daily/` 945 展示、3 点击、0.32%；`/play/` 652 展示、3 点击、0.46%。该数据与 GSC 的方向一致：泛词和模式页有曝光，但搜索结果点击不足。

### 2.3 数据结论

1. `wordgrid` 品牌词曝光高但 CTR 极低，首页标题、描述和品牌定位需要更直接。
2. `word grid` 非品牌泛词仍接近首页但没有点击，必须让搜索结果明确“可立即免费在线玩”。
3. `boggle dictionary`、`boggle words list`、`most common boggle words` 证明词汇学习意图是真实入口，应把它们连接到 Solver、Play 和 Daily，而不是只增加文章。
4. `word grid solver` 是当前最明确的工具意图，现有 Solver CTR 相对较好，应保护其意图并加入复盘回流。
5. Daily 在本月 GSC 样本中排名较弱，不能直接推断用户不需要 Daily；应先改善页面定位和游戏后的回访理由，再观察排名与点击。
6. 桌面平均排名异常弱，需将桌面 SERP/页面体验作为诊断项，不应仅用移动端表现推断全站。

## 3. 目标与非目标

### 目标

1. 将首页从多入口导航页转为以即时游戏为中心的主入口。
2. 将词汇、规则、Solver 和 Daily 搜索流量导入可操作的游戏体验。
3. 让每个重要内容页都有一个明确的下一步动作。
4. 建立可复玩的 Daily/Board URL 和结果分享路径。
5. 用 GSC/Bing 的页面和查询数据进行 14 至 30 天迭代。

### 非目标

1. 不复制 Solitaire Associations 的 3596 个薄关卡页模式。
2. 不为每个关键词变体批量生成页面。
3. 不在本阶段重做游戏核心规则。
4. 不以未验证的胜率、用户数量或“研究数据”作为营销文案。
5. 不把 Boggle 作为唯一品牌名称，WordGrid 仍是产品品牌。

## 4. 用户意图模型

| 意图层 | 代表查询 | 首选页面 | 首要动作 |
| --- | --- | --- | --- |
| 品牌/导航 | `wordgrid`, `word grid` | `/` | Start playing |
| 泛游戏 | `word grid game`, `word grid puzzle` | `/play/` 或 `/` | Play a free board |
| 每日挑战 | `daily word grid`, `daily boggle` | `/daily/` | Play today's board |
| 工具复盘 | `word grid solver`, `boggle solver` | `/solver/` | Paste/load board and review |
| 词汇学习 | `boggle dictionary`, `boggle words list` | 词典/词表页 | Find words, then practice |
| 规则学习 | `boggle rules`, `play boggle online` | 对应 guide | Learn quickly, then play |
| 结果/复玩 | 日期、board、分享链接 | `/daily/archive/[date]` 或 Board URL | Replay and share |

页面必须只拥有一个主意图，其他功能作为相邻 CTA，不在 title、H1 和首段中平铺所有关键词。

## 5. 功能需求

### 5.1 首页：即时游玩入口

**需求**

- 首屏保留 WordGrid 品牌和棋盘，主按钮为 `Start Playing` 或 `Play Free`。
- 将 Zen、Daily、Challenge 作为模式切换或次级入口，不再与 Solver、Words、Guides 争夺首屏主视觉。
- 在游戏上方或结果下方提供一句清晰说明：免费、浏览器内、无需下载/注册、Boggle-style word grid。
- 游戏完成后进入统一 ResultScreen，提供 Play Again、Daily、Challenge、Solver Review、Share Result。
- 保留主题切换，但不让设置占用首屏主要空间。

**验收标准**

- 首屏用户无需阅读长段落即可开始一局。
- 首页只有一个主 CTA，其他入口为明确的次级动作。
- 首页 metadata 同时覆盖 `wordgrid`、`word grid`、`word grid game`，但 H1 仍自然可读。

### 5.2 Daily：从模式页变成回访目的地

**需求**

- 首屏说明“每天一张共享棋盘、相同计时、可比较分数”。
- 完成后展示当前 streak、分数、最佳词、Share Result、Replay Archive 和 Solver Review。
- `/daily/archive` 展示最近日期、棋盘摘要和 Replay 链接。
- 每个 `/daily/archive/[date]` 页面展示棋盘、可找到词数、可能分数、代表性词路径和 Replay CTA。
- 页面下方保留简短说明、评分规则和下一步链接，避免阻塞开始游戏。

**验收标准**

- 用户从 Daily 结果能在一键内分享或复盘。
- 历史 Daily 页面可被搜索引擎理解为具体棋盘，而不是重复的空壳页面。
- 归档页面不生成无内容日期或不可复玩的 URL。

### 5.3 内容页到游戏的上下文 CTA

**需求**

- 词典页：`Check a word in Solver`、`Practice on a new grid`。
- 词表页：`Play a board using these patterns`、`Open Solver`。
- 规则页：首段后提供 `Play WordGrid`，并链接评分和 Solver。
- `most-common-boggle-words` 作为高 CTR 枢纽，首屏和文末同时导向 Play、Daily、Word List。
- 每个 guide 页面最多一个主 CTA，避免多个同权重按钮。

**验收标准**

- 任何主要 guide 到 Play 或 Solver 不超过一次点击。
- CTA 文案包含目标页面意图，不使用“Click here”。
- 内链锚文本与目标页的主关键词一致。

### 5.4 Solver：定位为复盘与训练工具

**需求**

- title/H1 前部明确包含 `Boggle Solver` 或 `Word Grid Solver`，根据页面主意图二选一。
- 首段说明可输入完成棋盘以查找全部有效词、查看评分和复盘遗漏词。
- 结果页提供 `Play a similar board`、`Open Daily` 和相关词表链接。
- 不在实时游戏进行中强推作弊；文案以 post-game review、practice 和 learning 为主。

**验收标准**

- `word grid solver` 意图继续保持正向 CTR。
- `boggle solver` 访问者在首屏即可确认工具是否匹配自己的输入。
- Solver 结果至少有一个回到游戏的路径。

### 5.5 Board URL 与分享

**需求**

- 为可复玩的随机棋盘、Daily 棋盘和 Challenge 棋盘定义稳定 URL 或可解码分享链接。
- 分享卡片包含模式、日期/棋盘标识、分数、找到的词数和 WordGrid 品牌。
- 访问分享链接时先展示棋盘摘要，再提供 Play/Challenge/Solver Review。
- URL 只对有真实内容的棋盘开放索引；临时随机局默认不进入 sitemap。

**验收标准**

- 分享链接在新会话中可还原相同棋盘。
- 分享结果不泄露用户个人信息。
- 生成的可索引 URL 具有 canonical、BreadcrumbList 和清晰页面标题。

### 5.6 SEO metadata 与结构化数据

**需求**

- 首页 title 以 `Play Word Grid Online Free` 为核心动作，保留 WordGrid 品牌。
- `/play/` title 强调 instant/free/no download 和棋盘尺寸或模式。
- `/daily/` title 强调 today/shared/daily board。
- `/solver/` title 明确 Boggle Solver 或 Word Grid Solver，不混用多个主词。
- guide metadata 按单一意图重写，避免所有页面都使用相同“free puzzle game”描述。
- 互动页面使用与真实内容一致的 `VideoGame`/`WebApplication`/`WebPage` 类型；guide 使用 `Article`，必要时使用 BreadcrumbList。

**验收标准**

- title 通常不超过约 60 字符，description 通常不超过约 155 字符。
- schema 中名称、URL、模式和页面内容一致。
- 不使用无法证明的评分、下载量和关卡数量。

## 6. 优先级与实施阶段

### P0：转化和意图对齐

- 首页首屏和主 CTA 收敛。
- `/daily/` 结果页和归档 CTA。
- `/solver/` title、H1、首段和复盘 CTA。
- `/guides/most-common-boggle-words/`、`/guides/boggle-dictionary/`、`/guides/boggle-word-lists/` 增加上下文导流。
- 统一 ResultScreen 的下一步动作。

### P1：搜索资产闭环

- Daily Archive 单日页面完善。
- 稳定 Board/Challenge 分享链接。
- 规则、在线游玩和词汇 guide 的意图去重。
- 首页、Guide index、Play、Daily、Solver 的 cluster linking。

### P2：差异化和留存

- 为连击、最佳词、完美棋盘、稀有字母挑战建立可分享成就。
- 增加每周主题棋盘或特殊字母挑战。
- 依据真实游戏数据生成“常见漏词”和“本周高分词”内容。
- 个性化复盘和训练建议。

## 7. 埋点需求

使用现有 GA4 基础，补充以下事件参数：

| 事件 | 关键参数 | 用途 |
| --- | --- | --- |
| `game_start` | mode, board_size, source_page | 判断不同入口的启动率 |
| `game_complete` | mode, score, words_found, duration | 判断完成率和质量 |
| `result_next_action` | action, mode | 判断结果页漏斗 |
| `daily_replay` | date, source | 判断归档价值 |
| `solver_review_start` | source, board_size | 判断工具回流 |
| `share_result` | mode, result_type | 判断传播 |
| `guide_cta_click` | guide_slug, destination | 判断内容导流 |

禁止采集用户输入的完整个人数据或未必要的原始文本；棋盘 seed、模式和聚合结果足够用于产品分析。

## 8. 成功指标

### 搜索指标

| 指标 | 当前基线 | 目标窗口 |
| --- | ---: | ---: |
| GSC 总体 CTR（28天） | 约 1.89% | 30天后提升至 2.3%+ |
| 查询 `wordgrid` CTR | 0.32% | 1.0%+ |
| 查询 `word grid` CTR | 0% | 0.8%+，并保持排名不下降超过2位 |
| `/` CTR | 1.40% | 2.2%+ |
| `/guides/boggle-dictionary/` CTR | 0.91% | 1.5%+ |
| `/guides/boggle-rules-beginners/` 点击 | 0 | 30天内产生可重复点击 |
| `/daily/` 点击 | 0（本月样本） | 30天后持续增长，不以单日判断 |

### 产品指标

- 首页 `game_start` / 独立访问：首阶段提升 20%。
- Guide CTA 点击到 Play/Solver：建立基线，30天提升 25%。
- 游戏完成后的下一步动作率：建立基线，目标 20% 以上。
- Daily 完成后分享或归档复玩率：建立基线，目标 10% 以上。

## 9. 验证与迭代

1. 部署前保存 GSC 与 Bing 的 query/page/device 基线。
2. 部署后 7 天检查抓取、canonical、schema 和页面可用性。
3. 14 天检查 title/H1 变化是否带来 CTR 改善，排名变化控制在约 2 位内。
4. 30 天按意图组比较点击、CTR、排名、游戏启动和完成率。
5. 若展示增加但 CTR 不变，优先调整摘要和首屏意图，不立即新增页面。
6. 若 CTR 增加但游戏启动不增，检查 CTA、加载速度和页面与游戏的承诺是否一致。
7. 若同一查询对应多个页面，指定一个 canonical landing page，并减少其他页面的重复表达。

## 10. 风险与决策

- GSC 与 Bing 的排名口径不同，不能直接合并平均排名，只能比较方向。
- 低量查询 CTR 波动很大，必须按 28 天或更长窗口判断。
- 桌面平均排名弱，可能是设备、地区或查询组合差异，需单独检查，不直接归因于 UI。
- 程序化 Board 页面若缺少独特棋盘数据，会形成薄内容和索引膨胀。
- Boggle 词汇流量虽有效，但品牌长期应以 WordGrid 为中心，避免用户以为站点只是词典或作弊工具。

## 11. 现有代码落点

- 首页与主入口：`src/app/HomeClient.tsx`、`src/app/page.tsx`
- 游戏结果闭环：`src/components/ResultScreen.tsx`
- Daily：`src/app/daily/`、`src/lib/daily-archive.ts`、`src/lib/streak.ts`
- Solver：`src/app/solver/`、`src/app/word-grid-solver/`
- 分享：`src/lib/shareCard.ts`、`src/lib/board-link.ts`
- 内容布局：`src/components/GuideDesktopShell.tsx`、`src/app/guides/`
- SEO：各路由 `page.tsx` metadata、`src/app/sitemap.ts`
- 埋点与同意：`src/app/layout.tsx`、`src/components/CookieBanner.tsx`

## 12. 参考经验的取舍

借鉴 Solitaire Associations：单一主游戏入口、命名核心机制、搜索页到游戏的直接路径、可复玩内容、结果后的下一步动作、游戏内外内容联动。

不借鉴：未经验证的规模数字、批量模板化攻略、过多无关小游戏推荐、多个品牌名称混用、把下载入口放在游戏价值之前。
