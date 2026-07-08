# Portfolio Site — Upgrade Spec

Scope: only changes to the **portfolio website** (`github.com/Ayush0915/portfolio`). Build in one pass, no iteration needed — every item has exact file paths and decisions pre-made.

---

## P0 — Do first

### 1. Add a résumé/CV download
**Problem:** No résumé PDF anywhere on the site — not in hero, navbar, or Contact page. Highest-value missing element for a job-hunting portfolio.
**Fix:**
- Add `public/resume.pdf`.
- Add a "Resume" button in `components/Navbar.tsx` — desktop nav (next to visitor counter, before Contact) and mobile drawer — linking to `/resume.pdf` with `download` attribute and `target="_blank"`.
- Add a prominent "Download Resume" CTA in `app/page.tsx` hero, next to the existing GitHub/View Projects buttons.
- Add a resume card to `app/contact/page.tsx` alongside Email/GitHub/LinkedIn (same card style, `FileText` icon from `lucide-react`).

### 2. Fix the broken visitor counter
**Problem:** `app/api/visits/route.ts` reads/writes `data/visits.json` via `fs/promises`. Vercel serverless functions have a read-only filesystem outside `/tmp`, and `/tmp` doesn't persist across invocations or scale across regions. Every page load POSTs to this route (called from `Navbar.tsx`, mounted globally), so the counter silently resets or the write throws and gets swallowed, returning `count: 0` with a 500.
**Fix:**
- Replace file-based storage with **Vercel KV** (`npm install @vercel/kv`).
- Rewrite `app/api/visits/route.ts`:
  - `POST`: `const count = await kv.incr("visits:total"); return NextResponse.json({ count })`
  - `GET`: `const count = (await kv.get<number>("visits:total")) ?? 0; return NextResponse.json({ count })`
