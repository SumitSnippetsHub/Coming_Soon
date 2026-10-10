"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";

const media =
  "origin-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:scale-[1.07]";

const faces = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80",
];

const appPhoto =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=240&h=240&q=80";

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-[0.6em] place-items-center rounded-[0.13em] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_10px_-4px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04]">
      {children}
    </span>
  );
}

function ChipGroup({ children, tone }: { children: React.ReactNode; tone: "violet" | "green" }) {
  return (
    <span
      aria-hidden
      className={cn(
        media,
        "inline-flex shrink-0 items-center gap-[0.05em] rounded-[0.17em] p-[0.05em]",
        tone === "violet"
          ? "bg-[linear-gradient(135deg,#f3f1ff,#faf9ff)] shadow-[0_10px_26px_-12px_rgba(110,90,220,0.45)] ring-1 ring-[#d9d3ff]"
          : "bg-[linear-gradient(135deg,#f2fbf3,#f8f6ff)] shadow-[0_10px_26px_-12px_rgba(110,90,220,0.4)] ring-1 ring-[#d6e9d4]",
      )}
    >
      {children}
    </span>
  );
}

function VsCode() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.32em]">
      <path
        fill="#007ACC"
        d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
      />
    </svg>
  );
}

function CloudTerminal() {
  return (
    <svg viewBox="0 0 48 48" className="size-[0.38em]">
      <defs>
        <linearGradient id="hero-cloud" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7d8bff" />
          <stop offset="100%" stopColor="#3b4cf0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hero-cloud)"
        d="M14 38c-6 0-10-4-10-9.5 0-4.6 3.2-8.3 7.6-9.2C13 12.4 18.6 8 25 8c7.4 0 13.4 5.6 14 12.8 3.4 1.2 5 4.2 5 7.6C44 33.6 40 38 34.5 38H14Z"
      />
      <path d="m16 20 5 4.5-5 4.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 30h8" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function PixelBot() {
  return (
    <svg viewBox="0 0 16 12" className="size-[0.36em]" shapeRendering="crispEdges">
      <path
        fill="#D97757"
        d="M3 0h10v1h1v3h2v2h-2v2h-1v4h-2v-2H9v2H7v-2H5v2H3V8H2V6H0V4h2V1h1z"
      />
      <path fill="#1a1a1a" d="M5 3h1v2H5zm5 0h1v2h-1z" />
    </svg>
  );
}

function ShopifyBag() {
  return (
    <svg viewBox="0 0 48 48" className="size-[0.36em]">
      <path fill="#95BF47" d="M11 15.5 14 13h20l3 2.5L39 42H9l2-26.5Z" />
      <path fill="#5E8E3E" d="M34 13 37 15.5 39 42h-7l2-29Z" />
      <path d="M18.5 15v-2.5a5.5 5.5 0 0 1 11 0V15" fill="none" stroke="#5E8E3E" strokeWidth="2.4" strokeLinecap="round" />
      <path
        fill="#fff"
        d="M23.6 34.4c-2.4 0-4.2-1-4.9-1.6l1.2-3.1c.9.7 2.4 1.5 3.8 1.5 1 0 1.5-.4 1.5-1 0-.8-.8-1.1-2.2-1.7-1.9-.8-3.4-1.9-3.4-4.1 0-2.6 2.2-4.6 5.6-4.6 1.8 0 3.2.4 4 .9l-1.1 3c-.7-.4-1.8-.8-3-.8-1 0-1.4.4-1.4.9 0 .7.8 1 2.3 1.7 2.1.9 3.3 2.1 3.3 4.1 0 2.7-2.2 4.8-5.7 4.8Z"
      />
    </svg>
  );
}

function StripeS() {
  return (
    <svg viewBox="0 0 24 24" className="size-[0.3em]">
      <path
        fill="#635BFF"
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
      />
    </svg>
  );
}

function AppCard() {
  return (
    <span
      aria-hidden
      className={cn(
        media,
        "relative inline-flex h-[0.74em] w-[1.3em] shrink-0 overflow-hidden rounded-[0.1em] bg-[#1d1914] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] ring-1 ring-black/10",
      )}
    >
      <img
        src={appPhoto}
        alt=""
        width={240}
        height={240}
        className="absolute inset-y-0 right-0 h-full w-[52%] object-cover"
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,#1d1914_0%,#1d1914_44%,rgba(29,25,20,0.55)_62%,transparent_100%)]" />
      <span
        className="relative z-10 flex flex-col justify-center pl-[0.07em] text-left text-[0.14em] leading-[1.1] tracking-normal text-[#f3ede2]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        <span>Your Studio.</span>
        <span className="italic">In their hand.</span>
      </span>
    </span>
  );
}

function Stars() {
  return (
    <span aria-hidden className="flex items-center gap-[2px] text-[#F59E0B]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-[clamp(13px,1.25vw,19px)] fill-current">
          <path d="m10 1.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  const { hero } = site;
  const { scrollTo } = useSmoothScroll();

  const go = (href: string) => (e: React.MouseEvent) => {
    const hash = href.startsWith("#") ? href : href.startsWith("/#") ? `#${href.split("#")[1]}` : null;
    if (!hash) return;
    e.preventDefault();
    scrollTo(document.querySelector(hash) ? hash : window.innerHeight);
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-white text-[#111]"
      style={{ fontFamily: jost }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "8.4vw 8.4vw",
          backgroundPosition: "-1px -1px",
        }}
      />

      <div className="relative flex h-full w-full flex-col px-[3.4vw] pb-[4.5vh] pt-[calc(4.5rem+3vh)] sm:pt-[calc(5rem+3.5vh)]">
        <div className="flex flex-1 items-center">
          <h1
            id="hero-title"
            className="w-full font-medium tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.4rem, min(7.1vw, 14.5vh), 10.5rem)", lineHeight: 1.22 }}
          >
            <span className="flex flex-wrap items-center gap-x-[0.22em] md:flex-nowrap">
              <span className="whitespace-nowrap">Websites,</span>
              <ChipGroup tone="violet">
                <Tile>
                  <VsCode />
                </Tile>
                <Tile>
                  <CloudTerminal />
                </Tile>
                <Tile>
                  <PixelBot />
                </Tile>
              </ChipGroup>
              <span className="whitespace-nowrap">Shops</span>
              <ChipGroup tone="green">
                <Tile>
                  <ShopifyBag />
                </Tile>
                <Tile>
                  <StripeS />
                </Tile>
              </ChipGroup>
            </span>
            <span className="flex flex-wrap items-center gap-x-[0.22em] md:-mr-[3.4vw] md:flex-nowrap">
              <span className="whitespace-nowrap">& Apps,</span>
              <AppCard />
              <span className="whitespace-nowrap">the itself</span>
              <span className="-my-[0.06em] inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[linear-gradient(95deg,#d3f1fb_0%,#dbe7fd_35%,#e6defb_70%,#efe2fb_100%)] py-[0.06em] pl-[0.16em] pr-[0.5em] italic tracking-[-0.04em] md:grow md:rounded-r-none">
                worthwhile
              </span>
            </span>
          </h1>
        </div>

        <div className="grid items-end gap-x-[2vw] gap-y-6 md:grid-cols-[auto_auto] md:justify-between xl:flex">
          <p className="text-[clamp(1.05rem,1.75vw,1.65rem)] md:col-span-2 md:whitespace-nowrap xl:col-span-1 leading-[1.45] tracking-[-0.01em] text-[#111]">
            Custom-designed to generate more qualified inquiries
            <br />
            More sales and less manual labor
            <br />
            in your company.
          </p>

          <div className="flex shrink-0 flex-col items-start gap-2.5 xl:items-center">
            <a
              href={site.primaryCta.href}
              onClick={go(site.primaryCta.href)}
              className="inline-flex items-center whitespace-nowrap gap-[clamp(1.5rem,3.4vw,3.5rem)] rounded-[11px] bg-[#111] py-[clamp(0.8rem,1.2vw,1.1rem)] pl-[clamp(1.1rem,1.6vw,1.5rem)] pr-[clamp(1rem,1.4vw,1.3rem)] text-[clamp(0.85rem,1.2vw,1.15rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
            >
              {site.primaryCta.label}
              <ArrowUpRight className="size-[clamp(0.9rem,1.2vw,1.15rem)]" strokeWidth={2} />
            </a>
            <p className="whitespace-nowrap text-[clamp(0.8rem,1vw,1rem)] text-[#555]">
              Individual solutions starting from €5900
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-[clamp(1rem,2vw,1.75rem)] md:flex-nowrap">
            <div className="flex items-center gap-3">
              <span className={cn(media, "flex items-center")}>
                {faces.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={48}
                    height={48}
                    className={cn(
                      "size-[clamp(2.4rem,3.9vw,3.6rem)] rounded-full object-cover ring-2 ring-white",
                      index > 0 && "-ml-[clamp(0.6rem,1vw,0.9rem)]",
                    )}
                  />
                ))}
              </span>
              <span className="flex flex-col gap-1">
                <Stars />
                <span className="whitespace-nowrap text-[clamp(0.75rem,1.05vw,1rem)] text-[#333]">5 out of 5 stars</span>
              </span>
            </div>
            <a
              href={hero.featured.href}
              onClick={go(hero.featured.href)}
              className={cn(
                media,
                "inline-flex shrink-0 items-center gap-[clamp(0.5rem,0.8vw,0.75rem)] rounded-[8px] border border-black/[0.12] bg-white px-[clamp(0.65rem,1vw,1rem)] py-[clamp(0.45rem,0.75vw,0.7rem)]",
              )}
            >
              <span className="text-[clamp(1.35rem,2.5vw,2.3rem)] font-semibold leading-none tracking-[-0.06em]">W.</span>
              <span className="text-left leading-[1.15]">
                <span className="block text-[clamp(0.6rem,0.85vw,0.85rem)] text-[#555]">Awwwards</span>
                <span className="block text-[clamp(0.72rem,1.05vw,1rem)] font-semibold">Nominated</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
