import type { Technology } from "@/lib/types";

export const technologiesIntro = {
  eyebrow: "Stack",
  titleTop: "Tools behind",
  titleBottom: "the work",
  description:
    "Websites on Astro and Next.js. Shops with Shopify and Stripe. Apps on Next.js, Supabase and Vercel. Automations with n8n, Make and Microsoft 365.",
};

export type CapabilityIcon = "puzzle" | "bolt" | "plane" | "rocket" | "wrench";

export const technologyCapabilities: { title: string; icon: CapabilityIcon }[] = [
  { title: "Consistent Identity", icon: "puzzle" },
  { title: "Motion & Interaction Design", icon: "bolt" },
  { title: "UX Centric Strategy", icon: "plane" },
  { title: "Performance Optimization", icon: "rocket" },
  { title: "Maintenance & Ongoing Support", icon: "wrench" },
];

export const technologyStack = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Astro",
  "Shopify",
  "Stripe",
  "Supabase",
  "Vercel",
  "n8n",
  "Make",
  "Microsoft 365",
  "Sheets",
] as const;

export type StackName = (typeof technologyStack)[number];

export const technologySpotlight = {
  titleTop: "Platform flexibility.",
  titleBottom: "Design consistency.",
  description:
    "No matter the stack, the work stays consistent, refined, responsive, and built to perform.",
  cta: { label: "See the work", href: "/works" },
};

export const technologies: Technology[] = [
  { name: "Next.js", group: "Websites", brand: "#000000", logo: "/tech/nextjs.svg" },
  { name: "React", group: "Apps", brand: "#000000", logo: "/tech/react.svg" },
  { name: "TypeScript", group: "Apps", brand: "#000000", logo: "/tech/typescript.svg" },
  { name: "JavaScript", group: "Websites", brand: "#000000", logo: "/tech/javascript.svg" },
  { name: "Node.js", group: "Apps", brand: "#000000", logo: "/tech/nodejs.svg" },
  { name: "PostgreSQL", group: "Data", brand: "#000000", logo: "/tech/postgresql.svg" },
  { name: "Git", group: "Delivery", brand: "#000000", logo: "/tech/git.svg" },
];
