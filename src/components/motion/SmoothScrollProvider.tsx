"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export { prefersReducedMotion } from "@/lib/motion";

type Ctx = { scrollTo: (target: string | number | HTMLElement) => void };
const SmoothScrollContext = createContext<Ctx>({ scrollTo: () => {} });
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let refreshTimer = 0;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    // Lazy images change section heights after triggers are measured.
    const onAssetLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) scheduleRefresh();
    };
    document.addEventListener("load", onAssetLoad, true);
    window.addEventListener("load", scheduleRefresh);
    document.fonts?.ready.then(scheduleRefresh);

    let cancelled = false;
    let tick: ((t: number) => void) | null = null;

    // Native scrolling on touch devices and for reduced motion.
    if (!prefersReducedMotion() && !isTouchDevice()) {
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
    }

    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
      document.removeEventListener("load", onAssetLoad, true);
      window.removeEventListener("load", scheduleRefresh);
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
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    if (typeof target === "number") window.scrollTo({ top: target, behavior });
    else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior });
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
  );
}
