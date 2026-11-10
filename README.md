# MUSEUM OF TOMORROW

> Explore What Doesn't Exist. Yet.

An immersive, frontend-only 3D website for a fictional digital museum of speculative future inventions. Built with React, Vite, TypeScript, React Three Fiber and Framer Motion. No backend, API keys or paid services.

All exhibits, dates and ideas are **fictional speculative concepts**, not claims about real technologies.

---

## Validation status

Dependencies are installed, type checking passes cleanly (`tsc --noEmit`), and the production build completes without errors (`vite build` into `dist/`). All interactive features, responsive layouts (375px to 1920px), WebGL fallbacks, reduced motion, focus traps, and keyboard navigation have been tested and verified in real browser sessions.

What was verified:

- `npm run typecheck` passes with zero TypeScript errors.
- `npm run build` bundles the full production build into `dist/`.
- Runtime behavior, 3D WebGL scenes, procedural geometry, lighting, materials, and animations.
- Responsive layouts at 375px (mobile), 768px (tablet), 1280px (desktop), and 1920px (ultrawide) with zero horizontal overflow.
- Accessible focus management, keyboard navigation, and `prefers-reduced-motion` compliance.
- Bounded active WebGL context management preventing browser context exhaustion.

---

## Prerequisites

- Node.js 18.18+ (Node 20 or 22 recommended)
- npm 9+
- A browser with WebGL (any current Chrome, Edge, Firefox or Safari)

## Install and run

```bash
npm install
npm run dev        # starts Vite, usually at http://localhost:5173
```

## Other commands

```bash
npm run typecheck  # tsc --noEmit
npm run build      # type-check, then production build into dist/
npm run preview    # serve the production build locally
```

## Project structure

```
index.html
package.json
tsconfig.json
vite.config.ts
src/
  main.tsx                 entry; loads fonts and styles
  App.tsx                  page composition, skip link, MotionConfig
  components/
    Navbar.tsx             fixed nav, active-section state, mobile menu
    Hero.tsx               opening section
    HeroScene.tsx          3D hero artifact (R3F)
    Manifesto.tsx          editorial section + three principles
    ExhibitGallery.tsx     filters, asymmetrical grid, modal state
    ExhibitCard.tsx        card with 3D tilt and a small 3D scene
    ExhibitModal.tsx       accessible detail dialog (portal)
    ExhibitScene.tsx       the six procedural exhibit objects
    FutureTimeline.tsx     interactive timeline + detail panel
    FutureLab.tsx          local idea generator + copy button
    AboutMuseum.tsx        mission, approach, archive index, counters
    FinalCTA.tsx / CtaScene.tsx
    Footer.tsx
    SceneCanvas.tsx        lazy canvas + WebGL fallback + error boundary
    ParticleField.tsx      single-draw-call particle shell
    GlowSprite.tsx, Spin.tsx   shared 3D helpers
    Reveal.tsx             scroll reveal + split-word headline
    CountUp.tsx, ScrollProgress.tsx
  data/                    exhibits.ts, timeline.ts, futureIdeas.ts
  hooks/                   reduced motion, media query, in-view, pointer, active section
  lib/                     seeded random, WebGL check, glow texture
  styles/                  global.css, animations.css
```

## How the 3D works

- Every 3D element is a real React Three Fiber scene built from **procedural geometry**. There are no external models, textures or HDRI files.
- `SceneCanvas` wraps each canvas. It mounts the canvas only when the scene is near the viewport, switches `frameloop` to `demand` when it is offscreen, and caps the device pixel ratio (1.75 on desktop, 1.25 on mobile).
- If WebGL is unavailable, or a scene throws, `SceneCanvas` shows a CSS-only fallback so the page content stays usable.
- The hero uses one canvas. Each gallery card uses its own small canvas, plus one in the modal and one in the closing section. Canvases are lazy and paused offscreen to keep this affordable.
- Exhibit objects: crystalline orb, gyroscopic energy core, four-rotor drone, neural-network sculpture (instanced nodes + line segments), bioluminescent specimen under glass, nested quantum lattice.
- Shared geometry (a unit sphere) and a single shared glow texture are reused. Seeded randomness keeps procedural shapes identical between renders.
- No post-processing is used. Glow is faked with additive sprites to keep performance predictable.
- Reduced motion: scenes freeze their rotation, the pointer parallax is disabled, particle drift stops, and Framer Motion's `reducedMotion="user"` is applied app-wide.

## Accessibility notes

Semantic landmarks and heading order, skip link, visible focus styles, `aria-pressed` on filters, an `aria-live` region for filter results, and a modal with `role="dialog"`, a focus trap, Escape / arrow-key handling, scroll locking, and the page behind it marked `inert` while open. Canvases are `role="img"` with descriptive labels.

## Known limitations

- The archive ID and "EST. 2089" are fictional branding.
- The six speculative exhibit objects use procedural Three.js geometry; offscreen canvases are paused and unmounted to preserve WebGL contexts and GPU battery on mobile devices.
- The Orbitron / Space Grotesk / Inter fonts are bundled through `@fontsource-variable/*` packages, which add to the install size.
- The `inert` attribute is set directly on `#root`; very old legacy browsers ignore it, though the focus trap still applies.
- Both hero buttons ("ENTER THE MUSEUM" and "EXPLORE EXHIBITS") scroll to the exhibits section.

## Troubleshooting

- **Type errors on build:** check that `three` is `0.169.x`, `@react-three/fiber` is `8.x` and `@react-three/drei` is `9.x`. Fiber 9 requires React 19 and is not compatible with this setup.
- **Blank canvas / only a glow fallback:** WebGL may be disabled. Check `chrome://gpu` or enable hardware acceleration.
- **`Invalid hook call`:** run `npm ls react` and make sure only one copy of React is installed.
- **Fonts look different:** confirm the three `@fontsource-variable/*` packages installed; the CSS falls back to system fonts otherwise.
- **Slow on a laptop:** lower `dpr` in `SceneCanvas.tsx` and the particle counts in `HeroScene.tsx`.
