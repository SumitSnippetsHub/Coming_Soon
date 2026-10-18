"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { faqIntro, faqs } from "@/data/faqs";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";
const mono = "var(--font-jetbrains), ui-monospace, monospace";
const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const pad = (n: number) => String(n).padStart(2, "0");

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative mt-[0.15em] grid size-8 shrink-0 place-items-center text-[#111]">
      <span className="absolute h-px w-[18px] bg-current" />
      <span
        className={cn(
          "absolute h-[18px] w-px origin-center bg-current transition-transform duration-500",
          ease,
          open && "rotate-90",
        )}
      />
    </span>
  );
}

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const { scrollTo } = useSmoothScroll();

  const go = (href: string) => (event: MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash) return;
    event.preventDefault();
    scrollTo(document.querySelector(hash) ? hash : window.innerHeight);
  };

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-reveal]",
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

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      ref={root}
      aria-labelledby="faq-title"
      className="contour-paper py-[clamp(4.5rem,9vw,8rem)] text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="mx-auto w-[86vw] max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div data-faq-reveal>
            <p className="font-medium tracking-[-0.02em] text-[#111]" style={{ fontSize: "clamp(1rem, 1.15vw, 1.2rem)" }}>
              {faqIntro.eyebrow}
            </p>
            <h2
              id="faq-title"
              className="mt-3 font-medium tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)", lineHeight: 0.95 }}
            >
              <span className="block">Questions,</span>
              <span
                className="block pr-[0.06em] font-normal italic tracking-[-0.03em]"
                style={{ fontFamily: serif, lineHeight: 1.02 }}
              >
                answered.
              </span>
            </h2>
          </div>

          <div data-faq-reveal className="flex flex-col items-start gap-4 lg:items-end lg:pb-2">
            <p className="max-w-[22rem] leading-[1.4] text-[#111] lg:text-right" style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)" }}>
              Can&apos;t find yours? Write to us.
            </p>
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="inline-flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)] whitespace-nowrap rounded-[11px] bg-[#111] py-[clamp(0.8rem,1.05vw,1rem)] pl-[clamp(1.05rem,1.35vw,1.35rem)] pr-[clamp(0.95rem,1.2vw,1.15rem)] text-[clamp(0.95rem,1.1vw,1.1rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-[clamp(0.95rem,1.1vw,1.1rem)]" strokeWidth={2} />
            </a>
            <p className="max-w-[24rem] leading-[1.45] text-[#444] lg:text-right" style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)" }}>
              {faqIntro.description}
            </p>
          </div>
        </div>

        <ul className="mt-[clamp(2.4rem,4.5vw,4rem)]">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;
            return (
              <li
                key={item.question}
                className={cn(
                  isOpen
                    ? "my-3 rounded-[22px] border border-[#e4dff5] bg-[linear-gradient(165deg,#f6f3ff_0%,#ffffff_46%,#fbf9ff_100%)] px-[clamp(1.15rem,2vw,2rem)] py-[clamp(1.25rem,2vw,1.9rem)] shadow-[0_24px_50px_-36px_rgba(90,70,160,0.45)]"
                    : "border-b border-black/10",
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen((current) => (current === index ? -1 : index))}
                    className={cn(
                      "grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-[clamp(0.85rem,1.4vw,1.35rem)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]",
                      !isOpen && "py-[clamp(1.15rem,1.7vw,1.55rem)]",
                    )}
                  >
                    <span
                      className={cn("pt-[0.28em] tabular-nums transition-colors duration-500", isOpen ? "text-[#111]" : "text-[#8a8a8a]")}
                      style={{ fontFamily: mono, fontSize: "clamp(0.9rem, 1vw, 1rem)" }}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className="font-medium tracking-[-0.035em] text-[#111]"
                      style={{
                        fontSize: isOpen ? "clamp(1.4rem, 2.2vw, 2.05rem)" : "clamp(1.15rem, 1.7vw, 1.5rem)",
                        lineHeight: isOpen ? 1.15 : 1.3,
                      }}
                    >
                      {item.question}
                    </span>
                    <PlusMinus open={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn("grid transition-[grid-template-rows] duration-500", ease)}
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden" aria-hidden={!isOpen}>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-x-[clamp(0.85rem,1.4vw,1.35rem)]">
                      <span aria-hidden className="invisible tabular-nums" style={{ fontFamily: mono, fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                        {pad(index + 1)}
                      </span>
                      <p
                        className="max-w-[52rem] pb-1 pt-[clamp(0.85rem,1.3vw,1.2rem)] leading-[1.65] text-[#222]"
                        style={{ fontSize: "clamp(1.08rem, 1.35vw, 1.28rem)" }}
                      >
                        {item.answer}
                      </p>
                      <span aria-hidden className="w-8" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
