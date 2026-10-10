"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Gauge,
  GitBranch,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { images } from "@/data/images";
import { DotField } from "@/components/motion/DotField";
import { ProjectInquiryModal } from "@/components/layout/ProjectInquiryModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TechLogo } from "@/components/ui/TechLogo";
import { VisualShowcaseWidget } from "./VisualShowcaseWidget";
import {
  WebDev3D,
  MobileDev3D,
  CustomSoftware3D,
  Saas3D,
  UIUX3D,
  Backend3D,
  Automation3D,
  Maintenance3D,
} from "@/components/sections/services/Service3DGraphics";
import {
  SaasPlatforms3D,
  BusinessTools3D,
  InternalApps3D,
  AutomationProducts3D,
  CustomerFacing3D,
  CustomDigital3D,
} from "./Product3DGraphics";
import type { DetailPage } from "@/data/detailPages";
import { prefersReducedMotion } from "@/lib/motion";

interface DetailPageViewProps {
  item: DetailPage;
  type: "service" | "product";
  allItems: DetailPage[];
}

const serviceGraphics: Record<string, React.ComponentType<{ className?: string }>> = {
  "web-development": WebDev3D,
  "mobile-app-development": MobileDev3D,
  "custom-software": CustomSoftware3D,
  "saas-development": Saas3D,
  "ui-ux-design": UIUX3D,
  "backend-api-development": Backend3D,
  "business-automation": Automation3D,
  "maintenance-support": Maintenance3D,
};

const productGraphics: Record<string, React.ComponentType<{ className?: string }>> = {
  "saas-platforms": SaasPlatforms3D,
  "business-tools": BusinessTools3D,
  "internal-applications": InternalApps3D,
  "automation-products": AutomationProducts3D,
  "customer-facing-platforms": CustomerFacing3D,
  "custom-digital-products": CustomDigital3D,
};