- Add `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars in Vercel project settings (auto-populated if provisioned from the dashboard).
- Delete `data/visits.json` and remove the `fs`/`path` imports.

### 3. Present AskSQL as flagship, inside the portfolio
**Problem:** AskSQL is already wired into `lib/data.ts` (project #2, right after CodeVerdict), so the data layer is fine — but the presentation on-site is bullets-only, same treatment as every other project. It should read as the deepest, most deliberate project on the site.
**Fix (all inside `app/projects/[slug]/page.tsx` and `lib/data.ts`):**
- Extend the `Project` interface with optional `caseStudy?: { problem: string; approach: string; tradeoffs: string; result: string }` and `metrics?: { label: string; value: string }[]`.
- Backfill AskSQL's entry with:
  - A short case study: problem (querying data without SQL knowledge) → approach (LLM generates SQL, AST-based safety layer validates it before execution, runs in an isolated DuckDB sandbox) → tradeoffs (token-matching retrieval instead of a heavy vector DB, to stay lightweight) → result (memory-optimized, ~60MB baseline RAM, fast free-tier deploy).
  - A metrics stat-grid: baseline RAM footprint, no local embedding model, session-isolated execution — reuse the same stat-grid component style you'd want for CodeVerdict's 87.5% precision / 100% recall.
  - A simple numbered-step or SVG diagram of the flow: question → LLM SQL generation → AST safety validation → isolated DuckDB execution → plain-English explanation. The safety-validation step is the most differentiated, interview-worthy part — call it out visually, not just in a bullet.
- Update the `description` field for AskSQL in `lib/data.ts` to lead with the safety + resource-efficiency angle rather than plain "NL-to-SQL" — that's the differentiator most similar student projects don't have.
- Do this same case-study/metrics treatment for CodeVerdict too, so the two flagship-tier projects match in depth (don't leave one under-built relative to the other).

---

## P1 — Do this week

### 4. Fix the carousel's fixed-width mobile bug
**Problem:** `components/ProjectsRail.tsx` hardcodes `const CARD_W = 480;` with no responsive breakpoints. On viewports under ~480px (iPhone SE/13/14 mini, most Android phones), the active card is wider than the screen and gets clipped by the `overflow: hidden` wrapper — the project showcase, the section recruiters look at most, breaks on the most common phone class.
**Fix:**
- Mirror the pattern already used correctly in `components/HeroGlobeCard.tsx` (`getGlobeLayout(viewportWidth)`). Extract a shared `hooks/useViewportWidth.ts` from its existing `subscribeToViewport`/`getViewportSnapshot` helpers.
- Compute `CARD_W`/`CARD_H`/`SIDE_OFFSET` from viewport tiers:
  - `< 420px`: `CARD_W = 300, CARD_H = 169, SIDE_OFFSET = 320`
  - `< 768px`: `CARD_W = 380, CARD_H = 214, SIDE_OFFSET = 400`
  - `>= 768px`: keep existing `480 / 270 / 520`
- Clamp the `max-w-4xl` text block and project-index grid below the carousel so it doesn't feel oversized relative to the smaller cards on mobile.

### 5. Add OG/Twitter card image + sitemap + robots
**Problem:** No `sitemap.xml`, no `robots.txt`, no `manifest.json`, no Open Graph/Twitter card image. Sharing the link in a LinkedIn message or recruiting Slack currently renders as bare text with no preview.
**Fix:**
- Add `app/opengraph-image.tsx` (Next.js 16 file-based OG image via `ImageResponse`) — 1200×630, dark background matching `zinc-950` theme, name + role + one-line pitch.
- Add `app/twitter-image.tsx` reusing the same generator.
- Add `app/sitemap.ts` exporting all static routes (`/`, `/about`, `/projects`, `/projects/[slug]` for each project slug, `/skills`, `/education`, `/contact`) with `lastModified`.
- Add `app/robots.ts` allowing all crawlers, pointing to the sitemap.
- Add `app/manifest.ts` (name, short_name, icons — generate `icon-192.png`/`icon-512.png` from the existing favicon, theme_color matching `zinc-950`).
- Add JSON-LD `Person` structured data in `app/layout.tsx` (name, jobTitle, url, sameAs: [GitHub, LinkedIn]) via `<script type="application/ld+json">` in `<head>`.

### 6. Delete orphaned public assets
**Problem:** `public/projects/` has ~5MB of screenshots not referenced anywhere in `lib/data.ts` (`owemygod.png`, `menu-decoder1.png`, `movie-book-recommendation.png`, `movie-book-recommendation1.png`, `shopping list.png`, `mesa1.jpg`, `Screenshot 2026-02-28 174132.png`). These still deploy as publicly accessible static files — wasted deploy size, and a discoverable trail of unrelated/abandoned work if someone hits the URL directly.
**Fix:**
- Delete every file in `public/projects/` not referenced by an `imageSrc` in `lib/data.ts` (currently only `codeverdict_v3.png`, `asksql.png`, `digital_wellbeing_v2.png`, `careeriq_v2.png` are used).
- If any are needed later, move them to a local archive folder outside `public/`, not the deployed app.

---

## P2 — Polish

### 7. Write a real portfolio README
**Problem:** `README.md` in the portfolio repo is still the default `create-next-app` boilerplate. If an interviewer opens this repo (common), it currently says nothing about you.
**Fix:** Replace with a one-line pitch, tech stack, feature list (3D globe, GitHub contributions calendar, AI chatbot grounded in portfolio context, live project showcase), local setup steps, and a link to the live site.

### 8. Carousel accessibility
**Problem:** `ProjectsRail.tsx` navigation is mouse/touch/wheel-only. No keyboard arrow-key support, no `aria-live` region announcing the active project on change.
**Fix:**
- Add `tabIndex={0}` + `onKeyDown` on the carousel section, calling `prev()`/`next()` on `ArrowLeft`/`ArrowRight`.
- Wrap the `{item.title}` text block in `<div aria-live="polite">` so screen readers announce the active project when it changes.

---

## Checklist

- [ ] 1. Résumé PDF added + linked in navbar, hero, contact
- [ ] 2. Visitor counter moved to Vercel KV
- [ ] 3. AskSQL (and CodeVerdict) case study + metrics + diagram built out on project detail pages
- [ ] 4. Carousel responsive width fix
- [ ] 5. OG image, sitemap, robots, manifest, JSON-LD added
- [ ] 6. Orphaned public assets deleted
- [ ] 7. Portfolio README rewritten
- [ ] 8. Carousel keyboard nav + aria-live

---

## Already solid — don't touch

- 3D globe is correctly lazy-loaded via `next/dynamic({ ssr: false })` with a WebGL-support check and responsive sizing tiers in `HeroGlobeCard.tsx`.
- API keys (Groq/OpenRouter, GitHub) are handled entirely server-side in route handlers — never exposed client-side.
- Per-page metadata (`title`/`description`) is correctly implemented per-route across About, Projects, Contact, Education, and each project detail page.
- Mobile navbar (hamburger, drawer, `aria-label`s) is implemented correctly.
- Heading hierarchy is correct where checked.