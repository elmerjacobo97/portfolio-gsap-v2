---
version: alpha
name: Elmer Jacobo Portfolio Design System
description: Dark-default editorial/technical visual system documented from the source code; this file is descriptive, not a redesign.
colors:
  primary: "#D4FF3F"
  accent: "{colors.primary}"
  accent-fill: "{colors.acid-500}"
  acid-300: "#E9FF9B"
  acid-400: "#DEFF6B"
  acid-500: "{colors.primary}"
  acid-600: "#B4E01F"
  acid-700: "#8FB414"
  acid-800: "#4B5F0B"
  ink-950: "#050505"
  ink-900: "#0A0A0A"
  ink-850: "#101010"
  ink-800: "#161616"
  ink-700: "#242424"
  ink-600: "#3A3A3A"
  chalk-50: "#F7F7F2"
  chalk-200: "#C9C9C2"
  chalk-400: "#8A8A82"
  chalk-600: "#55554F"
  canvas: "{colors.ink-950}"
  surface-inset: "{colors.ink-900}"
  surface: "{colors.ink-850}"
  surface-raised: "{colors.ink-800}"
  rule: "{colors.ink-700}"
  rule-strong: "{colors.ink-600}"
  outline: "{colors.ink-600}"
  text: "{colors.chalk-50}"
  text-secondary: "{colors.chalk-200}"
  text-muted: "{colors.chalk-400}"
  text-dim: "{colors.chalk-400}"
  on-accent: "{colors.ink-950}"
  scrim: "{colors.ink-950}"
  alert-500: "#FF4A1C"
  canvas-light: "#F7F7F2"
  surface-inset-light: "#E9E9E2"
  surface-light: "#E1E1D9"
  surface-raised-light: "#FFFFFF"
  rule-light: "#D6D6CE"
  rule-strong-light: "#98988E"
  outline-light: "#6F6F67"
  text-light: "#050505"
  text-secondary-light: "#24241F"
  text-muted-light: "#55554F"
  accent-light: "#536B00"
  accent-fill-light: "#536B00"
  on-accent-light: "#F7F7F2"
typography:
  mega:
    fontFamily: Archivo
    fontSize: 52px
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: -0.045em
    fontVariation: '"wdth" 118, "wght" 800'
  numeral:
    fontFamily: Archivo
    fontSize: 64px
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: -0.05em
    fontVariation: '"wdth" 118, "wght" 800'
  display:
    fontFamily: Archivo
    fontSize: 44px
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: -0.035em
  h1:
    fontFamily: Archivo
    fontSize: 32px
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: -0.03em
  h2:
    fontFamily: Archivo
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.02em
  h3:
    fontFamily: Archivo
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  lead:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.42
  body:
    fontFamily: Archivo
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.12em
  micro:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 0.2em
rounded:
  none: 0px
  phone: 24px
  full: 9999px
spacing:
  hairline: 1px
  container-page: 1600px
  gutter-min: 16px
  gutter-max: 40px
  section-min: 96px
  section-max: 224px
  nav-block: 16px
  content-gap: 64px
  form-gap: 32px
  hit-target: 40px
components:
  page-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  page-canvas-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.text-light}"
  surface-panel:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 24px
  surface-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
  section-rule:
    backgroundColor: "{colors.rule}"
    height: 1px
  label:
    textColor: "{colors.text-dim}"
    typography: "{typography.micro}"
  availability-pill:
    textColor: "{colors.text}"
    typography: "{typography.micro}"
    rounded: "{rounded.none}"
    padding: 6px
  action-outline:
    textColor: "{colors.accent}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: 16px
  action-outline-hover:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
  channel-row:
    textColor: "{colors.text}"
    typography: "{typography.h3}"
    rounded: "{rounded.none}"
    padding: 24px
  channel-row-hover:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
  mobile-menu:
    backgroundColor: "{colors.accent-fill}"
    textColor: "{colors.on-accent}"
    typography: "{typography.h1}"
    rounded: "{rounded.none}"
    padding: 16px
  theme-toggle:
    textColor: "{colors.text-dim}"
    rounded: "{rounded.none}"
    size: 40px
  form-field:
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 8px
  modal-dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
  notification:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: 16px
  icon-action:
    textColor: "{colors.text-dim}"
    size: 16px
  media-well:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
  route-curtain:
    backgroundColor: "{colors.acid-800}"
    rounded: "{rounded.none}"
  outlined-numeral:
    textColor: "{colors.outline}"
    typography: "{typography.numeral}"
  strong-rule:
    backgroundColor: "{colors.rule-strong}"
    height: 1px
  field-error:
    textColor: "{colors.alert-500}"
    typography: "{typography.micro}"
  cursor-dot:
    backgroundColor: "{colors.accent-fill}"
    rounded: "{rounded.full}"
    size: 12px
