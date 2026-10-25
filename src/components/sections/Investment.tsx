"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { inclusions, investmentIntro } from "@/data/investment";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const easeCss = "cubic-bezier(0.16,1,0.3,1)";
const CYCLE_MS = 4200;

const formatPrice = (value: number) => `€${value.toLocaleString("en-US")}`;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[#111]">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function InclusionList() {
  const total = inclusions.length;
  const list = useRef<HTMLOListElement>(null);
  const rows = useRef(new Map<string, HTMLLIElement>());
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const tops = useRef(new Map<string, number>());
  const bar = useRef<HTMLSpanElement>(null);
  const progress = useRef<Animation | null>(null);
  const focusActive = useRef(false);

  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const running = motion && inView && !hovered && !focused;
  const runningRef = useRef(running);
  runningRef.current = running;

  const select = useCallback(
    (index: number, focus = false) => {
      focusActive.current = focus;
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  useEffect(() => setMotion(!prefersReducedMotion()), []);

  useEffect(() => {
    const el = list.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // FLIP: rows keep their DOM node across re-orders, so measure the jump and animate it away.
  useLayoutEffect(() => {
    const next = new Map<string, number>();
    rows.current.forEach((el, slug) => next.set(slug, el.offsetTop));
    if (motion) {
      rows.current.forEach((el, slug) => {
        const from = tops.current.get(slug);
        const to = next.get(slug);
        if (from === undefined || to === undefined || from === to || typeof el.animate !== "function") return;
        const wrapped = to > from;
        el.animate(
          wrapped
            ? [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
              ]
            : [{ transform: `translateY(${from - to}px)` }, { transform: "translateY(0)" }],
          { duration: wrapped ? 650 : 750, easing: easeCss, delay: wrapped ? 120 : 0 },
        );
      });
    }
    tops.current = next;
    if (focusActive.current) {
      focusActive.current = false;
      buttons.current.get(inclusions[active]!.slug)?.focus({ preventScroll: true });
    }
  }, [active, motion]);

  useEffect(() => {
    const el = bar.current;
    if (!motion || !el || typeof el.animate !== "function") return;
    const anim = el.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: CYCLE_MS,
      easing: "linear",
      fill: "forwards",
    });
    if (!runningRef.current) anim.pause();
    anim.onfinish = () => select(active + 1);
    progress.current = anim;
    return () => {
      anim.onfinish = null;
      anim.cancel();
      progress.current = null;
    };
  }, [active, motion, select]);

  useEffect(() => {
    const anim = progress.current;
    if (!anim) return;
    if (running) anim.play();
    else anim.pause();
  }, [running]);

  const order = inclusions.map((_, i) => (active + i) % total);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: total - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key]!, true);
  };

  return (
    <ol
      ref={list}
      aria-label={investmentIntro.listLabel}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="relative [--inv-step:clamp(0.85rem,2.2vw,2.35rem)]"
    >
      {order.map((index, position) => {
        const item = inclusions[index]!;
        const isActive = position === 0;
        const panelId = `inclusion-${item.slug}`;
        return (
          <li
            key={item.slug}
            ref={(el) => {
              if (el) rows.current.set(item.slug, el);
              else rows.current.delete(item.slug);
            }}
            className={cn("relative", !isActive && "border-b border-black/[0.08]")}
          >
            <button
              ref={(el) => {
                if (el) buttons.current.set(item.slug, el);
                else buttons.current.delete(item.slug);
              }}
              type="button"
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => select(index)}
              className={cn(
                "group/row block w-full rounded-[6px] text-left font-medium tracking-[-0.025em] outline-none transition-[padding,color] duration-700 focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/40 focus-visible:ring-offset-4",
                ease,
                isActive
                  ? "cursor-default pb-[clamp(0.7rem,1vw,1rem)] text-[#111]"
                  : "py-[clamp(0.85rem,1.25vw,1.2rem)] text-[#888] hover:text-[#111]",
              )}
              style={{
                paddingLeft: `calc(var(--inv-step) * ${position})`,
                fontSize: isActive ? "clamp(1.35rem, 1.9vw, 1.85rem)" : "clamp(1.15rem, 1.55vw, 1.5rem)",
                lineHeight: 1.25,
              }}
            >
              <span
                className={cn(
                  "inline-block transition-transform duration-500",
                  ease,
                  !isActive && "group-hover/row:translate-x-2",
                )}
              >
                {item.title}
              </span>
            </button>
            <div id={panelId} role="region" aria-label={item.title} hidden={!isActive}>
              {isActive && (
                <p
                  key={item.slug}
                  className={cn(
                    "max-w-[36rem] pb-[clamp(1.4rem,2.2vw,2.1rem)] text-[clamp(1.05rem,1.3vw,1.28rem)] leading-[1.6] text-[#555]",
                    motion && "animate-[inv-in_700ms_cubic-bezier(0.16,1,0.3,1)_both]",
                  )}
                >
                  <Rich text={item.description} />
                </p>
              )}
            </div>
            {isActive && (
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-black/[0.08]">
                <span
                  ref={bar}
                  className="absolute inset-x-0 -top-px block h-[2px] origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#5b5bd6,#8e6bbf_55%,#c98a7a)]"
                />
              </span>
            )}
          </li>
        );
      })}
      <style>{`@keyframes inv-in{from{opacity:0;transform:translateY(14px);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}`}</style>
    </ol>
  );
}

