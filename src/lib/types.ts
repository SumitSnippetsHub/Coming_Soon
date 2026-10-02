export type ImageAsset = {
  src: string;
  alt: string;
  credit?: string;
  isPlaceholder?: boolean;
};

export type NavLink = { label: string; href: `#${string}` };

export type Placeholderable = { isPlaceholder?: boolean };

export type Service = Placeholderable & { title: string; description: string; icon: string };
export type Product = Placeholderable & { title: string; description: string };
export type Project = Placeholderable & { id: string; title: string; category: string };
export type Technology = { name: string; group: string };
export type WhyUsItem = { title: string; description: string };
export type ProcessStep = { number: string; title: string; description: string };
export type Industry = Placeholderable & { title: string; image?: ImageAsset };
export type Testimonial = Placeholderable & { quote: string; role: string };
export type Faq = { question: string; answer: string };
export type Stat = { value: string; label: string };
export type TeamMember = { name: string; role: string; image?: ImageAsset };
export type SocialLink = Placeholderable & { label: string; href: string };
