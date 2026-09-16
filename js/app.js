/*
 * app.js
 * Shared, site-wide logic: page header/navigation, the light/dark theme
 * toggle, and the ProgressStore — a small wrapper around localStorage that
 * every other page (challenges.js, progress.js) reads and writes through.
 *
 * Nothing in this file knows about individual challenges — that data lives
 * in challenges.js. This file only knows about *site* structure and about
 * how progress is stored.
 */

/* ------------------------------------------------------------------ *
 * 1. Theme handling
 * ------------------------------------------------------------------ */

const Theme = {
  KEY: "pgcl_theme",

  init() {
    const saved = localStorage.getItem(Theme.KEY);
    const theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(Theme.KEY, next);
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.textContent = next === "light" ? "🌙" : "☀️";
  }
};

Theme.init();

/* ------------------------------------------------------------------ *
 * 2. Progress store
 *
 * Shape of the record saved under localStorage["pgcl_progress"]:
 * {
 *   completed:  { [challengeId]: { completedAt: "2026-09-14T10:00:00Z" } },
 *   solutionsViewed: { [challengeId]: { viewedAt: "..." } },
 *   code:       { [challengeId]: "student's saved code" },
 *   started:    { [challengeId]: true }   // opened the challenge at least once
 * }
 * ------------------------------------------------------------------ */

const ProgressStore = {
  KEY: "pgcl_progress",

  _read() {
    try {
      const raw = localStorage.getItem(ProgressStore.KEY);
      if (!raw) return ProgressStore._blank();
      const data = JSON.parse(raw);
      return Object.assign(ProgressStore._blank(), data);
    } catch (e) {
      console.warn("Progress data was unreadable, starting fresh.", e);
      return ProgressStore._blank();
    }
  },

  _blank() {
    return { completed: {}, solutionsViewed: {}, code: {}, started: {} };
  },

  _write(data) {
    localStorage.setItem(ProgressStore.KEY, JSON.stringify(data));
  },

  markStarted(id) {
    const d = ProgressStore._read();
    if (!d.started[id]) {
      d.started[id] = true;
      ProgressStore._write(d);
    }
  },

  isComplete(id) {
    return !!ProgressStore._read().completed[id];
  },

  toggleComplete(id) {
    const d = ProgressStore._read();
    if (d.completed[id]) {
      delete d.completed[id];
    } else {
      d.completed[id] = { completedAt: new Date().toISOString() };
    }
    ProgressStore._write(d);
    return !!d.completed[id];
  },

  markSolutionViewed(id) {
    const d = ProgressStore._read();
    if (!d.solutionsViewed[id]) {
      d.solutionsViewed[id] = { viewedAt: new Date().toISOString() };
      ProgressStore._write(d);
    }
  },

  hasViewedSolution(id) {
    return !!ProgressStore._read().solutionsViewed[id];
  },

  saveCode(id, code) {
    const d = ProgressStore._read();
    d.code[id] = code;
    ProgressStore._write(d);
  },

  loadCode(id) {
    return ProgressStore._read().code[id] || null;
  },

  clearCode(id) {
    const d = ProgressStore._read();
    delete d.code[id];
    ProgressStore._write(d);
  },

  status(id) {
    const d = ProgressStore._read();
    if (d.completed[id]) return "complete";
    if (d.started[id] || d.code[id]) return "in-progress";
    return "not-started";
  },

  all() {
    return ProgressStore._read();
  },

  resetAll() {
    localStorage.removeItem(ProgressStore.KEY);
  }
};

/* ------------------------------------------------------------------ *
 * 3. Header / navigation
 * ------------------------------------------------------------------ */

function renderHeader(activePage) {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const links = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "challenges", href: "challenges.html", label: "Challenges" },
    { id: "topics", href: "topics.html", label: "GCSE Topics" },
    { id: "progress", href: "progress.html", label: "Progress" },
    { id: "about", href: "about.html", label: "About" }
  ];

  const navHtml = links
    .map(
      (l) =>
        `<a href="${l.href}" class="${l.id === activePage ? "active" : ""}">${l.label}</a>`
    )
    .join("");

  const theme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

  mount.innerHTML = `
    <a class="brand" href="index.html" style="text-decoration:none;">
      <span class="brand-mark">&gt;_</span> PyBench
      <span class="brand-sub">Python GCSE Challenges</span>
    </a>
    <nav class="main-nav">${navHtml}</nav>
    <div class="header-actions">
      <button id="theme-toggle-btn" class="icon-btn" title="Toggle light / dark theme">${theme === "light" ? "🌙" : "☀️"}</button>
    </div>
  `;

  document.getElementById("theme-toggle-btn").addEventListener("click", Theme.toggle);
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `Python GCSE Challenge Lab &middot; runs entirely in your browser &middot; progress is stored locally on this device`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page") || "";
  renderHeader(page);
  renderFooter();
});

/* ------------------------------------------------------------------ *
 * 4. Small shared helpers
 * ------------------------------------------------------------------ */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}
