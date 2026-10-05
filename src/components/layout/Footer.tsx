"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DotField } from "@/components/motion/DotField";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import { Mail, Phone } from "lucide-react";
import { Zynovate } from "@/components/ui/Zynovate";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import { social } from "@/data/social";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { SocialIcon } from "@/components/layout/SocialIcon";

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
    if (!href.startsWith("#")) return;
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
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 sm:px-6 md:px-10 md:py-16 lg:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] lg:gap-7">
          <div className="flex flex-col gap-4">
            <a href="#top" onClick={go("#top")} aria-label="ZYNOVATE home" className="w-fit">
              <img
                src={site.logo.src}
                alt=""
                width={site.logo.width}
                height={site.logo.height}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto"
              />
            </a>
            <div className="mt-2 space-y-2">
              <p className="eyebrow text-white/80">Get in touch</p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-white/70" />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-white/70" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-white/80">Navigate</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={go(link.href)}
                    className="text-sm text-white hover:text-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <p className="eyebrow text-white/80">Services</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <a href="/services" className="text-sm text-white hover:text-white/70">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Products">
            <p className="eyebrow text-white/80">Products</p>
            <ul className="mt-4 space-y-2">
              {products.map((product) => (
                <li key={product.title}>
                  <a href="/products" className="text-sm text-white hover:text-white/70">
                    {product.title}
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
                    <span className="inline-flex items-center gap-2 text-sm text-white">
                      <SocialIcon label={item.label} className="size-4" />
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm text-white hover:text-white/70"
                    >
                      <SocialIcon label={item.label} className="size-4" />
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
            © {year} <Zynovate>{site.name}</Zynovate>
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white hover:underline"
            >
              {contact.location}
            </a>
          </div>
        </div>
        <div
          data-wordmark-wrap
          aria-hidden
          className="line-mask flex justify-center overflow-hidden px-4 pb-2 md:px-8"
        >
          <p
            data-wordmark
            className="display relative w-max max-w-full whitespace-nowrap text-center text-[clamp(3.2rem,13.5vw,16rem)] text-[#C8C8C8]"
          >
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
