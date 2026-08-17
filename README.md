# Elmer Jacobo Portfolio

Bilingual portfolio for Elmer Jacobo, a product engineer and full-stack developer based in Trujillo, Peru. The site presents open-source projects, professional experience, services, applied AI work, and a direct contact flow.

**Live site:** [elmerjacobo.dev](https://elmerjacobo.dev)

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- GSAP with ScrollTrigger and ScrollSmoother
- Resend for contact-form email delivery
- Vercel for deployment

## Features

- Spanish and English routes at `/es` and `/en`
- Localized metadata, canonical URLs, hreflang, Open Graph, Twitter cards, sitemap, and robots rules
- Custom EJ SVG favicon at `app/icon.svg`
- JSON-LD for the person, professional service, and service catalog
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

Set the three server variables in Vercel before expecting the contact form to send email. Public variables can be configured in Vercel as well; the app also has safe defaults in `data/site.ts`.

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
app/[locale]/       Localized App Router layout and home page
components/         Layout, sections, contact, motion, and UI components
i18n/               Spanish and English dictionaries
lib/                SEO, GSAP, motion, and utility helpers
public/             Project and profile images
```

## License

No license has been assigned yet. Public visibility does not grant permission to reuse the source code or visual assets.
