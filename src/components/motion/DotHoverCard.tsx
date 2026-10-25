"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Speck = {
  x: number;
  y: number;
  c: readonly [number, number, number];
  r: number;
  a: number;
  p: number;
  s: number;
};

const GREYS = [
  [70, 70, 70],
  [110, 110, 110],
  [150, 150, 150],
] as const;
const BLUES = [
  [120, 195, 235],
  [150, 210, 240],
] as const;
const STEP = 7;

function pick(palette: readonly (readonly [number, number, number])[]) {
  return palette[(Math.random() * palette.length) | 0] ?? ([110, 110, 110] as const);
}

export function DotHoverCard({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Speck[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let leaveTimer = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const k = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * d.s + d.p);
        ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${d.a * k})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      w = card.clientWidth;
      h = card.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cx = w / 2;
      const cy = h / 2;
      for (let y = STEP / 2; y < h; y += STEP) {
        for (let x = STEP / 2; x < w; x += STEP) {
          const d = Math.hypot(x - cx, y - cy) / (w / 2);
          const chance = 0.18 + 0.5 * Math.min(1, d * 1.1);
          if (Math.random() > chance) continue;
          const blue = Math.random() < 0.3;
          dots.push({
            x,
            y,
            c: blue ? pick(BLUES) : pick(GREYS),
            r: Math.random() < 0.15 ? 1.5 : 1,
            a: 0.25 + Math.random() * 0.6,
            p: Math.random() * Math.PI * 2,
            s: 0.8 + Math.random() * 1.6,
          });
        }
      }
      draw(0);
    };

    const loop = (ms: number) => {
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && !reduceMotion) raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      draw(0);
    };

    const onLeave = () => {
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => {
        if (!card.matches(":hover") && !card.matches(":focus-visible")) stop();
      }, 400);
    };

    const onEnter = () => {
      window.clearTimeout(leaveTimer);
      start();
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("focus", onEnter);
    card.addEventListener("blur", stop);

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(build) : null;
    observer?.observe(card);
    build();

    return () => {
      window.clearTimeout(leaveTimer);
      stop();
      observer?.disconnect();
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("focus", onEnter);
      card.removeEventListener("blur", stop);
    };
  }, []);

  return (
    <article ref={cardRef} aria-label={label} className={cn("dot-hover-card", className)}>
      <canvas ref={canvasRef} aria-hidden />
      {children}
    </article>
  );
}
