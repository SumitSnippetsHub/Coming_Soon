import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { about } from "@/data/about";
import { team, leadershipIntro } from "@/data/team";
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
      className="relative bg-foreground text-background"
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
                <span className="ml-3 text-background/70">
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
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-background/80">
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

        {/* Leadership */}
        {team.length > 0 && (
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-12 md:py-28">
            <p className="eyebrow text-about-highlight">{leadershipIntro.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-tight">
              <HighlightZynovate text={leadershipIntro.title} />
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/75">
              <HighlightZynovate text={leadershipIntro.description} />
            </p>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-3xl">
              {team.map((member) => (
                <article key={member.name} data-leader className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    {member.image && (
                      <img
                        src={member.image.src}
                        alt={member.image.alt}
                        width={member.image.width}
                        height={member.image.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        draggable={false}
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20">
                      <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-white/80">{member.role}</p>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-white/85 transition-colors hover:text-white hover:underline"
                        >
                          <Mail className="size-3.5 opacity-80" />
                          <span>{member.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
