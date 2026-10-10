import type { Project } from "@/lib/types";

import { images } from "@/data/images";

export const workIntro = {
  eyebrow: "Work",
  title: "Ideas, made real.",
  description: "A look at recent projects.",
  stages: ["The product", "What it does", "Our role", "Capabilities"],
  featureHeading: "Inside the project",
  roleHeading: "How it was built",
  capabilitiesHeading: "What went into it",
  productNote: "Selected project · grow2gether",
  projectButton: "Discuss a project like this",
  contactTitle: "Have a project like this in mind?",
  contactButton: "Discuss your project",
  upcomingTitle: "More recent work.",
  lead: "Take a look at our latest projects.",
  headingTop: "Ideas will",
  headingBottom: "reality",
};

const shot = images.amrut;

// TODO: replace stand-ins with real project screenshots (check Unsplash license / credit)
const standIn = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&h=600&q=80`,
  width: 960,
  height: 600,
  alt,
  isPlaceholder: true,
});

export const projects: Project[] = [
  {
    id: "01",
    title: "treatment",
    category: "Product website and app",
    tagline: "A dedicated app for beauty studios.",
    summary:
      "Loyalty points, memberships, installment payments and automatic offers, directly on the customer's home screen.",
    description:
      "A dedicated app for beauty studios: loyalty points, memberships, installment payments and automatic offers, directly on the customers' home screen.",
    preview: shot.homeHero,
    does: [
      "Loyalty points for returning clients",
      "Memberships and installment payments",
      "Automatic offers on the home screen",
      "A product website alongside the app",
    ],
    features: [
      {
        title: "Loyalty",
        screenshot: shot.dashboard,
        items: ["Points", "Memberships", "Offers"],
      },
      {
        title: "Payments",
        screenshot: shot.toolsGrid,
        items: ["Installments", "Checkout", "Offers"],
      },
      {
        title: "Studio tools",
        screenshot: shot.about,
        items: ["Customer app", "Automatic offers", "Home screen"],
      },
      {
        title: "Website",
        screenshot: shot.homeHero,
        items: ["Product site", "App story", "Inquiries"],
      },
    ],
    role: [
      "Product website and dedicated app",
      "Loyalty, memberships and installment payments",
      "Automatic offers on the customer's home screen",
    ],
    capabilities: ["Product website", "App", "Payments", "Automations"],
    url: "/contact",
    screenshots: {
      cover: shot.homeHero,
      dashboard: shot.dashboard,
      mobile: shot.mobileHome,
      about: shot.about,
      tools: shot.toolsGrid,
    },
  },
  {
    id: "02",
    title: "Antique Vehrs",
    category: "Online shop",
    summary:
      "Over 20,000 antiques from Northern Germany, sorted online by era, style and piece of furniture. Inventory management was digitized and automated.",
    description:
      "Over 20,000 antiques from Northern Germany, sorted online by era, style, and piece of furniture. We have also digitized and automated our inventory management system.",
    preview: standIn("photo-1555041469-a586c61ea9bc", "Antique furniture in a warm living room"),
  },
  {
    id: "03",
    title: "Kalōhs",
    category: "Interactive website",
    summary: "An interactive landing page with automated processes in the backend.",
    description: "Development of an interactive landing page with automated processes in the backend.",
    preview: standIn("photo-1586023492125-27b2c045efd7", "Calm, bright interior with soft natural light"),
  },
  {
    id: "04",
    title: "HB Gold Bars",
    category: "Online shop",
    summary:
      "Buy gold bars online, directly from a jeweler with ten years of experience. Includes gold buying and live precious metal prices.",
    description:
      "Buy gold bars online, directly from a Bremen jeweler with ten years of experience. Includes gold buying and live precious metal prices.",
    preview: standIn("photo-1610375461246-83df859d849d", "Stacked gold bars"),
  },
  {
    id: "05",
    title: "North-Baltic Sea Logistics",
    category: "Website + Web App",
    summary:
      "Digital bookings and automated processes, from the first inquiry through to internal handling.",
    description: "Digital bookings and automated processes – from the initial inquiry to internal processing.",
    preview: standIn("photo-1494412574643-ff11b0a5c1c3", "Container ship and cranes at a port"),
  },
];
