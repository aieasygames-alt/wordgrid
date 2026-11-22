# Complete 难度测量与词库复核

2026-11-22。难度仍使用 `editorial-path-1` 编辑估计。本批增加观测和只读审计，
不改棋盘、词表、题目版本、得分、存档键或排行榜数据。

## 事件定义

所有 Complete 事件携带 `measurement_version=1`、`puzzle_date`、`puzzle_version`、
`dictionary_version`、`difficulty`、`difficulty_model`、`session_mode`、`practice`
和 `target_count`。旧题的 `difficulty_model=legacy`，不能和 v2 的模型分布混用。
`session_mode` 为 daily/archive/practice/replay，记录动作发生时的模式。
原档隔天续玩会从 daily 变为 archive；按题目日期和版本合并观察。

| 事件 | 触发条件 | 用途 |
| --- | --- | --- |
| `complete_play_start` | 未完成题首次选择至少两格，或提交至少四字母的词，或使用提示 | 每次访问最多一次，建立有意玩题的用户分母；教程、恢复存档、旋转、阅读不触发 |
| `complete_first_word` | 首次正常发现目标、bonus 或 legacy extra | `word_type` 只取 target/bonus/extra，零分揭词不作为首词 |
| `complete_hint_use` | 实际使用的最高提示等级提高 | `hint_type` 为 start_counts/first_letters/reveal；重开、隐藏或重复点击同等级不重计 |
| `complete_reveal` | 实际揭出一个新目标 | 每个揭词动作一次；从存档恢复不触发 |
| `complete_milestone` | 玩家发现跨过 20/40/60/100% 目标门槛 | 沿用原事件，补充题目及会话上下文；bonus/extra 不推进门槛 |
| `complete_finish` | 玩家发现或揭词使目标首次到达 100% | `completion_source` 为 find/reveal；完整存档直接打开不算新完成 |

教程和分享事件也增加相同的题目上下文。玩法事件还携带 `targets_found`、
`bonus_found`、`extra_found`、`revealed_count`、`hint_level`。
新增事件业务参数不包含单词、棋盘、输入、姓名、重玩 UUID、分享 URL 或自由文本。

## 时长与去重边界

`active_seconds` 是**本次访问**第一次有意玩题后的前台操作时长，
`duration_scope=visit`。隐藏标签或打开教程立即暂停；前台无操作 30 秒后停止累计，
有新操作才继续。`visit_start_state` 标记打开时为 fresh 或 resumed。
未开始玩题时的阅读不计时；完成后停止。

时长不跨刷新或多标签累加，不能称为完整解题用时。比较难度时，先看完成率和提示率，
再比较从 fresh 开始并在同次访问完成的时长；resumed 单独观察。
计时不测量真实注意力，仍可能包含每次操作后的最多 30 秒停留。

首词、提示等级、门槛和完成标记存在原存档命名空间下的独立 `measurement-v1` 键，
刷新或从 daily 进入 archive 不重报。不同 replay 使用各自命名空间，但 UUID 不上报。
跨标签同步存档本身不产生动作事件。存储不可用时仅内存去重；清除数据、不同设备、
同时标签的读写竞争和上报失败均可能影响样本，不能宣称全局 exactly-once。
标记不会因为稍后同意分析而回放历史行为。

沿用现有 GA4 同意机制及正式域名限制。拒绝同意、拦截分析、离线和清数据会造成缺样；
事件未出现不能直接解释为放弃。玩法不依赖分析可用性。

## GA4 使用方式

沿用已有资源 `wordgrid.games`（542422596，`G-MLZV98LG8Z`）。建议注册低基数的
事件维度 `session_mode`、`difficulty`、`difficulty_model`、`visit_start_state`、
`measurement_version`，以及自定义指标 `active_seconds`（秒）、`revealed_count`。
题目日期、版本在探索或原始导出可用时进行逐题复核，避免不必要的高基数维度。
GA4 后台自定义定义与保存探索需另行核实；提交代码不等同于后台已配置。

- 用同一日期范围、题目版本和模式下的**用户数**做开玩 → 首词 → 60% → 完成漏斗。
  开玩事件按访问触发，不能用完成事件数 / 开玩事件数当题目完成率。
- 每题使用过提示的用户数 / 开玩用户数，以及完成用户中的揭词比例。
- Daily 与 archive 分开查看，再合并原档的跨日续玩结果；replay/practice 单列。
- 按设备和采集日期记录版本，先累积至少两周。每难度至少 100 名有意玩题用户前，
  将结果视为描述性样本；不足时延长观察，不自动调整难度。
- 没有 `complete_finish` 的开始只称“观察窗口内未完成”，不能证明永久流失。

## 可重复的词库审计

运行 `npm run audit:complete`。脚本只读 bank/lexicon 与普通玩法词典，输出 JSON，
检查 40 个旧题完整字段、365 题全部收录词路径、当前词表可连词无遗漏、
325 个 v2 难度结果可复现，以及目标数量、长词、路径与重复词分布。
普通玩法词典仅用于发现候选差异，不自动导入，不能作为官方或完整词典背书。

2026-11-22 本轮结果：

- 2,273 个目标拼写、232 个 bonus；v2 新题实际使用 1,522 个不同目标拼写，751 个暂未出现。
- Gentle/Steady/Stretch 为 93/140/92 题，目标数中位数为 15/24/34。
- 各题代表最长词至少 3 次转向、2 条斜边；中位数为 7 次转向、4 条斜边。
  这是确定性代表路径的形状，不能推出玩家只会找到这一条路径。
- RATE 出现于 55/325 题，RENT 和 REST 各 52 题。下一版生成器应加入词族和近期重复惩罚，
  再复核难度分布，不能只增加路径转向。
- 独立选取的 467 个日常拼写样本：404 个为目标、1 个为 bonus、62 个缺失；
  其中 24 个缺失词可在现有新题连出。优先复核 ELSE、SEEN、NINE、ACTION、STATE、PARENT、
  SAID、SIGN、STOP、SAVE；PEER 当前为 bonus，复核其分类。这些样本不是英语词频覆盖率。
- 与普通玩法词典比较共 57,641 次候选发现差异（同词跨题重复计数），涉及所有 325 题。
  不能把全部差异视为应加入的目标；须人工审查词义常见程度、拼写和分类。

下一词库版本须单独确定切换日、字典版本和 bank 版本，协调客户端与 API，验证原档与旧客户端。
本轮保留 2026-11-23 的既定 v2 切换，不静默重写已分发数据。先复核高频样本缺口，
然后处理重复词族和路径多样性，最后用真实玩家样本校准模型权重。
