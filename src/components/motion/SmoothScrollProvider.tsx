import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Ctx = { scrollTo: (target: string | number | HTMLElement) => void };
const SmoothScrollContext = createContext<Ctx>({ scrollTo: () => {} });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let tick: ((t: number) => void) | null = null;

    import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
      if (cancelled || instance.current) return; // StrictMode-safe
      const loco = new LocomotiveScroll({
        autoStart: false,
        lenisOptions: { lerp: 0.09, smoothWheel: true },
        scrollCallback: () => ScrollTrigger.update(),
      });
      instance.current = loco;
      tick = (time: number) => loco.lenisInstance?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      if (tick) gsap.ticker.remove(tick);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    if (instance.current) {
      instance.current.scrollTo(target, { duration: 1.4, offset: 0 });
      return;
    }
    if (typeof target === "number") window.scrollTo({ top: target });
    else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView();
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
  );
}
