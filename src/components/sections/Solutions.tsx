"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { solutions, solutionsIntro, type Solution, type SolutionTone } from "@/data/solutions";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { ToolIcon } from "@/components/sections/solutions/ToolIcon";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const tones: Record<SolutionTone, { border: string; wash: string; glow: string }> = {
  lavender: {
    border: "linear-gradient(135deg,#e4e1f3 0%,#ecebf1 45%,#d9d0fb 80%,#cfc4fb 100%)",
    wash: "linear-gradient(160deg,#fbfaff 0%,#ffffff 45%,#fbf9ff 100%)",
    glow: "radial-gradient(closest-side,rgba(196,182,255,0.55),rgba(214,204,255,0.25) 55%,transparent)",
  },
  peach: {
    border: "linear-gradient(135deg,#eeeaf0 0%,#f2e9e4 45%,#f7d9c6 85%,#e9dcef 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffdfb 50%,#fbf9ff 100%)",
    glow: "radial-gradient(closest-side,rgba(255,206,170,0.6),rgba(255,224,200,0.25) 55%,transparent)",
  },
  mint: {
    border: "linear-gradient(135deg,#cfe9ea 0%,#e6eef1 40%,#eae7f5 75%,#d8d2f7 100%)",
    wash: "linear-gradient(160deg,#f8fdfd 0%,#ffffff 45%,#fbfaff 100%)",
    glow: "radial-gradient(closest-side,rgba(176,226,226,0.6),rgba(200,226,246,0.28) 55%,transparent)",
  },
  pink: {
    border: "linear-gradient(135deg,#ecebf2 0%,#f0e8f1 45%,#ecd3ec 80%,#f6dccb 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffcfe 50%,#fdf9fb 100%)",
    glow: "radial-gradient(closest-side,rgba(236,190,236,0.55),rgba(214,200,255,0.25) 55%,transparent)",
  },
};

/* Asymmetric radii approximate the reference's swept corner; inner radii are 1px smaller so the gradient border stays even. */
const shapes = {
  left: {
    outer: "rounded-[20px] rounded-br-[72px_56px]",
    inner: "rounded-[19px] rounded-br-[71px_55px]",
  },
  right: {
    outer: "rounded-[20px] rounded-tr-[44px_36px] rounded-br-[72px_56px]",
    inner: "rounded-[19px] rounded-tr-[43px_35px] rounded-br-[71px_55px]",
  },
};

function SolutionCard({ solution, side }: { solution: Solution; side: "left" | "right" }) {
  const tone = tones[solution.tone];
  const shape = shapes[side];

  return (
    <article
      className={cn(
        "group relative h-full p-px shadow-[0_18px_40px_-30px_rgba(60,50,120,0.35)] transition-[transform,box-shadow] duration-500 will-change-transform hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_34px_70px_-34px_rgba(60,50,120,0.45)]",
        ease,
        shape.outer,
      )}
      style={{ backgroundImage: tone.border }}
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden px-[clamp(1.25rem,1.9vw,1.9rem)] pb-[clamp(1.1rem,1.6vw,1.6rem)] pt-[clamp(1.3rem,2vw,2rem)]",
          shape.inner,
        )}
        style={{ backgroundImage: tone.wash }}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-[12%] -top-[38%] aspect-square w-[46%] blur-2xl transition-transform duration-700 group-hover:scale-110",
            ease,
          )}
          style={{ backgroundImage: tone.glow }}
        />
        <h3
          className="relative font-medium leading-[1.05] tracking-[-0.035em]"
          style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.6rem)" }}
        >
          {solution.title}
        </h3>
        <p className="relative mt-[clamp(0.9rem,1.3vw,1.3rem)] max-w-[26rem] text-[clamp(0.98rem,1.15vw,1.1rem)] leading-[1.5] text-[#222]">
          {solution.description}
        </p>
        <div className="relative mt-auto pt-[clamp(1.25rem,1.8vw,1.8rem)]">
          <div aria-hidden className="h-px bg-[linear-gradient(90deg,rgba(0,0,0,0.1),rgba(0,0,0,0.08)_70%,rgba(0,0,0,0))] md:mr-[12%]" />
          <ul className="mt-[clamp(0.85rem,1.2vw,1.15rem)] flex flex-wrap items-center gap-x-[clamp(1rem,1.7vw,1.6rem)] gap-y-2.5">
            {solution.tools.map((tool) => (
              <li key={tool} className="flex items-center gap-1.5 text-[11.5px] leading-none text-[#333] lg:text-[12px]">
                <span className={cn("flex transition-transform duration-500 group-hover:scale-[1.12]", ease)}>
                  <ToolIcon name={tool} />
                </span>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Solutions() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  const go = (href: string) => (e: React.MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash) return;
    e.preventDefault();
    scrollTo(document.querySelector(hash) ? hash : window.innerHeight);
  };

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-solutions-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: Number(el.dataset["solutionsDelay"] ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      aria-labelledby="solutions-title"
      className="relative bg-white text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="mx-auto w-full px-5 pb-[clamp(4rem,9vw,8rem)] pt-[clamp(2rem,4vw,4rem)] sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
        <div data-solutions-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="solutions-title"
            className="font-medium tracking-[-0.045em]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)", lineHeight: 0.98 }}
          >
            <span className="block">{solutionsIntro.titleTop}</span>
            <span className="block pr-[0.05em] font-normal italic tracking-[-0.035em]" style={{ fontFamily: serif }}>
              {solutionsIntro.titleBottom}
            </span>
          </h2>
          <p className="max-w-[24rem] pb-[0.4em] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.5] text-[#111]">
            {solutionsIntro.description}
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-5 md:grid-cols-2">
          {solutions.map((solution, i) => (
            <div key={solution.title} data-solutions-reveal data-solutions-delay={(i % 2) * 0.1}>
              <SolutionCard solution={solution} side={i % 2 === 0 ? "left" : "right"} />
            </div>
          ))}
        </div>

        <a
          href={site.primaryCta.href}
          onClick={go(site.primaryCta.href)}
          className="mt-[clamp(1.5rem,2.5vw,2.25rem)] inline-flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)] whitespace-nowrap rounded-[11px] bg-[#111] py-[clamp(0.75rem,1vw,0.95rem)] pl-[clamp(1rem,1.3vw,1.3rem)] pr-[clamp(0.9rem,1.15vw,1.1rem)] text-[clamp(0.85rem,1vw,1rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
        >
          {site.primaryCta.label}
          <ArrowUpRight className="size-[clamp(0.9rem,1.05vw,1.05rem)]" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
