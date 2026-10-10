"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/motion";
import { Zynovate } from "@/components/ui/Zynovate";
import { DotField } from "@/components/motion/DotField";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import { social } from "@/data/social";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const solutions = site.trustLine.map((label) => ({ label, href: "/#services" }));
const FIELD_COLORS = ["#4057c9", "#6476d8", "#7462cf", "#2a357e"];
const FIELD_MASK = "radial-gradient(closest-side, #000 35%, rgba(0,0,0,0.6) 62%, transparent 100%)";
const liveSocials = social.filter((item) => !item.isPlaceholder && item.href !== "#");

const linkClass = "footer-link text-[clamp(1.05rem,1.2vw,1.25rem)] leading-snug text-white/60 hover:text-white focus-visible:text-white";

function ColumnTitle({ children }: { children: string }) {
  return <p className="mb-5 text-[0.95rem] font-medium tracking-[0.01em] text-white/35">{children}</p>;
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const wordmarkWrap = useRef<HTMLDivElement>(null);
  const wordmark = useRef<HTMLParagraphElement>(null);
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();
  const [street, city] = contact.location.split("|").map((part) => part.trim());

  useEffect(() => {
    const wrap = wordmarkWrap.current;
    const text = wordmark.current;
    if (!wrap || !text) return;
    const fit = () => {
      const current = parseFloat(getComputedStyle(text).fontSize);
      const natural = text.scrollWidth;
      const available = wrap.clientWidth;
      if (!current || !natural || !available) return;
      const byWidth = (current * available) / natural;
      const byHeight = window.matchMedia("(min-width: 768px)").matches ? wrap.clientHeight / 1.18 : Infinity;
      wrap.style.setProperty("--wm", `${Math.max(0, Math.min(byWidth, byHeight))}px`);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-wordmark]", {
        yPercent: 110,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-wordmark-wrap]",
          start: "top bottom",
          once: true,
          invalidateOnRefresh: true,
          onRefresh(self) {
            if (self.start > ScrollTrigger.maxScroll(window)) {
              gsap.set("[data-wordmark]", { yPercent: 0 });
            }
          },
        },
      });
      gsap.fromTo(
        "[data-footer-rise]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (href: string) => (event: MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash || !document.querySelector(hash)) return;
    event.preventDefault();
    scrollTo(hash);
  };

  return (
    <footer
      ref={root}
      className="relative isolate overflow-hidden bg-[#050507] text-white selection:bg-white selection:text-black"
      style={{ fontFamily: jost }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[6%] top-[4%] z-0 aspect-square opacity-75 md:inset-x-auto md:right-[5%] md:top-1/2 md:h-[84%] md:w-auto md:-translate-y-1/2"
        style={{ maskImage: FIELD_MASK, WebkitMaskImage: FIELD_MASK }}
      >
        <DotField colors={FIELD_COLORS} innerRadius={0.1} ringGap={20} dotSpacing={24} lineWidth={1.8} dashScale={0.9} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(110% 85% at 6% 20%, rgba(5,5,7,0.82) 0%, rgba(5,5,7,0.45) 38%, rgba(5,5,7,0) 68%), radial-gradient(60% 50% at 72% 50%, rgba(80,100,255,0.10), transparent 70%), linear-gradient(180deg, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0) 18%, rgba(5,5,7,0) 70%, rgba(5,5,7,0.9) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col md:h-[100svh] md:min-h-[600px] px-[clamp(1.25rem,3.4vw,4rem)] pt-[clamp(4.75rem,11vh,8rem)]">
        <div className="grid gap-x-12 gap-y-[clamp(1.25rem,3vh,2rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p
              data-footer-rise
              className="mb-[clamp(0.9rem,2.4vh,2rem)] inline-flex items-center [@media(min-width:768px)_and_(max-height:780px)]:hidden gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-[1rem] text-white/70 backdrop-blur-sm"
            >
              <span className="footer-pulse size-2 rounded-full bg-[#7d92ff]" />
              Taking on new projects
            </p>
            <h2
              data-footer-rise
              className="font-medium leading-[0.98] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.5rem, min(6.4vw, 8.4vh), 7.5rem)" }}
            >
              <span className="block">Let&apos;s build something</span>
              <span
                className="block bg-[linear-gradient(95deg,#ffffff_0%,#c9d2ff_45%,#a99bff_100%)] bg-clip-text pb-[0.08em] font-normal tracking-[-0.03em] text-transparent"
                style={{ fontFamily: serif, fontStyle: "italic" }}
              >
                worthwhile together.
              </span>
            </h2>
          </div>

          <div data-footer-rise className="flex flex-col items-start gap-6 lg:items-end lg:pb-[0.6rem]">
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="group inline-flex items-center gap-[clamp(1.75rem,3vw,3rem)] whitespace-nowrap rounded-[11px] border border-white bg-white py-[clamp(0.9rem,1.2vw,1.15rem)] pl-[clamp(1.2rem,1.6vw,1.5rem)] pr-[clamp(1rem,1.4vw,1.3rem)] text-[clamp(1rem,1.2vw,1.2rem)] font-medium text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
            >
              {site.primaryCta.label}
              <ArrowUpRight
                className="size-[1.15em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="footer-email pb-1 text-[clamp(1.35rem,2.2vw,2.25rem)] font-normal tracking-[-0.025em] text-white"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div
          data-footer-rise
          className="mt-[clamp(1.5rem,5vh,4.5rem)] grid grid-cols-2 gap-x-6 gap-y-[clamp(1.25rem,3vh,2.5rem)] border-t border-white/10 pt-[clamp(1.25rem,3.6vh,3rem)] sm:gap-x-8 lg:grid-cols-12"
        >
          <div className={liveSocials.length ? "col-span-2 lg:col-span-3 lg:pr-8" : "col-span-2 lg:col-span-4 lg:pr-10"}>
            <p className="max-w-[24rem] text-[clamp(1.15rem,1.5vw,1.5rem)] leading-[1.4] tracking-[-0.015em] text-white/80">
              {site.description}{" "}
              <em className="text-white" style={{ fontFamily: serif }}>
                Designed and built by Sumit.
              </em>
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ColumnTitle>Navigation</ColumnTitle>
            <ul className="grid w-max grid-cols-2 gap-x-10 gap-y-2">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={go(link.href)} className={`${linkClass} capitalize`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Solutions" className="lg:col-span-2">
            <ColumnTitle>Solutions</ColumnTitle>
            <ul className="space-y-2.5">
              {solutions.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={go(item.href)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={liveSocials.length ? "lg:col-span-2" : "lg:col-span-3"}>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.mapUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  {street}
                  {city ? (
                    <>
                      <br />
                      {city}
                    </>
                  ) : null}
                </a>
              </li>
            </ul>
          </div>

          {liveSocials.length ? (
            <nav aria-label="Social" className="lg:col-span-2">
              <ColumnTitle>Socials</ColumnTitle>
              <ul className="space-y-2.5">
                {liveSocials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div
          ref={wordmarkWrap}
          data-wordmark-wrap
          aria-hidden
          className="mt-[clamp(1.5rem,4vh,3rem)] flex flex-col justify-end overflow-hidden md:min-h-0 md:flex-1"
          style={{ ["--wm" as string]: "18.4vw" }}
        >
          <p
            ref={wordmark}
            data-wordmark
            className="footer-wordmark relative w-max whitespace-nowrap pb-[0.06em] font-medium leading-[1.12] tracking-[-0.065em]"
            style={{ fontSize: "var(--wm)", marginLeft: "-0.04em" }}
          >
            {site.name}
            <span aria-hidden className="wordmark-shine pointer-events-none">
              {site.name}
            </span>
          </p>
        </div>

        <div className="-mx-[clamp(1.25rem,3.4vw,4rem)] flex flex-wrap shrink-0 items-center justify-between gap-x-8 gap-y-3 border-t border-white/10 px-[clamp(1.25rem,3.4vw,4rem)] py-[clamp(0.75rem,2vh,1.5rem)] text-[1rem] text-white/55">
          <p>
            © {year} <Zynovate>{site.name}</Zynovate>
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="/privacy-policy" className="footer-link hover:text-white">
              Data protection
            </a>
            <span>Made in Bremen</span>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scrollTo("#top")}
              className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white"
            >
              Back to top
              <span className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={2} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
