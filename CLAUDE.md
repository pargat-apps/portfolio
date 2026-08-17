# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal portfolio site for Pargat Singh (Full-Stack Developer), built as a single-page React app. It's a static site (no backend server of its own) that renders a stack of sections and pulls live GitHub data via the public GitHub REST API client-side. Deployed to GitHub Pages at pargatfolio.com.

## Commands

```bash
npm install          # install deps (package-lock.json is committed)
npm run dev           # start Vite dev server (http://localhost:5173), dev CSP with unsafe-eval for HMR
npm run build          # vite build + scripts/build-csp.js (swaps in strict production CSP into dist/index.html)
npm run build:dev       # vite build only, skips the CSP swap — use to debug a build without the security rewrite
npm run preview         # serve the dist/ build locally
npm run lint          # ESLint (flat config, eslint.config.js)
npm run security:check    # re-run scripts/build-csp.js standalone to verify CSP swap logic
npm run deploy         # predeploy (build) then gh-pages -d dist — publishes to the gh-pages branch
npm run deploy:clean      # scripts/deploy-clean.js — see script for what it clears before deploying
```

There is no test suite/framework configured in this repo (no Jest/Vitest/RTL/Cypress and no `*.test.*` files) — don't assume one exists.

`node_modules` isn't checked in; run `npm install` before `npm run dev` in a fresh checkout.

## Architecture

**Single-page app, no router.** `src/App.jsx` wraps everything in the Redux `<Provider>` and renders one fixed stack of section components in order: `Navbar → Hero → About → Skills → Projects → Experience → Contact → Footer`. Each section is a `<section id="...">` (`home`, `about`, `skills`, `projects`, `experience`, `contact`) and `Navbar.jsx`'s `scrollToSection()` does an anchor-based smooth scroll (`html { scroll-behavior: smooth }` in `index.css`) rather than routing. Adding/removing/reordering a section means editing `App.jsx` *and* keeping the nav items/ids in `Navbar.jsx` in sync.

**State**: Redux Toolkit (`src/store/`) is used only for theme (`themeSlice.js`, dark/light mode persisted to `localStorage` and applied via a `.dark` class on `<html>`, read through Tailwind's `darkMode: 'class'`). Everything else (GitHub data, loading/error states) is local component state via `useGitHub` below — there's no global data store for API results.

**Data flow for external content** (`src/hooks/useGitHub.js` + `src/utils/api.js`):
- `useGitHub(username)` fetches the user profile and repos from the GitHub REST API, filters out forks/archived repos, sorts by `updated_at`, takes the top 12, then fetches each repo's README (skipping obviously irrelevant repos — tiny, no language, name matches `test|demo|example|leetcode`) to scrape a "🔗 Live Demo: <url>" line out of it via `extractDemoURL()`. This is used by `About.jsx`/`Navbar.jsx` for live GitHub stats — **if a demo link isn't showing up for a repo, check that its README has a `🔗 Live Demo:` line matching one of the regexes in `extractDemoURL`, not the component code.**
- The hook routes every external request through `secureFetch()` (`src/utils/security.js`), which rejects any URL whose hostname isn't in a hardcoded allowlist (`isValidExternalUrl`). **Adding a new external API requires updating three places in lockstep**: the allowlist in `src/utils/security.js`, the dev CSP `connect-src` in `index.html`, and the production CSP `connect-src` in `scripts/build-csp.js` (see below). Missing any one of these breaks the request in that specific environment only, which is a common source of "works in dev, broken in prod" (or vice versa) bugs here.

**CSP is duplicated in three places by design** (see `SECURITY.md`): `index.html` (dev — permissive, `unsafe-eval` allowed for Vite HMR/React DevTools), `scripts/build-csp.js` (prod — strict, no `unsafe-eval`, runs as a post-build step and rewrites `dist/index.html`'s CSP `<meta>` tag via regex), and the allowlist duplicated again in `src/utils/security.js` for runtime `fetch` validation. Editing one without the others is the most likely way to introduce a "silently broken in one environment" bug in this codebase. `npm run build:dev` (build without the CSP swap) is useful for isolating whether a build issue is CSP-related.

**Personal/content data is centralized** in `src/data/personal.js` (`personalInfo`, `experience[]`, `skills{frontend,backend,database,cloud,integrations,ai}`, `projects[]`) — this is the single source of truth for static text content (bio, contact info, experience timeline, categorized tech-stack chips with `react-icons`/`lucide-react` icon references, curated project list). Components read from here rather than hardcoding copy; update this file for content changes rather than editing JSX strings directly. `Projects.jsx` renders `projects[]` directly as a single curated grid (no live GitHub-driven tab) — each entry's `github`/`demo`/`image` fields are `null` until filled in, at which point the card's buttons/thumbnail activate automatically.

**Styling**: Tailwind CSS with the shadcn/ui convention (HSL CSS custom properties in `index.css` for theme colors, consumed via `tailwind.config.js`'s `colors: { ... hsl(var(--x)) }` mapping, so dark mode is just swapping the `:root` vs `.dark` variable block). `src/utils/cn.js` (`clsx` + `tailwind-merge`) is the standard class-merging helper used throughout — use it instead of manual string concatenation when building conditional `className`s. `src/components/ui/` holds the shadcn-style primitives (`Button.jsx` with `buttonVariants`/`buttonSizes` maps, `ThemeToggle.jsx`); everything else in `src/components/` is a page-section component, one per section, each independently fetching/animating its own content.

**Animation**: Framer Motion (`motion.div`, `AnimatePresence`) is used throughout for section entrances, hover/tap states, and the theme toggle icon transition — this is the standard animation approach in this codebase, not CSS transitions, except for the `float`/`gradient` effects which are plain CSS `@keyframes` defined in `index.css`.

**Deployment**: static export via `vite build`, published to GitHub Pages using `gh-pages -d dist` (`npm run deploy`). `public/CNAME` pins the custom domain (pargatfolio.com), `public/_headers` carries security headers for hosts that read that file (Netlify-style; GitHub Pages itself doesn't honor it — see `DEPLOYMENT.md` for Netlify/Vercel/Firebase alternatives and their header configs).
