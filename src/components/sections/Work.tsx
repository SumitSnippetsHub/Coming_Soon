"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { projects, workIntro } from "@/data/projects";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const media = `origin-center transition-transform duration-500 ${ease} will-change-transform`;

/* Inverse of the thumbnail's `md:[@media(hover:hover)_and_(pointer:fine)]:hidden`. */
const NO_HOVER_QUERY = "(hover: none), (pointer: coarse), (max-width: 767px)";

type Mode = "full" | "reduced" | "none";

const items = projects.filter((p) => p.preview);
const pad = (n: number) => String(n + 1).padStart(2, "0");
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Jost positions the macron of "ō" over the following letter, so it is drawn by hand. */
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

function usePreviewMode(): Mode {
  const [mode, setMode] = useState<Mode>("none");
  useEffect(() => {
    const noHover = window.matchMedia(NO_HOVER_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setMode(noHover.matches ? "none" : reduced.matches ? "reduced" : "full");
    update();
    noHover.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      noHover.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return mode;
}

/** Vertical slide stack: items above the current one sit at -100%, below at +100%. Only the outgoing and incoming items animate, so skipped items never cross the frame. */
function stackClass(i: number, cur: number, prev: number, reduced: boolean) {
  const moving = i === cur || i === prev;
  if (reduced) return cn(i === cur ? "opacity-100" : "opacity-0", moving && "transition-opacity duration-300");
  return cn(
    i === cur ? "translate-y-0" : i < cur ? "-translate-y-full" : "translate-y-full",
    moving && `transition-transform duration-700 ${ease}`,
  );
}

export function Work() {
  const mode = usePreviewMode();
  const area = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const follower = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, inside: false, fresh: true });
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState({ cur: 0, prev: 0 });

  const hover = (i: number) => {
    setActive(i);
    setShown((s) => (s.cur === i ? s : { cur: i, prev: s.cur }));
  };

  // Scale/fade the card in and out.
  useEffect(() => {
    const el = card.current;
    if (!el || mode === "none") return;
    const on = active !== null;
    gsap.killTweensOf(el);
    if (mode === "reduced") {
      gsap.set(el, { scale: 1 });
      gsap.to(el, { autoAlpha: on ? 1 : 0, duration: 0.3, ease: "power1.out" });
    } else {
      gsap.to(el, {
        scale: on ? 1 : 0.6,
        autoAlpha: on ? 1 : 0,
        duration: on ? 0.7 : 0.45,
        ease: on ? "expo.out" : "power3.out",
      });
    }
  }, [active, mode]);

  // Reduced motion: no follow, the card sits beside the hovered row.
  useEffect(() => {
    const el = follower.current;
    const row = active !== null ? rows.current[active] : null;
    if (mode !== "reduced" || !el || !row) return;
    el.style.left = "46%";
    el.style.transform = `translate3d(-50%, ${row.offsetTop + row.offsetHeight / 2 - el.offsetHeight / 2}px, 0)`;
  }, [active, mode]);

  // Full motion: lerped follow with velocity tilt.
  useEffect(() => {
    const box = area.current;
    const el = follower.current;
    if (mode !== "full" || !box || !el) return;
    const p = pointer.current;
    const s = { x: 0, y: 0, rot: 0 };
    el.style.left = "0px";
    let raf = 0;
    let idle = 0;

    const tick = () => {
      const rect = box.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const tx = clamp(p.x - rect.left, w / 2, rect.width - w / 2);
      const ty = p.y - rect.top;
      if (p.fresh) {
        s.x = tx;
        s.y = ty;
        p.fresh = false;
      }
      const px = s.x;
      s.x += (tx - s.x) * 0.11;
      s.y += (ty - s.y) * 0.11;
      const vx = s.x - px;
      s.rot += (clamp(vx * 0.35, -9, 9) - s.rot) * 0.12;
      el.style.transform = `translate3d(${s.x - w / 2}px, ${s.y - h / 2}px, 0) rotate(${s.rot}deg) skewX(${-s.rot * 0.35}deg)`;

      idle = !p.inside && Math.abs(vx) < 0.05 && Math.abs(s.rot) < 0.05 ? idle + 1 : 0;
      raf = idle > 40 ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      p.x = e.clientX;
      p.y = e.clientY;
      start();
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      p.inside = true;
      if (!raf) p.fresh = true;
      move(e);
    };
    const leave = () => {
      p.inside = false;
      setActive(null);
    };

    box.addEventListener("pointerenter", enter);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("pointerenter", enter);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
    };
  }, [mode]);

  const reduced = mode === "reduced";

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-x-clip bg-white text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div className="px-5 pb-[clamp(4rem,8vw,7.5rem)] pt-[clamp(3rem,6vw,6rem)] md:px-[3.4vw]">
        <div className="flex flex-col-reverse gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="text-[clamp(1rem,1.4vw,1.35rem)] tracking-[-0.015em] text-[#111]">{workIntro.lead}</p>
          <h2
            id="work-title"
            className="text-left font-medium leading-[0.98] tracking-[-0.045em] md:text-right"
            style={{ fontSize: "clamp(3rem, 6.9vw, 7.5rem)" }}
          >
            <span className="block">{workIntro.headingTop}</span>
            <span className="block pr-[0.04em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
              {workIntro.headingBottom}
            </span>
          </h2>
        </div>

        <div ref={area} className="relative mt-[clamp(2.25rem,4vw,3.75rem)]">
          <ul onPointerLeave={() => setActive(null)}>
            {items.map((project, i) => {
              const on = active === i;
              const dim = active !== null && !on;
              return (
                <li
                  key={project.id}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  onPointerEnter={(e) => e.pointerType !== "touch" && mode !== "none" && hover(i)}
                  className="group relative"
                >
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px", i === 0 ? "bg-[#111]" : "bg-black/10")} />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-px origin-left bg-[#111] transition-transform duration-700",
                      ease,
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <div
                    className={cn(
                      "grid gap-3 py-[clamp(1.25rem,2.3vw,2.25rem)] transition-opacity duration-500 md:grid-cols-[57%_1fr] md:items-center md:gap-0",
                      dim && "opacity-35",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4 md:pr-8">
                      <h3
                        className="relative font-semibold leading-[1.1] tracking-[-0.045em]"
                        style={{ fontSize: "clamp(2rem, 3.8vw, 4rem)" }}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 text-[0.36em] font-medium tracking-normal text-[#111]/55 transition-[opacity,transform] duration-500",
                            ease,
                            on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                          )}
                        >
                          {pad(i)}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-[0.3em] transition-transform duration-500",
                            ease,
                            on && "translate-x-[0.6em]",
                          )}
                        >
                          <span>
                            <Title text={project.title} />
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            strokeWidth={2}
                            className={cn(
                              "size-[0.6em] transition-[opacity,transform] duration-500",
                              ease,
                              on ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-2 translate-y-2 opacity-0",
                            )}
                          />
                        </span>
                      </h3>
                      <span className="block aspect-[16/10] w-[clamp(6rem,26vw,9rem)] shrink-0 overflow-hidden rounded-[10px] bg-black/5 md:[@media(hover:hover)_and_(pointer:fine)]:hidden">
                        <img
                          src={project.preview!.src}
                          alt=""
                          width={project.preview!.width}
                          height={project.preview!.height}
                          loading="lazy"
                          decoding="async"
                          className={cn(media, "h-full w-full object-cover group-hover:scale-[1.07] group-active:scale-[1.07]")}
                        />
                      </span>
                    </div>
                    <div className="max-w-[29rem]">
                      <p className="text-[clamp(0.95rem,1.15vw,1.15rem)] font-semibold leading-[1.4] tracking-[-0.01em]">
                        {project.category}
                      </p>
                      <p className="mt-1.5 text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.55] text-[#111]/85">
                        {project.description ?? project.summary}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <span aria-hidden className="block h-px bg-black/10" />

          {mode !== "none" && (
            <div
              ref={follower}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 w-[27vw] min-w-[300px] max-w-[520px] will-change-transform"
            >
              <div ref={card} className="invisible relative opacity-0" style={{ transform: "scale(0.6)" }}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#f2f2f2] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45),0_10px_24px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06]">
                  {items.map((project, i) => (
                    <div key={project.id} className={cn("absolute inset-0 overflow-hidden", stackClass(i, shown.cur, shown.prev, reduced))}>
                      <img
                        src={project.preview!.src}
                        alt=""
                        width={project.preview!.width}
                        height={project.preview!.height}
                        decoding="async"
                        className={cn(
                          "h-full w-full object-cover object-top",
                          !reduced && `transition-transform duration-[900ms] ${ease}`,
                          !reduced && (i === shown.cur ? "scale-100" : "scale-[1.18]"),
                        )}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-[1.1rem] left-5 flex h-9 items-center overflow-hidden rounded-full bg-[#111] pl-1.5 pr-4 text-[13.5px] font-medium text-white shadow-[0_8px_18px_-8px_rgba(0,0,0,0.5)]">
                  <span className="mr-2.5 grid h-6 place-items-center rounded-full bg-white/15 px-2 tabular-nums">
                    {pad(shown.cur)}
                  </span>
                  <span className="relative block h-9 overflow-hidden">
                    <span className="invisible block whitespace-nowrap leading-9">{items[shown.cur]?.category}</span>
                    {items.map((project, i) => (
                      <span
                        key={project.id}
                        className={cn(
                          "absolute inset-0 whitespace-nowrap leading-9",
                          stackClass(i, shown.cur, shown.prev, reduced),
                        )}
                      >
                        {project.category}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
