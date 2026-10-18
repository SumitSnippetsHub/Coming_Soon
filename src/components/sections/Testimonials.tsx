"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials, testimonialsIntro } from "@/data/testimonials";
import { prefersReducedMotion } from "@/lib/motion";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";
const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const LOOP_SECONDS = 52;

const tones = [
  {
    border: "linear-gradient(135deg,#e4e1f3 0%,#ecebf1 45%,#d9d0fb 80%,#cfc4fb 100%)",
    wash: "linear-gradient(165deg,#f4f0ff 0%,#ffffff 52%,#faf8ff 100%)",
    glow: "radial-gradient(closest-side,rgba(196,182,255,0.55),rgba(214,204,255,0.2) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#eeeaf0 0%,#f2e9e4 45%,#f7d9c6 85%,#e9dcef 100%)",
    wash: "linear-gradient(165deg,#fff5ee 0%,#ffffff 52%,#fffaf6 100%)",
    glow: "radial-gradient(closest-side,rgba(255,206,170,0.55),rgba(255,224,200,0.2) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#cfe9ea 0%,#e6eef1 40%,#eae7f5 75%,#d8d2f7 100%)",
    wash: "linear-gradient(165deg,#f0fbf7 0%,#ffffff 52%,#f7fdfb 100%)",
    glow: "radial-gradient(closest-side,rgba(176,226,210,0.55),rgba(200,226,220,0.2) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#ecebf2 0%,#f0e8f1 45%,#ecd3ec 80%,#f6dccb 100%)",
    wash: "linear-gradient(165deg,#fff2f7 0%,#ffffff 52%,#fff8fb 100%)",
    glow: "radial-gradient(closest-side,rgba(236,190,214,0.5),rgba(244,200,220,0.18) 55%,transparent)",
  },
];

function splitTitle(title: string) {
  const match = /^(.*)\s+(say\.?)$/i.exec(title.trim());
  if (!match?.[1] || !match[2]) return { top: title, bottom: "" };
  return { top: match[1], bottom: match[2] };
}

function splitRole(role: string) {
  const [name, ...rest] = role.split(" · ");
  return { name: name ?? role, company: rest.join(" · ") };
}

function wrapOffset(value: number, half: number) {
  if (!(half > 0)) return 0;
  let next = value % half;
  if (next > 0) next -= half;
  return next;
}

