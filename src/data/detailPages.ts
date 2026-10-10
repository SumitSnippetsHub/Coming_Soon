/**
 * grow2gether — detail page content for /services/[slug] and /products/[slug].
 */

export type Highlight = { title: string; description: string };
export type Step = { title: string; description: string };
export type Faq = { question: string; answer: string };

export type DetailPage = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  overview: string[];
  highlights: Highlight[];
  process: Step[];
  technologies: string[];
  idealFor: string[];
  outcomes: string[];
  faqs: Faq[];
  cta: { heading: string; text: string; button: string };
  seo: { title: string; description: string };
  icon?: string;
};

const sharedProcess: Step[] = [
  { title: "Understand", description: "Goals, audience, functions, budget and timing." },
  { title: "Direction & fixed price", description: "A first visual direction, a clear scope, then the fixed price." },
  { title: "Design & development", description: "You see the current state and can give feedback directly." },
  { title: "Launch", description: "Review, publish, hand over. Maintenance if you want it." },
];

const sharedCta = {
  heading: "Discuss your project",
  text: "30 minutes, free of charge. You receive the fixed price afterwards.",
  button: "Discuss your project",
};

export const services: DetailPage[] = [
  {
    slug: "websites",
    title: "Websites",
    icon: "Globe2",
    eyebrow: "Solutions / Websites",
    tagline: "Present the company properly, build trust, and attract qualified inquiries.",
    summary:
      "For companies that want to present themselves professionally, build trust and attract qualified inquiries.",
    overview: [
      "A website here is built for the inquiry, not for a template gallery. The page explains the offer, earns trust, and gives the right people a clear next step.",
      "Design, structure and the systems behind the form are planned together, so the site keeps working after launch.",
    ],
    highlights: [
      { title: "Professional presence", description: "A page that looks like the company, not like a hundred others." },
      { title: "Qualified inquiries", description: "The path from visit to conversation is designed in from the start." },
      { title: "All devices", description: "The same care on a phone as on a desktop." },
    ],
    process: sharedProcess,
    technologies: ["Astro", "Next.js", "Vercel", "Codex", "Claude Code"],
    idealFor: ["Companies replacing an outdated site", "Teams that need trust before the first call"],
    outcomes: ["A live website", "A handover you can run", "A fixed price agreed before the build"],
    faqs: [
      {
        question: "Do you start from a template?",
        answer: "No. Each website starts from the company, the audience and the inquiry you want.",
      },
    ],
    cta: sharedCta,
    seo: {
      title: "Websites | grow2gether",
      description: "Custom websites that present the company, build trust and attract qualified inquiries.",
    },
  },
  {
    slug: "shops",
    title: "Shops",
    icon: "Blocks",
    eyebrow: "Solutions / Shops",
    tagline: "Products that sell online, with less manual work behind the counter.",
    summary:
      "For products that sell online. Easy purchasing, and processes that save time and effort.",
    overview: [
      "A shop has to be easy to buy from, and easy to run. We design the purchase and the work behind it: catalog, checkout, inventory and the steps that should no longer be manual.",
      "The stack follows the product. Shopify and Stripe when they fit. Custom when the process needs it.",
    ],
    highlights: [
      { title: "Easy purchasing", description: "A path to checkout that does not lose the buyer." },
      { title: "Less manual work", description: "Inventory, orders and follow-up connected instead of retyped." },
      { title: "Clear catalog", description: "Products sorted the way customers actually look for them." },
    ],
    process: sharedProcess,
    technologies: ["Shopify", "Stripe", "Analytics", "Codex", "Claude Code"],
    idealFor: ["Makers and retailers selling online", "Shops that still run inventory by hand"],
    outcomes: ["A shop people can buy from", "Processes that save time", "A fixed price before we start"],
    faqs: [
      {
        question: "Can you automate inventory as well as the shop?",
        answer: "Yes. Connecting the shop to the way stock is managed is part of the work when you need it.",
      },
    ],
    cta: sharedCta,
    seo: {
      title: "Online shops | grow2gether",
      description: "Online shops with easy purchasing and processes that save time.",
    },
  },
  {
    slug: "apps",
    title: "Apps",
    icon: "Smartphone",
    eyebrow: "Solutions / Apps",
    tagline: "In the browser or in the store. Built to be used.",
    summary:
      "Whether in the browser or in the app store: apps that simply work and are enjoyed by the people using them.",
    overview: [
      "An app earns its place when someone opens it again. We design the thing they came for, then build it so it stays reliable.",
      "Browser apps and store apps can share the same product thinking: accounts, payments and the screen people actually live on.",
    ],
    highlights: [
      { title: "Browser or store", description: "The format follows where your customers already are." },
      { title: "Payments and accounts", description: "Memberships, checkout and sign-in when the product needs them." },
      { title: "Enjoyed in use", description: "Short paths, clear screens, and a product that feels finished." },
    ],
    process: sharedProcess,
    technologies: ["Next.js", "Supabase", "Vercel", "Stripe", "Codex", "Claude Code"],
    idealFor: ["Studios with a customer app", "Teams that need a product, not another brochure"],
    outcomes: ["An app people can use", "The systems behind it", "A handover after launch"],
    faqs: [
      {
        question: "Do you build both web apps and store apps?",
        answer: "Yes. We choose the format from how the product will be used.",
      },
    ],
    cta: sharedCta,
    seo: {
      title: "Apps | grow2gether",
      description: "Web and store apps that work simply and are pleasant to use.",
    },
  },
  {
    slug: "automations",
    title: "Automations",
    icon: "Workflow",
    eyebrow: "Solutions / Automations",
    tagline: "What is manual today can run by itself tomorrow.",
    summary:
      "We connect your systems and automate the work that repeats, so the team spends time on the work that needs a person.",
    overview: [
      "Recurring work is where hours disappear: copying between tools, sending the same follow-up, updating the same sheet.",
      "We connect the systems you already use and let the repeatable steps run on their own.",
    ],
    highlights: [
      { title: "Connected systems", description: "The tools you already use, talking to each other." },
      { title: "Recurring work", description: "Offers, follow-ups, inventory and internal steps that should not be retyped." },
      { title: "Time back", description: "The point is fewer manual hours, not another dashboard to babysit." },
    ],
    process: sharedProcess,
    technologies: ["n8n", "Make", "Microsoft 365", "Sheets", "Supabase"],
    idealFor: ["Teams repeating the same admin every week", "Shops and studios with manual follow-up"],
    outcomes: ["Processes that run without a person each time", "Systems that stay in sync", "A scope and price agreed first"],
    faqs: [
      {
        question: "Do automations only come with a new website?",
        answer: "No. They can stand alone, or sit behind a website, shop or app.",
      },
    ],
    cta: sharedCta,
    seo: {
      title: "Automations | grow2gether",
      description: "Connected systems and automated processes that remove recurring manual work.",
    },
  },
];

