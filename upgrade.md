# Portfolio — Master Change Log & Remaining Work

Single consolidated file replacing every previous md from this session. Freshly verified against the actual repo (`main` + `agent/portfolio-polish` branches) just now, so the status below is accurate as of this check — not carried over assumptions from earlier in the conversation.

---

## 0. Merge first — this is still the #1 blocker

Everything "done" below is sitting on `agent/portfolio-polish`, which is **still not merged into `main`**. Your live domain (`ayushkr-bhadani.vercel.app`) only deploys from `main`, so none of this is actually live yet, even though the work exists.

```bash
git checkout main
git pull origin main
git merge origin/agent/portfolio-polish
git push origin main
```
Or use the "Compare & pull request" banner on GitHub. Confirm on the live domain afterward that things actually changed before assuming anything below is live.

---

## 1. Already done (on `agent/portfolio-polish`, just needs the merge above)

No action needed on these beyond merging — verified directly in the branch's current code:

| Item | Verified state |
|---|---|
| Fabricated IoT achievement | Removed from `lib/data.ts`, `JourneyTimeline.tsx`, `portfolio-context.md` — zero references left |
| Project Index block (carousel) | Removed from `ProjectsRail.tsx` |
| Live GitHub Activity feed | Component, API route, and Contact page usage all deleted |
| `User-Agent` placeholder header | Fixed |
| Résumé PDF | Present at `public/resume.pdf`, linked from **both** navbar and Contact page (and homepage hero) |
| Contact form backend | Real — connects to `/api/contact`, which uses Resend. No longer fake |
| SEO infrastructure | `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, `twitter-image.tsx` all present |
| Orphaned images in `public/projects/` | Cleaned up — only the 4 actually-used images remain (`asksql.png`, `careeriq_v2.png`, `codeverdict_v3.png`, `digital_wellbeing_v2.png`) |
| Carousel mobile responsiveness | Fixed — `ProjectsRail.tsx` now uses `getCardLayout(viewportWidth)` with real breakpoints instead of a hardcoded `CARD_W = 480` |
| Skills tab: floating orbit animation | Replaced with a static grid (no more drifting icons) |
| Skills tab: broken icon fallbacks (React / K-Means / Agentic AI) | Icon map entries added, no longer showing 3-letter text fallbacks for these three specifically |

**Still worth double-checking after merge:** confirm the `RESEND_API_KEY` and `CONTACT_TO_EMAIL` env vars are actually set in Vercel Production (the code is right, but env vars are config, not code — same category of issue as the chatbot below).

---

## 2. Still needs work — chatbot LLM connection

**Status:** not connected in Production. Confirmed cause: `app/api/chat/route.ts` requires both `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`. Your Vercel screenshot showed `OPENROUTER_API_KEY`, `ABLY_API_KEY`, `GITHUB_TOKEN` set — **`OPENROUTER_MODEL` is missing**.

**Fix (config only, no code change):**
1. Vercel → Settings → Environment Variables → add `OPENROUTER_MODEL` = `openrouter/free` (or a specific slug like `meta-llama/llama-3.1-8b-instruct:free` from openrouter.ai/models), scoped to **Production**.
2. Redeploy.
3. Test with an off-script question (e.g. "compare CodeVerdict and AskSQL's approach to safety") — the hardcoded fallback can't handle that naturally, a real model can.
---

## Full checklist

**Unblock everything:**
- [ ] Merge `agent/portfolio-polish` → `main`
- [ ] Confirm live domain reflects the merge

**Config only (no code):**
- [ ] Add `OPENROUTER_MODEL` env var in Vercel Production, redeploy, test chatbot
- [ ] Confirm `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set in Vercel Production

**Still-open code work:**
- [x] Trim `skillGroups` to résumé-justified list (section 3)
- [x] Decide Frontend category: remove vs. de-emphasize
- [x] Add Data & Visualization + Methodologies categories
- [x] Two-tier icon strategy: logos for real tools, text chips for concepts (section 4)
- [x] Remove bordered card container in skills grid (section 5)
- [x] Delete `GitHubContributionsCalendar.tsx` + remove from Contact page (section 6)