function Stars() {
  return (
    <span aria-hidden className="flex items-center gap-[3px] text-[#F59E0B]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-[clamp(16px,1.4vw,22px)] fill-current">
          <path d="m10 1.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

function QuoteCard({
  item,
  index,
  className,
  hidden,
}: {
  item: Testimonial;
  index: number;
  className?: string;
  hidden?: boolean;
}) {
  const tone = tones[index % tones.length] ?? tones[0]!;
  const { name, company } = splitRole(item.role);

  return (
    <figure
      aria-hidden={hidden || undefined}
      className={cn(
        "group relative h-full shrink-0 rounded-[22px] p-px shadow-[0_18px_40px_-28px_rgba(70,55,130,0.45)] transition-[transform,box-shadow] duration-500 will-change-transform hover:-translate-y-1.5 hover:shadow-[0_30px_54px_-26px_rgba(70,55,130,0.55)]",
        ease,
        className,
      )}
      style={{ backgroundImage: tone.border }}
    >
      <div
        className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[21px] px-[clamp(1.4rem,1.8vw,2rem)] py-[clamp(1.35rem,1.7vw,1.85rem)]"
        style={{ backgroundImage: tone.wash }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[18%] -top-[42%] aspect-square w-[58%] blur-2xl"
          style={{ backgroundImage: tone.glow }}
        />
        <span
          aria-hidden
          className="relative block font-normal italic leading-[0.7] text-[#111]"
          style={{ fontFamily: serif, fontSize: "clamp(4rem, 4.6vw, 5.4rem)" }}
        >
          “
        </span>
        <blockquote
          className="relative mt-4 flex-1 text-[#111] leading-[1.55]"
          style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)" }}
        >
          {item.quote}
        </blockquote>
        <figcaption className="relative mt-8">
          <span
            className="block font-semibold tracking-[-0.02em] text-[#111]"
            style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}
          >
            {name}
          </span>
          {company ? (
            <span className="mt-1 block text-[#444]" style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.08rem)" }}>
              {company}
            </span>
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}

type RowKey = "a" | "b";

function ReviewsMarquee({ rowA, rowB }: { rowA: Testimonial[]; rowB: Testimonial[] }) {
  const root = useRef<HTMLDivElement>(null);
  const trackA = useRef<HTMLDivElement>(null);
  const trackB = useRef<HTMLDivElement>(null);
  const offsets = useRef({ a: 0, b: 0 });
  const paused = useRef(false);
  const hovering = useRef(false);
  const drag = useRef<{ key: RowKey; x: number; origin: number; half: number } | null>(null);
  const paintRef = useRef<() => void>(() => { });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    let last = performance.now();
    let seeded = false;
    let alive = true;

    const halfOf = (el: HTMLDivElement | null) => (el && el.scrollWidth > 0 ? el.scrollWidth / 2 : 0);

    const paint = () => {
      const a = trackA.current;
      const b = trackB.current;
      if (a) a.style.transform = `translate3d(${offsets.current.a}px,0,0)`;
      if (b) b.style.transform = `translate3d(${offsets.current.b}px,0,0)`;
    };
    paintRef.current = paint;

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ha = halfOf(trackA.current);
      const hb = halfOf(trackB.current);
      if (!seeded && hb > 0) {
        offsets.current.b = -hb;
        seeded = true;
      }
      const moving = !reduced.matches && desktop.matches && !paused.current && !drag.current;
      if (moving) {
        if (ha > 0) offsets.current.a = wrapOffset(offsets.current.a - (ha / LOOP_SECONDS) * dt, ha);
        if (hb > 0) offsets.current.b = wrapOffset(offsets.current.b + (hb / LOOP_SECONDS) * dt, hb);
      }
      paint();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => cancelAnimationFrame(frame);
    const start = () => {
      stop();
      if (reduced.matches || !desktop.matches) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    start();
    reduced.addEventListener("change", start);
    desktop.addEventListener("change", start);
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    if (root.current) io.observe(root.current);

    return () => {
      alive = false;
      stop();
      reduced.removeEventListener("change", start);
      desktop.removeEventListener("change", start);
      io.disconnect();
    };
  }, []);

  const onPointerDown = (key: RowKey) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const el = key === "a" ? trackA.current : trackB.current;
    const half = el ? el.scrollWidth / 2 : 0;
    drag.current = { key, x: event.clientX, origin: offsets.current[key], half };
    paused.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    offsets.current[current.key] = wrapOffset(current.origin + event.clientX - current.x, current.half);
    paintRef.current();
  };

  const endDrag = () => {
    drag.current = null;
    if (!hovering.current) paused.current = false;
  };

  const row = (key: RowKey, items: Testimonial[], track: typeof trackA) => {
    if (items.length === 0) return null;
    const loop = [...items, ...items];
    return (
      <div
        className="cursor-grab touch-pan-y overflow-hidden py-5 active:cursor-grabbing"
        onPointerDown={onPointerDown(key)}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={track} className="flex w-max select-none gap-5 will-change-transform">
          {loop.map((item, index) => (
            <QuoteCard
              key={`${item.role}-${index}`}
              item={item}
              index={index % items.length}
              hidden={index >= items.length}
              className="w-[28rem]"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={root}
      className="relative hidden [@media(min-width:768px)_and_(prefers-reduced-motion:no-preference)]:block"
      onMouseEnter={() => {
        hovering.current = true;
        paused.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
        if (!drag.current) paused.current = false;
      }}
    >
      {row("a", rowA, trackA)}
      {row("b", rowB, trackB)}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[5vw] bg-gradient-to-r from-white to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[5vw] bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const { top, bottom } = splitTitle(testimonialsIntro.title);
  const rowA = testimonials.filter((_, index) => index % 2 === 0);
  const rowB = testimonials.filter((_, index) => index % 2 === 1);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reviews-reveal]",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 86%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      ref={root}
      aria-labelledby="testimonials-title"
      className="overflow-x-clip bg-white py-[clamp(4.5rem,9vw,8rem)] text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="mx-auto w-[86vw] max-w-[1400px]">
        <div data-reviews-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-medium tracking-[-0.02em] text-[#111]" style={{ fontSize: "clamp(1rem, 1.15vw, 1.2rem)" }}>
            {testimonialsIntro.eyebrow}
          </p>
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <Stars />
            <p className="text-[#333]" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)" }}>
              5 out of 5 stars
            </p>
            <p className="text-[#111]" style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)" }}>
              From companies we built for.
            </p>
          </div>
        </div>

        <h2
          id="testimonials-title"
          data-reviews-reveal
          className="mt-[clamp(1.1rem,2vw,1.8rem)] font-medium tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)", lineHeight: 0.95 }}
        >
          <span className="block">{top}</span>
          {bottom ? (
            <span className="block pr-[0.06em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif, lineHeight: 1.02 }}>
              {bottom}
            </span>
          ) : null}
        </h2>
        <p
          data-reviews-reveal
          className="mt-[clamp(1rem,1.8vw,1.6rem)] max-w-[40rem] leading-[1.45] text-[#111]"
          style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)" }}
        >
          {testimonialsIntro.description}
        </p>
      </div>

      <div className="mt-[clamp(2.2rem,4vw,3.5rem)]">
        <ReviewsMarquee rowA={rowA} rowB={rowB} />

        <div className="hidden [@media(max-width:767px)_and_(prefers-reduced-motion:no-preference)]:block">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[7.5vw] py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((item, index) => (
              <QuoteCard key={item.role} item={item} index={index} className="w-[85vw] snap-center" />
            ))}
          </div>
        </div>

        <div className="mx-auto hidden w-[86vw] max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 [@media(prefers-reduced-motion:reduce)]:grid">
          {testimonials.map((item, index) => (
            <QuoteCard key={item.role} item={item} index={index} className="w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
