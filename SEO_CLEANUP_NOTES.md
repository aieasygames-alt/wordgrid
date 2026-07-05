# Search Console 清理操作指引

## 背景

Search Console 的 Keyword 报告里出现了两条异常查询：

- `wordgrid.cleveegozt. om`（带空格、拼错的域名）
- `what is wordgrid.clevergoat.com`

这通常意味着 Google 索引库里还有 **wordgrid.clevergoat.com** 这个旧/外部子域的某些页面残留，稀释了 wordgrid.games 的品牌词权重。

## 你需要做的（我没权限代操作）

### 1. 先确认有哪些旧页面被索引

在 Google 搜索框里用 `site:` 操作符：

```
site:wordgrid.clevergoat.com
```

把搜出来的 URL 全部记下来。

### 2. 在 Search Console 提交移除请求（临时，6 个月）

- 打开 https://search.google.com/search-console
- 切到 **wordgrid.clevergoat.com** 这个资源（如果没有，先添加并验证）
- 左侧菜单 → **移除** (Removals) → **临时移除** → 新建请求
- 把第 1 步记下的每个 URL 逐一提交

注意：临时移除只有 6 个月有效期，是给你在等待彻底清理期间用的。

### 3. 彻底清理（让 Google 自然删掉）

选一个：

**A. 如果你控制 clevergoat.com 这个域**
- 给每个旧 URL 配置 **301 永久重定向** 到对应的 wordgrid.games 页面
  - `wordgrid.clevergoat.com/` → `https://wordgrid.games/`
  - `wordgrid.clevergoat.com/play` → `https://wordgrid.games/play`
  - 以此类推
- 这样旧页面的权重会传递到新域名

**B. 如果你不控制这个域**
- 联系 clevergoat.com 的运营者，让他们下线 `wordgrid.` 子域
- 或者用 Search Console 的"过时内容移除"工具提交申请

### 4. 在 wordgrid.games 资源里设置首选域

- Search Console → wordgrid.games → **设置** → **目标国家/地区** → 设为"美国"或"加拿大"（站点是英文）
- 这样 Google 会更稳定地把展示集中在英语市场

### 5. 观察周期

提交清理后约 **2–4 周**这些垃圾查询会从 Keyword 报告里消失。同时建议每周看一次：
- Keyword 报告里 `word grid` 的平均排名是否进入前 3
- `/guides/boggle-rules-beginners/` 是否开始有点击
- 新建的 `/guides/play-word-grid-online/` 是否出现在曝光里

## 本次代码改动配套

我已经在代码里做了以下改动来配合清理和提升主域名权重：

- 首页 title/H1/首段全部把 "word grid" 提到最前，弱化 Boggle 主导
- 新建 `/guides/play-word-grid-online/` 直接接住 "word grid online" 流量
- 优化 `/guides/boggle-rules-beginners/` 的 title 为 "Rules of Boggle"（命中问句型长尾词）
- 加 FAQ schema 覆盖 "what are the rules of boggle?" 等问句查询
- 首页和 guides 列表页都加了新页面的内链

部署后请：
1. `npm run build`
2. `npx wrangler pages deploy out`
3. 在 Search Console → URL 检查 里提交 `/guides/play-word-grid-online/` 触发重新抓取
