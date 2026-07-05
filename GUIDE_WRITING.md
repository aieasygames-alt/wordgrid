# Guide 文章创作规范

> 每周发布 1-2 篇策略文章时，严格遵循本规范。
> 目标：SEO 高排名 + 拟人化写作 + 一致的 UX 设计。

---

## 1. 每篇文章的检查清单

每篇 guide 发布前，逐项确认：

```
[ ] 文件路径: src/app/guides/{slug}/page.tsx
[ ] Metadata: title (< 60 chars), description, alternates.canonical, openGraph
[ ] JSON-LD: Article (必选) + HowTo (如适用) + BreadcrumbList (必选)
[ ] 面包屑导航: Word Grid / Guides
[ ] 内链: 至少 2 条其他 guide 链接 + 至少 2 条 /words/{word}/ 链接
[ ] CTA 区: /play + /daily 双按钮
[ ] Keep Reading 区: 2-3 条相关 guide + "Browse all guides" 链接
[ ] 注册到 /guides/page.tsx 的 GUIDES 数组
[ ] 添加到 src/app/sitemap.ts 的 staticPages
[ ] 字数: 1200-2500 词（根据主题深度）
[ ] 构建通过: npm run build
[ ] 部署后运行: node scripts/indexnow.mjs
```

---

## 2. 文件结构模板

每篇文章的 `page.tsx` 遵循以下骨架。复制后替换花括号内容。

### 2.1 Metadata

```tsx
export const metadata: Metadata = {
  title: "{文章标题，< 60 字符，不要手写 | WordGrid 后缀}",
  description:
    "{meta description，120-155 字符，包含主关键词}",
  alternates: { canonical: "/guides/{slug}" },
  openGraph: {
    title: "{OG 标题}",
    description:
      "{OG 描述，与 meta description 可略有不同，更吸引点击}",
  },
};
```

### 2.2 JSON-LD（三组 schema）

```tsx
// 1. Article schema（所有文章必须有）
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "{文章标题}",
  description: "{简短描述}",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "{YYYY-MM-DD}",
  dateModified: "{YYYY-MM-DD}",
  mainEntityOfPage: "https://wordgrid.games/guides/{slug}/",
};

// 2. HowTo schema（仅当文章是步骤型教程时使用）
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "{教程名称}",
  description: "{简短描述}",
  step: [
    { "@type": "HowToStep", position: 1, name: "{步骤名}", text: "{步骤描述}" },
    // ...
  ],
};

// 3. BreadcrumbList schema（所有文章必须有）
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: "https://wordgrid.games/" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://wordgrid.games/guides/" },
    { "@type": "ListItem", position: 3, name: "{短标题}" },
  ],
};
```

### 2.3 JSX 结构骨架

```tsx
export default function GuideName() {
  return (
    <main className="min-h-screen px-4 py-8">
      {/* JSON-LD 注入 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* 如果有 howToSchema 也注入 */}

      <article className="max-w-2xl mx-auto">
        {/* Header: 面包屑 + H1 + 阅读时间 */}
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <a href="/" className="hover:text-text">Word Grid</a>
            <span>/</span>
            <a href="/guides/" className="hover:text-text">Guides</a>
          </nav>
          <h1 className="text-4xl font-bold mb-2">{标题}</h1>
          <p className="text-text-muted">{N} min read &middot; Updated {Month YYYY}</p>
        </header>

        {/* 正文 */}
        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">{开头段落}</p>
          </section>

          {/* 更多 section... */}

          {/* CTA 区 */}
          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">{CTA 标题}</h2>
            <p className="text-text mb-4">{CTA 描述}</p>
            <div className="flex gap-3">
              <a href="/play" className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold">Play a Free Game</a>
              <a href="/daily" className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold">Today's Challenge</a>
            </div>
          </div>

          {/* Keep Reading 区 */}
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <a href="/guides/{related}/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">{标题} &rarr;</div>
                <div className="text-sm text-text-muted">{一句话描述}</div>
              </a>
              {/* 再放 1-2 条 */}
              <a href="/guides/" className="block text-sm text-text-dim hover:text-text">
                Browse all guides &rarr;
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
```

---

## 3. 写作风格规范

### 3.1 核心原则：像人在说话，不像 AI 在输出

**目标：通过 Google 的 helpful content 判定和 AI 内容检测工具。**

### 3.2 必须做的

| 规则 | 示例 |
|------|------|
| **用场景化开头** | "Maybe you found an old Boggle set in a closet." 而非 "This guide explains Boggle rules." |
| **讲个人经历和具体细节** | "arguing about whether a letter is a P or an F because it landed sideways" |
| **用短句和长句交替** | 一个 5 词短句。然后一个 20 词长句解释细节。再来一句短的。 |
| **偶尔用口语化表达** | "Honestly?" "Look" "That's it." "The good news?" |
| **承认不完美和试错** | "TREIN (not valid!)" — 展示犯错过程，AI 很少这样做 |
| **用括号补充吐槽** | "QATS is a real word (technically)" — 带态度的括号注释 |
| **用具体的、不规整的例子** | 不用 "ABC" 这种完美例子，用 "TREIN"（拼错了）然后标注它不 valid |
| **结尾给具体行动建议** | "grab every short word you can see, then go back and look for longer ones" |

