# Repository Instructions

## Toolchain

- This is one Next.js `16.2.12` App Router app. Use `pnpm`; `pnpm-lock.yaml` and `pnpm-workspace.yaml` are authoritative. `README.md` is stale create-next-app boilerplate.
- Before changing Next.js APIs, read the matching guide under `node_modules/next/dist/docs/`; this project uses Next 16 conventions.
- Run `pnpm dev` for local development at `http://localhost:3000`. Run `pnpm lint` and `pnpm exec tsc --noEmit` for focused checks; full verification is `pnpm lint && pnpm exec tsc --noEmit && pnpm build`.
- There is no test script or automated test suite. Do not assume Jest, Vitest, or Playwright commands exist.

## Routing And Content

- `app/[locale]/layout.tsx` is the root layout; there is intentionally no `app/layout.tsx`. Locales are `/es` and `/en`; `/` is a temporary `307` redirect to default locale `es`.
- App Router `params` are promises. Preserve existing async route signatures and `await params` usage.
- Preserve `app/[locale]/[...rest]/page.tsx`, `[locale]/not-found.tsx`, and `app/global-not-found.tsx`: together they keep invalid and deep unknown paths inside the intended styled 404 flow.
- Home composition is `app/[locale]/page.tsx`; project and professional-experience records live in `data/projects.ts` and render directly on the home page. There is no project-detail route; the locale switcher swaps only the first path segment.
- `data/` owns site, project, service, and other content records. `i18n/dictionaries/es.ts` defines the `Dictionary` shape; update `en.ts` with every dictionary change.

## Motion And Styling

- Import GSAP and plugins only from `@/lib/gsap`; registration is centralized there and uses deep imports. Never import `gsap/all`.
- Use `useGSAP` with scoped refs and the shared reduced-motion/media queries from `lib/motion.ts`. New animation must preserve `prefers-reduced-motion` behavior.
- `SmoothProvider` owns `#smooth-wrapper` and `#smooth-content`. Viewport-fixed chrome must stay outside it as a sibling in `app/[locale]/layout.tsx`; use ScrollTrigger pinning instead of descendant `position: fixed` for sticky animated content.
- Internal animated navigation depends on `TransitionLink`, `.curtain`, and `RouteMotion`; do not replace those links with plain navigation without preserving the route-transition and ScrollTrigger refresh flow.
- Tailwind v4 tokens and custom utilities live in `app/globals.css`. Keep `@theme static`, use semantic color aliases, and leave native `scroll-behavior: auto` because ScrollSmoother owns scrolling. Keep `next/font` variable classes on `<html>`.
- `DESIGN.md` documents the implemented visual tokens and interaction rules; consult it before changing frontend styling.

## Contact Form

- For mail-enabled local development, run `cp .env.example .env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and a domain-verified `CONTACT_FROM_EMAIL`. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and `NEXT_PUBLIC_CAL_LINK` are public values; `data/site.ts` provides defaults.
- `next.config.ts` caps Server Action bodies at `64kb`. `actions/contact.ts` keeps request headers, validation, and rate limiting in the action and intentionally does not revalidate the statically generated page.
- `lib/rate-limit.ts` is an in-memory, per-instance speed bump, not durable distributed enforcement.
