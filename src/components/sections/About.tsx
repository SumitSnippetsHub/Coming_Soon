import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";
import { prefersReducedMotion } from "@/components/motion/SmoothScrollProvider";

export function About() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current || prefersReducedMotion() || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-about-panel]");
      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.fromTo(panel, { opacity: 0.3, y: 45 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: panel, start: "top 78%", end: "center 50%", scrub: true } });
        const previous = panels[i - 1];
        if (previous) gsap.to(previous, { opacity: 0.25, ease: "none", scrollTrigger: { trigger: panel, start: "top 85%", end: "center 50%", scrub: true } });
      });
      gsap.fromTo("[data-about-word]", { opacity: 0.23 }, { opacity: 1, stagger: 0.07, ease: "none", scrollTrigger: { trigger: "[data-about-scrub]", start: "top 85%", end: "bottom 45%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section id="about" ref={root} className="relative bg-foreground text-background">
    <div className="sticky top-0 h-[100svh] overflow-hidden">
      <img src={about.image.src} alt={about.image.alt} loading="lazy" width={1536} height={1024} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-about-shade" />
    </div>
    <div className="relative -mt-[100svh]">
      {about.panels.map((panel, i) => <div key={panel.label} data-about-panel className="mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-center px-6 py-28 md:min-h-[100svh] md:px-12">
        <div className="max-w-3xl">
          <p className="eyebrow mb-7 text-about-highlight">{i === 0 ? about.eyebrow : panel.label} <span className="ml-3 text-background/50">0{i + 1} / 0{about.panels.length}</span></p>
          <h2 className="display text-4xl leading-tight md:text-6xl lg:text-7xl">{i === 0 ? about.title : panel.heading}</h2>
          {i === 0 && <p className="mt-7 text-xl font-medium md:text-2xl">{panel.heading}</p>}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-background/80">{panel.body}</p>
        </div>
      </div>)}
      <div data-about-scrub className="mx-auto flex min-h-[75svh] max-w-7xl items-center px-6 py-28 md:px-12">
        <p className="max-w-5xl text-3xl font-semibold leading-snug md:text-5xl lg:text-6xl">{about.scrub.split(" ").map((word, index) => <span key={index} data-about-word className="inline-block pr-[0.24em]">{word}</span>)}</p>
      </div>
    </div>
  </section>;
}