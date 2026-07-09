# Portfolio — Fresh Re-Audit + Required Changes

Re-cloned and re-checked the repo and site from scratch. Nothing has been changed in your actual repo — this is documentation only. Status column shows what's already fixed since the last round vs. still open.

---

## 1. Status check — what's fixed since last time

| Item | Status |
|---|---|
| Résumé PDF | ✅ Fixed — `public/resume.pdf` exists, linked from the hero on the homepage, opens correctly in a new tab |
| Contact form (was fake) | ❌ Still broken — `ContactForm.tsx` still has `await new Promise(resolve => setTimeout(resolve, 1500))`, no `fetch`, no `/api/contact` route exists at all |
| IoT achievement | ❌ Still present everywhere — not removed yet (see section 2) |
| Sitemap/robots/manifest/OG image | ❌ Still missing |
| Orphaned images in `public/projects/` | ❌ Still present (~5MB of unused screenshots) |
| Résumé link in navbar + Contact page | ❌ Only on homepage hero — not in navbar or Contact page yet |

---

## 2. Remove the fabricated IoT achievement — completely, from every file

Confirmed still present in **four** places (one more than last time — it's also baked into the chatbot's context file, so the chatbot will actively tell visitors about an award you didn't get until this is fixed):

### `lib/data.ts` — two deletions

Delete this object from the `experiences` array (around line 260):
```ts
{
  role: "IoT System Developer (Exhibition)",
  organization: "Bangalore Institute of Technology",
  period: "2024",
  location: "Bangalore, Karnataka",
  bullets: [
    "Designed and engineered an automated solar panel cleaning mechanism using Arduino microcontrollers and dust feedback sensors.",
    "Programmed motor driver control loops to automatically trigger cleaning sweeps, increasing energy efficiency constraints.",
    "Awarded the Consolation Prize in the annual college-wide technical IoT Exhibition.",
  ],
  stack: ["C++", "Arduino IDE", "Embedded C", "Hardware Prototyping"],
},
```

Delete this object from the `achievements` array (around line 290):
```ts
{
  title: "IoT Exhibition Consolation Prize",
  period: "2024",
  description: "Honored with a consolation prize for the automated solar panel dust-cleaning feedback loop system.",
  category: "award",
},
```

### `components/JourneyTimeline.tsx` — one deletion + one import fix

Delete the entire card block starting at the `{/* IoT Exhibition */}` comment (line 110) through its closing `</div>` (roughly line 148) — the whole card, header, bullet list, and tech-tag row.

Then, since `Award` from `lucide-react` is only used by that block, remove it from the import at the top or the build will warn on an unused import:
```ts
// before
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from "lucide-react";
// after
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
```

### `lib/portfolio-context.md` — one deletion

This file is fed directly into your AI chatbot's system context. Delete this line (around line 90):
```
- **IoT Exhibition — Consolation Prize** — built an automated solar panel cleaning system with Arduino, motor control, and dust-sensor feedback.
```
Until this line is gone, the chatbot will keep describing this to anyone who asks it about your achievements — even after you clean up the visible UI.

---

## 3. Remove the "Project Index" block, keep only the hover/click carousel navigation

**What you asked for:** keep the carousel's existing click-to-navigate side cards + the prev/next counter pill (the part that already works well), remove the separate "Project Index" text list underneath it.

### `components/ProjectsRail.tsx`

Delete this entire block (roughly lines 179–210 in the current file) — the `"Project Index"` label and the 2-column button grid beneath it:

```tsx
<div className="w-full max-w-4xl px-4 sm:px-8">
  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
    Project Index
  </p>
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
    {ITEMS.map((card, i) => {
      const isActive = i === index;
      return (
        <button
          key={card.slug}
          onClick={() => setIndex(i)}
          className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
            isActive
              ? "border-indigo-500/50 bg-indigo-500/10 text-zinc-100"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
          }`}
        >
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              0{i + 1}
            </p>
            <p className="truncate text-sm font-semibold">{card.title}</p>
            <p className="mt-1 truncate text-xs text-zinc-500">{card.meta}</p>
          </div>
          <div className="shrink-0 text-xs font-medium text-indigo-300">
            View
          </div>
        </button>
      );
    })}
  </div>