const inclusion = (
  slug: string,
  title: string,
  summary: string,
  index: string,
): DetailPage => ({
  slug,
  title,
  eyebrow: `Investment / ${index}`,
  tagline: summary,
  summary,
  overview: [
    summary,
    "It is part of the project, not an add-on you discover on the invoice. Individual work starts from €5,900, and the fixed price is agreed before we start.",
  ],
  highlights: [{ title, description: summary }],
  process: sharedProcess,
  technologies: [],
  idealFor: ["Projects that need this as part of the build, not as a later extra"],
  outcomes: [summary],
  faqs: [
    {
      question: "Is this included?",
      answer: "Yes. It is part of how a grow2gether project is delivered.",
    },
  ],
  cta: sharedCta,
  seo: {
    title: `${title} | grow2gether`,
    description: summary,
  },
});

export const products: DetailPage[] = [
  inclusion(
    "individual-concept",
    "Individual concept",
    "Together we turn the idea into a concrete plan: what the software should do, who uses it, and which processes it should simplify.",
    "01",
  ),
  inclusion(
    "design",
    "High-quality design",
    "Designed for this company. It will not look like a template used a hundred times.",
    "02",
  ),
  inclusion(
    "devices",
    "Works on all devices",
    "Phone, tablet and desktop are part of the same design, not an afterthought.",
    "03",
  ),
  inclusion(
    "privacy",
    "Data protection to current standards",
    "Privacy is handled to current standards, planned with the product rather than patched on at the end.",
    "04",
  ),
  inclusion(
    "quality",
    "Quality assurance before launch",
    "We check the work before it goes live. Launch is a decision, not a surprise.",
    "05",
  ),
  inclusion(
    "handover",
    "Personal handover & briefing",
    "You get the work in person, with a briefing so the team can actually run it.",
    "06",
  ),
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
