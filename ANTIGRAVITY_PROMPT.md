# Antigravity Handoff: MUSEUM OF TOMORROW

You are picking up an existing React + Vite + TypeScript + React Three Fiber project. **Inspect, run, debug and visually refine it. Do not rewrite its architecture.**

## Important context

The code was authored without being able to install dependencies, so it has **never been built or run**. Treat the first job as verification. Do not assume it compiles.

Stack (keep these versions compatible): React 18, `three` 0.169, `@react-three/fiber` 8.x, `@react-three/drei` 9.x, `framer-motion` 11, `lucide-react` 0.460, plain CSS in `src/styles/`. No Tailwind, no GSAP, no backend.

## Step 1: Make it run

1. `npm install`
2. `npm run typecheck`, then `npm run build`
3. `npm run dev` and open the printed URL.
4. Fix any install, type, build or console errors with the **smallest possible change**. Prefer fixing types over loosening `tsconfig.json`. Do not remove features to silence errors.

## Step 2: Verify behavior in a real browser

Check each item and report pass/fail:

- All sections render in order: Hero, Manifesto, Exhibits, Timeline, Future Lab, About, Final CTA, Footer.
- Nav links and both hero buttons scroll to the right place. "REVISIT THE ARCHIVE" returns to `#exhibits`.
- Filters (ALL, TECHNOLOGY, ENERGY, SPACE, BIOLOGY) change the visible cards. Expected counts: 6, 3, 1, 1, 1.
- Every exhibit opens its own modal. Close button, Escape, backdrop click, prev/next buttons and left/right arrow keys all work. Focus stays inside the modal and returns to the card when it closes. The page behind cannot be scrolled or tabbed.
- Timeline: clicking each milestone updates the panel; the progress line fills up to the active item; works at 375px width.
- Future Lab: "GENERATE AN IDEA" shows different ideas on consecutive clicks; the copy button copies text (or shows "COPY UNAVAILABLE").
- No horizontal scrollbar at 375px, 768px, 1280px and 1920px widths.
- Emulate `prefers-reduced-motion: reduce`: rotation, particle drift, parallax and reveals are calm or absent, and everything is still readable and usable.
- Disable WebGL (or block the canvas): the page stays fully usable and shows the CSS fallback shapes.
- Browser console is clean (no errors, no React key or hook warnings).

## Step 3: Visual refinement (only after Steps 1 and 2 pass)

Take screenshots at desktop and mobile and refine, keeping the existing design system (tokens are in `:root` in `src/styles/global.css`):

- Hero: confirm the artifact sits well behind the headline, the title is legible over it, and the first screen feels cinematic. Adjust camera distance, glow opacity, or text shade if needed.
- Gallery: check the asymmetrical layout, card text contrast, and tilt feel. Make sure each of the six 3D objects reads clearly and is centered in its card.
- Modal: confirm the 3D stage and text panel fit small viewports without clipping.
- Typography and spacing: keep large editorial headlines, generous negative space, restrained glow. Do not add more neon, blur or borders.
- Performance: if frame rate drops, reduce particle counts or `dpr` in `SceneCanvas.tsx` before removing any scene.

## Constraints

- Keep the component structure and file names. Make focused edits.
- Do not add dependencies unless something is genuinely broken without them.
- Keep all content clearly fictional and speculative. Do not add real partnerships, statistics, social links or endorsements.
- Keep accessibility intact: semantic HTML, visible focus, ARIA on dialogs and filters, reduced-motion support.
- No placeholder sections, dead buttons or fake interactions.

## Report back

Summarize: what you ran, what failed and how you fixed it, which checklist items pass, and any remaining known issues. Be explicit about anything you could not verify.
