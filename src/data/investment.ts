export const investmentIntro = {
  titleTop: "Great results",
  pricePrefix: "from",
  price: 5900,
  priceLabel: "€5,900",
  lead: "Custom software – tailored to your goals and processes.",
  note: "30 minutes, free of charge. You'll receive the fixed price afterwards.",
  listLabel: "Included in every project",
};

export interface Inclusion {
  slug: string;
  title: string;
  /** `**phrase**` marks a bold key phrase. */
  description: string;
}

export const inclusions: Inclusion[] = [
  {
    slug: "individual-concept",
    title: "Individual concept",
    description:
      "Together, we'll turn your idea into a **concrete plan**: What should your software do, who will use it, and which processes should it simplify? From this, we'll develop a concept that fits your company and forms the **basis for development**.",
  },
  {
    slug: "design",
    title: "High-quality design",
    description:
      "Every screen is designed **for your company**, not taken from a template used a hundred times. Clear typography, considered details and a look that **builds trust** from the first click.",
  },
  {
    slug: "devices",
    title: "Works on all devices",
    description:
      "Phone, tablet and desktop are designed **together, not as an afterthought**. Layouts, images and interactions adapt so every visitor gets a **fast, polished experience**.",
  },
  {
    slug: "privacy",
    title: "Data protection according to current standards",
    description:
      "Privacy is planned in from the start: **GDPR-compliant** forms, hosting and cookie handling, with your data stored **in the EU** wherever possible.",
  },
  {
    slug: "quality",
    title: "Quality assurance before launch",
    description:
      "Before going live, we test **every page, form and flow** across browsers and devices, check speed and accessibility, and fix what we find. Launch is **a decision, not a surprise**.",
  },
  {
    slug: "handover",
    title: "Personal handover & briefing",
    description:
      "You receive the finished work **in person**, with a briefing so you and your team can **confidently run it** yourselves. Questions afterwards? You write to Sumit directly.",
  },
];
