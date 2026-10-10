"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whyIntro, whyUs } from "@/data/whyUs";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const media = `origin-center transition-transform duration-500 ${ease} will-change-transform hover:scale-[1.07]`;

export function MatterOfCourse() {
  const root = useRef<HTMLElement>(null);
  const { founder } = whyIntro;

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-why-head]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-why-head]", start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        "[data-why-row]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-why-list]", start: "top 85%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={root}
      aria-labelledby="why-title"
      className="bg-white px-[clamp(0.5rem,1.1vw,1rem)] py-[clamp(0.5rem,1.1vw,1rem)]"
      style={{ fontFamily: jost }}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#15151a_0%,#0f0f13_45%,#0b0b0d_100%)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[18%] -top-[45%] aspect-square w-[70%] min-w-[520px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(190,190,205,0.07) 45%, rgba(120,120,140,0.02) 70%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-0 aspect-square w-[14%] min-w-[120px] -translate-y-1/3 blur-2xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent)" }}
        />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(4.5rem,9vw,8rem)] sm:px-8">
          <h2
            id="why-title"
            data-why-head
            className="font-semibold leading-[1.05] tracking-[-0.045em]"
            style={{ fontSize: "clamp(2.15rem, 5vw, 4.8rem)" }}
          >
            <span className="block">{whyIntro.titleTop}</span>
            <span className="block font-normal tracking-[-0.025em]">
              <em style={{ fontFamily: serif }}>{whyIntro.titleBottom}</em>.
            </span>
          </h2>

          <div data-why-head className="mt-[clamp(1.75rem,3vw,2.75rem)] flex justify-end">
            <div className="flex items-center gap-3.5 rounded-[12px] border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-5">
              <span className="block h-14 w-20 shrink-0 overflow-hidden rounded-[9px]">
                <Image
                  src={founder.photo.src}
                  alt={founder.photo.alt}
                  width={160}
                  height={112}
                  className={cn(media, "h-full w-full object-cover")}
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-semibold text-white">{founder.name}</span>
                <span className="block mt-0.5 text-[12px] text-white/60">{founder.role}</span>
              </span>
            </div>
          </div>

          <ul data-why-list className="mt-[clamp(2.75rem,5vw,4.5rem)] border-b border-white/10">
            {whyUs.map((item) => (
              <li key={item.title} data-why-row className="group relative border-t border-white/10">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-[-0.75rem] inset-y-1 origin-left scale-x-0 rounded-[12px] bg-white/[0.05] opacity-0 transition-[transform,opacity] duration-700 group-hover:scale-x-100 group-hover:opacity-100",
                    ease,
                  )}
                />
                <div className="relative flex flex-col gap-2 py-[clamp(1.3rem,2.2vw,2.1rem)] md:flex-row md:items-center md:justify-between md:gap-10">
                  <h3
                    className={cn(
                      "max-w-[19rem] font-semibold leading-[1.12] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3 md:max-w-[clamp(17rem,26vw,27rem)]",
                      ease,
                    )}
                    style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.6rem)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="max-w-[27rem] text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.55] text-white/60 transition-colors duration-500 group-hover:text-white/90 md:text-right">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