---

## Overview

This is the implemented visual language of the Elmer Jacobo portfolio. It is a
**dark-default editorial/technical system**: an almost-black canvas, a visible
12-column hairline grid, oversized expanded grotesque headlines, compact monospace
metadata, and one acid-lime interaction signal. The result is intentionally spare,
high contrast, and structured like a technical portfolio rather than a card-based
product dashboard. An explicit light theme is also supported through semantic
runtime aliases; it preserves the same grid, typography, geometry, and interaction
grammar instead of becoming a separate visual identity.

The source of truth is the current code, especially `app/globals.css`,
`app/[locale]/layout.tsx`, `lib/motion.ts`, and the reusable components under
`components/`. This file records those choices; it does not introduce a new
palette, theme, layout, or component behavior. The token values above use the
closest fixed values where the implementation is fluid. The exact responsive
formulas are recorded below.

### System principles

- Treat the canvas and rules as part of the composition: the grid is visible,
  not merely a layout aid.
- Use the acid color as a single signal for action, activity, focus, and selected
  states; in light mode, use the darker semantic accent for text and the acid
  fill for surfaces. Neither is a general-purpose decoration color.
- Prefer oversized type, open space, and hard rules over rounded cards, gradients,
  or ornamental shadows.
- Keep content legible through tonal layering: canvas, raised panels, media wells,
  and cards differ subtly rather than through elevation effects.
- The product defaults to dark mode. `ThemeProvider` uses `next-themes` with
  `defaultTheme="dark"` and `enableSystem={false}`; `ThemeToggle` explicitly
  switches the `html` class between dark and light. `ThemedToaster` follows the
  resolved theme, while the calendar embed remains inside the same full-viewport
  dialog treatment.
- Use Lucide React for interface icons. Keep the custom EJ SVG mark separate from
  the icon system and preserve square line caps and miter joins.

## Colors

The palette is organized as two structural ramps, an acid interaction ramp, and
semantic aliases:

- **Acid / primary (`#D4FF3F`):** the interaction signal. It marks primary
  actions, active states, selected numerals, progress bars, availability, focus
  rings, hover fills, required markers, and key indices. `acid-300` through
  `acid-800` are supporting states; `acid-800` is reserved for the route curtain.
  `accent-fill` aliases `acid-500` so filled states remain stable across themes.
- **Ink:** the near-black structural ramp. `ink-950` (`#050505`) is the page
  canvas; `ink-900` (`#0A0A0A`) is the inset surface and artifact bed; `ink-850`
  (`#101010`) is used for media wells and surfaces; `ink-800` (`#161616`) is
  used for raised cards; `ink-700` (`#242424`) is the visible rule/grid color;
  and `ink-600` (`#3A3A3A`) is used for strong outlines and disabled data.
- **Chalk:** warm off-white text rather than pure white. `chalk-50`
  (`#F7F7F2`) is primary text, `chalk-200` (`#C9C9C2`) is supporting copy,
  `chalk-400` (`#8A8A82`) is metadata, and `chalk-600` (`#55554F`) is the
  quietest placeholder text.
- **Alert (`#FF4A1C`):** form validation/error feedback only. It must not become
  a second accent or be used for ordinary emphasis.
- **Light semantic set:** `html.light` maps canvas, surfaces, rules, outlines,
  text, and text-secondary to warm off-white values. Text accent becomes
  `#536B00` for contrast, while `accent-fill` remains `#D4FF3F`; `on-accent`
  remains near-black.

The semantic aliases are the values components should consume: `canvas`,
`surface-inset`, `surface`, `surface-raised`, `rule`, `rule-strong`, `outline`,
`text`, `text-secondary`, `text-muted`, `text-dim`, `accent`, `accent-fill`,
`on-accent`, `scrim`, and `alert-500`. Components should not bypass these aliases
for one-off colors. Opacity is used sparingly for overlays: the fixed navigation
uses the canvas at roughly 80% opacity with `backdrop-blur-md`, mobile and modal
dialogs use translucent scrims, and the toaster follows the active theme. The
placeholder `plate-bed` uses repeating 1px linear rules; it is a structural grid
texture, not a decorative color gradient.

