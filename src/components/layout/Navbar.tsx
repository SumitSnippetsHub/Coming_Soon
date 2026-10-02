import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { contact } from "@/data/contact";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const listRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useLayoutEffect(() => {
    const el = active ? linkRefs.current[active] : null;
    if (!el || !listRef.current) return setIndicator(null);
    const parent = listRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - parent.left, width: r.width });
  }, [active]);

  // Mobile menu: Esc + focus trap + lock
  useEffect(() => {
    if (!open) return;
    const root = menuRef.current;
    const focusables = root?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
      >
        <nav
          aria-label="Primary"
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2"
        >
          <a href="#top" onClick={go("#top")} aria-label="ZYNOVATE home" className="shrink-0">
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-10 w-auto"
            />
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            {indicator && (
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-full bg-secondary transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
            {site.nav.map((l) => {
              const id = l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    ref={(el) => {
                      linkRefs.current[id] = el;
                    }}
                    href={l.href}
                    onClick={go(l.href)}
                    aria-current={active === id ? "true" : undefined}
                    className="relative z-10 block rounded-full px-4 py-2 text-sm text-foreground/75 transition-colors hover:text-foreground aria-[current]:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full bg-secondary text-foreground lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-background px-6 pb-10 pt-6 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="flex items-center justify-between">
          <img src={site.logo.src} alt="" className="h-10 w-auto" />
          <button
            type="button"
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
                "transition-all duration-700 ease-[var(--ease-out-expo)]",
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
          <span>{contact.email}</span>
          <a
            href={site.primaryCta.href}
            onClick={go(site.primaryCta.href)}
            tabIndex={open ? 0 : -1}
            className="rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            {site.primaryCta.label}
          </a>
        </div>
      </div>
    </>
  );
}