### 3.3 绝对不要做的

| 反模式 | 为什么不行 |
|--------|-----------|
| **对称的段落结构**（每段都是 "第一...第二...第三..."） | AI 最明显的特征 |
| **每段都以 topic sentence 开头** | 太工整，人类不这样写 |
| **使用 "delve into" "navigate the world of" "unlock the potential"** | AI 高频词汇 |
| **过度使用 "crucial" "essential" "vital" "comprehensive"** | AI 标记词 |
| **每段长度几乎一样** | 人类写作有长短不一的段落 |
| **完美的过渡句** | "Now that we've covered X, let's explore Y" — 典型 AI 结构 |
| **总结段（"In conclusion..."）** | 直接砍掉，不需要 |
| **列表超过 6 项** | 人类写 3-4 项就停了，AI 喜欢凑满 |
| **所有 H2 都是疑问句** | 混合使用陈述句和疑问句 |

### 3.4 词汇替换表

| 避免（AI 味重） | 推荐（人类味） |
|-----------------|---------------|
| "comprehensive guide" | "complete walkthrough" / "everything you need" |
| "delve into" | "dive into" / "dig into" / "look at" |
| "navigate the landscape" | 直接说做什么 |
| "leverage" | "use" |
| "in today's fast-paced world" | 删掉，直接说正事 |
| "It's worth noting that" | 删掉，直接说 |
| "When it comes to" | 删掉，直接说 |
| "Furthermore" / "Moreover" | 删掉或用 "And" / "Plus" |
| "Additionally" | 删掉，直接接下一句 |

### 3.5 段落节奏示例

好的节奏（长短交替，有口语感）：
```
The good news? The rules are simpler than they look. You can learn
them in about five minutes.

Every game starts with a grid of 16 letters arranged in 4 rows and 4
columns. In the original board game version, these come from shaking
16 dice in a plastic dome. In online versions like WordGrid, the
letters are generated by a seeded random algorithm — but the idea is
the same.

Here's an example of what a grid might look like:
```

差的节奏（AI 味重，每段工整对称）：
```
Understanding the grid layout is essential for mastering word grid
puzzles. The standard configuration consists of 16 cells arranged in
a 4x4 matrix.

Each cell contains a single letter that players must connect to form
valid words. The arrangement of these letters determines the
difficulty and potential word combinations available during gameplay.

It is worth noting that the Qu tile represents a unique challenge.
This special tile combines two letters into a single cell, creating
both opportunities and constraints for word formation.
```

---

## 4. SEO 规范

### 4.1 关键词布局

| 位置 | 规则 |
|------|------|
| **Title** | 主关键词放最前面，不要手写 " \| WordGrid"；根布局会自动追加品牌 |
| **H1** | 与 title 一致或接近，但可以有微小差异 |
| **前 100 词** | 自然出现主关键词 1 次 |
| **H2 标题** | 自然嵌入相关关键词，不要堆砌 |
| **正文** | 每 300 词出现 1-2 次关键词或变体 |
| **内链锚文本** | 用描述性文字，不用 "click here" |

### 4.2 Title 格式

```
{主关键词}: {补充描述}
```

示例：
- `Boggle Rules: A Complete Beginner's Guide`
- `Word Grid vs Boggle: What's the Difference?`
- `High-Scoring Words for Word Games`

### 4.3 Meta Description

- 120-155 字符
- 包含主关键词
- 以行动导向结尾（"Learn..." "Discover..." "Find out..."）
- 不要与第一段完全重复

### 4.4 内链策略

每篇文章必须包含：

| 链接类型 | 数量 | 示例 |
|---------|------|------|
| 到其他 guide | 2-3 条 | Keep Reading 区 + 正文中的自然引用 |
| 到 /words/{word}/ | 2-5 条 | 正文中提到具体单词时链接 |
| 到 /play/ | 1 条 | CTA 区 |
| 到 /daily/ | 1 条 | CTA 区 |
| 到 /guides/ 索引页 | 1 条 | Keep Reading 区底部 |

### 4.5 视觉元素

当文章涉及棋盘、路径、示例时，使用 Tailwind 组件渲染可视化：

