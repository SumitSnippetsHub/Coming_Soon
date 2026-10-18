"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { sequence, sequenceIntro, type SequenceStep, type SequenceTone } from "@/data/sequence";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useCanPin } from "@/hooks/use-can-pin";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const tones: Record<SequenceTone, { border: string; wash: string; glow: string; badge: string; fill: string; dot: string }> = {
  lavender: {
    border: "linear-gradient(135deg,#e4e1f3 0%,#ecebf1 45%,#d9d0fb 80%,#cfc4fb 100%)",
    wash: "linear-gradient(160deg,#fbfaff 0%,#ffffff 50%,#faf8ff 100%)",
    glow: "radial-gradient(closest-side,rgba(196,182,255,0.45),rgba(214,204,255,0.18) 55%,transparent)",
    badge: "#efebff",
    fill: "#c9bdfd",
    dot: "#8e7cf0",
  },
  peach: {
    border: "linear-gradient(135deg,#eeeaf0 0%,#f2e9e4 45%,#f7d9c6 85%,#e9dcef 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffdfb 50%,#fdf9f7 100%)",
    glow: "radial-gradient(closest-side,rgba(255,206,170,0.45),rgba(255,224,200,0.18) 55%,transparent)",
    badge: "#fdebe0",
    fill: "#f8c9ac",
    dot: "#e39a72",
  },
  mint: {
    border: "linear-gradient(135deg,#cfe9ea 0%,#e6eef1 40%,#eae7f5 75%,#d8d2f7 100%)",
    wash: "linear-gradient(160deg,#f8fdfd 0%,#ffffff 50%,#fafbff 100%)",
    glow: "radial-gradient(closest-side,rgba(176,226,226,0.5),rgba(200,226,246,0.2) 55%,transparent)",
    badge: "#e2f3f3",
    fill: "#a9dcdc",
    dot: "#4fb0b0",
  },
  pink: {
    border: "linear-gradient(135deg,#ecebf2 0%,#f0e8f1 45%,#ecd3ec 80%,#f6dccb 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffcfe 50%,#fdf8fb 100%)",
    glow: "radial-gradient(closest-side,rgba(236,190,236,0.45),rgba(214,200,255,0.18) 55%,transparent)",
    badge: "#fbe8f3",
    fill: "#efbddb",
    dot: "#d77fb3",
  },
};

/* Same swept bottom-right corner as the Solutions cards; inner radii are 1px smaller to keep the border even. */
const outerShape = "rounded-[22px] rounded-br-[80px_62px]";
const innerShape = "rounded-[21px] rounded-br-[79px_61px]";

const offsetWithin = (el: HTMLElement, root: HTMLElement) => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
};

