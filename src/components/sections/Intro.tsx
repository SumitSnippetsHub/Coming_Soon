"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IntroBackdrop } from "@/components/motion/IntroBackdrop";
import { intro } from "@/data/intro";
import { prefersReducedMotion } from "@/lib/motion";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function NameTag({ label }: { label: string }) {
  return (
    <span className="name-tag-float pointer-events-none absolute left-[61%] top-[21%] z-10 block">
      <span className="relative block rounded-full bg-[#a7e6b5] px-[0.8em] py-[0.32em] text-[clamp(0.72rem,0.95vw,0.95rem)] font-medium leading-none text-[#14301b] shadow-[0_8px_18px_-8px_rgba(20,60,30,0.55)]">
        {label}
        <svg
          aria-hidden
          viewBox="0 0 10 10"
          className="absolute -bottom-[0.3em] left-[0.35em] size-[0.7em] fill-[#a7e6b5]"
        >
          <path d="M0 10 1 0h8C7 2 4 6 0 10Z" />
        </svg>
      </span>
    </span>
  );
}

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-intro-reveal]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-label="About grow2gether"
      className="relative isolate overflow-hidden bg-[#fbfdfe] text-[#111]"
      style={{ fontFamily: jost }}
    >
      <IntroBackdrop />
      <div className="grid items-center gap-y-10 px-[3.4vw] py-[clamp(4rem,9vw,8.5rem)] max-md:px-5 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-x-[7vw]">
        <div data-intro-reveal className="group relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#1b1f2e] shadow-[0_30px_60px_-28px_rgba(20,20,40,0.45),0_10px_24px_-14px_rgba(20,20,40,0.25)]">
            <Image
              src={intro.image.src}
              alt={intro.image.alt}
              fill
              sizes="(min-width: 768px) 38vw, 100vw"
              className={`origin-center object-cover transition-transform duration-700 ${ease} will-change-transform group-hover:scale-[1.04]`}
            />
          </div>
          <NameTag label={intro.name} />
        </div>

        <p
          data-intro-reveal
          className="max-w-[16.5em] tracking-[-0.025em]"
          style={{ fontSize: "clamp(1.6rem, 3.05vw, 3.1rem)", lineHeight: 1.2 }}
        >
          {intro.lead}{" "}
          <em
            className="bg-[linear-gradient(90deg,#b8860b_0%,#c99a2e_35%,#c2502a_100%)] bg-clip-text pr-[0.03em] text-[1.06em] tracking-[-0.01em] text-transparent"
            style={{ fontFamily: serif }}
          >
            {intro.highlight}
          </em>
          {intro.tail}
        </p>
      </div>
    </section>
  );
}
