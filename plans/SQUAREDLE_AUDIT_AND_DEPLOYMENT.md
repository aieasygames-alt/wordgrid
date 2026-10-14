# Squaredle 检查与 WordGrid 集成部署建议

检查日期：2026-10-14。范围：主项目结构、生产构建、squaredle-public 全部五个文件、浏览器基础交互与依赖。未修改业务代码、未部署线上。

## 结论

这份包可以作为固定题目的本地演示，但不是完整独立应用，也不能不改造直接上线。相同类型玩法可以补充到 WordGrid；推荐基于现有引擎实现自己的找全词模式。直接使用原包必须先确认代码、品牌、题目、字典、图片、音频的授权。

## 1. 主项目现状

- Next.js 14.2.5、React 18、TypeScript、Tailwind；output: export，trailingSlash: true。
- Cloudflare Pages 部署 out，已有 Pages Function /api/challenge 与 D1 配置。
- 已有随机、每日、周挑战、Zen、训练、求解器、好友挑战、统计、攻略与单词页面。
- boggle.ts 有种子随机、可变大小棋盘、路径校验、计分；solver.ts 有 Trie + DFS 求解；GameBoard.tsx 支持大小变化与无计时配置。
- 每日边界实际为 UTC+8，README 的 UTC 描述已过时。
- 当前 public/data/words.txt 有 55,538 词，长度分布为 2～6 字母；不能直接覆盖 Squaredle 的长词体验。
- DEVELOPMENT.md 的页面规模等描述已落后；本次构建显示 357 个静态生成任务。

实际验证：npm test 通过（86 个攻略示例）；npm run lint 通过；npx tsc --noEmit --incremental false 通过；npm run build 通过；两个游戏 JS 的 node --check 通过。现有测试不是完整游戏交互测试。

## 2. 提供的包是什么

共五个文件，约 1.50 MB：index.html、压缩编译 JS、CSS，以及两份完全相同的题目配置。没有 package.json、开发源码工程、后端实现、许可文件或构建说明。目录名 public 不代表已经证明属于公有领域或开放许可。

两份配置固定 gTodayDateStr=2026/10/11、gYesterdayDateStr=2026/10/10。共四题：当天与昨天的标准、Express 题目。标准当日棋盘为含两个空洞的 5×5；Express 为 3×3。题目自带编码后的目标词、奖励词、释义、分值，不是可持续生成新题的完整词典。

## 3. 已实际验证的功能

在 127.0.0.1:8765 静态 HTTP 服务测试原文件，未使用 fakeApi：

| 项目 | 结果 |
| --- | --- |
| HTML/CSS/游戏脚本与固定配置 | 正常加载 |
| 新手引导与跳过 | 正常 |
| 标准棋盘 | 显示 55 个目标词 |
| 键盘提交 FEVER | 成功，+8 分，进度 1/55 |
| 刷新恢复 | 保留 FEVER 与 1/55 |
| Express ?level=xp | 显示 25 个目标词 |
| 提交 LATE | 成功，+5 分，进度 1/25 |
| 重复提交 LATE | Already found，不重复增加进度 |
| 390×844 手机尺寸 | 两种棋盘视觉布局正常，没有明显横向溢出 |
| 排行榜 | 弹窗打开但未取得榜单；伴随远程网络错误 |
| Service Worker | 注册失败，脚本 404 |

未实测：真机触控连续拖动、多浏览器兼容、全题通关、午夜切题、完整离线、购买、注册登录、跨设备同步。不能因基础组词成功就认定全部功能正常。

## 4. 上线阻断项与风险

### P1：授权来源未确认

index.html:950 明确写着 Squaredle 获得 NASPA NWL2023 词表授权；这不能证明使用者继承该授权。包中保留原品牌、作者题目、音乐与第三方资源。公开可访问与允许复制商用是不同概念。需要权利方许可或改为自主实现及合法词库。本报告不作最终法律判断。

### P1：后端写死为原站，而不是当前站点

closure-v3-30-13.js:185 起的 Api 构造器把普通域名指向 squaredle.app/api/index.php；localhost 有另一个 from-localhost 路径。请求有 credentials: include。账号、同步、排行榜、历史题、会员等依赖缺失后端；浏览器测试观察到版本与每周题元数据获取失败。改用 HTTPS 并不能保证原站允许跨域或授权调用。

### P1：原站统计、广告与支付代码仍在

index.html:35、index.html:39 保留原 GA4、Google Ads 与 Playwire 标识；JS 还包含广告与 Cookiebot 等加载逻辑。直接上线会尝试把访问、用户标识或游戏相关数据发送到第三方，不能视为本站已完成隐私合规。表单还有 /api/manage_billing.php 与 /api/stripe_checkout.php，现有 Cloudflare 配置不会执行这些 PHP。应去除不使用的功能和实际代码路径，不能只隐藏按钮。

### P1：题库不会每日更新

固定日期由配置注入，刷新继续使用旧题。只改日期字符串不等于生成新棋盘和完整合法答案，也可能使历史统计错位。两份配置副本应改为单一来源。

### P1：根路径引用不适合子路径直接集成

index.html:2918 请求 /api/today-puzzle-config.js；如果放到 /squaredle/ 下，它仍请求主站根 API，而不是 /squaredle/api/...。首页、FAQ、会员等也有根路径与原站跳转。直接复制会出现资源找不到或跳错页面。

