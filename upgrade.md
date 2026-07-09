# Prompt — Fix Vercel Build Error (twitter-image.tsx)

Paste this to your coding agent as-is.

---

> The Vercel build is failing with this Turbopack error:
>
> ```
> ./app/twitter-image.tsx:3:34
> Next.js can't recognize the exported `runtime` field in route. It mustn't be reexported.
>   1 | import ImageResponse from "./opengraph-image";
>   2 |
> > 3 | export { alt, size, contentType, runtime } from "./opengraph-image";
> ```
>
> The problem: `app/twitter-image.tsx` currently re-exports its `alt`, `size`, `contentType`, and `runtime` config from `./opengraph-image`, and also does `export default ImageResponse` from that same import. Next.js requires these route config exports to be literal values declared directly in the file — it statically parses them at build time without executing code, so re-exporting from a sibling file breaks that. The `export default ImageResponse` line is also wrong on its own: it's importing the default export of the opengraph-image route (which should be an async component function) and using it as this route's default directly, not calling it as a component.
>
> Fix `app/twitter-image.tsx` so it no longer imports anything from `./opengraph-image`. Instead:
> 1. Import `ImageResponse` from `"next/og"` directly (not from the sibling route file).
> 2. Declare `runtime`, `alt`, `size`, and `contentType` as literal exported constants directly in this file.
> 3. Add its own `export default async function TwitterImage()` that returns a `new ImageResponse(...)` with its own JSX, matching the same visual style as `opengraph-image.tsx` (dark background matching the site's zinc-950 theme, name + role + one-line pitch), sized 1200x630.
>
> To avoid duplicating the JSX between `opengraph-image.tsx` and `twitter-image.tsx`, extract the shared JSX tree and size constant into a plain non-route helper file (e.g. `lib/og-image.tsx`) exporting a regular function/constant. Both `app/opengraph-image.tsx` and `app/twitter-image.tsx` should import the JSX/size from that shared helper, while still declaring their own `runtime`/`alt`/`size`/`contentType` as literal exports at the top of each route file — the config exports must stay literal in each file even though the JSX body is shared.
>
> Verify `app/opengraph-image.tsx` follows the same correct pattern (own literal config exports, own `export default async function`, imports `ImageResponse` from `"next/og"`) before considering this done.
>
> After the fix, run `npm run build` locally and confirm it completes with no Turbopack errors before pushing.

---

## Checklist

- [ ] `app/twitter-image.tsx` no longer imports anything from `./opengraph-image`
- [ ] `runtime`, `alt`, `size`, `contentType` declared as literal exports in `twitter-image.tsx`
- [ ] `twitter-image.tsx` has its own `export default async function` returning `new ImageResponse(...)`
- [ ] Shared JSX/size (if any) extracted to a non-route helper file, not re-exported between route files
- [ ] `app/opengraph-image.tsx` double-checked for the same correct pattern
- [ ] `npm run build` passes locally before pushing