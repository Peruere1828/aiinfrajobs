# AGENTS.md

本仓库是「AI Infra 实习机会（2027/2028 届）」的静态站点仓库。抓取、审核、构建工具全部在本地运行，**不进入 Git**。

## 0. 仓库结构与产物

```
aiinfrajobs/
├── data/                 # 唯一数据源
│   ├── jobs.json         # 岗位
│   ├── companies.json    # 公司信息 / 统计 / 分组
│   └── site.json         # 站点文案、时间线、投递提示
├── index.html            # 生成：总览 / 搜索 / 筛选 / Top
├── companies/            # 生成：公司页 HTML + 公司 Markdown
├── assets/               # 生成：style.css / app.js
├── README.md             # 生成：仓库首页
├── .nojekyll
└── AGENTS.md
```

本地工具（被 `.gitignore` 排除）：

```
tools/
├── scrapers/             # 已有官网 / ATS 抓取脚本
├── work/scraped/         # 每家公司一个 <slug>.json（人工/子代理审核后）
├── work/raw/             # 原始抓取结果
├── merge_scraped.py      # scraped/*.json -> data/*.json
├── build/                # data/*.json -> HTML / Markdown
└── work/                 # 报告、截图、临时文件
```

**不要手改生成文件**：`index.html`、`companies/*.html`、`companies/*.md`、`README.md`、`assets/*`。要改内容，改 `data/*.json` 或 `tools/work/scraped/*.json` 后重新构建。

## 1. 候选人画像与方向

- 南京大学 CS 本科，**2028-06 毕业**，熟悉 **vLLM / MLIR / CUDA**。
- 只投实习，本科或硕士可投；博士岗排除或单列跟踪。
- 方向优先级：**① LLM 推理优化 ＞ ② AI 编译器开发 ＞ ③ 世界模型 / VLA / VLM 推理优化**。
- 方向判断依据 **JD 正文**，不凭标题臆断。纯训练/纯算法研究/推荐搜索广告/测试/前端/运维/硬件 RTL 排除。

## 2. 数据模型

`data/jobs.json` 每条岗位的核心字段：

```json
{
  "id": "cambricon-5add1004",
  "company": "cambricon",
  "title": "大模型推理优化实习生",
  "url": "https://...",
  "postings": [{"city": "北京", "url": "https://..."}],
  "apply_email": "",
  "directions": ["inference"],
  "degree": "bachelor",
  "degree_note": "JD 原文：本科及以上",
  "graduation": ["2028"],
  "graduation_note": "JD 明确 2028 届在校生",
  "batch": "daily",
  "employment": "intern",
  "state": "active",
  "summary": "1-3 句中文摘要",
  "skills": ["vLLM", "SGLang", "CUDA"],
  "notes": "实习时长 / 投递方式",
  "recommended": 2,
  "featured_rank": null,
  "locations": ["北京"],
  "team": "基础软件部",
  "first_seen": "2026-10-22",
  "last_seen": "2026-10-22"
}
```

约束：

- `directions`：`inference` / `compiler` / `world`，可多选。
- `degree`：`bachelor` / `master` / `phd` / `unknown`。`本科及以上`=bachelor，`硕士及以上`=master，`博士`=phd，未写=unknown。
- `graduation`：`2028` / `2027` / `unlimited` / `[]`。
- `state`：`active`（当前在招且 2028 本科/未标注可投的实习）、`tracking`（2027 届/硕士门槛/全职）、`phd`、`excluded`。
- `featured_rank`：只给全局 Top 10，1-10；普通岗位为 `null`。
- 每条岗位必须有 `title`、`url` 或 `apply_email`、`directions`、`degree`。

`data/companies.json` 每家公司包含：

- `slug`、`name`、`name_en`、`group`、`aliases`、`positioning`
- `source_url`、`source_note`、`source_links`、`research_date`
- `stats`：total / active / bachelor / y2028 / featured / tracking / phd
- `sections`：按方向与 state 生成的公司页分组

`group` 只能取：`互联网巨头` / `AI 独角兽` / `AI 芯片/系统` / `量化/对冲基金` / `外企在华`。

## 3. 检索与抓取规范

1. **数据源优先级**：公司官网招聘站 / 官方 ATS API > 官方邮箱/内推入口 > 线索发现。禁止牛客、猎聘、watchjobs、outscal、prosple、nowcoder、论坛转载等第三方作为依据。
2. 只抓公开数据，控制频率，不绕过登录墙。
3. 每家公司输出 `tools/work/scraped/<slug>.json`，结构见 `tools/work/scraped/SCHEMA.md`。
4. 抓完必须校验：岗位数、链接 HTTP 200（抽样或全量）、去重、学历/届别口径。
5. 大批量岗位（如字节 1000+ 条）先用关键词粗筛，再按批分给 subagent 逐条审查；最终结果必须人工合并，不直接信任自动分类。
6. 岗位很多时只保留三方向命中项，不把纯训练/算法研究/推荐广告/职能岗塞进 `jobs`。

已有脚本在 `tools/scrapers/`：阿里、百度、字节、DeepSeek、Intel、快手、微软、NVIDIA、高通。其他公司用官网 API / 页面抓取后按同一 schema 输出。

## 4. 更新流程

```bash
cd ~/projects/aiinfrajobs

# 1. 抓取 / 审核：写入 tools/work/scraped/<slug>.json
python3 tools/scrapers/scrape_nvidia.py > /tmp/nvidia.json

# 2. 合并为 data/*.json（含 Top 10、统计、公司分组）
python3 tools/merge_scraped.py

# 3. 构建 HTML / Markdown
python3 tools/build/build_site.py

# 4. 本地预览
python3 -m http.server 8765
# 打开 http://127.0.0.1:8765/

# 5. 发布
git add data index.html companies assets README.md AGENTS.md .nojekyll
git commit -m "update jobs: $(date +%F)"
git push origin main
```

调试/预览文件放在 `tools/work/`，不要提交。截图、原始 JSON、临时 md 都不进仓库。

## 5. 展示规范

- 站点默认展示 `state=active` 的实习；跟踪/博士/排除岗可在状态筛选里切换。
- 默认按匹配度排序，其次按公司、标题。
- 岗位卡片展示：公司、标题、方向、学历、届别、批次、Base、技能、官网直链、更新时间。
- 每家公司有独立页面；公司索引按 group 分组。
- 顶部统计：在招岗位、本科可投、2028 届对口、覆盖公司数。
- 所有筛选状态写入 URL query，便于分享。
- 视觉保持白底 + 蓝色强调、紧凑信息密度；不引入外部 CDN。

## 6. 部署

- 仓库：`https://github.com/Peruere1828/aiinfrajobs`（public）
- GitHub Pages：`main` 分支根目录，URL `https://peruere1828.github.io/aiinfrajobs/`
- 资源全部使用相对路径，避免影响根站和 `/ics-wiki/`
- 推送后 Pages 自动构建；如未更新，检查 `.nojekyll` 和 Pages 设置。

## 7. 语言与风格

- 全部中文；专有名词保留英文（vLLM、MLIR、CUDA、KV Cache、PD 分离等）。
- 简洁、事实化、可执行；不写过程性、致歉性、回顾性文字。
- 岗位状态、学历、有效期以官网为准；站点只保留官网 / 官方 ATS 链接。
