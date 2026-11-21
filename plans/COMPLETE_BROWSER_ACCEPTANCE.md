# Complete 通用浏览器验收

适用于本地静态导出、Pages 预览和正式站只读检查，不依赖某一天的固定答案。
原始十目标题的精确坐标流程保存在 `fixtures/`，不是通用通过标准。

## 准备和范围

使用 Node 24，仓库内执行：

```sh
npm ci
npm test
npm run lint
npm run build
npm run qa:check
npm run check:functions
npm run qa:serve -- --port=4180 --deny-sharing
```

另一个终端执行（选择实际已发布的日期）：

```sh
npm run qa:prepare -- --url=http://127.0.0.1:4180 --date=2026-10-14
```

省略 `--date` 时自动选当天；当天不在题库中则选一份已发布题，并给出明确的
日期入口。也可用 `--url=https://某个预览.pages.dev` 对预览准备。输出
`.qa/complete-fixture.json` 含该题的目标、奖励词、额外认可词、路径、分值和
取整后的提示门槛。该文件含答案，仅用于验收，不作为公开截图。

`qa:serve` 是可移植的 Node 静态服务器，绑定本机回环地址。排行榜 GET 只返回
未启用状态，POST 恒失败，不创建公开成绩。`--deny-sharing` 通过真实浏览器
Permissions-Policy 请求禁用剪贴板与 Web Share，验证失败后的手动复制预览。
浏览器可能不执行该策略（当前 IAB 会允许复制）；套件必须将拒绝场景记录为
`unsupported`，不能写成通过。分享 helper 的单测另行覆盖缺失 API、拒绝和取消。
后端写入验证由实际 SQLite 单测承担，不把这个 GET stub 当作 D1 集成验收。

新词库固定样本可独立运行：

```sh
npm run qa:serve -- --port=4181 --fixture=v2 --deny-sharing
npm run qa:prepare -- --url=http://127.0.0.1:4181 --output=.qa/v2-fixture.json
```

该选项只在本地 QA 服务器上将首份 v2 样本映射为 2026-10-14、ID 为
`qa-v2-fixed`，方便提前验证新版本 UI。不会改写导出文件或生产日期规则。

使用隔离的新 origin/浏览器配置，不删除已有个人进度。相同用例重跑时改用
新端口或独立浏览器配置。对正式域名仅做页面、资源和 API GET 检查；交互脚本
拒绝正式域名。运行中不要提交排行榜，也不用真实个人信息或发送分享给第三方。

## 可复用 CUA 回归入口

`scripts/complete-browser-acceptance.mjs` 通过当前 CUA 浏览器 API 执行，不依赖
未声明的 Playwright 安装、本机绝对产物路径或浏览器内部状态注入。先按照
当前 CUA 文档选择浏览器/创建临时页并读取 viewport 能力说明，然后在 CUA
JavaScript 环境使用当前工作区路径：

```js
const suite = await import("file:///项目绝对路径/scripts/complete-browser-acceptance.mjs");
const fixture = JSON.parse(await (await import("node:fs/promises"))
  .readFile("/项目绝对路径/.qa/complete-fixture.json", "utf8"));
const result = await suite.runCompleteAcceptance({
  tab, viewport, fixture,
  createTab: url => cua.createBrowserTab("iab", url, { visible: false }),
  artifactDir: "/项目绝对路径/.qa/browser",
  denySharing: true,
});
nodeRepl.write(result);
```

玩法操作通过真实输入、按钮、链接和刷新执行，DOM evaluation 只读取页面。
脚本不清理现有存档；初始非零时停止并要求使用隔离 origin。截图、逐项结果
写入指定产物目录；viewport 无论成功失败都会复原。CI 执行规则、API、缓存策略
和导出完整性检查；CUA 浏览器套件由支持 CUA 的验收会话执行，不声称是无界面
CI 浏览器任务。

