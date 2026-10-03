import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BrowserMockup } from "@/components/mockups/BrowserMockup";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { projects, workIntro } from "@/data/projects";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { prefersReducedMotion, useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

export function FeaturedWork() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const browser = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [feature, setFeature] = useState(0);
  const { scrollTo } = useSmoothScroll();
  const project = projects.find((p) => !p.isPlaceholder);
  const upcoming = projects.filter((p) => p.isPlaceholder);

  useEffect(() => {
    if (!scene.current || !browser.current || prefersReducedMotion() || window.innerWidth < 1024) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(browser.current, { scale: 0.82, y: 90, rotate: -3 }, { scale: 1, y: 0, rotate: 0, ease: "none", scrollTrigger: { trigger: scene.current, start: "top top", end: "bottom bottom", scrub: true } });
      ScrollTrigger.create({ trigger: scene.current, start: "top top", end: "bottom bottom", onUpdate: (self) => setStep(Math.min(workIntro.stages.length - 1, Math.floor(self.progress * workIntro.stages.length))) });
    }, root);
    return () => ctx.revert();
  }, []);

  if (!project || !project.screenshots || !project.features) return null;
  const features = project.features;
  const currentFeature = features[feature] ?? features[0];

  return <section id="work" ref={root} className="bg-background">
    <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
      <p className="eyebrow text-primary">{workIntro.eyebrow}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6"><h2 className="display text-5xl md:text-7xl">{workIntro.title}</h2><p className="text-muted-foreground">{workIntro.description}</p></div>
    </div>

    <div ref={scene} className="relative lg:h-[310svh]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:px-10 lg:sticky lg:top-0 lg:h-[100svh] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="relative min-w-0">
          <div ref={browser} className="will-change-transform"><BrowserMockup image={step === 1 ? currentFeature.screenshot : project.screenshots.cover} url="amrut.ai" /></div>
          <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>{workIntro.productNote}</span><span>{project.id} / {String(projects.length).padStart(2, "0")}</span></div>
          <div className="mt-7 hidden max-w-md lg:block"><LaptopMockup image={project.screenshots.dashboard} className="w-[48%]" /><div className="absolute bottom-8 right-0 w-[15%]"><PhoneMockup image={project.screenshots.mobile} /></div></div>
        </div>

        <div className="flex min-h-[360px] flex-col justify-center lg:min-h-[460px]">
          <div className="flex gap-2" aria-label="Case study stages">{workIntro.stages.map((label, i) => <span key={label} title={label} className={`h-1 flex-1 transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />)}</div>
          <p className="eyebrow mt-8 text-primary">{workIntro.stages[step]} / {project.category}</p>
          <h3 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">{step === 0 ? project.title : step === 1 ? workIntro.featureHeading : step === 2 ? workIntro.roleHeading : workIntro.capabilitiesHeading}</h3>
          {step === 0 && <><p className="mt-5 text-xl font-medium leading-snug">{project.tagline}</p><p className="mt-5 text-base leading-relaxed text-muted-foreground">{project.summary}</p></>}
          {step === 1 && <><div role="tablist" aria-label="Feature groups" className="mt-6 flex flex-wrap gap-2">{features.map((group, i) => <Button key={group.title} type="button" role="tab" aria-selected={feature === i} variant={feature === i ? "default" : "outline"} size="sm" className="h-auto min-h-9 whitespace-normal text-left" onClick={() => setFeature(i)}>{group.title}</Button>)}</div><ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-muted-foreground">{currentFeature.items.map((item) => <li key={item} className="border-l-2 border-primary pl-3">{item}</li>)}</ul></>}
          {step === 2 && <ul className="mt-6 space-y-4">{project.role?.map((item, i) => <li key={item} className="flex gap-4 border-b border-border pb-4 text-sm leading-relaxed"><span className="text-primary">0{i + 1}</span>{item}</li>)}</ul>}
          {step === 3 && <div className="mt-6 flex flex-wrap gap-2">{project.capabilities?.map((item) => <span key={item} className="border border-border px-3 py-2 text-sm">{item}</span>)}</div>}
          <div className="mt-8"><Button asChild size="lg" className="h-12 rounded-none px-6"><a href={project.url} target="_blank" rel="noopener noreferrer">{workIntro.projectButton}<ArrowUpRight /></a></Button></div>
        </div>
      </div>
    </div>

    <div className="bg-foreground py-20 text-background md:py-28"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-end md:px-10"><h2 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{workIntro.contactTitle}</h2><Button asChild variant="secondary" size="lg" className="h-12 rounded-none px-6"><a href={site.primaryCta.href} onClick={(e) => { e.preventDefault(); scrollTo(document.querySelector(site.primaryCta.href) ? site.primaryCta.href : 0); }}>{workIntro.contactButton}<ArrowRight /></a></Button></div></div>
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10"><p className="eyebrow text-primary">Next / 02—03</p><h2 className="mt-5 text-3xl font-semibold md:text-4xl">{workIntro.upcomingTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{upcoming.map((item) => <article key={item.id} className="flex min-h-52 flex-col justify-between border border-border bg-card p-7"><span className="text-sm text-primary">Project {item.id}</span><div><h3 className="text-3xl font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.category}</p></div></article>)}</div></div>
  </section>;
}