```tsx
// 示例棋盘
<div className="my-4 inline-block bg-surface/50 rounded-xl p-4">
  <div className="grid grid-cols-4 gap-2">
    {BOARD.flat().map((letter, i) => (
      <div key={i} className="w-12 h-12 flex items-center justify-center bg-surface rounded-lg font-bold text-lg border border-border">
        {letter}
      </div>
    ))}
  </div>
</div>

// 高亮提示框
<div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
  <p className="text-sm">{内容}</p>
</div>

// 代码风格示例块
<div className="bg-surface/50 rounded-lg p-4 space-y-2 font-mono text-sm">
  <div>RATE → RATES, RATED, RATING</div>
</div>

// 数据表格
<table className="w-full text-sm">
  <thead>
    <tr className="border-b border-border">
      <th className="text-left py-2 text-text-muted">{列名}</th>
    </tr>
  </thead>
  <tbody>
    {DATA.map((row) => (
      <tr key={row[0]} className="border-b border-surface">
        <td className="py-2">{row[0]}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 5. 注册流程（每篇新文章）

### 5.1 添加到 /guides/page.tsx

```tsx
const GUIDES = [
  // 已有文章...
  {
    href: "/guides/{slug}",
    title: "{文章标题}",
    description: "{1-2 句描述，与 meta description 不同}",
    category: "Beginner" | "Intermediate" | "Advanced",
    readTime: "{N} min read",
    date: "{YYYY-MM-DD}",
  },
];
```

如果引入了新 category（如 "Advanced"），添加到：
```tsx
const CATEGORIES = ["Beginner", "Intermediate", "Advanced"];
```

### 5.2 添加到 sitemap.ts

```tsx
{ url: `${BASE_URL}/guides/{slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
```

### 5.3 更新已有文章的 Keep Reading 区

检查是否有已发布文章的主题与新文章相关，在新文章中加入对已有文章的引用，同时考虑在已有文章中引用新文章（双向链接）。

### 5.4 更新首页 guides 区域

如果新文章对首页用户有吸引力（如入门级文章），考虑添加到 `src/app/page.tsx` 的 Guides 网格中。首页当前最多展示 4-6 篇，优先展示入门级文章。

---

## 6. 发布流程

```bash
# 1. 构建
npm run build

# 2. 验证 JSON-LD（检查输出 HTML）
grep -o '"@type":"Article"' out/guides/{slug}/index.html
grep -o '"@type":"BreadcrumbList"' out/guides/{slug}/index.html

# 3. 部署
npx wrangler pages deploy out --project-name=wordgrid

# 4. 提交索引
node scripts/indexnow.mjs

# 5. 在 Google Search Console 中手动请求索引（可选，加速）
```

---

## 7. 文章主题规划（Week 1-12）

| 周 | 标题 | Slug | 分类 | 目标关键词 |
|----|------|------|------|-----------|
| ✅ | How to Find More Words in Word Grid Puzzles | how-to-find-more-words | Beginner | word finding techniques |
| ✅ | Word Grid Strategies: Score Higher Every Game | word-grid-strategies | Intermediate | scoring strategy |
| ✅ | Boggle Rules: A Complete Beginner's Guide | boggle-rules-beginners | Beginner | boggle rules, how to play boggle |
| ✅ | Word Grid vs Boggle: What's the Difference? | word-grid-vs-boggle | Beginner | word grid vs boggle, games like boggle |
| W4 | Best 3-Letter Words to Know | best-3-letter-words | Beginner | 3 letter words, short words boggle |
| W4 | Common Word Patterns in Grid Puzzles | common-word-patterns | Beginner | word patterns, prefix suffix |
| W6 | Boggle Solver — How to Analyze a Grid | boggle-solver-analyze-grid | Intermediate | boggle solver, word grid solver |
| W6 | High-Scoring Words for Word Games | high-scoring-words | Intermediate | high scoring words, best boggle words |
| W8 | Time Management in Word Puzzles | time-management-word-puzzles | Intermediate | boggle strategy, word game tips |
| W8 | Words with Q, Z, J, X — Scoring Guide | words-with-qzxj | Intermediate | words with q, qu words boggle |
| W10 | Advanced Boggle Strategies — Competitive Play | advanced-boggle-strategies | Advanced | advanced boggle strategy |
| W10 | How to Build a Daily Word Game Habit | daily-word-game-habit | Advanced | daily word game, word game streak |

---

## 8. 常见错误提醒

1. **JSX 中不要用 `'` 和 `"`，用 `&apos;` 和 `&quot;` 或 `&ldquo;`/`&rdquo;`**
   - ❌ `You're`  →  ✅ `You&apos;re`
   - ❌ `"word"`  →  ✅ `&ldquo;word&rdquo;`

2. **链接 URL 必须以 `/guides/` 开头，不带尾部斜杠**（Next.js trailingSlash 配置会自动处理）

3. **Keep Reading 区的链接 URL 需要尾部斜杠**（因为是 `<a>` 标签直接渲染，不经过 Next.js Link）

4. **datePublished 和 dateModified：新文章两个相同；更新旧文章时只改 dateModified**

5. **不要在 SSG guide 中使用 `"use client"`** — guide 页面必须是纯 Server Component，保证所有内容在 HTML 中静态输出