</div>
```

**Nothing else needs to change** — the carousel cards themselves already have `onClick` that calls `prev()`/`next()` when you click a side (non-active) card, and the prev/next chevron pill with the "`X / Y`" counter (further down in the same file, right below the project title/description) stays exactly as-is. Once the block above is removed, that pill + the clickable side cards become the only way to navigate, which is the behavior you said you liked.

**One side effect worth knowing:** without the index list, there's no direct "jump straight to project 4" — someone has to click through via prev/next or click a visible side card. For 4 projects this is a non-issue; if you ever grow past ~6 projects it's worth revisiting with dot indicators (a much lighter-weight jump-to-item control than the current text list), but not needed now.

---

## 4. Fresh bugs found this pass

### 4.1 Contact form is still completely fake (unchanged from last audit)
`handleSubmit` in `ContactForm.tsx` still does a fake 1.5s delay and shows "sent" with no backend call. No `/api/contact` route exists in the repo at all. Every message typed into this form is currently lost. This was already documented with full working code (Resend-based API route + form fix) in the previous md I gave you — it just hasn't been applied yet. Re-apply that when you get to this file.

### 4.2 Leftover placeholder name in a new API route
`app/api/github/activity/route.ts` sends this request header:
```ts
"User-Agent": "rahul-portfolio/1.0"
```
Not your name — looks like it was copied from a template or another example without being customized. Not user-visible (it's just an outbound HTTP header), but it's the same category of problem as the IoT content: unreviewed generated code slipping in details that aren't actually yours. Change it to something like `"ayush-portfolio/1.0"`.

### 4.3 New "Live GitHub Activity" feed — placement worth reconsidering
This new feature (`components/GithubActivityFeed.tsx`) is well-built — server-side fetch through your own API route (so no client-side GitHub rate-limit exposure), proper loading skeleton, graceful empty state if the API fails. No bug here. But it's placed on the **Contact page** (`app/contact/page.tsx`), which is an odd information-architecture choice — someone arriving at Contact is there to reach out, not browse your recent commits. Consider moving it to the homepage or an About/Projects context instead, where GitHub activity reinforces "I'm actively building" alongside the work itself.

### 4.4 Still-open items from the original audit (unchanged, listed for completeness)
- No `sitemap.xml`, `robots.txt`, `manifest.json`, or Open Graph/Twitter card image — link previews on LinkedIn/Slack still render as bare text.
- ~5MB of orphaned screenshots still sitting in `public/projects/` (`owemygod.png`, `menu-decoder1.png`, `movie-book-recommendation.png`, `movie-book-recommendation1.png`, `shopping list.png`, `mesa1.jpg`, a raw `Screenshot 2026-02-28...png`) — none referenced in `lib/data.ts`, still publicly accessible if someone hits the URL directly.
- Résumé link only exists in the homepage hero — not yet in the navbar or on the Contact page, so it's not reachable from every page the way a résumé CTA should be.
- Carousel is still fixed-width (`CARD_W = 480`) with no responsive breakpoints — will still clip on phones under ~480px wide (iPhone SE/13/14 mini, most Android phones). This one didn't get worse or better, just hasn't been touched.

---

## 5. Checklist

**IoT removal**
- [ ] Delete IoT block from `lib/data.ts` (experiences array)
- [ ] Delete IoT block from `lib/data.ts` (achievements array)
- [ ] Delete IoT card block from `components/JourneyTimeline.tsx`
- [ ] Remove now-unused `Award` import in `JourneyTimeline.tsx`
- [ ] Delete IoT line from `lib/portfolio-context.md`

**Project Index removal**
- [ ] Delete the "Project Index" label + button-grid block from `components/ProjectsRail.tsx`
- [ ] Confirm carousel still navigates via clicking side cards + the prev/next pill after the block is gone

**Fresh bugs**
- [ ] Fix `User-Agent` string in `app/api/github/activity/route.ts`
- [ ] Decide whether to relocate `GithubActivityFeed` off the Contact page

**Still open from before (not new, just not done yet)**
- [ ] Real contact form backend (Resend + `/api/contact` route — code already written in the previous md)
- [ ] `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`
- [ ] Delete orphaned images in `public/projects/`
- [ ] Add résumé link to navbar + Contact page
- [ ] Responsive carousel card width for mobile