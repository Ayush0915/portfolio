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

## 3. Still needs work — trim skills to only what your résumé backs

**Status:** not done yet — `skillGroups` in `lib/data.ts` is still the full, untrimmed list on `agent/portfolio-polish` too.

### ⚠️ Flag for your decision: the "Frontend" category isn't backed by your résumé
`React`, `Next.js`, `TypeScript`, `JavaScript`, `HTML/CSS` sit on the site as a full category with equal weight to your AI/ML skills, but none of them are on your résumé and none of your three flagship projects use a frontend framework. Pick one:
- **(a)** Remove the category entirely, or
- **(b)** Keep it but de-emphasize — fold into a single "also used to build this site" line rather than a full category.

### Full target list (cross-checked against your résumé)

- **Languages:** `Python, C++, SQL` — remove `C, TypeScript, JavaScript, Go, R`
- **AI/ML & NLP** *(rename from "AI/ML & Deep Learning")*: `scikit-learn, K-Means, Sentence Transformers, Prompt Engineering` — remove `PyTorch, TensorFlow, Hugging Face, Seaborn`
- **LLMs & Agentic Systems:** `RAG, Agentic AI` — remove `LLMs, LangChain, LlamaIndex, Transformers`
- **Frontend:** per the flag above
- **Backend & Databases:** `FastAPI, MongoDB, MySQL, DuckDB, FAISS, asyncio, REST APIs` — remove `Flask, Node.js, Express.js, PostgreSQL, Redis, Supabase`
- **DevOps & Tools:** `Git, GitHub` — remove `Docker, Kubernetes, Linux, AWS, CI/CD, VS Code, Streamlit`
- **Data & Visualization** *(new category)*: `Pandas, NumPy, Plotly, Power BI`
- **Methodologies** *(new category)*: `Agile/Scrum, EDA`

The additions (`Sentence Transformers`, `Prompt Engineering`, `DuckDB`, `FAISS`, `asyncio`, `REST APIs`, and the two new categories) are all explicit résumé lines or direct project facts (DuckDB/FAISS especially — they're the actual backbone of AskSQL and CodeVerdict, and were oddly missing from the site before now). Nothing here is invented — this list was built by cross-referencing your uploaded résumé line by line.

### Prompt for your coding agent
> Update `skillGroups` in `lib/data.ts` to exactly this list: Languages (Python, C++, SQL); AI/ML & NLP (scikit-learn, K-Means, Sentence Transformers, Prompt Engineering); LLMs & Agentic Systems (RAG, Agentic AI); Backend & Databases (FastAPI, MongoDB, MySQL, DuckDB, FAISS, asyncio, REST APIs); DevOps & Tools (Git, GitHub); Data & Visualization (Pandas, NumPy, Plotly, Power BI) — new category; Methodologies (Agile/Scrum, EDA) — new category. For the Frontend category, [remove entirely / de-emphasize to one line — confirm which with the user before implementing].

---

## 4. Still needs work — icon strategy for concept/technique skills

**Status:** not done. The current `ICONS` map in `skills-orbit.tsx` tries to force a logo onto concepts that don't have real brand icons (e.g. Weaviate's logo used for "RAG", scikit-learn's logo reused for "K-Means") — these either 404 or are conceptually misleading even when they load.

**Fix:** two-tier badge rendering —
1. Real, named tools with verifiable logos (Python, FastAPI, MongoDB, MySQL, DuckDB, FAISS, scikit-learn, Git, GitHub, Pandas, NumPy, Plotly, Power BI) keep the circular logo badge.
2. Concepts/techniques with no real logo (RAG, Agentic AI, K-Means, Prompt Engineering, asyncio, REST APIs, Agile/Scrum, EDA) get a distinct rounded-rectangle text-chip badge instead — no icon attempt at all, styled consistently with the site's indigo/zinc palette.

### Prompt for your coding agent
> In `components/ui/skills-orbit.tsx`, split skill rendering into two badge styles: keep the circular logo badge only for skills with a verified real-product icon, and render a rounded-rectangle text-chip badge (monospace label, no icon) for concept/technique skills that don't have a real logo. Remove now-unused CDN icon URL entries after the `lib/data.ts` trim from the previous step.

---

## 5. Still needs work — remove the boxed/card layout

**Status:** not done. Each category is still wrapped in `rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6`, which is what reads as boxy.

### Prompt for your coding agent
> 
n `components/ui/skills-orbit.tsx`, remove the bordered card container currently wrapping each skill category. Replace with a flat, continuous vertical layout — section header, then its row of badges, then a thin horizontal divider (`border-t border-zinc-800/50`) before the next category. No outer box per category.

---

## 6. Still needs work — remove the 3D "skyline" from Contact

**Status:** not done. `components/GitHubContributionsCalendar.tsx` is still imported and rendered on `app/contact/page.tsx`. Confirmed it's a 3D bar-chart (`@react-three/fiber` + `OrbitControls`) rendering GitHub contributions as extruded bars — a literal skyline. Confirmed it's not used anywhere else in the codebase, so removal is clean.

### Prompt for your coding agent
> Delete `components/GitHubContributionsCalendar.tsx` entirely. Remove its import and `<GitHubContributionsCalendar />` usage from `app/contact/page.tsx`. Adjust the surrounding layout/spacing on that page afterward so it doesn't leave an empty gap.

---

## Full checklist

**Unblock everything:**
- [ ] Merge `agent/portfolio-polish` → `main`
- [ ] Confirm live domain reflects the merge

**Config only (no code):**
- [ ] Add `OPENROUTER_MODEL` env var in Vercel Production, redeploy, test chatbot
- [ ] Confirm `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set in Vercel Production

**Still-open code work:**
- [ ] Trim `skillGroups` to résumé-justified list (section 3)
- [ ] Decide Frontend category: remove vs. de-emphasize
- [ ] Add Data & Visualization + Methodologies categories
- [ ] Two-tier icon strategy: logos for real tools, text chips for concepts (section 4)
- [ ] Remove bordered card container in skills grid (section 5)
- [ ] Delete `GitHubContributionsCalendar.tsx` + remove from Contact page (section 6)