## Typography

The type system uses two Google fonts loaded in `app/[locale]/layout.tsx`:

- **Archivo** is both `--font-display` and `--font-sans`. It carries the display
  voice, section headings, project titles, body copy, and lead copy. Its `wdth`
  axis is loaded explicitly. The `u-wide` utility uppercases text and applies
  `font-variation-settings: "wdth" 118, "wght" 800`.
- **Space Mono** is `--font-mono`. It is reserved for eyebrows, indices, metadata,
  navigation labels, technical facts, status readouts, and other compact utility
  text. These labels are uppercase with deliberate tracking. `u-label` uses the
  micro scale; `u-meta` uses the metadata scale.

The source defines the following fluid CSS sizes. The fixed `fontSize` values in
the front matter are the minimum/mobile anchors; the formulas below are the
normative implementation values:

| Token | Implemented CSS size | Typical use |
| --- | --- | --- |
| `mega` | `clamp(3.25rem, 12.5vw, 15rem)` | Two-line hero name |
| `numeral` | `clamp(4rem, 14vw, 16rem)` | Process and section numerals |
| `display` | `clamp(2.75rem, 7.5vw, 8rem)` | Case titles and next-project title |
| `h1` | `clamp(2rem, 4.6vw, 4.25rem)` | Section and major titles |
| `h2` | `clamp(1.625rem, 3vw, 2.75rem)` | Subsection and project titles |
| `h3` | `clamp(1.25rem, 1.9vw, 1.625rem)` | Row and component titles |
| `lead` | `clamp(1.0625rem, 1.5vw, 1.4375rem)` | Introductory and explanatory copy |
| `body` | `clamp(0.9375rem, 1vw, 1.0625rem)` | Default paragraph and form copy |
| `meta` | `0.8125rem` / 13px | Metadata rails and technical values |
| `micro` | `0.6875rem` / 11px | Eyebrows, indices, and labels |

Headlines use tight negative tracking and compressed line heights. Body and lead
copy use warmer chalk colors and constrained measure, generally between 24ch and
48ch. `text-wrap: balance` is applied to headings and `text-wrap: pretty` to
paragraphs. The style does not add italics, decorative font families, or a
light-theme typographic variant; theme switching changes semantic color aliases,
not typography.

## Layout

The page is built on a **12-column fluid grid**:

- `grid-page` is a 12-column CSS grid with `minmax(0, 1fr)` tracks, a maximum
  width of `100rem` / 1600px, centered margins, and a horizontal gutter of
  `clamp(1rem, 3.2vw, 2.5rem)` (16px to 40px). `page-pad` uses the same max-width
  and gutter without exposing columns.
- The visible `GridOverlay` is fixed outside the smooth-scroll content. It shows
  four guide divisions on narrow screens and all twelve divisions from `md` up.
- `rule-h` and the section borders use a 1px hairline. The main section rhythm is
  `clamp(6rem, 14vw, 14rem)` (96px to 224px), with smaller local gaps from the
  Tailwind spacing scale.

### Responsive behavior

The implementation is mobile-first and uses the existing Tailwind breakpoints:
`sm` (640px), `md` (768px), and `lg` (1024px). The behavior is structural, not
a separate visual theme:

- Below `md`, navigation links are replaced by a native full-viewport acid
  `<dialog>` mobile menu; content generally uses all 12 columns and stacks
  vertically.
- From `md`, the desktop navigation appears, the grid overlay exposes all columns,
  metadata and fact lists gain multiple columns, and form/stat layouts split.
- From `lg`, editorial compositions use asymmetric column spans: hero copy and
  artifact panels sit beside each other; project blocks alternate between centered
  10-column and paired 6-column placements; services, proof, and contact use
  dedicated text/data bands.
- The process section becomes a pinned horizontal track only at `min-width: 1024px`
  and when reduced motion is not requested. On smaller screens it remains a
  normal vertical sequence. This is an intentional usability rule, not a visual
  redesign.
- Images and placeholder plates use aspect ratios rather than fixed heights;
  `@container` sizing lets the generated project previews respond to their card
  width. Large display type uses viewport-based `clamp()` values instead of
  breakpoint-specific jumps.