窄屏检查必须同时核实 `window.innerWidth` 等于请求宽度，并以文档 clientWidth
检查横向溢出（排除竖向滚动条宽度）。
某些 IAB 会接受 viewport 设置却继续以桌面宽度渲染；此时记录 `unsupported`
并在文件名中保留实际宽度，不能将“桌面无溢出”当成 320/390px 通过。

## 跨日期通用检查

| 编号 | 操作 | 通过标准 |
| --- | --- | --- |
| T01 | 首玩教程、跳过、再次打开 | 三步引导可操作；教程阻止正式输入，结束后恢复；刷新不强制重复 |
| T02 | 输入实际目标、重复词、非法路径、奖励词 | 目标只增加一次；错误不计分；奖励不改变目标进度；旧题 extras 单列零分 |
| T03 | 在 `ceil(N×20/40/60%)` 前后输入目标 | 门槛前禁用、达到时启用；“还差 N 个”准确，奖励与 extras 不计入 |
| T04 | 启用提示、隐藏、零分揭词、旋转/回看 | 使用记录保留；揭词不加分；四次旋转还原；路径字母/顺序正确 |
| T05 | 两标签分别发现不同目标，再刷新两边 | 并集保留，重复不计分，揭词不会因合并重新得分 |
| T06 | 原题有进度后开始独立重玩、刷新、回到原题 | 重玩从零开始、重载恢复自身；原题进度与个人统计不被覆盖 |
| T07 | 打开归档、切月份、尝试未来/无效日期 | 仅已发布题；续玩和 Review 对应原存档；未来链接给出明确提示 |
| T08 | 预览分享、复制、拒绝剪贴板 | 文本不含答案/棋盘；状态最新；失败后有可手动选择的文本；不发送给第三方 |
| T09 | 320/390px、横屏、深浅色、输入法 | 页面无横向溢出；键盘/手指可操作；长词不撑破卡片 |
| T10 | 等待 Offline play ready，停服务器后重开 | Complete、归档与普通玩法/词表可重开；保存有效；榜单不离线排队提交 |
| T11 | 恢复服务器并重新打开 | 最新页面/题库从网络取回，排行榜恢复；存档保持 |
| T12 | 缓存一版后发布新版本 | 显示更新提示，用户点击才激活并重载；当前和前一版缓存有界保留 |

程序化套件涵盖基础输入、跨标签、分享预览、支持策略时的剪贴板失败、移动布局、归档及
独立重玩。规则测试覆盖取整门槛、评分、版本和缓存安装/切换失败。
真实触摸、旋转折线、系统分享取消、跨午夜浏览器行为仍按表进行设备补验，
不得将不支持或未执行的项填成通过。

## 真实断网阶段

在线阶段显示 Offline play ready 后，停止当前本地 QA 服务器，然后在同一
CUA 会话调用：

```js
nodeRepl.write(await suite.verifyOffline({ tab, fixture,
  artifactDir: "/项目绝对路径/.qa/browser" }));
```

这会重开原题、检查保存、使用客户端链接进入归档并保存截图。再进入
`/play/?mode=zen` 或 `/solver/` 检查普通词表真正可用。恢复同端口服务器后
检查重连。此流程不用伪造 navigator、localStorage 或网络响应。

## 验收记录

```text
提交 / 导出缓存版本：
测试地址 / 模式（实际题库或固定样本）：
页面日期 / 题目版本 / 目标数 / 提示门槛：
时间 / 时区 / 设备 / 系统 / 浏览器：
T01–T12：逐项通过 / 失败 / 不支持 / 未执行
原生分享：打开 / 取消 / 失败回退，各自记录
断网方式 / 重连结果：
最终目标数 / 分数 / 奖励 / extras / 揭词：
问题：步骤、预期、实际、频率、截图路径
结论及尚缺的设备范围：
```

放行须无进度丢失、重复计分、回放覆盖原题、答案泄露或误显示“离线就绪”。
第一次访问即断网、浏览器不支持 Service Worker、存储被清除或配额不足时，
不能承诺离线可用。题库到期后应明确进入练习模式。
