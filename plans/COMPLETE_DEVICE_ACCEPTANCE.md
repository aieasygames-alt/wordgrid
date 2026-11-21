# WordGrid Complete 真机验收入口

现行跨日期流程、动态用例准备和记录模板见
[COMPLETE_BROWSER_ACCEPTANCE.md](COMPLETE_BROWSER_ACCEPTANCE.md)。

开始前记录页面日期、题目版本、目标数和实际设备/浏览器。通过 `npm run
qa:prepare -- --url=测试域名 --date=页面日期` 生成该题的答案、路径、提示门槛，
仅用于验收；不要把其他日期的坐标、目标数或分数作为失败依据。

原来的 2026-10-14 固定棋盘手册完整保留在
[独立固定用例](fixtures/COMPLETE_DEVICE_ACCEPTANCE_2026-10-14.md)。
系统分享的打开、取消和回退仍需要真实 iOS/Android 设备记录；程序化复制
回退通过不能代替原生系统面板验收。
