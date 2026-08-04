<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- Use pnpm; `pnpm-lock.yaml` is the dependency source of truth.
- Develop with `pnpm dev` at `http://localhost:3000`; `/` redirects temporarily to `/es`.
- Focused checks: `pnpm lint` and `pnpm exec tsc --noEmit`.
- Full verification: `pnpm lint && pnpm exec tsc --noEmit && pnpm build`.
- No automated test suite or test script exists.

## App Structure

- This is one Next.js 16 App Router app, not a multi-package workspace. `README.md` is stale create-next-app boilerplate.
- `app/[locale]/layout.tsx` is the root layout; there is intentionally no `app/layout.tsx`. Routes live under `/es` and `/en`, while `next.config.ts` redirects `/` to the default locale.
- App Router `params` are promises in this version; follow existing async route signatures.
- Home composition lives in `app/[locale]/page.tsx`; case studies are statically generated from `data/projects.ts` by `app/[locale]/work/[slug]/page.tsx`.
- Site records belong in `data/`. Interface copy belongs in `i18n/dictionaries/`; Spanish defines the `Dictionary` shape, so update both `es.ts` and `en.ts` together.

## Motion And Styling

- Import GSAP and plugins only from `@/lib/gsap`; plugin registration is centralized there. Do not import `gsap/all`.
- Use `useGSAP` with scoped refs and shared media queries from `lib/motion.ts`; every animation must preserve reduced-motion behavior.
- `SmoothProvider` owns `#smooth-wrapper` and `#smooth-content`. Viewport-fixed chrome must remain its sibling in `app/[locale]/layout.tsx`; transformed smooth content breaks descendant `position: fixed`. Use ScrollTrigger pinning for sticky animated content.
- Route transitions depend on `TransitionLink`, `.curtain`, and `RouteMotion` refreshing ScrollTrigger after navigation; do not replace internal animated links with plain navigation without preserving that flow.
- Tailwind v4 tokens and custom utilities live in `app/globals.css`. Keep `@theme static`, use semantic color aliases, and leave native `scroll-behavior` as `auto` because ScrollSmoother owns scrolling.

## Contact Form

- Sending mail requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`; copy `.env.example` to `.env.local`. Public site, WhatsApp, and Cal values have defaults in `data/site.ts`.
- `actions/contact.ts` deliberately avoids cache revalidation so prerendered pages stay static. Keep request headers and rate limiting inside the Server Action, not route rendering.
