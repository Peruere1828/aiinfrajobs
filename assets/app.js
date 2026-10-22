/* AI Infra 实习机会 — client-side filtering and rendering. */
(function () {
  "use strict";

  const body = document.body;
  const base = body.dataset.base || "";
  const page = window.__PAGE__ || {};
  const build = (window.__SITE__ && window.__SITE__.build_id) || "1";

  const DEGREE_LABELS = { bachelor: "本科", master: "硕士", phd: "博士", unknown: "未标注" };
  const STATE_LABELS = { active: "在招", tracking: "跟踪", phd: "博士门槛", excluded: "排除", closed: "已下线" };
  const DIR_LABELS = { inference: "① LLM 推理", compiler: "② AI 编译器", world: "③ 世界模型 / VLA / VLM" };
  const DIR_ORDER = { inference: 0, compiler: 1, world: 2 };
  const BATCH_LABELS = {
    "": "", unknown: "", daily: "日常实习", "日常实习": "日常实习",
    summer: "暑期实习", winter: "寒假实习",
    "暑期实习": "暑期实习", "寒假实习": "寒假实习",
    ByteIntern: "ByteIntern", "青云计划": "青云计划", Seed: "Seed", TGT: "TGT", "可灵": "可灵"
  };

  let JOBS = [];
  let COMPANIES = [];
  let SITE = {};
  let companyBySlug = {};
  let totalJobs = 0;

  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const esc = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));

  const safeUrl = (value) => {
    const url = String(value || "").trim();
    return /^https?:\/\//i.test(url) ? url : "";
  };

  const plain = (value) => String(value || "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const dirIndex = (dir) => DIR_ORDER[dir] == null ? 0 : DIR_ORDER[dir];
  const degreeLabel = (job) => DEGREE_LABELS[job.degree] || job.degree || "未标注";
  const stateLabel = (job) => STATE_LABELS[job.state] || job.state || "在招";
  const batchLabel = (job) => Object.prototype.hasOwnProperty.call(BATCH_LABELS, job.batch)
    ? BATCH_LABELS[job.batch]
    : (job.batch || "");

  function graduationLabel(job) {
    const years = job.graduation || [];
    if (!years.length) return "届别未标注";
    if (years.includes("unlimited")) return "在校生 / 不限";
    return years.map((y) => `${y} 届`).join(" / ");
  }

  function matchScore(job) {
    let score = 0;
    const dirs = job.directions || [];
    if (dirs.includes("inference")) score += 30;
    if (dirs.includes("compiler")) score += 22;
    if (dirs.includes("world")) score += 12;
    if (job.degree === "bachelor") score += 20;
    else if (job.degree === "unknown") score += 12;
    if ((job.graduation || []).includes("2028")) score += 20;
    else if ((job.graduation || []).includes("unlimited")) score += 12;
    else if (!(job.graduation || []).length) score += 4;
    score += (Number(job.recommended) || 0) * 8;
    if (job.featured_rank) score += 40 - Number(job.featured_rank);
    if (job.state !== "active") score -= 35;
    return score;
  }

  function enrich(job) {
    const company = companyBySlug[job.company] || {};
    job.company_slug = job.company;
    job.company_name = company.name || job.company_name || job.company;
    job.company_en = company.name_en || "";
    job.degree_label = degreeLabel(job);
    job.state_label = stateLabel(job);
    job.graduation_label = graduationLabel(job);
    job.batch_label = batchLabel(job);
    job.direction_labels = (job.directions || []).map((d) => DIR_LABELS[d] || d);
    job.score = matchScore(job);
    job.search_text = [
      job.title, job.company_name, job.company_en, job.summary,
      (job.skills || []).join(" "), (job.locations || []).join(" "),
      (job.direction_labels || []).join(" "), job.batch_label,
      job.degree_label, job.graduation_label, job.group_label
    ].join(" ").toLowerCase();
    return job;
  }

  /* ---------------- state ---------------- */

  const defaults = {
    q: "",
    dirs: new Set(),
    degree: "",
    grad: "",
    batch: "",
    city: "",
    status: page.type === "company" ? "all" : "active",
    bachelor: false,
    y2028: false,
    featured: false,
    sort: "match"
  };

  function readState() {
    const params = new URLSearchParams(location.search);
    const s = {
      q: params.get("q") || "",
      dirs: new Set((params.get("dir") || "").split(",").filter(Boolean)),
      degree: params.get("degree") || "",
      grad: params.get("grad") || "",
      batch: params.get("batch") || "",
      city: params.get("city") || "",
      status: params.get("status") || defaults.status,
      bachelor: params.get("bachelor") === "1",
      y2028: params.get("y2028") === "1",
      featured: params.get("featured") === "1",
      sort: params.get("sort") || "match"
    };
    return s;
  }

  let state = readState();

  function applyStateToControls() {
    const search = $("search-input");
    if (search) search.value = state.q;
    const degree = $("degree-select");
    if (degree) degree.value = state.degree;
    const grad = $("grad-select");
    if (grad) grad.value = state.grad;
    const batch = $("batch-select");
    if (batch) batch.value = state.batch;
    const city = $("city-select");
    if (city) city.value = state.city;
    const status = $("state-select");
    if (status) status.value = state.status;
    const sort = $("sort-select");
    if (sort) sort.value = state.sort;
    const bachelor = $("bachelor-toggle");
    if (bachelor) bachelor.checked = state.bachelor;
    const y2028 = $("y2028-toggle");
    if (y2028) y2028.checked = state.y2028;
    const featured = $("featured-toggle");
    if (featured) featured.checked = state.featured;
    $$(".dir-chip").forEach((btn) => {
      const on = state.dirs.has(btn.dataset.dir);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function writeUrl() {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.dirs.size) params.set("dir", Array.from(state.dirs).join(","));
    if (state.degree) params.set("degree", state.degree);
    if (state.grad) params.set("grad", state.grad);
    if (state.batch) params.set("batch", state.batch);
    if (state.city) params.set("city", state.city);
    if (state.status !== defaults.status) params.set("status", state.status);
    if (state.bachelor) params.set("bachelor", "1");
    if (state.y2028) params.set("y2028", "1");
    if (state.featured) params.set("featured", "1");
    if (state.sort !== "match") params.set("sort", state.sort);
    const query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? `?${query}` : "") + location.hash);
  }

  /* ---------------- filtering ---------------- */

  function matches(job) {
    if (page.type === "company" && job.company_slug !== page.slug) return false;

    if (state.status !== "all" && job.state !== state.status) return false;

    if (state.dirs.size) {
      const hit = Array.from(state.dirs).some((d) => (job.directions || []).includes(d));
      if (!hit) return false;
    }

    if (state.degree && job.degree !== state.degree) return false;

    if (state.grad === "2028") {
      if (!(job.graduation || []).includes("2028") && !(job.graduation || []).includes("unlimited")) return false;
    } else if (state.grad && !(job.graduation || []).includes(state.grad)) {
      return false;
    }

    if (state.batch && job.batch !== state.batch) return false;
    if (state.city && !(job.locations || []).includes(state.city)) return false;

    if (state.bachelor && !["bachelor", "unknown"].includes(job.degree)) return false;
    if (state.y2028) {
      if (!(job.graduation || []).includes("2028") && !(job.graduation || []).includes("unlimited")) return false;
    }
    if (state.featured && !job.featured_rank && (Number(job.recommended) || 0) < 2) return false;

    if (state.q) {
      const tokens = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!tokens.every((token) => job.search_text.includes(token))) return false;
    }
    return true;
  }

  function sortJobs(items) {
    const list = items.slice();
    if (state.sort === "company") {
      list.sort((a, b) => a.company_name.localeCompare(b.company_name, "zh-CN") ||
        a.title.localeCompare(b.title, "zh-CN"));
    } else if (state.sort === "updated") {
      list.sort((a, b) => String(b.last_seen || "").localeCompare(String(a.last_seen || "")) ||
        b.score - a.score);
    } else {
      list.sort((a, b) => b.score - a.score ||
        (a.featured_rank || 999) - (b.featured_rank || 999) ||
        a.company_name.localeCompare(b.company_name, "zh-CN"));
    }
    return list;
  }

  /* ---------------- rendering ---------------- */

  function badges(job) {
    const out = [];
    (job.directions || []).forEach((d) => {
      out.push(`<span class="badge dir-${dirIndex(d)}">${esc(DIR_LABELS[d] || d)}</span>`);
    });
    out.push(`<span class="badge degree-${esc(job.degree)}" title="${esc(job.degree_note || "")}">${esc(job.degree_label)}</span>`);
    if (job.graduation_label && job.graduation_label !== "届别未标注") {
      out.push(`<span class="badge grad">${esc(job.graduation_label)}</span>`);
    }
    if (job.batch_label) out.push(`<span class="badge batch">${esc(job.batch_label)}</span>`);
    if (job.state !== "active") out.push(`<span class="badge state-${esc(job.state)}">${esc(job.state_label)}</span>`);
    return out.join("");
  }

  function postingsActions(job) {
    const actions = [];
    const primary = safeUrl(job.url);
    if (primary) {
      actions.push(`<a class="btn primary" href="${esc(primary)}" target="_blank" rel="noopener">查看官网 JD ↗</a>`);
    }
    if (job.apply_email) {
      actions.push(`<a class="btn ghost" href="mailto:${esc(job.apply_email)}">邮箱投递</a>`);
    }
    const postings = (job.postings || []).filter((p) => safeUrl(p.url));
    if (postings.length > 1) {
      const links = postings.map((p) => {
        const label = p.city || p.label || "链接";
        return `<a class="city-link" href="${esc(safeUrl(p.url))}" target="_blank" rel="noopener">${esc(label)}</a>`;
      }).join("");
      actions.push(`<span class="city-links">${links}</span>`);
    }
    const companyHref = `${base}companies/${esc(job.company_slug)}.html`;
    actions.push(`<a class="btn ghost" href="${companyHref}">公司页</a>`);
    return actions.join("");
  }

  function jobCard(job, opts) {
    const featured = opts && opts.featured;
    const companyHref = `${base}companies/${esc(job.company_slug)}.html`;
    const titleHref = safeUrl(job.url) || companyHref;
    const locations = (job.locations || []).join(" / ") || "地点未标注";
    const updated = job.last_seen || job.first_seen || "";
    const team = plain(job.team || "");
    const teamLine = team && !(job.locations || []).some((c) => team.includes(c)) && team.length < 60
      ? `<span>${esc(team)}</span>` : "";
    const skills = (job.skills || []).slice(0, 10)
      .map((s) => `<span class="skill">${esc(s)}</span>`).join("");
    const summary = plain(job.summary || "");
    return `
      <article class="job-card${featured ? " featured-card" : ""}" data-id="${esc(job.id)}">
        ${featured ? `<span class="rank-badge">#${esc(job.featured_rank || "★")} 首推</span>` : ""}
        <div class="job-card-top">
          <a class="company" href="${companyHref}">${esc(job.company_name)}${job.company_en ? ` · ${esc(job.company_en)}` : ""}</a>
          ${featured ? "" : `<span class="badge state-${esc(job.state)}">${esc(job.state_label)}</span>`}
        </div>
        <h3 class="job-title"><a href="${esc(titleHref)}" ${safeUrl(job.url) ? 'target="_blank" rel="noopener"' : ""}>${esc(job.title)}</a></h3>
        <div class="badges">${badges(job)}</div>
        <div class="job-meta">
          <span>${esc(locations)}</span>
          ${teamLine}
          ${updated ? `<span>更新 ${esc(updated)}</span>` : ""}
        </div>
        ${summary ? `<p class="job-summary">${esc(summary)}</p>` : ""}
        ${skills ? `<div class="skills">${skills}</div>` : ""}
        <div class="job-actions">${postingsActions(job)}</div>
      </article>`;
  }

  function renderFeatured() {
    const container = $("featured-list");
    const section = $("featured-section");
    if (!container || !section) return;
    let items = JOBS.filter((job) => job.featured_rank);
    if (page.type === "company") items = items.filter((job) => job.company_slug === page.slug);
    items.sort((a, b) => (a.featured_rank || 999) - (b.featured_rank || 999) || b.score - a.score);
    items = items.slice(0, 12);
    if (!items.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    container.innerHTML = items.map((job) => jobCard(job, { featured: true })).join("");
  }

  function filterSummary(count) {
    const parts = [];
    if (page.type === "company") {
      const company = companyBySlug[page.slug];
      if (company) parts.push(company.name);
    }
    if (state.q) parts.push(`关键词「${state.q}」`);
    if (state.dirs.size) parts.push(Array.from(state.dirs).map((d) => DIR_LABELS[d]).join(" / "));
    if (state.degree) parts.push(DEGREE_LABELS[state.degree] || state.degree);
    if (state.grad === "2028") parts.push("2028 届 / 不限");
    else if (state.grad) parts.push(state.grad === "unlimited" ? "在校生 / 不限" : `${state.grad} 届`);
    if (state.batch) parts.push(state.batch);
    if (state.city) parts.push(state.city);
    if (state.bachelor) parts.push("本科可投");
    if (state.y2028) parts.push("2028 届对口");
    if (state.featured) parts.push("首推 / 高匹配");
    if (state.status !== "all") parts.push(STATE_LABELS[state.status] || state.status);
    parts.push(`${count} 个结果`);
    return parts.join(" · ");
  }

  function renderList() {
    const container = $("job-list");
    const empty = $("empty-state");
    if (!container) return;
    const filtered = sortJobs(JOBS.filter(matches));
    const count = filtered.length;
    const resultCount = $("result-count");
    if (resultCount) resultCount.textContent = `共 ${count} 个岗位`;
    const listCount = $("list-count");
    if (listCount) listCount.textContent = `${count} 条`;
    const summary = $("active-filter-summary");
    if (summary) summary.textContent = filterSummary(count);
    if (empty) empty.hidden = count > 0;
    container.innerHTML = filtered.map((job) => jobCard(job, { featured: false })).join("");
  }

  function refresh() {
    applyStateToControls();
    renderList();
    writeUrl();
  }

  /* ---------------- controls ---------------- */

  function fillCities() {
    const select = $("city-select");
    if (!select) return;
    const counts = new Map();
    JOBS.forEach((job) => {
      if (page.type === "company" && job.company_slug !== page.slug) return;
      (job.locations || []).forEach((city) => counts.set(city, (counts.get(city) || 0) + 1));
    });
    const cities = Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-CN"));
    select.innerHTML = `<option value="">全部城市</option>` +
      cities.map(([city, n]) => `<option value="${esc(city)}">${esc(city)}（${n}）</option>`).join("");
    if (state.city && !cities.some(([city]) => city === state.city)) {
      select.insertAdjacentHTML("beforeend", `<option value="${esc(state.city)}">${esc(state.city)}</option>`);
    }
    select.value = state.city;
  }

  function bind() {
    const search = $("search-input");
    let timer = null;
    if (search) {
      search.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          state.q = search.value.trim();
          refresh();
        }, 160);
      });
    }

    $$(".dir-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = btn.dataset.dir;
        if (state.dirs.has(dir)) state.dirs.delete(dir);
        else state.dirs.add(dir);
        refresh();
      });
    });

    const bindSelect = (id, key) => {
      const el = $(id);
      if (el) el.addEventListener("change", () => {
        state[key] = el.value;
        // Master/PhD and 2027 batches live in the tracking bucket; switch
        // the status filter so selecting them does not produce an empty list.
        if (state.status === "active" && (
          (key === "degree" && ["master", "phd"].includes(state.degree)) ||
          (key === "grad" && state.grad === "2027") ||
          (key === "batch" && ["ByteIntern", "TGT"].includes(state.batch))
        )) {
          state.status = "all";
          if ($("state-select")) $("state-select").value = "all";
        }
        refresh();
      });
    };
    bindSelect("degree-select", "degree");
    bindSelect("grad-select", "grad");
    bindSelect("batch-select", "batch");
    bindSelect("city-select", "city");
    bindSelect("state-select", "status");
    bindSelect("sort-select", "sort");

    const bindToggle = (id, key) => {
      const el = $(id);
      if (el) el.addEventListener("change", () => { state[key] = el.checked; refresh(); });
    };
    bindToggle("bachelor-toggle", "bachelor");
    bindToggle("y2028-toggle", "y2028");
    bindToggle("featured-toggle", "featured");

    const reset = $("reset-filters");
    if (reset) {
      reset.addEventListener("click", () => {
        state = {
          q: "", dirs: new Set(), degree: "", grad: "", batch: "", city: "",
          status: defaults.status, bachelor: false, y2028: false, featured: false, sort: "match"
        };
        const searchEl = $("search-input");
        if (searchEl) searchEl.value = "";
        refresh();
      });
    }
  }

  /* ---------------- data ---------------- */

  async function load() {
    const urls = [
      `${base}data/jobs.json?v=${encodeURIComponent(build)}`,
      `${base}data/companies.json?v=${encodeURIComponent(build)}`,
      `${base}data/site.json?v=${encodeURIComponent(build)}`
    ];
    const responses = await Promise.all(urls.map((url) => fetch(url, { cache: "no-store" })));
    if (responses.some((r) => !r.ok)) throw new Error("data fetch failed");
    [JOBS, COMPANIES, SITE] = await Promise.all(responses.map((r) => r.json()));
    companyBySlug = Object.fromEntries(COMPANIES.map((c) => [c.slug, c]));
    totalJobs = JOBS.length;
    JOBS = JOBS.map(enrich);
  }

  async function init() {
    if (page.type === "companies" || page.type === "404") return;
    try {
      await load();
      fillCities();
      applyStateToControls();
      renderFeatured();
      renderList();
      bind();
      writeUrl();
    } catch (err) {
      const container = $("job-list");
      if (container) {
        container.innerHTML = `<div class="empty-state"><strong>数据加载失败</strong><p>请通过本地 HTTP 服务或 GitHub Pages 访问，不要直接用 file:// 打开。</p></div>`;
      }
      console.error(err);
    }
  }

  init();
})();
