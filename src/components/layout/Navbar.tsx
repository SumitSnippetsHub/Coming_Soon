"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { ProjectInquiryModal } from "@/components/layout/ProjectInquiryModal";

function sectionId(href: string) {
  if (href === "/") return "home";
  const hash = href.split("#")[1];
  return hash || href.replace(/^\//, "");
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M7 23c3.2-8.4 6.2-13.2 8.4-13.2 1.6 0 2.2 2.4 1.8 5.6"
        fill="none"
        stroke="#3B6CFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M12.5 18.5c2.4 3.6 6.6 5.2 10.2 3.2"
        fill="none"
        stroke="#22A06B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="23.2" cy="10.2" r="3.3" fill="#F5A524" />
      <circle cx="10.2" cy="11.4" r="2.15" fill="#7C5CFF" />
      <path d="M18 8.2c1.4 1.2 2 2.6 1.6 4.2" fill="none" stroke="#FF5C8A" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [lang, setLang] = useState<"DE" | "EN">("EN");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!open) setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.slice(1) || null);
      return;
    }
    setActive("home");
    const ids = site.nav.filter((l) => l.href !== "/").map((l) => sectionId(l.href));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onTop = () => window.scrollY < 200 && setActive("home");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const root = menuRef.current;
    const focusables = root?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash || pathname !== "/") {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollTo(document.querySelector(hash) ? hash : 0), open ? 300 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:top-[1.1rem]",
          hidden && "-translate-y-[140%]",
        )}
        style={{ fontFamily: "var(--font-jost), ui-sans-serif, system-ui, sans-serif" }}
        onFocus={() => setHidden(false)}
      >
        <div className="mx-auto w-full max-w-[1240px] rounded-[18px] bg-[linear-gradient(90deg,#cdd6ff_0%,#e9e6f5_22%,#ededed_50%,#f3e6ee_78%,#ffd9c4_100%)] p-px shadow-[0_14px_40px_-26px_rgba(80,70,140,0.45)] sm:w-[84.5vw]">
        <nav
          aria-label="Primary"
          className="flex w-full items-center justify-between gap-3 rounded-[17px] bg-white/[0.97] py-[0.45rem] pl-4 pr-[0.45rem] backdrop-blur-md sm:pl-6"
        >
          <a
            href="/"
            onClick={pathname === "/" ? go("#top") : undefined}
            aria-label={`${site.name} home`}
            className="flex shrink-0 items-center gap-1 text-black"
          >
            <LogoMark className="size-6 sm:size-7" />
            <span className="text-[1.15rem] font-semibold tracking-[-0.045em] sm:text-[1.3rem]">{site.name}</span>
          </a>

          <ul className="hidden min-w-0 items-center justify-center gap-x-5 xl:flex 2xl:gap-x-7">
            {site.nav.map((l) => {
              const id = sectionId(l.href);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={l.href === "/" && pathname === "/" ? go("#top") : go(l.href)}
                    aria-current={active === id ? "page" : undefined}
                    className="whitespace-nowrap text-[13.5px] font-medium tracking-[-0.01em] text-black transition-colors hover:text-black/55"
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-2.5 text-[13px] font-medium sm:flex" aria-label="Language">
              {(["DE", "EN"] as const).map((code, index) => (
                <span key={code} className="flex items-center gap-2.5">
                  {index > 0 ? <span aria-hidden className="h-3.5 w-px bg-black/25" /> : null}
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={cn(
                      "underline-offset-[5px] transition-colors",
                      lang === code ? "font-semibold text-black underline decoration-[1.5px]" : "text-black/70 hover:text-black",
                    )}
                  >
                    {code}
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setProjectModalOpen(true)}
              className="hidden items-center gap-9 rounded-[10px] bg-[#111] py-[0.7rem] pl-4 pr-3.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-black sm:inline-flex"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </button>
            <button
              ref={toggleRef}
              type="button"
              suppressHydrationWarning
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-black/10 bg-white text-black xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-white px-6 pb-10 pt-6 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] xl:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <LogoMark className="size-7" />
            {site.name}
          </span>
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="grid size-11 place-items-center rounded-full border border-black/10"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-14 flex flex-1 flex-col gap-2">
          {site.nav.map((l, i) => (
            <li
              key={l.href}
              className={cn(
                "transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={l.href === "/" && pathname === "/" ? go("#top") : go(l.href)}
                aria-current={active === sectionId(l.href) ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                className="display block py-1 text-[clamp(2.5rem,11vw,4rem)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between gap-4 text-sm text-black/70">
          <div className="flex items-center gap-2 font-semibold">
            <button type="button" tabIndex={open ? 0 : -1} onClick={() => setLang("DE")} aria-pressed={lang === "DE"} className={lang === "DE" ? "text-black" : "text-black/35"}>
              DE
            </button>
            <span aria-hidden className="h-4 w-px bg-black/15" />
            <button type="button" tabIndex={open ? 0 : -1} onClick={() => setLang("EN")} aria-pressed={lang === "EN"} className={lang === "EN" ? "text-black" : "text-black/35"}>
              EN
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setProjectModalOpen(true);
            }}
            tabIndex={open ? 0 : -1}
            className="rounded-full bg-black px-5 py-3 font-medium text-white"
          >
            {site.primaryCta.label}
          </button>
        </div>
        <a
          href={`mailto:${contact.email}`}
          tabIndex={open ? 0 : -1}
          className="mt-4 text-sm text-black/60 transition-colors hover:text-black"
        >
          {contact.email}
        </a>
      </div>
      <ProjectInquiryModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  );
}
