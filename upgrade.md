# Portfolio Bugs & Fixes
Source: live-site fetch of ayushkr-bhadani.vercel.app + repo README/package.json inspection.

---

## Bug 1 — `/about` route re-renders the entire homepage instead of an About page

**What's happening:**
- On `/` (homepage), the nav links point to real routes: `/about`, `/journey`, `/projects`, `/skills`, `/contact`.
- Clicking into `/about` doesn't show an About page — it renders the **whole homepage again** (Hero → About → Journey → Projects → Skills → Contact, all stacked).
- Once on `/about`, the nav itself changes behavior: it now links to anchors (`#about`, `#journey`, `#projects`...) instead of routes.
- Meanwhile `/skills` and `/projects` **do** render as real, distinct pages with their own `<title>`/meta description.

**Why it's a bug:** the site can't decide if it's a single-page scroller or a multi-page app, and different routes disagree about which one they are. A recruiter clicking "About" expects a focused About page and instead gets dumped back at the top of the entire site.

**Root cause (likely):** the `/about` route either isn't implemented as its own page and is falling back to the root layout/page, or it's importing/rendering the same page component as `/` instead of a dedicated `About` component.

**Fix:**
1. In your `app/` directory, confirm whether `app/about/page.tsx` exists and what it renders. If it doesn't exist, Next.js App Router will 404 by default — so if you're seeing the homepage instead of a 404, something is explicitly re-exporting or redirecting to the root page. Find that and remove it.
2. Decide on ONE information architecture and commit to it:
   - **Option A (recommended, see full audit for rationale): hybrid.** Homepage = condensed single-scroll landing (short About blurb, 3-project teaser, compact skills strip, contact). `/about`, `/skills`, `/projects` = real dedicated pages with deeper content, linked via routes everywhere, no anchor links.
   - **Option B: pure single page.** Delete `/about`, `/skills` as separate routes entirely; nav becomes anchor-only (`#about`, `#skills`...) on every page, and it only exists on `/`. Keep `/projects/[slug]` as real routes for case studies.
