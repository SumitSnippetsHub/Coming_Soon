export const investmentIntro = {
  titleTop: "Built around your goals",
  pricePrefix: "Projects tailored to you",
  price: 0,
  priceLabel: "Custom pricing",
  lead:
    "Websites, online shops and web apps — thoughtfully designed, professionally developed, and built around your business needs.",
  note:
    "Let's discuss your idea, define the scope, and create a clear project plan with transparent pricing.",
  listLabel: "What you can expect",
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
    title: "A solution built around your idea",
    description:
      "Every project starts with understanding your goals, audience, and requirements. Together, we'll turn your idea into a **clear development plan** with the right features, priorities, and approach.",
  },
  {
    slug: "design",
    title: "Modern, thoughtful design",
    description:
      "Your website, shop, or app should feel distinctive and easy to use. I focus on **clean layouts, consistent design, and intuitive interactions** to create a professional experience that reflects your brand.",
  },
  {
    slug: "responsive",
    title: "Designed for every screen",
    description:
      "From mobile phones to large desktop displays, every interface is built to adapt. **Responsive layouts, accessible interactions, and careful attention to detail** help deliver a consistent experience across devices.",
  },
  {
    slug: "development",
    title: "Reliable frontend and backend",
    description:
      "From polished user interfaces to server-side logic, APIs, and database integration, I build solutions around your requirements. The focus is on **maintainable code, dependable functionality, and room to grow**.",
  },
  {
    slug: "performance",
    title: "Performance and quality",
    description:
      "A great product should look good and work reliably. I pay attention to **loading speed, responsive behavior, functionality, and cross-browser compatibility**, testing important user journeys before launch.",
  },
  {
    slug: "deployment",
    title: "Deployment and handover",
    description:
      "I help prepare your project for launch, configure the required hosting and deployment workflow, and provide the agreed source code and handover documentation. You'll have a **clear understanding of how your project is delivered and maintained**.",
  },
];