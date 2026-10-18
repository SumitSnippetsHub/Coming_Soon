import type { NavLink } from "@/lib/types";

const envUrl = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined;

export const site = {
  name: "grow2gether",
  url: (envUrl || "https://grow2gether.com").replace(/\/$/, ""),
  title: "grow2gether — Websites, shops and apps",
  metaDescription:
    "grow2gether designs websites, shops and apps that bring in more qualified inquiries, more sales and less manual work.",
  tagline: "Websites, shops and apps.",
  description:
    "Custom-designed websites, shops and apps that generate more qualified inquiries.",
  logo: { src: "/brand/zynovate-logo.png", alt: "grow2gether", width: 600, height: 408 },
  primaryCta: { label: "Discuss your project", href: "/#contact" as const },
  secondaryCta: { label: "From €5,900", href: "/#products" as const },
  trustLine: ["Websites", "Shops", "Apps", "Automations"],

  hero: {
    eyebrow: "grow2gether",
    status: "5 out of 5 stars",
    lines: ["Websites,", "Shops & Apps,", "worth it."],
    lead: "Custom-designed to generate more qualified inquiries.",
    support: "More sales and less manual labor in your company.",
    pillars: [
      {
        index: "01",
        title: "Websites",
        text: "Professional presence, trust, and qualified inquiries.",
      },
      {
        index: "02",
        title: "Shops",
        text: "Easy purchasing and processes that save time.",
      },
      {
        index: "03",
        title: "Apps",
        text: "Products that simply work and people enjoy using.",
      },
    ],
    tracks: [
      { label: "From €5,900", text: "Individual solutions, transparent fixed price" },
      { label: "30 minutes", text: "Free conversation. The fixed price comes after." },
    ],
    featured: {
      label: "Awwwards",
      title: "Nominated",
      text: "Selected work",
      href: "/#work",
    },
  },

  nav: [
    { label: "Solutions", href: "/#services" },
    { label: "Work", href: "/works" },
    { label: "Why we", href: "/#why" },
    { label: "investment", href: "/#products" },
    { label: "Sequence", href: "/#process" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies NavLink[],
};
