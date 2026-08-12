---
version: alpha
name: Elmer Jacobo Portfolio Design System
description: Existing dark editorial/technical visual system documented from the source code; this file is descriptive, not a redesign.
colors:
  primary: "#D4FF3F"
  accent: "{colors.primary}"
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
  surface: "{colors.ink-850}"
  rule: "{colors.ink-700}"
  text: "{colors.chalk-50}"
  text-dim: "{colors.chalk-400}"
  alert: "#FF4A1C"
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
  container-max: 1600px
  gutter-min: 16px
  gutter-max: 40px
  section-min: 96px
  section-max: 224px
  nav-padding: 16px
  content-gap: 64px
  form-gap: 32px
components:
  page-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  surface-panel:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: 24px
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
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: 16px
  action-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-950}"
  channel-row:
    textColor: "{colors.text}"
    typography: "{typography.h3}"
    rounded: "{rounded.none}"
    padding: 24px
  channel-row-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-950}"
  mobile-menu:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-950}"
    typography: "{typography.h1}"
    rounded: "{rounded.none}"
    padding: 16px
  cursor-dot:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: 12px
---

## Overview

This is the implemented visual language of the Elmer Jacobo portfolio. It is a
**dark editorial/technical system**: an almost-black canvas, a visible 12-column
hairline grid, oversized expanded grotesque headlines, compact monospace metadata,
and one acid-lime interaction color. The result is intentionally spare, high
contrast, and structured like a technical portfolio rather than a card-based
product dashboard.

The source of truth is the current code, especially `app/globals.css`,
`app/[locale]/layout.tsx`, and the reusable components under `components/`. This
file records those choices; it does not introduce a new palette, theme, layout,
or component behavior. The token values above use the closest fixed values where
the implementation is fluid. The exact responsive formulas are recorded below.

### System principles

- Treat the canvas and rules as part of the composition: the grid is visible,
  not merely a layout aid.
- Use the acid color as a single signal for action, activity, focus, and selected
  states; it is not a general-purpose decoration color.
- Prefer oversized type, open space, and hard rules over rounded cards, gradients,
  or ornamental shadows.
- Keep content legible through tonal layering: canvas, raised panels, media wells,
  and cards differ subtly rather than through elevation effects.
- The product is dark-only in the current implementation. `html` declares
  `color-scheme: dark`, the notification toaster uses `theme="dark"`, and the
  calendar embed is configured for the dark theme. There is no light-mode token
  set or theme switcher to document.

## Colors

The palette is organized as two ramps and two semantic roles:

- **Acid / primary (`#D4FF3F`):** the sole accent. It marks primary actions,
  active tabs, selected numerals, progress bars, availability, focus rings,
  hover fills, required markers, and key indices. `acid-300` through `acid-800`
  are supporting states; `acid-800` is reserved for the route curtain.
- **Ink:** the near-black structural ramp. `ink-950` (`#050505`) is the page
  canvas; `ink-900` (`#0A0A0A`) is used for raised sections and artifact panels;
  `ink-850` (`#101010`) is used for media wells and surfaces; `ink-800`
  (`#161616`) is used for cards; `ink-700` (`#242424`) is the visible rule/grid
  color; and `ink-600` (`#3A3A3A`) is used for subdued outlines and disabled data.
- **Chalk:** warm off-white text rather than pure white. `chalk-50`
  (`#F7F7F2`) is primary text, `chalk-200` (`#C9C9C2`) is supporting copy,
  `chalk-400` (`#8A8A82`) is metadata, and `chalk-600` (`#55554F`) is the
  quietest placeholder text.
- **Alert (`#FF4A1C`):** form validation/error feedback only. It must not become
  a second accent or be used for ordinary emphasis.

The semantic aliases are the values components should consume: `canvas`,
`surface`, `rule`, `text`, `text-dim`, and `accent`/`primary`. Opacity is used
sparingly for overlays: the fixed navigation uses the canvas at roughly 80%
opacity with backdrop blur, and modal backdrops use a translucent canvas. The
placeholder `plate-bed` uses repeating 1px linear rules; it is a structural grid
texture, not a decorative color gradient.

## Typography

The type system uses two Google variable fonts loaded in
`app/[locale]/layout.tsx`:

- **Archivo** is both `--font-display` and `--font-sans`. It carries the display
  voice, section headings, project titles, body copy, and lead copy. The `u-wide`
  utility uppercases the text and applies Archivo's expanded variable axis:
  `font-variation-settings: "wdth" 118, "wght" 800`.
