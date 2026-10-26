import type { ImageAsset } from "@/lib/types";

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export const images = {
  // TODO: replace with client content (check Unsplash license / credit)
  hero: {
    src: unsplash("photo-1497366216548-37526070297c", 2400, 1600),
    width: 2400,
    height: 1600,
    alt: "Bright, warm modern workspace with desks and natural light",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  /** Open Graph / Twitter card: the hero photo cropped to 1200×630. */
  og: {
    src: unsplash("photo-1497366216548-37526070297c", 1200, 630),
    width: 1200,
    height: 630,
    alt: "grow2gether — websites, shops and apps.",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  /** Decorative section backgrounds: empty alt so screen readers skip them. */
  why: {
    src: unsplash("photo-1618221195710-dd6b41faaea6", 2400, 1600),
    width: 2400,
    height: 1600,
    alt: "",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  cta: {
    src: unsplash("photo-1521737604893-d14cc237f11d", 2400, 1600),
    width: 2400,
    height: 1600,
    alt: "",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  amrut: {
    homeHero: {
      src: "/projects/amrut/home-hero.png",
      width: 1811,
      height: 838,
      alt: "Amrut.ai home page with the headline about AI visibility and a call to action",
    },
    dashboard: {
      src: "/projects/amrut/dashboard-ai-visibility.png",
      width: 1146,
      height: 623,
      alt: "Amrut.ai AI visibility dashboard showing visibility score and share of voice",
    },
    llmsTxt: {
      src: "/projects/amrut/llms-txt-generator.png",
      width: 1310,
      height: 725,
      alt: "Amrut.ai LLMS.txt generator form",
    },
    about: {
      src: "/projects/amrut/about-page.png",
      width: 1251,
      height: 851,
      alt: "Amrut.ai about page describing the company",
    },
    toolsGrid: {
      src: "/projects/amrut/tools-grid.png",
      width: 1210,
      height: 140,
      alt: "Amrut.ai grid of free SEO tools",
    },
    mobileHome: {
      src: "/projects/amrut/mobile-home.png",
      width: 337,
      height: 732,
      alt: "Amrut.ai home screen on a phone",
    },
    enginesStrip: {
      src: "/projects/amrut/ai-engines-strip.png",
      width: 1822,
      height: 50,
      alt: "Logos of the AI engines Amrut.ai supports",
    },
  },
} satisfies Record<string, ImageAsset | Record<string, ImageAsset>>;

export const projectStills = {
  seatsBrokers: shot("/projects/seats-brokers.jpg", "SeatsBrokers homepage — technology powering professional broker operations"),
  seatsConnect: shot("/projects/seats-connect.jpg", "SeatsConnect homepage — global events, one B2B connection"),
  silverStitch: shot("/projects/silver-stitch.jpg", "The Silver Stitch homepage — The Collection of handcrafted designer blouses"),
  tyagRaj: shot("/projects/tyag-raj-law-firm.png", "Tyag Raj Law Firm homepage — advocates Sumit Tyagi and Vishaw Pratap"),
  tyagiAssociates: shot("/projects/tyagi-and-associates.png", "Tyagi & Associates homepage — advocates and legal consultants in Delhi NCR"),
  zenmen: shot("/projects/zenmen.jpg", "Zenmen homepage — Command Every Room, bespoke tailoring"),
  blessingMens: shot("/projects/blessing-mens.jpg", "Blessings Mens Boutique homepage — Crafted for the Modern Groom"),
  anuraagKaushik: shot("/projects/anuraag-kaushik.png", "Anuraag Kaushik homepage — bridal beauty, gilded with quiet drama"),
  seatsGroup: shot("/projects/seats-group.jpg", "SeatsGroup homepage — powering the future of ticketing and live experiences"),
  zynovate: shot("/projects/zynovate.jpg", "Zynovate homepage — Build. Launch. Evolve."),
} satisfies Record<string, ImageAsset>;

function shot(src: string, alt: string): ImageAsset {
  return { src, width: 1920, height: 1080, alt };
}