function StepCard({
  step,
  state,
  tilt,
  badgeRef,
}: {
  step: SequenceStep;
  state: "static" | "active" | "idle";
  tilt: boolean;
  badgeRef: (el: HTMLSpanElement | null) => void;
}) {
  const tone = tones[step.tone];
  const card = useRef<HTMLElement>(null);
  const lit = state !== "idle";

  const onMove = (e: React.PointerEvent) => {
    const el = card.current;
    if (!tilt || !el || e.pointerType !== "mouse") return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) scale(1.01)`;
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <article
      ref={card}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative p-px transition-[transform,box-shadow] duration-500 will-change-transform",
        ease,
        outerShape,
        state === "active"
          ? "shadow-[0_44px_90px_-46px_rgba(60,50,120,0.5)]"
          : "shadow-[0_18px_40px_-30px_rgba(60,50,120,0.3)]",
      )}
      style={{ backgroundImage: tone.border }}
    >
      <div
        className={cn(
          "relative grid gap-y-4 sm:grid-cols-[auto_minmax(0,1fr)] gap-x-[clamp(0.9rem,1.8vw,1.9rem)] overflow-hidden px-[clamp(1.1rem,2.2vw,2.25rem)] pb-[clamp(1.6rem,2.8vw,2.9rem)] pt-[clamp(1.3rem,2.3vw,2.4rem)]",
          innerShape,
        )}
        style={{ backgroundImage: tone.wash }}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-[8%] -top-[45%] aspect-square w-[44%] blur-2xl transition-[transform,opacity] duration-700",
            ease,
            lit ? "scale-110 opacity-100" : "opacity-60",
          )}
          style={{ backgroundImage: tone.glow }}
        />
        <span
          ref={badgeRef}
          aria-hidden
          className="relative mt-[0.15em] grid size-[clamp(2.3rem,2.9vw,2.85rem)] place-items-center overflow-hidden rounded-full text-[clamp(0.8rem,0.9vw,0.92rem)] font-semibold text-[#222] ring-1 ring-black/[0.04]"
          style={{ backgroundColor: tone.badge }}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full transition-transform duration-700",
              ease,
              lit ? "scale-100" : "scale-0",
            )}
            style={{ backgroundColor: tone.fill }}
          />
          <span className="relative">{step.number}</span>
        </span>
        <div className="relative">
          <h3
            className="font-semibold leading-[1.08] tracking-[-0.04em]"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)" }}
          >
            <span className="sr-only">{step.number}. </span>
            {step.title}
          </h3>
          <p className="mt-[clamp(0.8rem,1.2vw,1.15rem)] max-w-[33rem] text-[clamp(1.05rem,1.25vw,1.25rem)] leading-[1.6] text-[#555]">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Sequence() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const badges = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [stops, setStops] = useState<number[]>([]);
  const enhanced = useCanPin(1024);
  const railReady = stops.length > 1;
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
      gsap.fromTo(
        "[data-seq-reveal]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-seq-reveal]", start: "top 85%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ol = list.current;
    if (!enhanced || !ol) return;
    const measure = () =>
      setStops(badges.current.map((b) => (b ? offsetWithin(b, ol) + b.offsetHeight / 2 : 0)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, [enhanced]);

  useEffect(() => {
    const ol = list.current;
    const bar = fill.current;
    const items = cards.current.filter((c): c is HTMLLIElement => Boolean(c));
    const head = items[0];
    const tail = items[items.length - 1];
    if (!enhanced || !ol || !bar || !head || !tail) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: head,
            start: "top 42%",
            endTrigger: tail,
            end: "top 42%",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      );
      // The last card whose top has crossed the line wins, so fast jumps never skip a step.
      const pick = () => {
        const line = window.innerHeight * 0.42;
        let index = 0;
        items.forEach((item, i) => {
          if (item.getBoundingClientRect().top <= line) index = i;
        });
        setActive(index);
      };
      ScrollTrigger.create({
        trigger: ol,
        start: "top bottom",
        end: "bottom top",
        onUpdate: pick,
        onRefresh: pick,
      });
    }, ol);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [enhanced, railReady]);

  const first = stops[0] ?? 0;
  const last = stops[stops.length - 1] ?? 0;
  const dotTone = tones[sequence[active]?.tone ?? "lavender"];

  return (
    <section
      id="process"
      ref={root}
      aria-labelledby="sequence-title"
      className="relative contour-paper text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 px-5 py-[clamp(4rem,9vw,7rem)] sm:px-[3.4vw] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-0">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:self-start">
          <h2
            id="sequence-title"
            data-seq-reveal
            className="font-semibold tracking-[-0.05em]"
            style={{ fontSize: "clamp(3rem, 5.5vw, 5.8rem)", lineHeight: 0.98 }}
          >
            <span className="block">{sequenceIntro.titleTop}</span>
            <span className="block pr-[0.05em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif, lineHeight: 1.08 }}>
              {sequenceIntro.titleBottom}
            </span>
          </h2>
          <p
            data-seq-reveal
            className="mt-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.45] tracking-[-0.015em] text-[#111]"
            style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.45rem)" }}
          >
            {sequenceIntro.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div data-seq-reveal className="mt-[clamp(1.5rem,2.6vw,2.5rem)]">
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="inline-flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)] whitespace-nowrap rounded-[11px] bg-[#111] py-[clamp(0.8rem,1.05vw,1rem)] pl-[clamp(1.05rem,1.35vw,1.35rem)] pr-[clamp(0.95rem,1.2vw,1.15rem)] text-[clamp(0.9rem,1.05vw,1.05rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-[clamp(0.95rem,1.1vw,1.1rem)]" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="relative lg:pb-[34vh] lg:pl-[clamp(2.25rem,3.4vw,3.5rem)] lg:pt-[20vh]">
          <ol ref={list} aria-label="Project sequence" className="relative flex flex-col gap-[clamp(1rem,1.6vw,1.5rem)]">
            {enhanced && railReady && (
              <span
                aria-hidden
                className="pointer-events-none absolute hidden lg:block -left-[clamp(1.6rem,2.4vw,2.4rem)] w-px bg-black/[0.08]"
                style={{ top: first, height: last - first }}
              >
                <span
                  ref={fill}
                  className="absolute inset-0 origin-top scale-y-0 bg-[linear-gradient(180deg,#8e7cf0,#e39a72_38%,#4fb0b0_70%,#d77fb3)]"
                />
                <span
                  className={cn("absolute left-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white transition-[top,background-color,box-shadow] duration-700", ease)}
                  style={{
                    top: (stops[active] ?? first) - first,
                    backgroundColor: dotTone.dot,
                    boxShadow: `0 0 0 5px ${dotTone.fill}66, 0 6px 16px -4px ${dotTone.dot}`,
                  }}
                />
              </span>
            )}
            {sequence.map((step, i) => {
              const state = !enhanced ? "static" : i === active ? "active" : "idle";
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  aria-current={enhanced && i === active ? "step" : undefined}
                  className={cn(
                    "transition-[opacity,transform] duration-700",
                    ease,
                    i % 2 === 1 && "lg:ml-[2.5rem]",
                    state === "idle" ? "scale-[0.97] opacity-[0.55]" : "scale-100 opacity-100",
                  )}
                >
                  <StepCard
                    step={step}
                    state={state}
                    tilt={enhanced}
                    badgeRef={(el) => {
                      badges.current[i] = el;
                    }}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