- **Space Mono** is `--font-mono`. It is reserved for eyebrows, indices, metadata,
  navigation labels, technical facts, status readouts, and other compact utility
  text. These labels are uppercase with deliberate tracking.

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
light-theme typographic variant.

## Layout

The page is built on a **12-column fluid grid**:

- `grid-page` is a 12-column CSS grid with `minmax(0, 1fr)` tracks, a maximum
  width of `100rem` / 1600px, centered margins, and a horizontal gutter of
  `clamp(1rem, 3.2vw, 2.5rem)` (16px to 40px).
- `page-pad` uses the same maximum width and horizontal padding without exposing
  columns. Use it for full-width controls, dialogs, and mobile navigation.
- The visible `GridOverlay` is fixed outside the smooth-scroll content. It shows
  four guide divisions on narrow screens and all twelve divisions from `md` up.
- `rule-h` and the section borders use a 1px hairline. The main section rhythm is
  `clamp(6rem, 14vw, 14rem)` (96px to 224px), with smaller local gaps from the
  Tailwind spacing scale.

### Responsive behavior

The implementation is mobile-first and uses the existing Tailwind breakpoints:
`sm` (640px), `md` (768px), and `lg` (1024px). The behavior is structural, not
a separate visual theme:

- Below `md`, navigation links are replaced by a full-viewport acid mobile dialog;
  content generally uses all 12 columns and stacks vertically.
- From `md`, the desktop navigation appears, the grid overlay exposes all columns,
  metadata and fact lists gain multiple columns, and form/stat layouts split.
- From `lg`, editorial compositions use asymmetric column spans: hero copy and
  artifact panels sit beside each other; work cards alternate between centered
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
content. Sticky animated content uses ScrollTrigger pinning instead of nesting
`position: fixed` inside the smooth wrapper.

## Elevation & Depth

This is a mostly flat system. Hierarchy comes from tonal layers and the hairline
grid rather than conventional card shadows:

1. **Canvas:** `ink-950` / `#050505`.
2. **Raised structural panels:** `ink-900` / `#0A0A0A`.
3. **Media wells and surfaces:** `ink-850` / `#101010`.
4. **Cards and dense data plates:** `ink-800` / `#161616`.
5. **Rules and outlines:** `ink-700` and `ink-600`.

Navigation and the calendar dialog use translucent canvas layers plus
`backdrop-blur-md` to preserve the dark surface while separating fixed chrome from
content. The project preview's phone illustration is the exception to the flat
rule: it uses a hard, unblurred `12px 12px` acid offset shadow as a graphic accent,
not as ambient elevation. There are no soft card shadows, glow systems, or
background gradients in the application chrome.

## Shapes

The default shape language is **square and architectural**:

- Cards, panels, inputs, buttons, section rules, media plates, navigation, and
  dialog surfaces have no corner radius (`0px`). Borders are generally 1px.
- Perfect circles are reserved for small status dots, the custom cursor, and the
  pulsing availability marker (`rounded-full`).
- The only substantial radius is the decorative mobile-phone preview, which uses
  `1.5rem` / 24px with a 2px border. That radius belongs to the illustration, not
  to the surrounding UI system.
- Icons use square line caps and miter joins. Focus outlines remain square with a
  2px acid stroke and 3px offset; do not round focus rings.

## Components

The components below are the reusable visual vocabulary already present in the
repository. Preserve their roles and class-level relationships when composing new
content.

### Global chrome

- `components/layout/BrandMark.tsx` renders the EJ SVG mark with a 5px square
  stroke. The E is chalk and the J is acid; hover/focus swaps those two colors.
- `components/layout/Nav.tsx` provides the fixed translucent top bar, centered
  desktop links, locale switcher, and mobile-menu trigger. Controls use Space Mono
  labels and generous vertical hit-area padding.
- `components/layout/MobileMenu.tsx` is a full-viewport acid surface below `md`.
  Its numbered links use expanded Archivo and dark ink labels.
- `components/layout/GridOverlay.tsx` renders the fixed visible grid bed.
- `components/layout/Footer.tsx` combines a bordered marquee band with a three-part
  grid for local time, social links, and copyright.
- `components/layout/SkipLink.tsx` is an acid utility control that appears on
  keyboard focus. `ScrollProgress` is a 2px fixed rule at the top of the viewport.

### UI primitives

- `components/ui/Rule.tsx` is the `rule-h` 1px horizontal motif used by section
  headers and hero baselines.
