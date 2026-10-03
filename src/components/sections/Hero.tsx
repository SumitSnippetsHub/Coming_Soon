import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const lines = ["Build.", "Launch.", "Evolve."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) return;
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
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-bg-img]", { scale: 1.18, yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-copy]", { opacity: 0, y: -80, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
      gsap.to("[data-hero-laptop]", { yPercent: -18, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-phone]", { yPercent: -45, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(document.querySelector(href) ? href : 0);
  };

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-hidden"
    >
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

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_1fr] lg:px-10">
        <div data-hero-copy>
          <p data-hero-fade className="eyebrow mb-6 text-primary">
            Technology & software company
          </p>
          <h1 id="hero-title" className="display text-display-xl text-foreground">
            {lines.map((l, i) => (
              <span key={l} className="line-mask">
                <span data-hero-line className={`block ${i === 2 ? "text-primary" : ""}`}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-hero-fade
            className="mt-8 max-w-md text-lg font-light leading-relaxed text-foreground/75 md:text-xl"
          >
            {site.description}
          </p>
          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
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
          <p data-hero-fade className="eyebrow mt-12 text-muted-foreground">
            {site.trustLine.join("  ·  ")}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden>
          <div data-hero-laptop>
            <div data-hero-device>
              <LaptopMockup image={images.amrut.dashboard} priority />
            </div>
          </div>
          <div
            data-hero-phone
            className="absolute -bottom-10 right-0 w-[26%] sm:-right-4 lg:-bottom-16"
          >
            <div data-hero-device>
              <PhoneMockup image={images.amrut.mobileHome} priority />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        onClick={go("#about")}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted-foreground md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
