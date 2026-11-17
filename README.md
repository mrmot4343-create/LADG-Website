# LADG-Website

Official LADG personal technology & innovation brand website.

**Tagline:** Lead the Code. Shape the Future.

## Stack

- React + Vite + TypeScript
- Tailwind CSS (custom design system)
- No 3D library yet — architecture is prepared for future cinematic scenes

## Phase 1 — Foundation (current)

- Responsive design system (typography, colors, 8px spacing, reusable components)
- Cinematic hybrid-digital hero with holographic avatar placeholder
- Responsive navigation (desktop + mobile)
- Focus Areas, Approach, and Footer sections
- Placeholder LADG logo at `public/logo.svg` — replace with the official asset when provided

## Structure

```
src/
  components/   # Navbar, Hero, HolographicAvatar, FocusAreas, Approach, Footer, Logo
  App.tsx       # Page composition
  main.tsx      # Entry
  index.css     # Design tokens + Tailwind layers
public/
  logo.svg      # LADG logo (replace with official asset)
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run typecheck` — type-check only
