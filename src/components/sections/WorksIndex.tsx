"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { IntroBackdrop } from "@/components/motion/IntroBackdrop";
import { site } from "@/data/site";
import { projects, workIntro } from "@/data/projects";
import { whyIntro } from "@/data/whyUs";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";
const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const ALL = "All";

function Title({ text }: { text: string }) {
  if (!text.includes("ō")) return <>{text}</>;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split("ō").map((part, i) => (
          <span key={i}>
            {i > 0 && (
              <span className="relative inline-block">
                o
                <span className="absolute inset-x-[0.07em] top-[0.2em] h-[0.07em] bg-current" />
              </span>
            )}
            {part}
          </span>
        ))}
      </span>
    </>
  );
}

export function WorksIndex() {
  const filters = useMemo(() => {
    const cats = [...new Set(projects.map((project) => project.category).filter(Boolean))];
    return [ALL, ...cats];
  }, []);
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? projects : projects.filter((project) => project.category === active);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const title = titleRef.current;
    if (!header || !title) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      {
        mobile: "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        desktop: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      },
      (ctx) => {
        gsap.to(title, {
          y: ctx.conditions?.mobile ? 78 : 230,
          ease: "none",
          scrollTrigger: {
            trigger: header,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      },
    );
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section
      aria-labelledby="works-title"
      className="relative isolate bg-[#fbfdfe] pb-[clamp(4rem,9vw,8rem)] text-[#111]"
      style={{ fontFamily: jost }}
    >
      <IntroBackdrop />
      <header
        ref={headerRef}
        className="relative z-0 mx-auto max-w-[1425px] px-6 pt-[clamp(8.25rem,11vw,9.4rem)] pb-[clamp(1.75rem,3.4vw,2.8rem)] md:px-8"
      >
        <div ref={titleRef} className="will-change-transform">
          <h1
            id="works-title"
            className="text-center font-medium leading-none tracking-[-0.05em]"
            style={{ fontSize: "clamp(3.6rem, 11.2vw, 10rem)" }}
          >
            Our{" "}
            <em className="font-normal tracking-[-0.03em]" style={{ fontFamily: serif }}>
              Works
            </em>
          </h1>
        </div>

        <p className="relative z-[1] mx-auto mt-[clamp(1.15rem,2.2vw,1.85rem)] max-w-[42rem] text-center text-[clamp(1.02rem,1.55vw,1.28rem)] font-medium leading-[1.45] tracking-[-0.03em] text-black/58">
          {workIntro.pageLeadBefore}{" "}
          <span
            className={`mx-[0.22em] inline-block h-[1.38em] w-[2.28em] shrink-0 -translate-y-[0.14em] overflow-hidden rounded-[0.42em] bg-[#1b1f2e] align-middle shadow-[0_10px_20px_-12px_rgba(20,20,40,0.55)] ring-1 ring-black/10 ${ease} origin-center transition-transform duration-500 hover:scale-[1.06]`}
          >
            <img
              src={whyIntro.founder.photo.src}
              alt=""
              width={160}
              height={96}
              className="h-full w-full object-cover object-[center_18%]"
            />
          </span>{" "}
          <em className="font-normal tracking-[-0.03em]" style={{ fontFamily: serif }}>
            {whyIntro.founder.name}
          </em>{" "}
          {workIntro.pageLeadAfter}
        </p>
      </header>

      <div className="relative z-10 mx-auto max-w-[1425px] px-6 pb-[clamp(2rem,4vw,3.5rem)] md:px-8">
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mx-auto flex max-w-[52rem] flex-wrap items-center justify-center gap-2.5"
        >
          {filters.map((filter) => {
            const on = filter === active;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(filter)}
                className={cn(
                  "rounded-full border px-[1.05rem] py-[0.55rem] text-[0.92rem] font-medium tracking-[-0.01em] transition-colors duration-300",
                  on
                    ? "border-[#111] bg-[#111] text-white"
                    : "border-black/[0.12] bg-white/90 text-[#111] backdrop-blur-[2px] hover:border-black/30",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="relative z-10 mx-auto grid w-[min(92vw,1240px)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const image = project.preview ?? project.screenshots?.cover;
          const href = project.url && project.url !== "#" ? project.url : "/#contact";
          const external = href.startsWith("http");
          const linkProps = external ? { target: "_blank" as const, rel: "noreferrer" } : {};
          return (
            <li key={project.id}>
              <article className="work-card group">
                <div className="work-card-inner p-2.5">
                  <a href={href} {...linkProps} className="relative block overflow-hidden rounded-[16px] bg-[#f4f4f4]">
                    {image ? (
                      <img
                        src={image.src}
                        alt={image.alt || project.title}
                        width={image.width ?? 960}
                        height={image.height ?? 600}
                        className={`aspect-[16/10] w-full object-cover transition-[filter,transform] duration-500 ${ease} group-hover:scale-[1.05] group-hover:blur-[10px]`}
                      />
                    ) : (
                      <div className="grid aspect-[16/10] place-items-center text-sm text-black/40">{project.title}</div>
                    )}
                    <span
                      className={`pointer-events-none absolute inset-0 grid place-items-center bg-black/10 text-[clamp(1.35rem,2vw,1.75rem)] italic tracking-[-0.03em] text-white opacity-0 transition-opacity duration-500 ${ease} group-hover:opacity-100`}
                      style={{ fontFamily: serif }}
                    >
                      View Project
                    </span>
                  </a>
                  <div className="flex items-end justify-between gap-4 px-1 pb-1 pt-4">
                    <div>
                      <p className="text-[1.2rem] font-medium tracking-[-0.03em]">
                        <Title text={project.title} />
                      </p>
                      <p className="mt-0.5 text-[0.88rem] text-black/45">{project.category}</p>
                    </div>
                    <a
                      href={href}
                      {...linkProps}
                      className="shrink-0 pb-0.5 text-[0.88rem] text-black/45 transition-colors hover:text-[#111]"
                    >
                      Visit site
                    </a>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="relative z-10 mt-16 text-center text-[1.05rem] text-black/50">No projects in this category yet.</p>
      ) : null}

      <div className="relative z-10 mt-[clamp(3.5rem,7vw,6rem)] flex flex-col items-center gap-4 text-center">
        <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] tracking-[-0.02em]">Have a project in mind?</p>
        <a
          href={site.primaryCta.href}
          className="inline-flex items-center gap-10 rounded-[11px] bg-[#111] py-[0.85rem] pl-5 pr-4 text-[0.95rem] font-medium text-white transition-colors duration-300 hover:bg-black"
        >
          {site.primaryCta.label}
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