Fixed viewport chrome (`Nav`, `GridOverlay`, `ScrollProgress`, `Cursor`, `Curtain`,
`Intro`, and `MobileMenu`) stays a sibling of the transformed smooth-scroll
content. The calendar booking dialog is portalled to `document.body` for the same
reason. Sticky animated content uses ScrollTrigger pinning instead of nesting
`position: fixed` inside the smooth wrapper. Native `scroll-behavior` remains
`auto`; ScrollSmoother owns scrolling on fine pointers, while touch keeps native
momentum with `smoothTouch: 0`.

## Elevation & Depth

This is a mostly flat system. Hierarchy comes from tonal layers and the hairline
grid rather than conventional card shadows:

1. **Canvas:** `ink-950` / `#050505`.
2. **Inset structural panels:** `ink-900` / `#0A0A0A`.
3. **Media wells and surfaces:** `ink-850` / `#101010`.
4. **Raised cards and dense data plates:** `ink-800` / `#161616`.
5. **Rules and outlines:** `ink-700` and `ink-600`.

Navigation, mobile-menu, and the calendar dialog use translucent canvas/scrim
layers plus `backdrop-blur-md` to separate fixed chrome from content. The project
preview's phone illustration is the exception to the flat rule: it uses a hard,
unblurred `12px 12px` acid offset shadow as a graphic accent, not as ambient
elevation. There are no soft card shadows, glow systems, or background gradients
in the application chrome.

## Shapes

The default shape language is **square and architectural**:

- Cards, panels, inputs, buttons, section rules, media plates, navigation, and
  dialog surfaces have no corner radius (`0px`). Borders are generally 1px.
- Perfect circles are reserved for small status dots, the custom cursor, and the
  pulsing availability marker (`rounded-full`).
- The only substantial radius is the decorative mobile-phone preview, which uses
  `1.5rem` / 24px with a 2px border. That radius belongs to the illustration, not
  to the surrounding UI system.
- Interface icons use Lucide React at compact sizes, generally 14px to 16px, with
  `strokeWidth={1.5}`, square line caps, and miter joins. The EJ brand mark is a
  separate 5px-stroke SVG. Focus outlines remain square with a 2px acid stroke
  and 3px offset; do not round focus rings.

## Components

The components below are the reusable visual vocabulary already present in the
repository. Preserve their roles and class-level relationships when composing new
content.

### Global chrome

- `components/layout/BrandMark.tsx` renders the EJ SVG mark with a 5px square
  stroke. The E is chalk and the J is acid; hover/focus swaps those two colors.
- `components/layout/Nav.tsx` provides the fixed translucent top bar, centered
  desktop links, locale switcher, theme toggle, and mobile-menu trigger. Controls
  use Space Mono labels and generous hit-area padding.
- `components/layout/ThemeProvider.tsx` and `ThemeToggle.tsx` provide explicit
  dark/light switching through `next-themes`; system preference is not followed.
- `components/layout/MobileMenu.tsx` is a native full-viewport acid dialog below
  `md`. Its numbered links use expanded Archivo and dark ink labels.
- `components/layout/GridOverlay.tsx` renders the fixed visible grid bed.
- `components/layout/Footer.tsx` combines a bordered marquee band with a three-part
  grid for local time, social links, and copyright.
- `components/layout/SkipLink.tsx` is an acid utility control that appears on
  keyboard focus. `ScrollProgress` is a 2px fixed rule at the top of the viewport.
  `ThemedToaster` keeps notifications aligned with the resolved theme.

### UI primitives

- `components/ui/Rule.tsx` is the `rule-h` 1px horizontal motif used by section
  headers and hero baselines.
- `components/ui/ArrowLink.tsx` is the shared text-link affordance. It uses a
  16px Lucide `ArrowUpRight`, acid hover color, and a small diagonal translate.
  Internal routes use `TransitionLink`; external routes open in a new tab.
- `components/ui/Pill.tsx` is the availability badge: a square outlined label,
  Space Mono micro type, and two-layer acid circular status dots, with the outer
  dot pulsing during the hero reveal.
- `components/ui/Numeral.tsx` is the oversized transparent outlined number used
  behind process steps and similar indices.
- `components/sections/SectionHeader.tsx` establishes the repeated section
  pattern: acid monospace index, expanded Archivo title, optional chalk lead, and
  a drawn hairline.

### Content and work

- `components/work/ProjectCard.tsx` is an editorial project block with a metadata
  rail, media plate, title, tagline, stack, and external project link. Its desktop
  placements alternate so the portfolio does not read as a uniform card table.
