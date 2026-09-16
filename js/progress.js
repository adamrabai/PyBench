/*
 * progress.js
 * Renders the Progress dashboard (section 12) and the printable
 * Teacher View (section 18). Reads everything through ProgressStore and
 * the CHALLENGES data — it never writes progress itself.
 */

function computeProgressStats() {
  const data = ProgressStore.all();
  const completedIds = Object.keys(data.completed).map(Number);
  const total = CHALLENGES.length;
  const completedCount = completedIds.length;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  const completedChallenges = completedIds
    .map((id) => getChallengeById(id))
    .filter(Boolean)
    .sort((a, b) => (data.completed[b.id].completedAt).localeCompare(data.completed[a.id].completedAt));

  const currentLevel = completedChallenges.length
    ? Math.max(...completedChallenges.map((c) => c.level))
    : 0;

  // A topic counts as "practised" once at least one completed challenge
  // touches it — a simple, honest reading of "have I done something with
  // this concept yet", rather than requiring every related challenge done.
  const topicsCompleted = {};
  TOPICS.forEach((t) => (topicsCompleted[t] = false));
  completedChallenges.forEach((c) => {
    c.topics.forEach((t) => {
      if (topicsCompleted.hasOwnProperty(t)) topicsCompleted[t] = true;
    });
  });

  const solutionsViewedCount = Object.keys(data.solutionsViewed).length;

  return {
    total,
    completedCount,
    percent,
    completedChallenges,
    currentLevel,
    topicsCompleted,
    solutionsViewedCount,
    solutionsViewed: data.solutionsViewed,
    completedMeta: data.completed
  };
}

function renderProgressPage() {
  const mount = document.getElementById("progress-mount");
  if (!mount) return;

  const stats = computeProgressStats();

  const topicRows = TOPICS.map((t) => {
    const done = stats.topicsCompleted[t];
    return `<div class="tc-row ${done ? "done" : "pending"}"><span class="tc-mark">${done ? "✓" : "○"}</span> ${escapeHtml(t)}</div>`;
  }).join("");

  const tableRows = stats.completedChallenges.length
    ? stats.completedChallenges
        .map((c) => {
          const meta = stats.completedMeta[c.id];
          return `<tr>
            <td>${escapeHtml(c.title)}</td>
            <td>Level ${c.level}</td>
            <td>${formatDate(meta.completedAt)}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td colspan="3" class="text-faint">No challenges completed yet — start with Level 1 on the Challenges page.</td></tr>`;

  mount.innerHTML = `
    <div class="progress-summary">
      <div class="panel big-progress">
        <div class="text-faint" style="font-family:var(--mono);font-size:12px;">OVERALL PROGRESS</div>
        <div class="pct">${stats.percent}%</div>
        <div class="bar-track"><div class="bar-fill" style="width:${stats.percent}%;"></div></div>
        <div class="progress-metrics">
          <div class="progress-metric"><div class="m-num">${stats.completedCount} / ${stats.total}</div><div class="m-lbl">Challenges completed</div></div>
          <div class="progress-metric"><div class="m-num">${stats.currentLevel || "—"}</div><div class="m-lbl">Current level reached</div></div>
          <div class="progress-metric"><div class="m-num">${stats.solutionsViewedCount}</div><div class="m-lbl">Solutions viewed</div></div>
        </div>
      </div>
      <div class="panel topic-checklist">
        <div class="text-faint" style="font-family:var(--mono);font-size:12px;margin-bottom:6px;">TOPICS PRACTISED</div>
        ${topicRows}
      </div>
    </div>

    <div class="panel" style="padding:20px;">
      <h2 style="margin-bottom:14px;">Completed challenges</h2>
      <table class="completed-table">
        <thead><tr><th>Challenge</th><th>Level</th><th>Completed</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>

    <div class="flex-row mt-3">
      <a href="progress.html?teacher=1" class="btn">Teacher View</a>
      <button id="reset-progress-btn" class="btn btn-danger">Reset All Progress</button>
    </div>
  `;

  document.getElementById("reset-progress-btn").addEventListener("click", () => {
    if (confirm("This will permanently clear all saved progress, code and completed challenges on this device. Continue?")) {
      ProgressStore.resetAll();
      renderProgressPage();
    }
  });
}

function renderTeacherView() {
  const mount = document.getElementById("teacher-mount");
  if (!mount) return;

  const stats = computeProgressStats();
  const generated = new Date().toLocaleString();

  const rows = stats.completedChallenges
    .slice()
    .reverse()
    .map((c) => {
      const meta = stats.completedMeta[c.id];
      const viewedSolution = !!stats.solutionsViewed[c.id];
      return `<tr>
        <td>${escapeHtml(c.title)}</td>
        <td>Level ${c.level}</td>
        <td>${c.topics.map(escapeHtml).join(", ")}</td>
        <td>${viewedSolution ? "Yes" : "No"}</td>
        <td>${formatDate(meta.completedAt)}</td>
      </tr>`;
    })
    .join("");

  const topicsPractised = TOPICS.filter((t) => stats.topicsCompleted[t]);

  mount.innerHTML = `
    <div class="panel" style="padding:28px;">
      <div class="flex-row no-print" style="justify-content:space-between;margin-bottom:20px;">
        <a href="progress.html" class="btn btn-ghost">&larr; Back to progress</a>
        <button onclick="window.print()" class="btn btn-primary">Print Progress Report</button>
      </div>

      <h1 style="margin-bottom:2px;">Python GCSE Challenge Lab — Progress Report</h1>
      <p class="text-faint" style="font-family:var(--mono);font-size:12px;">Generated ${generated}</p>

      <div class="home-stats" style="margin:22px 0;">
        <div class="stat-block"><div class="num">${stats.completedCount} / ${stats.total}</div><div class="lbl">Challenges completed</div></div>
        <div class="stat-block"><div class="num">${stats.percent}%</div><div class="lbl">Overall progress</div></div>
        <div class="stat-block"><div class="num">${stats.currentLevel || "—"}</div><div class="lbl">Difficulty reached</div></div>
        <div class="stat-block"><div class="num">${stats.solutionsViewedCount}</div><div class="lbl">Solutions viewed</div></div>
      </div>

      <h3>Topics practised</h3>
      <p class="text-dim">${topicsPractised.length ? topicsPractised.map(escapeHtml).join(", ") : "None yet."}</p>

      <h3 class="mt-2">Challenge history</h3>
      <table class="completed-table">
        <thead><tr><th>Challenge</th><th>Level</th><th>Topics</th><th>Solution viewed</th><th>Completed</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="5" class="text-faint">No challenges completed yet.</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  if (qs("teacher")) {
    document.getElementById("progress-view")?.classList.add("hidden");
    document.getElementById("teacher-view")?.classList.remove("hidden");
    renderTeacherView();
  } else {
    renderProgressPage();
  }
});
