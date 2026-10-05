"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const lines = ["Build.", "Launch.", "Evolve."];
const { hero } = site;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let removePointer = () => {};

    const ctx = gsap.context(() => {
      if (reduced) {
        return;
      }

      // ---------- Intro timeline ----------
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hero-bg]",
        { scale: 1.25, clipPath: "inset(8% 8% 8% 8% round 2rem)" },
        { scale: 1, clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 2 },
      )
        .from("[data-hero-line]", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.35)
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.9)
        .from("[data-hero-device]", { y: 80, opacity: 0, duration: 1.6, stagger: 0.15 }, 0.7);

      if (isTouchDevice()) return;

      // ---------- Scroll-driven parallax ----------
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-bg-img]", { scale: 1.18, yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-copy]", {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: { ...st, end: "60% top" },
      });
      gsap.to("[data-hero-laptop]", { yPercent: -18, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-phone]", { yPercent: -45, ease: "none", scrollTrigger: st });

      // ---------- Pointer parallax (devices and chips drift at different depths) ----------
      const q = gsap.utils.selector(el);
      const floats = [
        { sel: "[data-hero-float='laptop']", depth: 14 },
        { sel: "[data-hero-float='phone']", depth: 28 },
        { sel: "[data-hero-float='featured']", depth: -12 },
        { sel: "[data-hero-float='tracks']", depth: -18 },
      ]
        .map(({ sel, depth }) => {
          const target = q(sel)[0];
          if (!target) return null;
          const opts = { duration: 0.9, ease: "power3.out" };
          return { depth, x: gsap.quickTo(target, "x", opts), y: gsap.quickTo(target, "y", opts) };
        })
        .filter(Boolean) as { depth: number; x: (v: number) => void; y: (v: number) => void }[];

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        floats.forEach((f) => {
          f.x(nx * f.depth * 2);
          f.y(ny * f.depth * 2);
        });
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      removePointer = () => el.removeEventListener("pointermove", onMove);
    }, root);

    return () => {
      removePointer();
      ctx.revert();
    };
  }, []);

  // Only intercept in-page hash links. Real routes (/works, /contact) use normal navigation.
  const go = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollTo(document.querySelector(href) ? href : window.innerHeight);
  };

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-visible lg:h-[100svh] lg:min-h-0 lg:overflow-hidden"
    >
      {/* Background image + overlays */}
      <div data-hero-bg aria-hidden className="absolute inset-0 will-change-transform">
        <img
          data-hero-bg-img
          src={images.hero.src}
          alt=""
          width={images.hero.width}
          height={images.hero.height}
          className="h-full w-full object-cover will-change-transform"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/70 to-cream/40 lg:hidden" />
        <div className="absolute inset-0 bg-hero-fade" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-x-12 gap-y-10 px-6 pb-12 pt-28 lg:h-full lg:min-h-0 lg:grid-cols-[1.1fr_1fr] lg:gap-y-3 lg:px-10 lg:pb-12 lg:pt-24">
        {/* ---------------- Left: copy ---------------- */}
        <div data-hero-copy className="lg:min-h-0">
          <div data-hero-fade className="mb-7 flex flex-wrap items-center gap-3">
            <p className="eyebrow text-primary">{hero.eyebrow}</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-cream/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary/50 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {hero.status}
            </span>
          </div>

          <div className="relative">
            <h1
              id="hero-title"
              className="display text-display-xl relative z-10 text-foreground lg:text-[clamp(4rem,6vw,6.5rem)] lg:leading-[0.86]"
            >
              {lines.map((l, i) => (
                <span key={l} className="line-mask">
                  <span data-hero-line className={`block ${i === 2 ? "text-primary" : ""}`}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/85 md:text-xl lg:text-[1.1rem] lg:leading-snug"
          >
            {hero.lead}
          </p>
          <p
            data-hero-fade
            className="mt-4 max-w-md border-l-2 border-primary/40 pl-4 text-base leading-relaxed text-foreground/65 lg:text-sm lg:leading-snug"
          >
            {hero.support}
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {site.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={site.secondaryCta.href}
              onClick={go(site.secondaryCta.href)}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-4 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              {site.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* ---------------- Right: devices + floating chips ---------------- */}
        <div className="relative mx-auto w-full max-w-xl pb-10 lg:min-h-0 lg:max-w-none lg:scale-[0.92] lg:pb-0">
          <div aria-hidden className="relative z-10">
            <div data-hero-laptop>
              <div data-hero-device>
                <div data-hero-float="laptop">
                  <LaptopMockup image={images.amrut.dashboard} priority />
                </div>
              </div>
            </div>
            <div
              data-hero-phone
              className="absolute -bottom-10 right-0 w-[26%] sm:-right-4 lg:-bottom-16"
            >
              <div data-hero-device>
                <div data-hero-float="phone">
                  <PhoneMockup image={images.amrut.mobileHome} priority />
                </div>
              </div>
            </div>
          </div>

          {/* Featured build chip (links to Works) */}
          <div data-hero-device className="absolute -top-5 left-2 z-10 sm:-left-2 lg:-left-8">
            <div data-hero-float="featured">
              <a
                href={hero.featured.href}
                className="group flex items-center gap-3 rounded-2xl border border-foreground/10 bg-cream/65 px-4 py-3 shadow-soft backdrop-blur-xl transition-transform hover:-translate-y-0.5"
              >
                <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </span>
                <span className="text-left">
                  <span className="eyebrow block text-primary">{hero.featured.label}</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {hero.featured.title}
                    <span className="font-normal text-foreground/60"> · {hero.featured.text}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Two ways to work with us */}
          <div
            data-hero-device
            className="absolute -bottom-8 left-0 z-10 hidden md:block lg:-left-10"
          >
            <div data-hero-float="tracks">
              <div className="w-64 rounded-2xl border border-foreground/10 bg-cream/65 p-4 shadow-soft backdrop-blur-xl">
                <p className="eyebrow mb-3 text-muted-foreground">Two ways to build with us</p>
                <ul className="space-y-3">
                  {hero.tracks.map((t) => (
                    <li key={t.label}>
                      <span className="block text-sm font-semibold text-foreground">{t.label}</span>
                      <span className="block text-xs leading-snug text-foreground/60">
                        {t.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
