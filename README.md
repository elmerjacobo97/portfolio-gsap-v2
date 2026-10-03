# Elmer Jacobo Portfolio

Bilingual portfolio for Elmer Jacobo, a product engineer and full-stack developer based in Trujillo, Peru. The site presents open-source projects, professional experience, services, applied AI work, and a direct contact flow.

**Live site:** [elmerjacobo.dev](https://elmerjacobo.dev)

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- GSAP with ScrollTrigger and ScrollSmoother
- Vercel Analytics and Speed Insights
- Resend for contact-form email delivery
- Vercel for deployment

## Features

- Spanish and English routes at `/es` and `/en`
- Localized metadata, canonical URLs, hreflang, Open Graph, Twitter cards, sitemap, and robots rules
- Custom EJ SVG favicon at `src/app/icon.svg`
- JSON-LD for the person, professional service, and service catalog
- Conversion events for contact, booking, LinkedIn, WhatsApp, and project links
- Global security headers and a web app manifest
- Reduced-motion support for animations
- Server Action contact form with Zod validation, honeypot protection, time trap, and rate limiting
- Responsive project and experience sections with localized summaries and image alt text

## Requirements

- Node.js 22 or newer
- pnpm

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/es`.

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Server | Resend API key for contact submissions |
| `CONTACT_TO_EMAIL` | Server | Inbox receiving contact submissions |
| `CONTACT_FROM_EMAIL` | Server | Domain-verified sender address |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site origin; production is `https://elmerjacobo.dev` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public | WhatsApp number in international format |
| `NEXT_PUBLIC_CAL_LINK` | Public | Cal.com path used by the booking button |
| `NEXT_PUBLIC_CAL_LINK_EN` | Public | English Cal.com event path used by the booking button |

Set the three server variables in Vercel before expecting the contact form to send email. Public variables can be configured in Vercel as well; the app also has safe defaults in `src/shared/lib/site.ts`.

## Verification

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Deployment

This repository deploys to the existing Vercel project `my-portfolio`, which owns `elmerjacobo.dev`.

```bash
vercel link --yes --scope elmer-jacobos-projects --project my-portfolio
vercel --prod --scope elmer-jacobos-projects
```

Configure production environment variables in the Vercel dashboard before testing the contact form.

## Project Structure

```text
src/
├── app/                         Routes, layouts, metadata, and global styles
│   └── [locale]/
│       ├── _components/         Layout-private site JSON-LD
│       ├── blog/                Blog index and article routes
│       ├── [...rest]/           Styled fallback for unknown paths
│       ├── layout.tsx           Localized root layout
│       └── page.tsx             Home page composition
├── features/
│   ├── portfolio/               Home sections, project cards, and content records
│   ├── contact/                 Contact UI, Server Action, state, and rate limiting
│   └── blog/                    Blog UI, MDX components, and server-only post reader
└── shared/
    ├── components/              Shared layout, motion, and UI components
    ├── i18n/                    Locale helpers and Spanish/English dictionaries
    └── lib/                     Site configuration, SEO, GSAP, and utility helpers
content/blog/{es,en}/            Localized MDX articles
public/                         Project and profile images
```

Routes compose features and shared modules. Each feature owns its components and
supporting code, and imports only its own modules and `shared/`. Shared modules
remain independent of features. Imports use `@/features/...` and `@/shared/...`;
the `@/*` alias resolves to `src/*`. Application filenames use `kebab-case`, while
Next.js special filenames retain their reserved names.

The root layout is `src/app/[locale]/layout.tsx`. The blog reader resolves MDX
articles from root `content/blog/`, so content and public assets stay outside
`src/`. Testimonials and their translations are retained, with the home-page
import and render intentionally commented out.

## License

No license has been assigned yet. Public visibility does not grant permission to reuse the source code or visual assets.
