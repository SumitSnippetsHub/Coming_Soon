import type { Project } from "@/lib/types";

import { images } from "@/data/images";

export const workIntro = {
  eyebrow: "03 / Selected work", title: "Featured work.", description: "A closer look at something we've built.",
  stages: ["The product", "Feature groups", "Our role", "Capabilities"],
  featureHeading: "Inside the platform", roleHeading: "From concept to launch", capabilitiesHeading: "What went into it",
  productNote: "Product by Amrut.ai. Built by ZYNOVATE.",
  projectButton: "View Project", contactTitle: "Have a product like this in mind? Let's build it.", contactButton: "Start a conversation",
  upcomingTitle: "The next stories are taking shape.",
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Amrut.ai",
    category: "SaaS platform · AI Visibility & SEO",
    tagline: "The AI Visibility Platform That Tells You Exactly What To Do Next.",
    summary: "Amrut.ai helps brands see how AI assistants talk about them, then gives a clear plan to earn more mentions, citations and recommendations. It also bundles a suite of SEO and website-intelligence tools in one place.",
    features: [
      { title: "AI Visibility", screenshot: images.amrut.dashboard, items: ["AI Visibility tracking", "AI Crawlability", "LLMS.txt Generator", "AI LLMs Traffic", "Ask AI"] },
      { title: "SEO & Content", screenshot: images.amrut.llmsTxt, items: ["AI SEO Analysis Report", "AI Content Generator (beta)", "Keyword Research", "Ranked Keywords", "Keyword Suggestions", "Keyword Extractor"] },
      { title: "Site & Competitors", screenshot: images.amrut.about, items: ["Company Profile", "Backlink Checker", "Competitor Ads", "Watchlist & Alerts", "Website Ranking"] },
      { title: "Your Data & Utilities", screenshot: images.amrut.toolsGrid, items: ["Website Analytics", "GSC Dashboard", "YouTube Trends", "Robots.txt Generator", "Sitemap Generator", "Token Counter"] },
    ],
    role: ["End-to-end build of the complete platform, from product concept to launch", "Product design and UI/UX", "Front-end and back-end development of the AI visibility and SEO tools", "Responsive experience across desktop and mobile"],
    capabilities: ["SaaS platform", "Dashboard UI", "Full-stack development", "Responsive web design", "Product engineering"],
    url: "https://amrut.ai/",
    screenshots: { cover: images.amrut.homeHero, dashboard: images.amrut.dashboard, mobile: images.amrut.mobileHome, about: images.amrut.about, tools: images.amrut.toolsGrid },
  },
  // TODO: replace with a real project
  { id: "02", title: "Coming soon", category: "Next case study", isPlaceholder: true },
  // TODO: replace with a real project
  { id: "03", title: "Coming soon", category: "Next case study", isPlaceholder: true },
];
