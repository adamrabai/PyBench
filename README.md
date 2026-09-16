# PyBench — Python GCSE Challenge Lab

A self-contained coding platform for GCSE Computer Science students: 50 Python programming challenges across 8 levels, a real in-browser Python editor, automated tests, progressive hints, and local progress tracking — all running as a static site with no backend.

**[Live demo →](#)** *(add your GitHub Pages URL here once deployed)*

![Level](https://img.shields.io/badge/levels-8-4fd1c5) ![Challenges](https://img.shields.io/badge/challenges-50-4fd1c5) ![No backend](https://img.shields.io/badge/backend-none-4fd1c5)

---

## What it does

- **50 challenges, 8 levels** — from `print()` and variables through to full projects (a quiz game, an ATM simulator, a Caesar cipher) that combine everything learned along the way.
- **A real Python editor in the browser** — code runs via [Pyodide](https://pyodide.org) (a full CPython interpreter compiled to WebAssembly), so students write and execute actual Python with no server, install, or account required.
- **Automated tests** where practical, with hints and a gated model solution for every challenge.
- **Progress tracking** — completed challenges, saved code, and viewed solutions persist locally via `localStorage`. A Teacher View provides a printable progress report.
- **Filter and search** by level, topic, or status, plus a topic-browsing page mapped to GCSE specification areas (selection, iteration, lists, functions, algorithms, and so on).

## Tech stack

Plain HTML5, CSS3, and vanilla JavaScript — no build step, no framework, no dependencies to install. The only external calls at runtime are to load Pyodide from its CDN the first time a student clicks **Run**.

```
├── index.html          Home
├── challenges.html      Challenge list + filters
├── challenge.html        Individual challenge workbench (dynamic, ?id=N)
├── topics.html          Browse by GCSE topic
├── progress.html        Progress dashboard + Teacher View
├── about.html            About the project
├── favicon.svg
├── css/style.css
└── js/
    ├── app.js            Header/nav, theme toggle, localStorage progress store
    ├── challenges.js      Challenge database + list/detail rendering
    ├── progress.js        Progress dashboard + Teacher View rendering
    └── python-runner.js   Pyodide wrapper (run code, capture output, mock input())
```

## Running it locally

No build step — just serve the folder. Opening `index.html` directly with `file://` also works for most of the site, but a local server avoids any browser restrictions on `fetch`/module-style loading:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repository (the contents of this folder should sit at the **repository root**, so `index.html` is at `https://github.com/<you>/<repo>/blob/main/index.html`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch (usually `main`) and the folder `/ (root)`, then **Save**.
5. GitHub Pages will build and publish the site at `https://<you>.github.io/<repo>/` within a minute or two — the Pages settings panel shows the exact URL and a link once it's live.
6. Re-deploys happen automatically on every push to that branch — no further action needed.

No repository secrets, environment variables, or GitHub Actions workflow are required, since the site has no build step and no server-side code.

### A note on the code editor

The Python engine (Pyodide) is loaded from a CDN the first time a student presses **Run**, so that part of the site needs an internet connection even though everything else — browsing, reading challenges, hints, and solutions — works fully offline once the page has loaded.

## Suggested repository description

> PyBench: 50 browser-based Python challenges for GCSE Computer Science, with a live in-browser code editor, automated tests, hints and progress tracking. No backend required.

**Suggested topics/tags:** `python` `gcse` `computer-science` `education` `pyodide` `learn-to-code` `github-pages` `javascript`

## License

Add a license of your choice (e.g. MIT) if you intend to share or accept contributions to this repository.
