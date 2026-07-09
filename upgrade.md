# Portfolio — Remaining Changes (Prompt List)

Simple, direct prompts for each remaining fix. Hand these to your coding agent one at a time, or all at once in one session.

---

## 1. Fix the contact form — connect it to a real backend

> The contact form in `components/ContactForm.tsx` is fake — `handleSubmit` just does a `setTimeout` and shows a fake success message, nothing is actually sent anywhere. Fix this by creating a real `app/api/contact/route.ts` using the `resend` npm package to email submissions to `ayushbhadani0915@gmail.com`, with `replyTo` set to the sender's email so replies go directly to them. Update `handleSubmit` in `ContactForm.tsx` to actually `fetch("/api/contact")` and handle success/error states properly, including a visible error message in the UI. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to `.env.example`.

**After this**, sign up at resend.com, get an API key, and add both `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to Vercel's Production environment variables, then redeploy.

---

## 2. Add missing SEO files

> This Next.js portfolio is missing basic SEO infrastructure. Add: `app/sitemap.ts` covering all static routes and project detail pages, `app/robots.ts` allowing all crawlers and pointing to the sitemap, `app/manifest.ts` with name/icons/theme_color matching the site's dark zinc-950 theme, and `app/opengraph-image.tsx` (plus `app/twitter-image.tsx`) generating a 1200x630 social preview image with the site's name, role, and a one-line pitch. Also add JSON-LD Person structured data to `app/layout.tsx`.

---

## 3. Delete orphaned/unused images

> The `public/projects/` folder has unused image files not referenced anywhere in `lib/data.ts`: `owemygod.png`, `menu-decoder1.png`, `movie-book-recommendation.png`, `movie-book-recommendation1.png`, `shopping list.png`, `mesa1.jpg`, `Screenshot 2026-02-28 174132.png`, and `codeverdict_v2.png` (superseded by `codeverdict_v3.png`, which is the one actually used). Delete all of these — they're not used by any project entry and are just adding dead weight to the deployed site.

---

## 4. Add résumé link to navbar and Contact page

> The résumé download (`/resume.pdf`) is currently only linked from the homepage hero. Add the same "Resume" link/button to `components/Navbar.tsx` (both desktop nav and mobile drawer) and as a card on `app/contact/page.tsx` alongside the existing Email/GitHub/LinkedIn cards, so it's reachable from every page.

---

## 5. Fix the carousel's mobile width bug

> `components/ProjectsRail.tsx` hardcodes `CARD_W = 480`, `CARD_H = 270`, and `SIDE_OFFSET = 520` with no responsive breakpoints, which clips the active card on phones under ~480px wide. Make these values responsive using the same viewport-width-tier pattern already used correctly in `components/HeroGlobeCard.tsx`. Use smaller values on narrow viewports (e.g. `CARD_W ~300` under 420px, `~380` under 768px, `480` at 768px and above) so the carousel never overflows on mobile.

---

## 6. Remove the Skills Orbit floating animation — replace with a static grid

> Replace the "Skills Orbit" component (`components/ui/skills-orbit.tsx`) used on `app/skills/page.tsx`. Remove the floating/drifting icon animation and the tab-per-category interaction entirely. Instead, render all skill categories at once in a static, scannable grid — a section header per category (Languages, AI/ML & Deep Learning, LLMs & Agentic Systems, Frontend, Backend & Databases, DevOps & Tools) followed by a responsive grid of skill badges underneath, all visible in one scroll with no clicking required. Keep the same badge visual style (rounded icon circle + label, same hover states) and keep pulling icons from the existing `ICONS` map — just remove the motion/animation and the tab-switcher logic.
>
> While doing this, also fix the icon mapping bugs in the `ICONS` object in `skills-orbit.tsx` (or wherever it ends up after the rewrite): `"React"` has no entry (only `"React Native"` exists, so plain React currently shows a broken text fallback), `"K-Means"` has no entry, and `"Agentic AI"` has no entry. Add proper icon entries for all three so nothing falls back to a 3-letter text badge.

---

## Checklist

- [ ] Contact form real backend (Resend) + Vercel env vars
- [ ] Sitemap, robots, manifest, OG image, JSON-LD
- [ ] Delete orphaned images in `public/projects/`
- [ ] Résumé link in navbar + Contact page
- [ ] Responsive carousel card width for mobile
- [ ] Skills Orbit → static grid, animation removed
- [ ] Fix React / K-Means / Agentic AI icon fallback bugs