- `components/work/MediaPlate.tsx` provides a bordered `ink-850` media well with
  responsive aspect ratio and either a real image or `ProjectPreview` fallback.
- The home sections (`Hero`, `Projects`, `Experience`, `About`, `Services`, `Process`,
  `Principles`, `Proof`, and `Contact`) are composed from these primitives rather
  than from a separate card or theme library.

### Contact and forms

- `components/contact/Field.tsx` is a transparent field with a 1px rule and an
  acid underline that draws from left to right on focus. Error state swaps the
  rule/underline to alert red, adds a monospace error label, and uses a restrained
  horizontal shake when motion is allowed.
- `components/contact/ChannelRow.tsx` is a full-width bordered row. Hover/focus
  sweeps an acid fill across the row, inverts its text to ink, and moves the arrow
  diagonally.
- `ContactForm` uses a 32px vertical rhythm, two columns from `sm`, outline-acid
  submit styling, an acid 2px progress bar while sending, server-side validation,
  and themed toast feedback.
- `CalButton` opens the booking embed as a portalled full-viewport native dialog;
  `WhatsAppLink` and `CalButton` both reuse `ChannelRow`. Icon affordances are
  provided by Lucide (`MessageCircle`, `CalendarDays`, `Mail`, `X`, and arrows).

### Interaction and motion

The motion system reinforces the same visual grammar: clip-path reveals, rules that
draw from the left, acid fills that sweep across rows, arrows that travel
diagonally, and restrained vertical/opacity entrances. Shared motion vocabulary
lives in `lib/motion.ts`: `expo.out`/`power4.out` settles, `power3.out` sweeps,
`power3.in` retreats, and `expo.inOut` cuts. `DUR.fast`, `DUR.base`, and `DUR.slow`
are the shared duration bands. The custom cursor exists only for fine pointers and
enlarges over links and buttons; touch devices do not receive it. `ScrollProgress`
is a direct scroll-position readout and remains available in reduced-motion mode.

Every animated section branches on `prefers-reduced-motion` through shared queries
in `lib/motion.ts`; pointer hover tweens resolve to zero duration in reduced mode.
CSS also collapses transitions, marquees, and keyframe-like effects for reduced-
motion users. The process pin and horizontal track are not created in reduced mode,
and mobile never receives the desktop pin. The intro preloader skips itself for
reduced-motion users, while the scroll-progress bar remains because it is a
position readout, not a timed animation.

## Do's and Don'ts

- **Do** consume the semantic aliases (`canvas`, `surface-inset`, `surface`,
  `surface-raised`, `rule`, `outline`, `text`, `text-secondary`, `text-dim`,
  `accent`, and `accent-fill`) in component styles instead of inventing new
  colors.
- **Do** keep the acid color focused on the important action, active state,
  progress, focus, or index on a screen. Use the darker light-theme `accent` for
  text when contrast requires it; use `accent-fill` for filled states.
- **Do** use `grid-page`/`page-pad`, 1px rules, constrained text measures, and the
  existing `SectionHeader` pattern to preserve the editorial rhythm.
- **Do** use `u-wide` for display headlines and `u-label`/`u-meta` for technical
  labels; keep labels uppercase with their established tracking.
- **Do** preserve the 2px acid `:focus-visible` outline and keyboard-visible hover
  equivalents. Maintain readable contrast between chalk text and ink surfaces.
- **Do** keep all animation inside the existing reduced-motion branches, keep
  interactive feedback available as an instantaneous state change, and use
  ScrollTrigger pinning for content that must remain visually attached to a viewport.
- **Do** use Lucide React for interface icons with the established 1.5px square/miter
  treatment; reserve custom SVG work for the EJ brand mark and project artwork.
- **Don't** replace the explicit light theme with system-driven colors or create a
  second visual language; both themes share geometry, type, and motion rules.
- **Don't** add soft elevation shadows, a new rounded-card language, or a second
  accent color without changing the underlying product decision.
- **Don't** use `alert-500` red for emphasis; it belongs to form errors only.
- **Don't** replace the visible grid/rules with generic cards, gradients, or heavy
  borders. The existing `plate-bed` texture is the only repeated line texture.
- **Don't** set native `scroll-behavior: smooth`, put fixed chrome inside
  `#smooth-content`, or enable the desktop horizontal process pin on mobile or for
  reduced-motion users.
- **Don't** import a second font for one-off components. Archivo and Space Mono are
  the complete current type system.