- `components/ui/ArrowLink.tsx` is the shared text-link affordance. It uses a
  16px square/miter arrow, acid hover color, and a small diagonal translate.
  Internal routes use `TransitionLink`; external routes open in a new tab.
- `components/ui/Pill.tsx` is the availability badge: a square outlined label,
  Space Mono micro type, and an acid circular status dot.
- `components/ui/Numeral.tsx` is the oversized transparent outlined number used
  behind process steps and similar indices.
- `components/sections/SectionHeader.tsx` establishes the repeated section
  pattern: acid monospace index, expanded Archivo title, optional chalk lead, and
  a drawn hairline.

### Content and work

- `components/work/WorkCard.tsx` is a full-card link with metadata rail, media
  plate, title, arrow, tagline, and an acid rule drawn on hover/focus. Its desktop
  placements alternate so the portfolio does not read as a uniform card table.
- `components/work/MediaPlate.tsx` provides a bordered `ink-850` media well with
  responsive aspect ratio and either a real image or `ProjectPreview` fallback.
- `components/work/ProjectPreview.tsx` uses the same ink/rule/acid vocabulary to
  draw dashboard, operations, and offline-mobile placeholders with container-query
  type sizing.
- `components/work/CaseHeader.tsx`, `CaseBody.tsx`, `CaseMetrics.tsx`, and
  `NextProject.tsx` reuse the same indexed rules, constrained reading measure,
  oversized type, and acid-arrow links on case-study pages.
- The home sections (`Hero`, `Work`, `Now`, `About`, `Services`, `Process`,
  `Principles`, `Proof`, and `Contact`) are composed from these primitives rather
  than from a separate card or theme library.

### Contact and forms

- `components/contact/Field.tsx` is a borderless dark field with a 1px rule and
  an acid underline that draws from left to right on focus. Error state swaps the
  rule/underline to alert red and adds a monospace error label.
- `components/contact/ChannelRow.tsx` is a full-width bordered row. Hover/focus
  sweeps an acid fill across the row, inverts its text to ink, and moves the arrow
  diagonally.
- `ContactForm` uses a 32px vertical rhythm, two columns from `sm`, outline-acid
  submit styling, and an acid 2px progress bar while sending.
- `CalButton` opens the booking embed as a portalled full-viewport dark dialog;
  `WhatsAppLink` and `CalButton` both reuse `ChannelRow`.

### Interaction and motion

The motion system reinforces the same visual grammar: clip-path reveals, rules that
draw from the left, acid fills that sweep across rows, arrows that travel diagonally,
and restrained vertical/opacity entrances. Shared motion vocabulary lives in
`lib/motion.ts` (`expo.out`/`power4.out` settles, `power3.out` sweeps, and faster
retreats). The custom cursor exists only for fine pointers and enlarges over links
and buttons; touch devices do not receive it.

Every section branches on `prefers-reduced-motion`. CSS also collapses transitions,
marquees, and keyframe-like effects for reduced-motion users. The process pin and
horizontal track are not created in reduced mode. The scroll-progress bar remains
because it is a position readout, not a timed animation.

## Do's and Don'ts

- **Do** consume the semantic aliases (`canvas`, `surface`, `rule`, `text`,
  `text-dim`, `primary`) in component styles instead of inventing new colors.
- **Do** keep the acid color focused on the important action, active state,
  progress, focus, or index on a screen.
- **Do** use `grid-page`/`page-pad`, 1px rules, constrained text measures, and the
  existing `SectionHeader` pattern to preserve the editorial rhythm.
- **Do** use `u-wide` for display headlines and `u-label`/`u-meta` for technical
  labels; keep labels uppercase with their established tracking.
- **Do** preserve the 2px acid `:focus-visible` outline and keyboard-visible hover
  equivalents. Maintain readable contrast between chalk text and ink surfaces.
- **Do** keep all animation inside the existing reduced-motion branches and use
  ScrollTrigger pinning for content that must remain visually attached to a viewport.
- **Don't** add a light theme, a second accent color, soft elevation shadows, or a
  new rounded-card language without changing the underlying product decision.
- **Don't** use `alert` red for emphasis; it belongs to form errors only.
- **Don't** replace the visible grid/rules with generic cards, gradients, or heavy
  borders. The existing `plate-bed` texture is the only repeated line texture.
- **Don't** set native `scroll-behavior: smooth`, put fixed chrome inside
  `#smooth-content`, or enable the desktop horizontal process pin on mobile or for
  reduced-motion users.
- **Don't** import a second font for one-off components. Archivo and Space Mono are
  the complete current type system.
