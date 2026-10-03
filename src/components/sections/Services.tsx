import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, Smartphone, Blocks, Cloud, ShoppingBag, PenTool, Braces, Rocket, Workflow, Layers3, Wrench } from "lucide-react";
import { services, servicesIntro } from "@/data/services";
import { useCanPin } from "@/hooks/use-can-pin";
import { cn } from "@/lib/utils";

const icons = { Globe2, Smartphone, Blocks, Cloud, ShoppingBag, PenTool, Braces, Rocket, Workflow, Layers3, Wrench };

export function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  // Horizontal pinned rail on desktop pointers only; a static card grid everywhere else.
  const pinned = useCanPin(1024);

  useEffect(() => {
    if (!pinned || !root.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 48);
      gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, scrub: 0.8, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.4}`, invalidateOnRefresh: true, onUpdate: (self) => { if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; } } });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  return <section id="services" ref={root} aria-labelledby="services-title" className={cn("overflow-hidden bg-background py-20 md:py-28", pinned && "flex min-h-[100svh] flex-col justify-center lg:py-16")}>
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-10">
      <p className="eyebrow text-primary">{servicesIntro.eyebrow}</p>
      <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <h2 id="services-title" className="display text-[clamp(2.5rem,7vw,4.5rem)]">{servicesIntro.title}</h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{servicesIntro.description}</p>
      </div>
      {pinned && <div aria-hidden className="mt-12 h-px bg-border"><div ref={progress} className="h-full w-full origin-left scale-x-0 bg-primary" /></div>}
    </div>
    <div ref={track} className={pinned ? "mt-14 flex w-max gap-5 px-10" : "mx-auto mt-10 grid max-w-7xl gap-3 px-5 sm:grid-cols-2 sm:gap-4 sm:px-6 md:px-10 lg:grid-cols-3"}>
      {services.map((service, i) => {
        const Icon = icons[service.icon as keyof typeof icons];
        return <article key={service.title} className={cn("flex flex-col justify-between gap-8 border border-border bg-card p-6 md:p-8", pinned ? "h-[360px] w-[320px] shrink-0" : "min-h-52")}>
          <div className="flex items-start justify-between"><Icon aria-hidden className="size-8 text-primary" strokeWidth={1.5} /><span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {services.length}</span></div>
          <div><h3 className="text-2xl font-semibold leading-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p></div>
        </article>;
      })}
    </div>
  </section>;
}
