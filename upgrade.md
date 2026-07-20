# Portfolio Fixes — Copilot Instructions

## 1. Fix duplicate hero badge text
Find the hero/badge component showing "Available for Internships" text. It is currently rendering two overlapping strings ("Available for Internships & Early Careers (Graduating 2027)" and "Available for Internships (Graduating 2027)"). Remove the duplicate so only one clean badge renders.

## 2. Remove the Visitor Orbit widget entirely
Locate the "Visitor Orbit" component (globe/presence widget showing "Connecting", "Loading globe...", "Signal", "Nodes", fake fallback data). Delete the component, its imports, and any related state/hooks/dependencies from the homepage. Do not leave commented-out code.

## 3. Restructure navigation to single-page scroll
Merge the About, Journey, Projects, Skills, and Contact pages into one page with section IDs: `#about`, `#journey`, `#projects`, `#skills`, `#contact`. Update nav links to anchor links (e.g. `<a href="#projects">`) instead of separate routes. Keep individual project detail routes (e.g. `/projects/codeverdict`) intact for deep linking.

## 4. Fix image sizing on project thumbnails
Find all `<Image>` components on the projects page/section. Add a proper `sizes` prop matching actual rendered width instead of letting them request full 3840px images, e.g.:
```
sizes="(max-width: 768px) 100vw, 33vw"
```

## 5. Standardize the skills section
Find the skills section/component. Replace mixed icon/text-only entries with one consistent chip/pill style applied uniformly across all skills. Trim "Currently Exploring" to a maximum of 2 items.

## 6. Add outcome numbers to project descriptions
Update project blurb text (CodeVerdict, AskSQL, CareerIQ, etc.) to include quantified results where available — accuracy, latency, scale, or performance numbers — instead of only architecture descriptions.

## 7. Mobile pass
- Ensure nav collapses into a proper mobile menu instead of a horizontally scrolling row of links.
- Ensure tap targets on project cards are at least 44px.
- Wrap heavy animations/canvas effects in a `prefers-reduced-motion` or viewport-width check to disable/simplify them on mobile.

---

## Checklist

- [x] Fix duplicate hero badge text
- [x] Remove Visitor Orbit widget entirely
- [x] Restructure navigation to single-page scroll
- [x] Fix image sizing on project thumbnails
- [x] Standardize the skills section
- [x] Add outcome numbers to project descriptions
- [x] Mobile pass (nav, tap targets, animations)