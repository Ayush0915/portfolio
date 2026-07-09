# Portfolio — Final Consolidated Action List

Everything below is confirmed from directly inspecting your repo (including the unmerged `agent/portfolio-polish` branch) — not guesswork. Do these in order.

---

## Step 1 — Merge your fixes into `main` (do this first, unblocks everything else)

Your IoT removal and Project Index removal are done and sitting on `agent/portfolio-polish`, unmerged. Nothing will show up on `ayushkr-bhadani.vercel.app` until this branch is merged into `main`, because Vercel Production only deploys `main`.

**Easiest way — GitHub UI:**
1. Go to `github.com/Ayush0915/portfolio`.
2. GitHub will likely already show a banner: *"agent/portfolio-polish had recent pushes"* with a **Compare & pull request** button. Click it.
3. Review the diff (should show the IoT removal + Project Index removal + User-Agent fix, ~2 commits).
4. Click **Merge pull request** → **Confirm merge**.
5. Vercel will auto-detect the new `main` commit and start a Production deployment within a few seconds — watch the Deployments tab, wait for it to say **Ready** + **Production**.
6. Hard-refresh `ayushkr-bhadani.vercel.app` (or open in incognito) and confirm the IoT section and Project Index block are gone.

**Alternative — command line**, if you don't see the PR banner:
```bash
git checkout main
git pull origin main
git merge origin/agent/portfolio-polish
git push origin main
```

---

## Step 2 — Fix the chatbot (detailed walkthrough)

**Why it's showing canned responses:** the code checks for two environment variables — `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` — and if either is missing, it silently falls back to hardcoded responses instead of calling a real model. This is intentional graceful-degradation behavior in the code (so the chatbot never shows a hard error to a visitor), but it means it's currently running on the fallback in production.

### 2.1 — Get an OpenRouter API key
1. Go to [openrouter.ai](https://openrouter.ai) and sign up (free).
2. Go to [openrouter.ai/keys](https://openrouter.ai/keys) → **Create Key**.
3. Copy the key — it looks like `sk-or-v1-...`. You won't be able to see it again after leaving the page, so copy it now.

### 2.2 — Pick a model
Your repo's `.env.example` already documents this — any model slug from [openrouter.ai/models](https://openrouter.ai/models) works. Two reasonable choices:
- **`openrouter/free`** — routes to whatever free model OpenRouter has available at the time. Zero cost, but quality/speed can vary since it's not a fixed model.
- **`meta-llama/llama-3.1-8b-instruct:free`** — a specific free Llama model, more predictable than the auto-router option. This is a safe default if you just want something that works consistently without paying.

Either works for a portfolio chatbot with light traffic. If you want higher quality and don't mind a small cost, larger models like `meta-llama/llama-3.3-70b-instruct` are also available on OpenRouter (paid, but usually fractions of a cent per message at your expected volume).

### 2.3 — Add the env vars to Vercel
1. Go to your Vercel dashboard → the `portfolio` project → **Settings** → **Environment Variables**.
2. Add:
   | Key | Value |
   |---|---|
   | `OPENROUTER_API_KEY` | the `sk-or-v1-...` key you copied |
   | `OPENROUTER_MODEL` | `openrouter/free` (or your chosen model slug) |
3. **Important:** when adding each one, Vercel asks which environments it applies to (Production / Preview / Development) — make sure **Production** is checked. It's easy to add a var and only have it apply to Preview by accident, which would explain why it might have worked before on a preview URL but not on your real domain.
4. Also add the same two vars to your local `.env.local` file (create it from `.env.example` if you don't have one) so the chatbot works when you run `npm run dev` locally too:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   OPENROUTER_MODEL=openrouter/free
   ```
   `.env.local` is already gitignored, so this never gets committed.

### 2.4 — Redeploy
Env var changes don't apply to deployments that already exist — you need a fresh deployment after adding them.
- Easiest: Vercel dashboard → Deployments → find the latest Production deployment → **⋯** menu → **Redeploy**.
- Or just push any small commit to `main` (even the merge from Step 1 will trigger this automatically, so if you do Step 1 after adding the env vars, one deploy covers both).

### 2.5 — Verify it's actually using the LLM now
The fallback responses are fairly convincing for on-script questions ("what are his skills," "tell me about CodeVerdict"), so a simple greeting won't prove much. Test with something the hardcoded mock can't handle, e.g.:
- *"Compare CodeVerdict and AskSQL's approach to safety"*
- *"If Ayush had to pick one project to show in a 2-minute interview, which one and why?"*

A hardcoded fallback will either ignore the nuance or fall through to its generic catch-all response. A real model will actually reason about it using the portfolio context. You can also just check the Vercel function logs for that request — if it's using the fallback, you'll still see the `"OpenRouter keys missing"` console warning; if that warning is gone, it's live.

---

## Step 3 — Remaining fixes not yet done anywhere (main or the agent branch)

### 3.1 Contact form (still fake everywhere)
Still has `await new Promise(resolve => setTimeout(resolve, 1500))`, no real backend. Full working code (Resend-based `/api/contact` route + the `ContactForm.tsx` fix) was already written out in an earlier md — reuse that when you get to this. Quick recap of what's needed:
- Sign up at [resend.com](https://resend.com), get an API key (free, no domain verification needed since you're sending to your own Gmail).
- Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL=ayushbhadani0915@gmail.com` to Vercel (Production!) and `.env.local`.
- Add `app/api/contact/route.ts` and update `handleSubmit` in `ContactForm.tsx` to actually `fetch()` it.

### 3.2 Remove GitHub Activity Feed
Still exists on both `main` and the agent branch — the earlier removal work didn't include this. Three deletions:
- Delete `components/GithubActivityFeed.tsx`
- Delete `app/api/github/activity/route.ts`
- Remove its import + `<GithubActivityFeed username={contact.github} />` usage from `app/contact/page.tsx`

---

## Updated status table

| Item | Status |
|---|---|
| IoT achievement removed | ✅ Done on `agent/portfolio-polish` — **needs merge to `main`** (Step 1) |
| Project Index block removed | ✅ Done on `agent/portfolio-polish` — **needs merge to `main`** (Step 1) |
| `User-Agent` placeholder fixed | ✅ Done on `agent/portfolio-polish` — **needs merge to `main`** (Step 1) |
| Résumé PDF | ✅ Live on `main`/Production already |
| Chatbot connected to real LLM | 🔲 Fix documented in Step 2 — config only, no code change needed |
| Contact form | ❌ Still fake — Step 3.1 |
| GitHub Activity Feed removal | ❌ Not done yet — Step 3.2 |
| Résumé link in navbar + Contact page | ❌ Still only on homepage hero |
| Sitemap/robots/manifest/OG image | ❌ Still missing |
| Orphaned images in `public/projects/` | ❌ Still present |
| Carousel fixed-width mobile bug | ❌ Still present |

---

## Checklist

- [ ] Merge `agent/portfolio-polish` → `main` (Step 1)
- [ ] Confirm live domain shows IoT gone + Project Index gone
- [ ] Get OpenRouter API key
- [ ] Add `OPENROUTER_API_KEY` + `OPENROUTER_MODEL` to Vercel **Production** env vars
- [ ] Add same to local `.env.local`
- [ ] Redeploy
- [ ] Test chatbot with an off-script question, confirm it's not the canned fallback
- [ ] Build + apply contact form fix (Resend)
- [ ] Delete GitHub Activity Feed files