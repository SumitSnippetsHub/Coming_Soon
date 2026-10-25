"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { DotHoverCard } from "@/components/motion/DotHoverCard";
import { CapabilityMark, StackMark } from "@/components/sections/technologies/marks";
import {
  technologyCapabilities,
  technologiesIntro,
  technologySpotlight,
  technologyStack,
} from "@/data/technologies";
import { prefersReducedMotion } from "@/lib/motion";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

function NightPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type Star = { x: number; y: number; r: number; a: number; p: number; s: number };
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        const k = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t * star.s + star.p);
        ctx.fillStyle = `rgba(230,236,255,${star.a * k})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = [];
      const count = Math.round((w * h) / 1400);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const band = Math.abs((x / w) * 0.7 + (y / h) * 0.9 - 0.95);
        const dense = band < 0.22 && Math.random() < 0.55;
        stars.push({
          x,
          y,
          r: dense ? 0.7 + Math.random() * 1.1 : 0.35 + Math.random() * 0.7,
          a: dense ? 0.35 + Math.random() * 0.5 : 0.12 + Math.random() * 0.4,
          p: Math.random() * Math.PI * 2,
          s: 0.4 + Math.random() * 1.2,
        });
      }
      draw(0);
    };

    const loop = (ms: number) => {
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (!reduceMotion) raf = requestAnimationFrame(loop);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(build) : null;
    observer?.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden rounded-[22px] bg-[#07080c] px-[clamp(1.35rem,2.2vw,1.9rem)] py-[clamp(1.4rem,2.2vw,1.85rem)] text-white">
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 78% 88%, rgba(150,170,220,0.22), transparent 58%), radial-gradient(ellipse 50% 40% at 18% 18%, rgba(90,110,170,0.16), transparent 50%)",
        }}
      />
      <div className="relative z-[1]">
        <h3
          className="font-semibold tracking-[-0.045em]"
          style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.85rem)", lineHeight: 1.08 }}
        >
          <span className="block">{technologySpotlight.titleTop}</span>
          <span className="block">{technologySpotlight.titleBottom}</span>
        </h3>
        <p className="mt-4 max-w-[28rem] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.55] text-white/72">
          {technologySpotlight.description}
        </p>
      </div>
      <Link
        href={technologySpotlight.cta.href}
        className="relative z-[1] mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.12] px-4 py-2 text-[0.92rem] font-medium text-white transition-colors duration-300 hover:bg-white/[0.2]"
      >
        {technologySpotlight.cta.label}
        <ArrowUpRight className="size-3.5" strokeWidth={2} />
      </Link>
    </div>
  );
}

export function Technologies() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-tech-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            delay: Number(el.dataset["techDelay"] ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={root}
      aria-labelledby="technologies-title"
      className="relative bg-white text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="mx-auto w-full px-5 pb-[clamp(4rem,9vw,8rem)] pt-[clamp(3.5rem,8vw,7rem)] sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
        <div data-tech-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p
              className="mb-4 font-medium tracking-[-0.02em] text-[#111]"
              style={{ fontSize: "clamp(1rem, 1.15vw, 1.2rem)" }}
            >
              {technologiesIntro.eyebrow}
            </p>
            <h2
              id="technologies-title"
              className="font-medium tracking-[-0.045em]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)", lineHeight: 0.98 }}
            >
              <span className="block">{technologiesIntro.titleTop}</span>
              <span
                className="block pr-[0.05em] font-normal italic tracking-[-0.035em]"
                style={{ fontFamily: serif }}
              >
                {technologiesIntro.titleBottom}
              </span>
            </h2>
          </div>
          <p className="max-w-[24rem] pb-[0.4em] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.5] text-[#111]">
            {technologiesIntro.description}
          </p>
        </div>

        <ul className="mt-[clamp(2.2rem,4.5vw,3.5rem)] grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3.5">
          {technologyCapabilities.map((item, i) => (
            <li key={item.title} data-tech-reveal data-tech-delay={i * 0.05} className="min-w-0">
              <DotHoverCard label={item.title} className="h-full min-h-[13.5rem] lg:min-h-[15rem]">
                <CapabilityMark name={item.icon} className="dot-hover-card-icon size-7" />
                <h3 className="dot-hover-card-title">{item.title}</h3>
              </DotHoverCard>
            </li>
          ))}
        </ul>

        <div className="mt-3.5 grid gap-3.5 lg:grid-cols-2 lg:items-center">
          <div data-tech-reveal data-tech-delay="0.08">
            <NightPanel />
          </div>
          <ul
            data-tech-reveal
            aria-label="Tools used in the work"
            className="stack-grid grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-[#e4e6ea] bg-[#e8eaee] sm:grid-cols-4"
          >
            {technologyStack.map((name) => (
              <li key={name} className="min-h-[6.5rem] bg-white lg:min-h-[7.25rem]">
                <DotHoverCard label={name} className="stack-cell h-full min-h-[6.5rem] lg:min-h-[7.25rem]">
                  <StackMark
                    name={name}
                    className="stack-mark size-9 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:size-10"
                  />
                  <span className="stack-name pointer-events-none absolute inset-x-2 bottom-[0.85rem] text-center text-[0.72rem] font-medium tracking-[-0.01em] text-[#111]">
                    {name}
                  </span>
                </DotHoverCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
