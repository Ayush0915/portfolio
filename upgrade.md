# Mobile & Theme-Switching Bugs (confirmed from screenshots)
Source: 3 mobile screenshots — hero section in dark theme, hero section in light theme, and a Journey timeline card.

---

## Bug 1 — Tech-stack tag chips render as solid black bars with invisible text

**Evidence:** On the Journey timeline card ("Core Technical Member" entry), the tag row below the bullet points — which should show something like `React` `Next.js` `TypeScript` `Tailwind CSS` `Firebase` — instead renders as plain solid-black rounded rectangles with no visible text at all.

**Root cause (near-certain):** a CSS variable for tag/chip background or text color isn't resolving correctly for the active theme — most likely the chip is using a hardcoded dark background (`bg-black` or a dark theme token) while the text color is *also* dark (inheriting a dark-on-light default), so text and background collapse to the same value. This is the classic "theme token not swapped" bug — one half of the component (bg) got themed, the other half (text) didn't, or vice versa.

**Fix:**
1. Find the tag/chip component (likely `TechTag`, `SkillChip`, or similar, reused in both the Journey timeline and Skills page).
2. Confirm it's using theme-aware tokens for **both** background and text (e.g., `bg-muted text-muted-foreground` or your CSS variable equivalents), not a mix of a hardcoded color and a themed one.
3. Test it explicitly in both themes — toggle light/dark with this exact component visible and confirm text is legible in both. This bug is very likely present anywhere else this same tag component is reused (Skills page badges, project tech tags, etc.) — audit all instances, not just the Journey card.

---

## Bug 2 — Hero last name ("KUMAR BHADANI") has a contrast failure in light mode

**Evidence:** The stacked hero name uses solid fill for the first name ("AYUSH") and outline-only (stroke, no fill) text for the last name ("KUMAR BHADANI"). In dark mode this is faint but readable; in light mode the outline color is close enough to the background that the text nearly disappears.

**Fix:**
1. Give the outline stroke color a theme-specific value rather than one fixed color used in both modes — it needs to be darker/higher-contrast in light mode than in dark mode to read the same way visually.
2. Alternatively, increase stroke width slightly and/or add a very subtle fill (5–10% opacity) so the letterforms hold together even at a glance, rather than relying purely on a thin outline against a busy grid background (see Bug 4).
3. Run this specific element through a contrast checker in both themes — outline-only text doesn't get standard contrast-ratio tooling attention by default, so verify manually.

---

## Bug 3 — Primary CTA ("View Projects") looks disabled in light mode

**Evidence:** In dark mode, "View Projects" has a visible purple outline/border and reads as an active button. In light mode, the same button is a very low-contrast lavender-on-near-white — visually indistinguishable from a disabled state, next to the solid "GitHub" button which reads correctly in both themes.

**Fix:**
1. This is your primary call-to-action — it should have the *strongest* visual weight on the page in both themes, not the weakest. Increase border contrast and/or add a subtle background fill in light mode so it doesn't rely on a thin, pale outline alone.
2. Compare directly against the "GitHub" button (which works correctly in both themes) — replicate whatever gives that button its contrast (likely a solid or near-solid background) rather than the outline-only treatment currently used for "View Projects."

---

## Bug 4 — Background grid pattern visually collides with the outlined hero type

**Evidence:** The decorative graph-paper grid behind the hero runs directly through the outline-only "KUMAR BHADANI" text, so grid lines show through the open letterforms. Combined with Bug 2's low contrast, this makes the name look glitched rather than intentionally styled.

**Fix:**
1. Fade/mask the grid pattern out directly behind the hero headline (a radial or linear gradient mask that reduces grid opacity to near-zero in the text's bounding box), so the grid stays visible around the type but not through it.
2. This pairs with Bug 2's fix — solving contrast alone won't fully fix the "busy" look if the grid is still bleeding through the letter outlines.

---

## Bug 5 — Floating capsule nav wastes horizontal space on mobile

**Evidence:** The rounded nav pill ("AB" + theme toggle + hamburger) floats with large empty margins on both sides on a narrow mobile viewport, while the theme toggle and hamburger icons sit cramped close together on the right edge of the pill.

**Fix:**
1. On mobile specifically, widen the pill closer to full-bleed (with a small consistent side margin, e.g. 16px) instead of keeping the same proportional width used on desktop — capsule nav bars are a desktop-friendly pattern that needs a tighter mobile-specific breakpoint.
2. Add a touch more spacing between the theme toggle and hamburger icons so they don't read as a single cramped tap target — both need comfortable independent touch areas (44px minimum tap target per standard mobile accessibility guidance).

---

## Bug 6 — Tagline text differs between screenshots

**Evidence:** Dark-mode screenshot shows "MULTI-AGENT SYSTEMS BUILDER" as the small label above the hero name; the light-mode screenshot shows "AI/ML ENGINEER" in the same position.

**Fix (verification, not a guaranteed bug):**
1. If this is an intentional rotating/cycling label (multiple taglines cycling on an interval or on load), that's fine — but confirm it isn't re-randomizing on every theme toggle, which would feel like a glitch rather than a feature to someone switching themes to test the site (exactly what's happening here).
2. If it's unintentional — e.g., two different label variants tied by mistake to theme state instead of a timer/rotation — decouple the tagline from theme logic entirely.

---

## Priority Order

1. **Bug 1** — broken tag chips (data-loss-looking bug, highest visibility, likely repeated across the site wherever this component is reused)
2. **Bug 3** — primary CTA looking disabled in light mode (directly costs clicks)
3. **Bug 2 + Bug 4** — hero name legibility + grid collision (fix together, same root styling area)
4. **Bug 6** — confirm tagline behavior is intentional
5. **Bug 5** — mobile nav spacing polish

**General theme QA process going forward:** every component that ships needs to be checked in *both* themes before merging, specifically anything using outline/stroke text, low-opacity fills, or reused chip/tag components — those are exactly the patterns that silently break when a theme token isn't fully wired through.