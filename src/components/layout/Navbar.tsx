import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Blocks,
  Braces,
  ChevronDown,
  Cloud,
  Globe2,
  Layers3,
  Menu,
  PenTool,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { services } from "@/data/services";
import { products } from "@/data/products";
import type { Product, Service } from "@/lib/types";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";
import { ProjectInquiryModal } from "@/components/layout/ProjectInquiryModal";

const serviceIcons: Record<string, LucideIcon> = {
  Globe2,
  Smartphone,
  Blocks,
  Cloud,
  PenTool,
  Braces,
  Workflow,
  Wrench,
};

const productIcons: LucideIcon[] = [Layers3, Blocks, Sparkles, Workflow, Globe2, PenTool];

function hasServiceIcon(item: Service | Product): item is Service {
  return "icon" in item;
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; right: number } | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const listRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Hide on scroll down, show on scroll up
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

  // Active section tracking
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.slice(1) || null);
      return;
    }
    const ids = site.nav.map((l) => l.href.slice(1));
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
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const el = active ? linkRefs.current[active] : null;
    if (!el || !listRef.current) return setIndicator(null);
    const parent = listRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - parent.left, right: parent.right - r.right });
  }, [active]);

  // Mobile menu: Esc + focus trap + lock, focus returns to the toggle on close
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
    if (!href.startsWith("#")) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollTo(document.querySelector(href) ? href : 0), open ? 300 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-500 ease-[var(--ease-out-expo)]",
          hidden && "-translate-y-[140%]",
        )}
        onFocus={() => setHidden(false)}
      >
        <nav
          aria-label="Primary"
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2"
        >
          <a
            href="/"
            onClick={pathname === "/" ? go("#top") : undefined}
            aria-label="ZYNOVATE home"
            className="shrink-0"
          >
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-10 w-auto"
            />
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 bg-secondary transition-[clip-path,opacity] duration-500 ease-[var(--ease-out-expo)]",
                !indicator && "opacity-0",
              )}
              style={
                indicator
                  ? { clipPath: `inset(0 ${indicator.right}px 0 ${indicator.left}px round 999px)` }
                  : undefined
              }
            />
            {site.nav.map((l) => {
              const id = l.href.startsWith("/") ? l.href.slice(1) : l.href.slice(1);
              const isServices = l.href === "/services";
              const isProducts = l.href === "/products";
              const dropdownItems = isServices ? services : isProducts ? products : null;
              return (
                <li key={l.href} className={cn("group relative", dropdownItems && "pb-2 -mb-2")}>
                  <a
                    ref={(el) => {
                      linkRefs.current[id] = el;
                    }}
                    href={l.href}
                    onClick={go(l.href)}
                    aria-current={active === id ? "page" : undefined}
                    aria-haspopup={dropdownItems ? "true" : undefined}
                    className="relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm text-foreground/75 transition-colors hover:text-foreground aria-[current]:text-foreground"
                  >
                    {l.label}
                    {dropdownItems ? (
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                    ) : null}
                  </a>
                  {dropdownItems ? (
                    <div className="invisible absolute left-1/2 top-full z-50 w-[24rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-2 rounded-2xl border border-border/80 bg-background/95 p-1.5 opacity-0 shadow-[0_18px_45px_-20px_rgba(43,26,16,0.35)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="grid grid-cols-2 gap-1">
                        {dropdownItems.map((item, index) => {
                          const Icon = hasServiceIcon(item)
                            ? (serviceIcons[item.icon] ?? Sparkles)
                            : (productIcons[index % productIcons.length] ?? Sparkles);
                          return (
                            <a
                              key={item.title}
                              href={isServices ? "/services" : "/products"}
                              className="group/item min-w-0 rounded-xl p-1.5 transition-colors hover:bg-secondary focus-visible:bg-secondary"
                            >
                              <span className="grid size-6 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                                <Icon className="size-3.5" />
                              </span>
                              <span className="mt-1 block text-[0.64rem] font-semibold leading-tight text-foreground">
                                {item.title}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                      <a
                        href={l.href}
                        className="mt-1 flex items-center justify-between rounded-xl border-t border-border px-3 py-3 text-xs font-semibold text-primary hover:bg-secondary"
                      >
                        Explore all {l.label.toLowerCase()}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setProjectModalOpen(true)}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-4" />
            </button>
            <button
              ref={toggleRef}
              type="button"
              suppressHydrationWarning
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full bg-secondary text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
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
          "fixed inset-0 z-[70] flex flex-col bg-background px-6 pb-10 pt-6 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="flex items-center justify-between">
          <img
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            loading="lazy"
            className="h-10 w-auto"
          />
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="grid size-11 place-items-center rounded-full bg-secondary"
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
                onClick={go(l.href)}
                tabIndex={open ? 0 : -1}
                className="display block py-1 text-[clamp(2.5rem,11vw,4rem)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between text-sm text-muted-foreground">
          <a
            href={`mailto:${contact.email}`}
            tabIndex={open ? 0 : -1}
            className="transition-colors hover:text-primary"
          >
            {contact.email}
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setProjectModalOpen(true);
            }}
            tabIndex={open ? 0 : -1}
            className="rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            {site.primaryCta.label}
          </button>
        </div>
      </div>
      <ProjectInquiryModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  );
}
