"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";
import { HighlightZynovate } from "@/components/ui/Zynovate";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export function About() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current || prefersReducedMotion() || isTouchDevice() || window.innerWidth < 768)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-about-panel]");
      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.fromTo(
          panel,
          { opacity: 0.3, y: 45 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              end: "center 50%",
              scrub: true,
            },
          },
        );
        const previous = panels[i - 1];
        if (previous)
          gsap.to(previous, {
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              end: "center 50%",
              scrub: true,
            },
          });
      });
      gsap.fromTo(
        "[data-about-word]",
        { opacity: 0.23 },
        {
          opacity: 1,
          stagger: 0.07,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-about-scrub]",
            start: "top 85%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
      // Leadership cards fade-in
      gsap.utils.toArray<HTMLElement>("[data-leader]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            delay: i * 0.15,
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-labelledby="about-title"
      className="relative bg-background text-foreground"
    >
      <div aria-hidden className="sticky top-0 h-[100svh] overflow-hidden">
        <img
          src={about.image.src}
          alt=""
          loading="lazy"
          decoding="async"
          width={1536}
          height={1024}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-about-shade" />
      </div>
      <div className="relative -mt-[100svh]">
        {about.panels.map((panel, i) => (
          <div
            key={panel.label}
            data-about-panel
            className="mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-6 md:min-h-[100svh] md:px-12 md:py-28"
          >
            <div className="max-w-3xl">
              <p className="eyebrow mb-7 text-about-highlight">
                <HighlightZynovate text={i === 0 ? about.eyebrow : panel.label} />{" "}
                <span className="ml-3 text-foreground/70">
                  0{i + 1} / 0{about.panels.length}
                </span>
              </p>
              <h2
                id={i === 0 ? "about-title" : undefined}
                className="display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-tight"
              >
                {i === 0 ? about.title : panel.heading}
              </h2>
              {i === 0 && <p className="mt-7 text-xl font-medium md:text-2xl">{panel.heading}</p>}
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80">
                <HighlightZynovate text={panel.body} />
              </p>
            </div>
          </div>
        ))}
        <div
          data-about-scrub
          className="mx-auto flex min-h-[75svh] max-w-7xl items-center px-5 py-24 sm:px-6 md:px-12 md:py-28"
        >
          <p className="max-w-5xl text-[clamp(1.75rem,5vw,3.75rem)] font-semibold leading-snug">
            {about.scrub.split(" ").map((word, index) => (
              <span key={index} data-about-word className="inline-block pr-[0.24em]">
                {word}
              </span>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
}
