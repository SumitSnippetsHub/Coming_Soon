# ZYNOVATE website

Marketing site for ZYNOVATE — *Build. Launch. Evolve.*

It is frontend only. There is no backend, database, auth, or Supabase. The contact form validates in the browser and opens the visitor's email app with a prepared `mailto:` message.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) with React 19 and TypeScript
- Tailwind CSS v4 (tokens in `src/styles.css`)
- GSAP ScrollTrigger for scroll storytelling, with Locomotive Scroll v5 for smooth scrolling on desktop
- Radix accordion (FAQ), lucide icons
- Vitest and Testing Library

## Development

You need Node.js 20 or newer and npm.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm test           # unit tests
npx tsc --noEmit   # type check
```

Set the production domain before deploying. It is used for the canonical URL, Open Graph URLs and JSON-LD:

```sh
# .env.local (or your host's environment settings)
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

Also replace `https://www.example.com` in `public/robots.txt` and `public/sitemap.xml`.

## Project layout

```
src/
  app/                 layout (metadata, fonts), page (JSON-LD), error pages
  components/
    home/HomePage.tsx  section order
    sections/          one file per section
    layout/            navbar, footer, scroll progress
    mockups/           laptop / phone / browser frames
    motion/            smooth scroll provider, magnetic link
  data/                ALL copy, links and image references
  hooks/use-can-pin.ts decides when pinned scroll scenes are allowed
  lib/motion.ts        reduced-motion and touch detection
  styles.css           colors, fonts, utilities
public/
  brand/               logo
  projects/amrut/      case-study screenshots
  favicon.png, robots.txt, sitemap.xml
```

Components only render data. To change what the site says or shows, edit `src/data/*.ts` and leave the components alone.

## Replacing content

### Logo and favicon

1. Replace `public/brand/zynovate-logo.png` (a transparent PNG works best).
2. Update `logo.width` and `logo.height` in `src/data/site.ts` to the new file's pixel size.
3. Replace `public/favicon.png` with a square mark (64×64 or larger). The Apple touch icon uses the logo file.

### Screenshots

Case-study screenshots live in `public/projects/amrut/` and are listed in `src/data/images.ts` under `amrut`. For each image:

- keep the file name or update `src`
- set `width` and `height` to the real pixel size (this prevents layout shift)
- write an `alt` that describes what the screen shows

To add the optional screenshots, drop them in the same folder and add entries to `images.amrut`:

| Key (suggested)     | File                                  |
| ------------------- | ------------------------------------- |
| `seoReport`         | `seo-analysis-report.png`             |
| `companyProfile`    | `company-profile.png`                 |
| `analyticsGsc`      | `analytics-gsc.png`                   |
| `mobileDashboard`   | `mobile-dashboard.png`                |

Then reference them from `src/data/projects.ts` (for example as the `screenshot` of a feature group).

The hero, "Why" and CTA backgrounds, plus the Industries photos, are Unsplash placeholders marked `isPlaceholder: true` in `src/data/images.ts` and `src/data/industries.ts`. The Open Graph image (`images.og`) is the hero photo cropped to 1200×630. Swap it when the hero changes.

### Projects

Edit `src/data/projects.ts`. The first project without `isPlaceholder` becomes the featured case study. Entries with `isPlaceholder: true` render as "Coming soon" cards. Remove that flag only once the project is real and you have permission to show it.

### Contact details

Edit `src/data/contact.ts`: `email`, `phone`, `location`, the project types and budget ranges. Set `isPlaceholder: false` when the details are real. This removes the on-page placeholder notice and adds email and phone to the JSON-LD.

The form sends to `contact.email` through `mailto:`. Nothing is stored on a server.

### Social links

Edit `src/data/social.ts`. Give each entry a real `href` and remove `isPlaceholder`. Placeholder links render as plain text and are left out of JSON-LD `sameAs`.

### Testimonials

Edit `src/data/testimonials.ts`. Replace each placeholder with a real quote and the person's role (and name, only with their consent), and remove `isPlaceholder`. When none are placeholders, the section heading switches to the real-testimonial title automatically.

### Other copy

| Section            | File                       |
| ------------------ | -------------------------- |
| Hero, nav, SEO     | `src/data/site.ts`         |
| About              | `src/data/about.ts`        |
| Services           | `src/data/services.ts`     |
| Products           | `src/data/products.ts`     |
| Technologies       | `src/data/technologies.ts` |
| Why ZYNOVATE       | `src/data/whyUs.ts`        |
| Process            | `src/data/process.ts`      |
| Industries         | `src/data/industries.ts`   |
| FAQ                | `src/data/faqs.ts`         |
| CTA banner         | `src/data/cta.ts`          |

### Colors

All colors are tokens in `src/styles.css` under `:root` (`--cream`, `--brown`, `--espresso`, `--clay`, `--clay-light`, `--sand`, `--blush`, `--taupe`). Change them there, and nowhere else. Keep body text at 4.5:1 contrast or better. `--taupe` (muted text) and `--clay-light` (accent text on dark sections) are tuned for that. The brand rule is no gold, amber or yellow.

### Fonts

Fonts load through `next/font/google` in `src/app/layout.tsx`, which self-hosts them at build time:

- **Mona Sans** (variable weight and width) → `--font-mona`, used for `font-sans` and `font-display`
- **JetBrains Mono** → `--font-jetbrains`, used for `font-mono`

To change a font, swap the import in `layout.tsx` and keep the same `variable` name, or update the `--font-*` tokens at the top of `src/styles.css`.

## Motion and accessibility notes

- Pinned and scrubbed scenes (Services rail, Featured Work, Why, Process) only run on devices with a fine pointer, at least 1024px wide, and without `prefers-reduced-motion`. Everywhere else the same content renders as static, stacked layouts. See `src/hooks/use-can-pin.ts`.
- Smooth scrolling is off on touch devices and with reduced motion. Native scrolling is used instead.
- `ScrollTrigger.refresh()` runs after every image load, after web fonts are ready, and on window `load`.
- Animations use only `transform`, `opacity` and `clip-path`.
- There is one `h1` (the hero), a skip link, labelled landmarks and sections, a keyboard-trapped mobile menu that returns focus, and inline form errors that move focus to the first invalid field.

## Launch asset checklist

- [ ] **Written permission from the Amrut.ai client** to show the product, its name and screenshots as ZYNOVATE work
- [ ] Optional Amrut.ai screenshots added to `public/projects/amrut/`:
  - [ ] `seo-analysis-report.png`
  - [ ] `company-profile.png`
  - [ ] `analytics-gsc.png`
  - [ ] `mobile-dashboard.png`
- [ ] Real contact details in `src/data/contact.ts` (email, phone, location), `isPlaceholder: false`
- [ ] Real social profile URLs in `src/data/social.ts`
- [ ] Real testimonials with consent in `src/data/testimonials.ts`
- [ ] **License check for every Unsplash image** (hero, why, CTA, OG, the 10 Industries photos), or replace them with owned photography
- [ ] Replace the placeholder parallax layers in `public/parallax/` (see `src/data/parallax.ts`, `isPlaceholder: true`) with owned artwork before launch
- [ ] Production domain set in `NEXT_PUBLIC_SITE_URL`, `public/robots.txt` and `public/sitemap.xml`
- [ ] Favicon and logo final
