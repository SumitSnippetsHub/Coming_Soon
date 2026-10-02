import type { ImageAsset } from "@/lib/types";

export const images = {
  // TODO: replace with client content (check Unsplash license / credit)
  hero: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
    alt: "Bright, warm modern workspace with desks and natural light",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  amrut: {
    homeHero: { src: "/projects/amrut/home-hero.png", alt: "Amrut.ai home page hero" },
    dashboard: {
      src: "/projects/amrut/dashboard-ai-visibility.png",
      alt: "Amrut.ai AI visibility dashboard",
    },
    llmsTxt: { src: "/projects/amrut/llms-txt-generator.png", alt: "Amrut.ai LLMS.txt generator" },
    about: { src: "/projects/amrut/about-page.png", alt: "Amrut.ai about page" },
    toolsGrid: { src: "/projects/amrut/tools-grid.png", alt: "Amrut.ai free tools grid" },
    mobileHome: { src: "/projects/amrut/mobile-home.png", alt: "Amrut.ai mobile home screen" },
    enginesStrip: { src: "/projects/amrut/ai-engines-strip.png", alt: "Supported AI engines" },
  },
} satisfies Record<string, ImageAsset | Record<string, ImageAsset>>;