export function DetailPageView({ item, type, allItems }: DetailPageViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-detail-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            delay: Math.min(index % 4, 3) * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Find previous and next items for bottom navigator
  const currentIndex = allItems.findIndex((x) => x.slug === item.slug);
  const prevIndex = (currentIndex - 1 + allItems.length) % Math.max(1, allItems.length);
  const nextIndex = (currentIndex + 1) % Math.max(1, allItems.length);
  const prevItem = allItems[prevIndex] ?? item;
  const nextItem = allItems[nextIndex] ?? item;

  const parentRoute = type === "service" ? "/services" : "/products";
  const parentLabel = type === "service" ? "Services" : "Products";

  const HeroGraphic =
    type === "service"
      ? (serviceGraphics[item.slug] ?? WebDev3D)
      : (productGraphics[item.slug] ?? SaasPlatforms3D);

  return (
    <>
      <div ref={pageRef} className="relative overflow-hidden bg-background">
        {/* ============================================================
            1. COMPACT HERO (40-50vh footprint)
           ============================================================ */}
        <section className="relative isolate overflow-hidden rounded-b-[2rem] bg-white text-foreground shadow-[0_18px_50px_-36px_rgba(76,43,25,0.55)] md:rounded-b-[3rem]">
          <DotField
            colors={["#7a4426", "#9a5b36", "#b58468", "#2b1a10"]}
            ringGap={25}
            dotSpacing={31}
            centerX={0.76}
            centerY={0.48}
            innerRadius={0.08}
            interaction={0.75}
            className="opacity-[0.22]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_44%,rgba(196,137,106,0.14),transparent_25%),linear-gradient(105deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.76)_44%,rgba(255,255,255,0.3)_100%)]" />
          <div className="pointer-events-none absolute right-[8%] top-1/2 size-[min(38vw,24rem)] -translate-y-1/2 rounded-full border border-primary/10 md:right-[10%]" />

          <div className="relative mx-auto grid max-w-7xl min-h-[44svh] md:min-h-[48svh] items-center gap-6 px-5 pb-8 pt-24 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:px-12 md:pb-10 md:pt-28">
            <div className="max-w-2xl">
              {/* Breadcrumb Trail */}
              <nav
                aria-label="Breadcrumb"
                className="mb-3 flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
                <ChevronRight className="size-3.5 opacity-50" />
                <Link href={parentRoute} className="transition-colors hover:text-foreground">
                  {parentLabel}
                </Link>
                <ChevronRight className="size-3.5 opacity-50" />
                <span className="font-semibold text-foreground">{item.title}</span>
              </nav>

              <p className="eyebrow flex items-center gap-3 text-primary">
                <span className="h-px w-8 bg-primary/70" />
                {item.eyebrow}
              </p>
              <h1 className="display mt-3 text-[clamp(2.2rem,4.6vw,4rem)] leading-[0.96] tracking-[-0.04em] text-foreground">
                {item.title}
              </h1>
              <p className="mt-3 text-base font-medium leading-relaxed text-foreground/80 sm:text-lg">
                {item.tagline}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>

              {/* Primary Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{item.cta.button}</span>
                  <ArrowUpRight className="size-4" />
                </button>
                <a
                  href="#interactive-showcase"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
                >
                  <span>Explore Architecture</span>
                  <ArrowDownRight className="size-4 text-primary" />
                </a>
              </div>

              {/* Quick Spec Pills with Real Colored Tech Logos */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-primary/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
                  Stack:
                </span>
                {item.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-white/90 px-3 py-1 font-mono text-[11px] font-semibold text-foreground shadow-2xs"
                  >
                    <TechLogo name={tech} size={14} />
                    <span>{tech}</span>
                  </span>
                ))}
                {item.technologies.length > 5 && (
                  <span className="rounded-full border border-border/60 bg-white/60 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    +{item.technologies.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Right Hero Showcase: Elegant 3D Vector Icon Badge */}
            <div className="relative hidden md:flex items-center justify-center">
              <div className="relative size-60 lg:size-72 rounded-[2.25rem] border border-primary/15 bg-gradient-to-br from-white via-[#FCFAF7] to-[#F5ECE3] p-6 shadow-xl flex flex-col items-center justify-center">
                <div className="pointer-events-none absolute inset-5 rounded-[1.6rem] border border-primary/10" />
                <div className="pointer-events-none absolute inset-10 rounded-full border border-dashed border-primary/15" />
                <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/90 px-2.5 py-1 font-mono text-[9px] font-semibold text-emerald-700 shadow-sm">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  SYSTEM ONLINE
                </div>
                <div className="absolute bottom-5 right-5 rounded-xl border border-primary/10 bg-white/90 px-2.5 py-1.5 font-mono text-[9px] text-muted-foreground shadow-sm">
                  <span className="text-primary">99.9%</span> uptime
                </div>
                <div className="relative size-40 lg:size-48 drop-shadow-md">
                  <HeroGraphic className="size-full" />
                </div>
                <div className="mt-2 rounded-full border border-primary/20 bg-white/95 px-3.5 py-1 text-[11px] font-mono font-semibold text-primary shadow-xs">
                  {item.title}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. INTERACTIVE 3D & DASHBOARD SHOWCASE (Right below Hero)
           ============================================================ */}
        <section id="interactive-showcase" data-detail-reveal className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">Live Architecture</p>
                <h2 className="display mt-1 text-2xl sm:text-3xl text-foreground">
                  Interactive {type === "service" ? "Service" : "Product"} Preview
                </h2>
              </div>
              <p className="max-w-md text-xs text-muted-foreground">
                Simulated real-time architecture showcasing the workflows, UI components, and
                telemetry we engineer for {item.title}.
              </p>
            </div>
            <VisualShowcaseWidget slug={item.slug} title={item.title} type={type} />
          </div>
        </section>

        {/* ============================================================
            3. VISUAL SYSTEM STORY
           ============================================================ */}
        <section
          data-detail-reveal
          className="border-y border-foreground/10 bg-white py-12 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="relative min-h-[19rem] overflow-hidden rounded-[2rem] border border-foreground/10 bg-white p-6 text-foreground sm:p-8">
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="eyebrow text-foreground">Designed around outcomes</p>
                    <h2 className="display mt-3 max-w-md text-3xl leading-tight sm:text-4xl">
                      A clearer view of what we build.
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/80">
                      Every screen, integration and workflow is connected to a measurable purpose,
                      so the finished product feels useful from day one.
                    </p>
                  </div>
                  <div className="mt-7 grid max-w-xl grid-cols-3 gap-2">
                    {[
                      ["01", "Discover"],
                      ["02", "Design"],
                      ["03", "Deliver"],
                    ].map(([number, label]) => (
                      <div
                        key={number}
                        className="rounded-xl border border-foreground/15 bg-white p-3"
                      >
                        <span className="font-mono text-[10px] text-foreground">{number}</span>
                        <p className="mt-1 text-xs font-semibold text-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-foreground/10 bg-white p-6 shadow-2xs sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow text-primary">Product signals</p>
                    <h2 className="display mt-2 text-2xl text-foreground sm:text-3xl">
                      Built to stay useful.
                    </h2>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 font-mono text-[10px] font-semibold text-primary">
                    {item.title}
                  </span>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Gauge, label: "Clarity", value: "Focused flows" },
                    { icon: BarChart3, label: "Momentum", value: "Visible progress" },
                    { icon: ShieldCheck, label: "Confidence", value: "Reliable foundations" },
                    { icon: GitBranch, label: "Flexibility", value: "Ready to evolve" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="group rounded-2xl border border-border/70 bg-[#FCFAF7] p-4 transition-colors hover:border-primary/30 hover:bg-secondary/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid size-9 place-items-center rounded-xl bg-white text-primary shadow-2xs">
                          <Icon className="size-4" />
                        </span>
                        <span className="h-1.5 w-12 overflow-hidden rounded-full bg-border">
                          <span className="block h-full w-4/5 rounded-full bg-primary transition-all group-hover:w-full" />
                        </span>
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary/10 bg-secondary/40 px-4 py-3">
                  <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.highlights[0]?.description ??
                      "A practical system shaped around your goals."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. EDITORIAL OVERVIEW & HIGHLIGHTS
           ============================================================ */}
        <section
          id="highlights"
          data-detail-reveal
          className="py-14 md:py-20 border-t border-[#EADCCC]/60 bg-white/40"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div data-detail-reveal>
                <p className="eyebrow text-primary">Overview</p>
                <h2 className="display mt-3 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight text-foreground">
                  Built with purpose. Engineered to last.
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <figure className="mt-7 overflow-hidden rounded-2xl border border-[#E8DDD1] bg-white shadow-2xs">
                  <img
                    src={images.why.src}
                    alt="A calm, considered workspace representing the planning behind the project"
                    className="h-40 w-full object-cover sm:h-48"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Thoughtful systems. Practical outcomes.
                  </figcaption>
                </figure>
              </div>

              {/* Highlights 6-card grid */}
              <div data-detail-reveal>
                <p className="eyebrow text-primary mb-3">
                  {type === "service" ? "What You Get" : "What We Build"}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {item.highlights.map((h, idx) => (
                    <div
                      key={h.title}
                      className="group relative rounded-2xl border border-[#EDE4DB] bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid size-9 place-items-center rounded-xl bg-secondary font-mono text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          0{idx + 1}
                        </span>
                        <Sparkles className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-foreground">{h.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. APPROACH & PROCESS TIMELINE
           ============================================================ */}
        <section
          id="process"
          data-detail-reveal
          className="bg-[#FAF5F0] py-16 md:py-20 border-y border-[#EADCCC]"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow text-primary">Our Approach</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight text-foreground">
                How we deliver {item.title}.
              </h2>
              <p className="mt-3 text-muted-foreground text-sm sm:text-base">
                A predictable, transparent cadence that ensures progress you can review and verify
                at every stage.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {item.process.map((step, idx) => (
                <div
                  key={step.title}
                  data-detail-reveal
                  className="relative flex flex-col justify-between rounded-2xl border border-white/70 bg-white p-7 shadow-xs transition-transform duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary tracking-wider">
                        STEP 0{idx + 1}
                      </span>
                      <span className="size-2 rounded-full bg-primary/40" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Phase Milestone 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            5. IDEAL FOR & WALK-AWAY OUTCOMES
           ============================================================ */}
        <section data-detail-reveal className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Ideal For */}
              <div className="rounded-[2rem] border border-[#E8DDD1] bg-white p-8 md:p-10 shadow-2xs">
                <p className="eyebrow text-primary">Audience Fit</p>
                <h3 className="display mt-3 text-2xl sm:text-3xl text-foreground">
                  Who this is ideal for.
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Tailored solutions designed for teams that value speed, clarity, and dependable
                  engineering.
                </p>
                <ul className="mt-8 space-y-4">
                  {item.idealFor.map((target) => (
                    <li
                      key={target}
                      className="flex items-start gap-3 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-[#FAF5F0] via-white to-[#F5ECE3] p-8 md:p-10 shadow-2xs">
                <p className="eyebrow text-primary">Deliverables</p>
                <h3 className="display mt-3 text-2xl sm:text-3xl text-foreground">
                  What you walk away with.
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Concrete deliverables with clean handover documentation and ongoing support
                  readiness.
                </p>
                <ul className="mt-8 space-y-4">
                  {item.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm font-medium text-foreground"
                    >
                      <span className="grid size-5 place-items-center rounded-full bg-primary text-white text-[11px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. TECHNOLOGIES STACK (With Authentic Colored Brand Logos)
           ============================================================ */}
        <section
          data-detail-reveal
          className="bg-secondary/40 py-14 md:py-20 border-y border-border/50"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="eyebrow text-primary">Technology Stack</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  Proven, modern tools for {item.title}.
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md">
                  Production-grade frameworks and infrastructure chosen for reliability, security,
                  and developer ergonomics.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {item.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 rounded-xl border border-border/70 bg-white px-3.5 py-2 shadow-2xs transition-transform hover:-translate-y-0.5"
                  >
                    <TechLogo name={tech} size={18} />
                    <span className="font-mono text-xs font-semibold text-foreground">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            7. FAQS ACCORDION
           ============================================================ */}
        <section data-detail-reveal className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-12">
            <div className="text-center">
              <p className="eyebrow text-primary">Questions & Answers</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.2rem)] leading-tight text-foreground">
                Common questions about {item.title}.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Practical answers with honest expectations. No hidden fees or invented jargon.
              </p>
            </div>

            <div className="mt-12 rounded-2xl border border-foreground/10 bg-white p-6 sm:p-8 shadow-xs">
              <Accordion type="single" collapsible className="w-full divide-y divide-border/60">
                {item.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-none py-2">
                    <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-1">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============================================================
            8. CALL TO ACTION (CTA)
           ============================================================ */}
        <section data-detail-reveal className="pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-white p-8 text-foreground sm:p-12 md:p-16">
              <div className="relative z-10 max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/70">
                  Ready to start?
                </p>
                <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-tight text-foreground">
                  {item.cta.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/75 sm:text-lg">
                  {item.cta.text}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{item.cta.button}</span>
                    <ArrowUpRight className="size-4" />
                  </button>
                  <Link
                    href={parentRoute}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
                  >
                    <span>All {parentLabel}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            9. BOTTOM NAVIGATOR (NEXT & PREVIOUS)
           ============================================================ */}
        <section className="border-t border-foreground/10 bg-white py-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <Link
                href={`${parentRoute}/${prevItem.slug}`}
                className="group flex items-center gap-3 text-left transition-colors hover:text-primary"
              >
                <span className="grid size-10 place-items-center rounded-full bg-white border border-border shadow-2xs group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowLeft className="size-4" />
                </span>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Previous {type === "service" ? "Service" : "Product"}
                  </span>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {prevItem.title}
                  </span>
                </div>
              </Link>

              <Link
                href={parentRoute}
                className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground text-center"
              >
                View all {parentLabel.toLowerCase()}
              </Link>

              <Link
                href={`${parentRoute}/${nextItem.slug}`}
                className="group flex items-center justify-end gap-3 text-right transition-colors hover:text-primary"
              >
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Next {type === "service" ? "Service" : "Product"}
                  </span>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {nextItem.title}
                  </span>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-white border border-border shadow-2xs group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Dialog Modal */}
      <ProjectInquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