3. Whichever you pick, make the `<Header>`/nav component render **one consistent link type** (routes or anchors, not both depending on which page you're standing on).
4. Give `/about` its own `<title>` and meta description, same pattern you already used correctly for `/skills` and `/projects`.

---

## Bug 2 — Skills and Projects content is duplicated across the homepage and their own routes

**What's happening:** The full Skills section (all categories, all chips) and the full Projects carousel appear both inline on the homepage's long scroll *and* again, identically, on `/skills` and `/projects`.

**Why it's a bug:** duplicate content bloats the homepage (more to download and scroll past) and gives no reason for a recruiter to ever click into the dedicated pages — they've already seen everything. It also duplicates your maintenance burden: update a project, remember to update it in two places (or, worse, it's the same data source rendered twice, which is fine for accuracy but still means the homepage is unnecessarily heavy).

**Fix:**
1. Pick one place for the *full* version of each section (the dedicated route) and make the homepage version a **preview/teaser** — e.g., homepage Skills = top 6–8 tags only with a "See full stack →" link to `/skills`; homepage Projects = 3 cards with a "See all projects →" link to `/projects`.
2. If you're pulling this content from a shared data file (looks likely, given `data/` and `lib/` folders in your repo structure), add a `featured: true` flag or a `.slice(0, 3)` on the homepage query instead of rendering the full array.

---

## Bug 3 — Hero availability badge text appears to render twice

**What's happening:** the fetched markup showed:
> "Available for Internships & Early Careers (Graduating 2027)Available for Internships (Graduating 2027)"

Two overlapping/duplicate versions of the same badge text, back to back, with no separator.

**Why it's a bug:** this is your hero section — the very first thing a recruiter sees. If this is visually duplicated (not just an artifact of how the text was extracted), it looks broken in the first 3 seconds.

**Possible causes:**
- A responsive component rendering two variants of the badge (e.g., a short mobile string and a long desktop string) both mounted in the DOM at once instead of conditionally, with CSS only hiding one — screen readers and text-extraction tools then see both.
- An animation library (Framer Motion) cloning the element for a transition (e.g., a "flip" or marquee effect) and leaving both copies in the accessibility tree.

**Fix:**
1. Find the badge component (likely something like `AvailabilityBadge.tsx` or inline in your `Hero` component).
2. If there are two conditional strings for mobile/desktop, make sure only one is ever in the DOM — use a single string with responsive CSS truncation, or conditionally render with `{isDesktop ? longText : shortText}` rather than rendering both and hiding one with `hidden md:block` (hiding still leaves duplicate text for screen readers/crawlers unless you also add `aria-hidden` to the hidden copy).
3. If it's an animation clone, check that the animated/duplicate copy has `aria-hidden="true"` and isn't included in accessible/extracted text.
4. Manually re-check the hero in a browser (not just this report) to confirm whether it's a visual bug or purely a text-extraction artifact — worth 30 seconds to verify before you start digging into the component.

---

## Bug 4 — "Live" Visitor Orbit shows a broken/fake state

**What's happening:** the visitor-presence globe feature displayed:
> "Connecting… Loading globe… Signal: — Nodes: — visible Mode: connecting… Resolving visitor signal… Realtime data is unavailable here, so this preview uses local signals."

**Why it's a bug:** it's presenting itself as a live real-time feature, then admitting inline that it's faking the data. Whether this is because the Ably real-time key isn't configured in this environment, rate-limited, or genuinely down in production, the user-facing result is the same: a headline "live" feature that visibly doesn't work.

**Fix:**
1. Check your `ABLY_API_KEY` is actually set and valid in the **production** Vercel environment (not just `.env.local`) — this is the single most common cause of a real-time feature working locally and failing live.
2. Add a proper fallback state: if Ably fails to connect, show a static, honest message ("Live presence unavailable") instead of an infinite "connecting…" loop, or hide the whole widget until connection succeeds.
3. Longer term (see full audit): consider removing this feature. It pulls in `three`, `@react-three/fiber`, `@react-three/drei`, and `react-globe.gl` for a decorative counter — a heavy dependency cost for something that, when broken, actively undermines credibility. If you keep it, gate it behind a "load visualization" interaction so it's not in the critical render path and a connection failure doesn't greet every first-time visitor.

---

## Bug 5 — Project carousel likely only exposes the first project's full content

**What's happening:** on `/projects`, the fetched HTML showed full detail (description, GitHub link, Live link) for the first carousel slide (CodeVerdict), but the other two visible thumbnails (AskSQL, CareerIQ) only appeared as bare `<img>` alt text with no accompanying description/links in the initial markup. A "1 / 4" counter confirms there's a 4th project not represented at all in what was fetched.

**Why it's a bug:** if the other projects' text/links are only injected client-side on carousel interaction, then:
- Search engines crawling the page may only ever index your first project.
- Screen reader users and anyone browsing with JS disabled or slow-loading JS may never reach projects 2–4.
- A recruiter skimming quickly (many do link-preview or scroll instead of clicking through a carousel) may miss 3 of your 4 projects entirely.

**Fix:**
1. Render all project cards' text content (title, description, links) in the initial server-rendered HTML — the carousel/rail should be a *visual* navigation layer on top of content that already exists in the DOM, not the mechanism that creates the content.
2. If using Framer Motion for the 3D-rail effect, keep all slide content mounted (just visually offset/scaled for non-active slides) rather than mounting only the active slide.
3. Verify with "View Page Source" (not just DevTools inspector, which shows post-hydration DOM) that all 4 projects' text appears before any JS runs.

---

## Bug 6 — Inconsistent page titles

**What's happening:** `/`, `/about`, and `/journey` all share the same `<title>` ("Ayush Kumar Bhadani — Portfolio"), while `/skills` and `/projects` correctly have distinct titles ("Skills | Ayush Kumar Bhadani", "Projects | Ayush Kumar Bhadani").

**Why it's a bug:** identical browser-tab titles across multiple open tabs make it hard for a recruiter to find your site again among other tabs, and it's a missed, easy SEO win — distinct titles per route help search engines and social previews differentiate pages.

**Fix:** apply the same `metadata` export pattern you already used for `/skills` and `/projects` (via Next.js's `generateMetadata` or a static `metadata` object per route) to every route, including `/about`, `/journey`, and `/contact`. This is a ~15-minute fix once Bug 1's routing is sorted out.

---

## Fix Priority Order

1. **Bug 1** (routing split-brain) — fix first, everything else about IA depends on this decision.
2. **Bug 3** (duplicate hero text) — cheap, high-visibility fix.
3. **Bug 4** (broken live globe) — cheap fix (env var check) or bigger fix (remove feature) — see full audit for the "remove it" argument.
4. **Bug 5** (carousel content not in initial DOM) — affects SEO and accessibility, worth fixing before you actively start sharing the link for job applications.
5. **Bug 2** (duplicate content) — natural side effect of fixing Bug 1, address together.
6. **Bug 6** (page titles) — quick cleanup once routing is stable.