"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DotField } from "@/components/motion/DotField";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import { social } from "@/data/social";

const FOOTER_DOT_COLORS = ["#F8F0E6", "#E4D5C5", "#C4896A", "#A6785A"];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

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
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (href: string) => (event: MouseEvent) => {
    event.preventDefault();
    scrollTo(document.querySelector(href) ? href : 0);
  };

  return (
    <footer ref={root} className="relative isolate overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-y-0 left-[8vw] right-[8vw] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <DotField
          colors={FOOTER_DOT_COLORS}
          interaction={isTouchDevice() ? 0 : 0.6}
          ringGap={36}
          dotSpacing={42}
          className="opacity-[0.65]"
        />
      </div>
      <div className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 md:px-10 md:py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <a href="#top" onClick={go("#top")} aria-label="ZYNOVATE home" className="w-fit sm:col-span-2 lg:col-span-1">
            <img src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} loading="lazy" decoding="async" className="h-14 w-auto" />
          </a>
          <nav aria-label="Footer">
            <p className="eyebrow text-white/80">Navigate</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={go(link.href)} className="text-sm text-white hover:text-white/70">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-white/80">
              Social{social.some((item) => item.isPlaceholder) ? " · Placeholder" : ""}
            </p>
            <ul className="mt-4 space-y-2">
              {social.map((item) => (
                <li key={item.label}>
                  {item.isPlaceholder || item.href === "#" ? (
                    <span className="text-sm text-white">{item.label}</span>
                  ) : (
                    <a href={item.href} className="text-sm text-white hover:text-white/70">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => scrollTo("#top")}
              className="mt-8 text-sm font-medium text-white underline-offset-4 hover:text-white/70 hover:underline"
            >
              Back to top
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-6 text-xs text-white sm:px-6 md:px-10">
          <p>
            © {year} {site.name}
          </p>
          <p>{contact.location}</p>
        </div>
        <div data-wordmark-wrap aria-hidden className="line-mask px-4 pb-2 md:px-8">
          <p data-wordmark className="display relative text-[clamp(3.4rem,18vw,16rem)] text-[#C8C8C8]">
            {site.name}
            <span aria-hidden className="wordmark-shine pointer-events-none">
              {site.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
