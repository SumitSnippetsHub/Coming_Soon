import type { NavLink } from "@/lib/types";

// Works in Next.js (NEXT_PUBLIC_SITE_URL). On Vite/Lovable, `process` is undefined, so the
// fallback is used; to configure it there, swap in import.meta.env.VITE_SITE_URL.
const envUrl = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined;

export const site = {
  name: "ZYNOVATE",
  /** TODO: set the real domain before launch. */
  url: (envUrl || "https://www.example.com").replace(/\/$/, ""),
  title: "ZYNOVATE — Build. Launch. Evolve.",
  metaDescription:
    "ZYNOVATE builds custom software, web and mobile apps, SaaS platforms and digital products around your ideas.",
  tagline: "Build. Launch. Evolve.",
  description: "Technology solutions built around your ideas, business, and digital goals.",
  logo: { src: "/brand/zynovate-logo.png", alt: "ZYNOVATE", width: 600, height: 408 },
  // Real routes, not "#contact" (Contact is its own page now).
  primaryCta: { label: "Start a Project", href: "/contact" as const },
  secondaryCta: { label: "Explore Our Work", href: "/works" as const },
  trustLine: ["Custom software", "Web & mobile", "SaaS", "Product engineering"],

  /** Hero copy. TODO: replace with client wording when available. */
  hero: {
    eyebrow: "Technology & software company",
    // TODO: confirm availability wording with the client before launch.
    status: "Open for new projects",
    lead: "We design and engineer websites, web and mobile apps, SaaS platforms and custom software, taking ideas from a first sketch to a product that is live, reliable and ready to grow.",
    support:
      "Bring us a clear requirement, a rough idea, or an existing product that needs to evolve. We shape it, build it properly, and stay with you after launch.",
    pillars: [
      {
        index: "01",
        title: "Build",
        text: "Websites, apps and custom software engineered around your requirements.",
      },
      {
        index: "02",
        title: "Launch",
        text: "Tested, responsive and production-ready, deployed with care.",
      },
      {
        index: "03",
        title: "Evolve",
        text: "Support, improvements and new features as your business grows.",
      },
    ],
    tracks: [
      { label: "Service-based", text: "Custom projects built around your brief" },
      { label: "Product-based", text: "Scalable platforms, tools and SaaS" },
    ],
    // Amrut.ai is the client's real, verified project.
    featured: {
      label: "Featured build",
      title: "Amrut.ai",
      text: "AI visibility platform",
      href: "/works",
    },
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Works", href: "/works" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
};
