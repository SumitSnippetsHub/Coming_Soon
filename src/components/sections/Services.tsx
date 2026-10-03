import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, Smartphone, Blocks, Cloud, ShoppingBag, PenTool, Braces, Rocket, Workflow, Layers3, Wrench } from "lucide-react";
import { services, servicesIntro } from "@/data/services";
import { prefersReducedMotion } from "@/components/motion/SmoothScrollProvider";

const icons = { Globe2, Smartphone, Blocks, Cloud, ShoppingBag, PenTool, Braces, Rocket, Workflow, Layers3, Wrench };

export function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !track.current || prefersReducedMotion() || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 48);
      gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, scrub: 0.8, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.4}`, invalidateOnRefresh: true, onUpdate: (self) => { if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; } } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section id="services" ref={root} className="overflow-hidden bg-background py-24 md:flex md:min-h-[100svh] md:flex-col md:justify-center md:py-16">
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <p className="eyebrow text-primary">{servicesIntro.eyebrow}</p>
      <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="display text-5xl md:text-7xl">{servicesIntro.title}</h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{servicesIntro.description}</p>
      </div>
      <div className="mt-12 h-px bg-border"><div ref={progress} className="h-full w-full origin-left scale-x-0 bg-primary" /></div>
    </div>
    <div ref={track} className="mt-9 grid grid-cols-1 gap-3 px-6 md:mt-14 md:flex md:w-max md:gap-5 md:px-10">
      {services.map((service, i) => {
        const Icon = icons[service.icon as keyof typeof icons];
        return <article key={service.title} className="flex min-h-52 flex-col justify-between border border-border bg-card p-6 md:h-[360px] md:w-[320px] md:shrink-0 md:p-8">
          <div className="flex items-start justify-between"><Icon aria-hidden className="size-8 text-primary" strokeWidth={1.5} /><span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {services.length}</span></div>
          <div><h3 className="text-2xl font-semibold leading-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p></div>
        </article>;
      })}
    </div>
  </section>;
}