### P2：资源缺失与维护难度

缺少五个本地图标、manifest2.webmanifest、images/shop.png、service-worker.js、FAQ 文件等。字体、音效、音乐与社交图片大量依赖 s.squaredle.app。主脚本为压缩编译产物，没有原始模块、类型、source map 与测试工程，长期维护成本高。

### P2：与主站同源执行的隔离风险

原包脚本在同源页面可接触本站 localStorage。closure-v3-30-13.js:180 的旧数据迁移逻辑扫描同源键并删除 yolla 前缀数据；目前未发现它删除 wordgrid 前缀，但不建议未经清理直接同源执行。主站 public/_headers 的 X-Frame-Options: DENY 也使默认 iframe 集成不可行，不能仅创建 iframe 就解决。

### P2：当前不会进入部署产物

squaredle-public 是根目录未追踪文件夹，不是 Next.js public；本次 out 没有该游戏。提交或直接执行当前构建并不会自动将它发布。

## 5. 推荐方案：自主集成找全词模式

建议用独立品牌/模式名，例如 WordGrid Complete，示例路由 /complete/。不要将原品牌直接当作本站自己的游戏名称。

### 第一阶段：纯静态 MVP

- src/app/complete/page.tsx 提供 SSR 构建的说明、规则、metadata；Client Component 提供棋盘交互。
- 复用路径校验、Trie、DFS、本地进度等能力，但为目标词最小长度、空洞、计分、提示建立独立规则，避免改变现有 /play/ 和 /daily/ 行为。
- 先做 4×4 无空洞、不计时、按长度分组、找到/总数、重复词提示、完成状态、本地保存；3×3 mini 与空洞棋盘可后加。
- 新词库必须确认许可、保留出处与过滤策略；若仍用现有 2～6 字母词库，应明确这是短词版本，不宣称覆盖原游戏词表。NASPA 原包数据不默认复用。
- 目标词/奖励词的分类需要独立常用词规则或人工审核，不能把完整大词典全部视为必找词。
- localStorage 使用 wordgrid-complete-v1:{date}:{puzzleVersion} 之类独立键。

### 第二阶段：每日题和题目质量

推荐提前离线生成一批题目，DFS 求解后筛选单词数量、常用词比例、最长词、难度和路径有效性；每题固定 id/date/version/rulesVersion/dictionaryVersion/board/requiredWords/bonusWords。

将题库 JSON 放在 public/data/complete/，按 UTC+8 日期选择，未来题可随批量更新发布。若提前公开答案会损害挑战目标，可改为按日发布文件，但纯静态前端不能提供强反作弊或可靠答案保密。断供时显示有标识的练习题，不把旧题冒充当日题。

构建时或生成脚本预计算答案，避免手机实时解大型棋盘阻塞。若增加空洞，需要调整现有 Grid/solver 的遍历模型并加入专项测试；不能只在 UI 隐藏格子。

### 第三阶段：可选排行榜

若确有需求，新增 /api/complete/score 与独立 D1 表，进行长度/格式校验、每日题校验、服务端路径/词校验、频率限制及重复提交控制。已有 challenge Function 只接收客户端分数，不能直接当作可信竞争排行榜。不要为 MVP 搬迁原站会员、账号、支付体系。

## 6. Cloudflare Pages 部署

推荐继续使用同一 Next.js 项目与当前 Pages；无需 PHP 主机、无需迁移到 Node SSR 服务。

1. 实现新路由、题库及入口，确保旧模式行为不变。
2. 执行 npm test、npm run lint、TypeScript 与 npm run build；增加新模式单元及交互测试。
3. 使用 Pages 分支预览确认新路由、JSON MIME 类型、资源路径、无第三方原站请求、刷新恢复、移动端与切日边界。
4. 初期 noindex，不加入 sitemap；通过验收后补首页/菜单入口、独立 canonical、OG、规则文案与 sitemap。
5. 按现有 Git 集成发布，构建命令 npm run build、输出 out。手动方式仍可 npx wrangler pages deploy out，但含 functions/D1 的部署需确认 Functions 打包及预览/生产数据库绑定，不能把 out 当成完整后端。
6. 带版本哈希资源长缓存；每日入口/索引短缓存或重新验证；历史不可变题目按版本缓存。
7. 保留上个稳定部署方便回滚；上线后观察加载错误、完成率、移动端性能和题库覆盖到期时间。

验收至少包含合法词、无效词、重复词、重复用格、斜向连接、Qu 规则、断开路径、空洞（若启用）、进度恢复、规则版本变化、UTC+8 跨日、资源 404、无原站 API/统计请求。

## 7. 若必须保留原包

仅在取得合适授权后考虑。优先单独测试子域或独立 Pages 项目，避免污染主站同源存储与样式；不建议 iframe。必须本地化资源、统一 base path、去除广告/统计/付款及原站 API 调用、替换题库供给、清除无效 UI、更新隐私/品牌/分享元数据。保留功能越多，自建后端成本越高；比复用本站引擎更难维护。

最终建议：保留 squaredle-public 为行为参考和本地演示资料，不直接发布；上线 WordGrid 自己的找全词模式，静态 MVP 优先。
