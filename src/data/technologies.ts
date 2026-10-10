import type { Technology } from "@/lib/types";

export const technologiesIntro = {
  eyebrow: "Stack",
  title: "Tools behind the work.",
  description:
    "Websites on Astro and Next.js. Shops with Shopify and Stripe. Apps on Next.js, Supabase and Vercel. Automations with n8n, Make and Microsoft 365.",
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
