# MR. PAL — care staff & home help, Mumbai

A marketing site for MR. PAL, a placement agency that finds, verifies and places
caregivers, patient attendants, home nurses and home helpers into homes across
Mumbai. It is a static front end: React + Vite + Tailwind, with an in-browser
content editor at `/admin` for demo purposes.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`, `strict` enabled |

## Design system

The visual direction is a **service request docket** — a well-printed form, not a
SaaS template. Warm paper stock, hairline rules, numbered fields, margin
metadata. Radius is 2px and never a pill; motion is a single idea (things
settle); glassmorphism is absent.

Everything is driven by tokens in `src/index.css`:

- **Palette** — one scale: `paper`, `paper-raised`, `paper-sunk`, `ink`,
  `forest`, `terracotta`, `sand`, `rule`. **No hex literals exist in any JSX.**
- **Type** — DM Serif Display for headings, Manrope for everything else, Caveat
  as an annotation hand. The ramp (`text-display` … `text-meta`) is fluid via
  `clamp()`, so there are no one-off sizes like `text-[70px]`.
- **Radius** — `xs` through `3xl` are 1–8px. `rounded-full` is reserved for
  things that are genuinely round.
- **Motion** — `--ease-settle`, plus `animate-fade-rise` and `animate-rule-draw`.
  Everything collapses under `prefers-reduced-motion`.

## The Service Request Docket

`src/components/ServiceRequestDocket.tsx` is the primary conversion. Four
numbered questions, **one per step** — the step slides in from the right while
the previous one leaves to the left, so progress is something you watch rather
than read. Choosing an option advances on its own; the Send button appears on
the last step.

Off-screen steps are marked `inert`, so they cannot be tabbed into or announced
out of order. A permanent **call option** sits below the controls — anyone who
would rather not fill anything in is never trapped by the form to reach a phone
number.

It uses real `<input type="radio">` elements inside `<fieldset>`, so it is
keyboard operable and screen-reader correct, not a clickable `<div>`.

## Pages

| Route | Page |
|---|---|
| `/` | Home — index of services, docket, figures, roster |
| `/services` | Full catalogue of every service |
| `/services/:slug` | One service in detail |
| `/about`, `/team`, `/team/:slug`, `/book-a-call`, `/terms` | Supporting pages |
| `/admin` | Demo content editor (localStorage only) |

## Content

| Path | What it holds |
|---|---|
| `src/data/defaultData.ts` | All copy, services, people, team, figures, docket fields |
| `src/context/SiteContext.tsx` | Holds it in React state, persists to `localStorage` |
| `src/components/AdminDashboard.tsx` | The `/admin` editor — a demo, not production CMS |

**Placeholders to replace before launch:** the numbers in `DEFAULT_FIGURES`
(48 hrs, 4 checks, 12 areas, 0 long contracts) and the contact details in
`DEFAULT_SETTINGS`. The figures are deliberately numeric and easy to find.

## Images

Photographs are the original JPEGs in `src/assets/images/`, unmodified, and are
all rendered through `src/components/Photo.tsx`. That component always sets
`width`/`height` (so the layout does not jump once the file arrives) and lazy-loads
everything below the fold.

**These files are heavy — 8 MB in total, and the hero alone is 813 KB.** That is
a deliberate trade for keeping the supplied images exactly as they were. If load
speed ever matters more than that, converting them to WebP at 400w/900w takes
the total to 0.84 MB and the hero to 24 KB on mobile, with no visible difference.
That was measured, not estimated; it is the one piece of work deliberately left
undone here.

Images must be **imported** in `src/data/images.ts`, never referenced as a raw
`/src/assets/...` string — the raw form resolves during `npm run dev` but 404s
in a production build.

## Notes and known limits

- There is **no backend.** The call-request form composes a message and hands it
  to WhatsApp rather than claiming a request was received.
- `/admin` is a demo. It writes to `localStorage` and is not a real CMS.
- `verify` checks and the stated limits describe what the business must actually
  be able to honour. Edit them to match what MR. PAL really does.