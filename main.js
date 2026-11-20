// ============================================================
//  共通スクリプト（基本的に触らなくてOK）
//  members/_list.js に書かれたIDの members/<ID>.js を読み込み、
//  トップページ・メンバー詳細ページを組み立てます。
// ============================================================
const MEMBERS = [];

function addMember(data) {
  MEMBERS.push(data);
}

const COLORS = ["green", "blue", "coral", "yellow"];

// HTMLに文字を埋め込むときの安全対策
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function colorVar(m) {
  return `var(--${COLORS.includes(m.color) ? m.color : "green"})`;
}

function num(i) {
  return String(i + 1).padStart(2, "0");
}

function initialBadge(m) {
  const initial = (m.kana || m.name || "?").trim().charAt(0);
  return `<div class="member-portrait" style="background:${colorVar(m)}">${esc(initial)}</div>`;
}

function rubyName(m) {
  return m.kana
    ? `<ruby>${esc(m.name)}<rt>${esc(m.kana)}</rt></ruby>`
    : esc(m.name);
}

function detailsList(m) {
  const rows = (m.details || [])
    .map(([dt, dd]) => `<dt>${esc(dt)}</dt><dd>${esc(dd)}</dd>`)
    .join("");
  return rows ? `<dl class="member-details">${rows}</dl>` : "";
}

function workCard(w, m, index) {
  const art = w.image
    ? `<img src="${esc(w.image)}" alt="">`
    : "";
  const tags = (w.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
  const link = w.url
    ? `<a class="work-link" href="${esc(w.url)}" target="_blank" rel="noopener">作品を見る →</a>`
    : "";
  return `
    <article class="work-card">
      <div class="work-art" aria-hidden="true">
        ${art}
        <p class="work-art-title">${esc(w.title)}</p>
      </div>
      <div class="work-content">
        <p class="work-meta">PROJECT ${num(index)} / ${esc(w.category || "WORK")} / ${esc(m.name)}</p>
        <h3>${esc(w.title)}</h3>
        <p class="work-description">${esc(w.description)}</p>
        ${tags ? `<ul class="work-tags" aria-label="作品の種類">${tags}</ul>` : ""}
        ${link}
      </div>
    </article>`;
}

// ---------- トップページ ----------
function renderTop() {
  const grid = document.getElementById("members-grid");
  if (!grid) return;

  // 人数
  document.getElementById("member-count").textContent = `${MEMBERS.length}人`;
  document.getElementById("portrait-card").dataset.count = num(MEMBERS.length - 1);

  // 集合ビジュアル
  document.getElementById("hero-lineup").innerHTML = MEMBERS.map((m, i) => {
    const size = ["primary", "tall", "wide"].includes(m.heroSize) ? ` lineup-person-${m.heroSize}` : "";
    const img = m.heroAvatar || m.avatar;
    return `
      <div class="lineup-person${size}">
        ${img ? `<img class="hero-avatar" src="${esc(img)}" alt="">` : initialBadge(m)}
        <span class="lineup-number">${num(i)}</span>
      </div>`;
  }).join("");

  // メンバー紹介カード
  grid.innerHTML = MEMBERS.map((m, i) => `
    <a class="member-card" href="member.html?id=${encodeURIComponent(m.id)}">
      ${m.avatar
        ? `<img class="member-portrait-avatar" src="${esc(m.avatar)}" alt="${esc(m.avatarAlt || `${m.name}さんのアバター`)}">`
        : initialBadge(m)}
      <div class="member-content">
        <p class="member-number">MEMBER ${num(i)}</p>
        <h3>${rubyName(m)}</h3>
        <p class="member-intro">${esc(m.intro)}</p>
        ${detailsList(m)}
        <p class="member-more">詳しく見る →</p>
      </div>
    </a>`).join("");

  // 制作実績（作品が1つでもあれば表示）
  const works = MEMBERS.flatMap((m) => (m.works || []).map((w) => ({ w, m })));
  if (works.length > 0) {
    document.getElementById("works-list").innerHTML =
      works.map(({ w, m }, i) => workCard(w, m, i)).join("");
    document.getElementById("works").hidden = false;
    document.getElementById("nav-works").hidden = false;
  }
}

// ---------- メンバー詳細ページ ----------
function section(no, label, title, body) {
  return `
    <section class="section" aria-label="${esc(title)}">
      <div class="section-heading">
        <p class="eyebrow">${no} / ${label}</p>
        <div><h2>${esc(title)}</h2></div>
      </div>
      ${body}
    </section>`;
}

function renderDetail() {
  const root = document.getElementById("member-detail");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const index = MEMBERS.findIndex((x) => x.id === id);
  const m = MEMBERS[index];
  if (!m) {
    root.innerHTML = `<section class="section"><p>メンバーが見つかりません。</p>
      <a class="text-link" href="index.html#members">MEMBERS <span aria-hidden="true">↩</span></a></section>`;
    return;
  }
  document.title = `${m.name} | Our Portfolio`;

  const links = Object.entries(m.links || {})
    .filter(([, url]) => url)
    .map(([label, url]) => `<li><a class="text-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label.toUpperCase())} <span aria-hidden="true">↗</span></a></li>`)
    .join("");

  const skills = (m.skills || []).map((s) => `<li>${esc(s)}</li>`).join("");
  const works = (m.works || []).map((w, i) => workCard(w, m, i)).join("");

  root.innerHTML = `
    <section class="profile">
      <div class="profile-avatar">
        ${m.avatar ? `<img src="${esc(m.avatar)}" alt="${esc(m.avatarAlt || `${m.name}さんのアバター`)}">` : initialBadge(m)}
      </div>
      <div>
        <p class="eyebrow">MEMBER ${num(index)}</p>
        <h1>${rubyName(m)}</h1>
        <p class="member-intro">${esc(m.intro)}</p>
        ${detailsList(m)}
        ${links ? `<ul class="link-list">${links}</ul>` : ""}
      </div>
    </section>

    ${m.about ? section("01", "About", "自己紹介", `<p class="about-text">${esc(m.about)}</p>`) : ""}
    ${skills ? section("02", "Skills", "スキル", `<ul class="skill-list">${skills}</ul>`) : ""}
    ${section("03", "Works", "制作実績",
      works ? `<div class="works-list">${works}</div>` : `<p class="empty-note">制作実績は準備中です。</p>`)}

    <p class="detail-back">
      <a class="text-link" href="index.html#members">ALL MEMBERS <span aria-hidden="true">↩</span></a>
    </p>`;
}

// ---------- メンバーファイルを順番に読み込む ----------
function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => {
      console.warn(`読み込めませんでした: ${src}（ファイル名と _list.js のIDが一致しているか確認してください）`);
      resolve();
    };
    document.body.appendChild(s);
  });
}

async function init() {
  const ids = typeof MEMBER_IDS !== "undefined" ? MEMBER_IDS : [];
  for (const id of ids) {
    await loadScript(`members/${encodeURIComponent(id)}.js`);
  }
  // _list.js の順番に並べ直す
  MEMBERS.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  renderTop();
  renderDetail();
}

init();