export function Investment() {
  const root = useRef<HTMLElement>(null);
  const price = useRef<HTMLSpanElement>(null);
  const { scrollTo } = useSmoothScroll();
  const priced = investmentIntro.price > 0;

  const go = (href: string) => (e: React.MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash) return;
    e.preventDefault();
    scrollTo(document.querySelector(hash) ? hash : window.innerHeight);
  };

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = price.current;
    const counter = { value: 0 };
    const paint = () => {
      if (!el) return;
      el.textContent = formatPrice(Math.round(counter.value / 10) * 10);
    };
    if (priced && el) paint();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-inv-reveal]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        },
      );
      if (priced && el) {
        gsap.to(counter, {
          value: investmentIntro.price,
          duration: 2.4,
          ease: "power3.out",
          onUpdate: paint,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }
    }, root);
    return () => {
      ctx.revert();
      if (priced && el) el.textContent = investmentIntro.priceLabel;
    };
  }, [priced]);

  return (
    <section
      id="products"
      ref={root}
      aria-labelledby="investment-title"
      className="bg-white px-[clamp(0.5rem,1.1vw,1rem)] py-[clamp(0.5rem,1.1vw,1rem)] text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-[linear-gradient(160deg,#ffffff_0%,#fcfbff_40%,#f6f3ff_100%)] shadow-[0_30px_80px_-50px_rgba(70,55,140,0.35)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] -top-[30%] aspect-square w-[42%] min-w-[320px] blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,182,255,0.6), rgba(214,204,255,0.28) 55%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[35%] left-[30%] aspect-square w-[30%] min-w-[260px] blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,214,196,0.28), transparent)" }}
        />

        <div className="relative mx-auto grid w-full max-w-[1320px] gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 px-5 py-[clamp(3rem,6.5vw,6.5rem)] sm:px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex min-w-0 flex-col items-start text-left lg:col-start-2 lg:row-start-1 lg:items-end lg:text-right">
            <h2
              id="investment-title"
              data-inv-reveal
              className="max-w-[18ch] font-semibold tracking-[-0.045em] lg:max-w-none"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 5.4rem)", lineHeight: 1.02 }}
            >
              <span className="block text-balance">{investmentIntro.titleTop}</span>
              <span
                className="mt-[0.12em] block font-normal italic tracking-[-0.03em]"
                style={{ fontFamily: serif, lineHeight: 1.12 }}
              >
                <span className="bg-[linear-gradient(90deg,#5b5bd6,#7563cb)] bg-clip-text text-transparent">
                  {investmentIntro.pricePrefix}
                </span>
                {priced ? (
                  <>
                    <span className="sr-only">
                      {" "}
                      {investmentIntro.priceLabel}
                    </span>
                    <span className="relative ml-[0.18em] inline-block align-baseline">
                      <span className="invisible">{investmentIntro.priceLabel}</span>
                      <span
                        ref={price}
                        className="absolute inset-0 bg-[linear-gradient(90deg,#7563cb,#8e6bbf_38%,#c98a7a)] bg-clip-text text-right text-transparent tabular-nums"
                      >
                        {investmentIntro.priceLabel}
                      </span>
                    </span>
                  </>
                ) : null}
              </span>
            </h2>
            <p
              data-inv-reveal
              className="mt-[clamp(1.25rem,2.2vw,2.25rem)] max-w-[36rem] leading-[1.4] tracking-[-0.015em] text-[#111]"
              style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.45rem)" }}
            >
              {investmentIntro.lead}
            </p>
            <div data-inv-reveal className="mt-[clamp(1.5rem,2.6vw,2.5rem)] flex flex-col items-start gap-3 lg:items-end">
              <a
                href={site.primaryCta.href}
                onClick={go(site.primaryCta.href)}
                className="inline-flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)] whitespace-nowrap rounded-[11px] bg-[#111] py-[clamp(0.8rem,1.05vw,1rem)] pl-[clamp(1.05rem,1.35vw,1.35rem)] pr-[clamp(0.95rem,1.2vw,1.15rem)] text-[clamp(0.9rem,1.05vw,1.05rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
              >
                {site.primaryCta.label}
                <ArrowUpRight className="size-[clamp(0.95rem,1.1vw,1.1rem)]" strokeWidth={2} />
              </a>
              <p className="max-w-[22rem] text-[clamp(0.88rem,0.95vw,0.95rem)] leading-[1.5] text-[#666]">
                {investmentIntro.note}
              </p>
            </div>
          </div>

          <div data-inv-reveal className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-start">
            <InclusionList />
          </div>
        </div>
      </div>
    </section>
  );
}
