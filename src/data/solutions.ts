export type SolutionTool =
  | "Codex"
  | "Claude Code"
  | "Astro"
  | "Next.js"
  | "Vercel"
  | "Shopify"
  | "Stripe"
  | "Analytics"
  | "Supabase"
  | "n8n"
  | "Make"
  | "Microsoft 365"
  | "Sheets";

export type SolutionTone = "lavender" | "peach" | "mint" | "pink";

export interface Solution {
  title: string;
  description: string;
  tone: SolutionTone;
  tools: SolutionTool[];
}

export const solutionsIntro = {
  titleTop: "High-quality",
  titleBottom: "Software solutions",
  description: "From websites to digital products: Benefit from our many years of experience.",
};

export const solutions: Solution[] = [
  {
    title: "Websites",
    description:
      "For companies that want to present themselves professionally, build trust and attract qualified inquiries.",
    tone: "lavender",
    tools: ["Codex", "Claude Code", "Astro", "Next.js", "Vercel"],
  },
  {
    title: "Shops",
    description:
      "For products that sell online. With easy purchasing and processes that save you time and effort.",
    tone: "peach",
    tools: ["Shopify", "Stripe", "Analytics", "Codex", "Claude Code"],
  },
  {
    title: "Apps",
    description:
      "Whether in the browser or in the app store: We develop apps that simply work and are enjoyed by users.",
    tone: "mint",
    tools: ["Next.js", "Supabase", "Vercel", "Stripe", "Codex", "Claude Code"],
  },
  {
    title: "Automations",
    description:
      "What's done manually today will happen automatically tomorrow. We connect your systems and automate recurring processes.",
    tone: "pink",
    tools: ["n8n", "Make", "Microsoft 365", "Sheets", "Supabase"],
  },
];
