import type { NavLink } from "@/lib/types";

export const site = {
  name: "ZYNOVATE",
  tagline: "Build. Launch. Evolve.",
  description: "Technology solutions built around your ideas, business, and digital goals.",
  logo: { src: "/brand/zynovate-logo.png", alt: "ZYNOVATE", width: 600, height: 408 },
  primaryCta: { label: "Start a Project", href: "#contact" as const },
  secondaryCta: { label: "Explore Our Work", href: "#work" as const },
  trustLine: ["Custom software", "Web & mobile", "SaaS", "Product engineering"],
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
};
