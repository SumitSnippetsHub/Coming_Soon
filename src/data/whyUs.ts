import type { WhyUsItem } from "@/lib/types";

export const whyIntro = {
  eyebrow: "Why we",
  title: "A matter of course for us.",
  description:
    "What is considered an extra elsewhere is standard here. Sumit, the founder, stays close to the work.",
  titleTop: "What is considered an extra elsewhere,",
  titleBottom: "is a matter of course for us",
  founder: {
    name: "Sumit",
    role: "The founder of grow2gether",
    photo: { src: "/images/team/sumit.jpg", alt: "Sumit, founder of grow2gether" },
  },
};

export const whyUs: WhyUsItem[] = [
  {
    title: "Individual instead of a template",
    signal: "start.from(scratch)",
    description: "We're starting from scratch. That's why your page won't look like a hundred others.",
  },
  {
    title: "Direct contact with the founder",
    signal: "contact.founder()",
    description: "You write to Sumit directly. No project manager in between.",
  },
  {
    title: "Satisfaction guarantee",
    signal: 'done.when("you are satisfied")',
    description: "A project is only finished when you are completely satisfied.",
  },
  {
    title: "Transparent fixed price",
    signal: "price.before(start)",
    description: "We talk openly about money before we start, not only when the bill arrives.",
  },
  {
    title: "SEO and performance included",
    signal: "ship.fast().findable()",
    description: "Fast loading times and a clean technical SEO setup come standard, not as an add-on.",
  },
  {
    title: "Support after launch",
    signal: "support.after(launch)",
    description: "After go-live, Sumit stays your contact for updates, questions and new ideas.",
  },
];
