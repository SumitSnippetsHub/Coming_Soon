<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Frontend only (no backend/Cloud): ZYNOVATE spec forbids backend; contact uses mailto.
- All copy/assets live in src/data/*.ts; components only render data, so content is swappable.
- Smooth scroll = Locomotive Scroll v5 driven by gsap.ticker (autoStart false) inside SmoothScrollProvider; ScrollTrigger updates via scrollCallback.
- Scroll storytelling lives in section components using GSAP ScrollTrigger with reduced-motion and small-screen fallbacks, so content remains readable without pinning.
- Pinning gates on useCanPin (src/hooks) / canPin (src/lib/motion): ≥1024px, fine pointer, no reduced motion. Touch skips Locomotive and parallax.
- Animate transform/opacity/clip-path only; text on dark sections uses clay-light and background/60+ for AA contrast.
