import type { Industry } from "@/lib/types";

export const industriesIntro = {
  eyebrow: "Partners",
  title: "Selected partners.",
  description: "Companies the work has been built with.",
};

const photo = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=1500&q=80`,
  width: 1200,
  height: 1500,
  alt,
  credit: "Unsplash",
  isPlaceholder: true,
});

const frames = [
  "photo-1441986300917-64674bd600d8",
  "photo-1497366216548-37526070297c",
  "photo-1521737604893-d14cc237f11d",
  "photo-1559136555-9303baea8ebd",
];

const partners = [
  "Cord's Café",
  "Pars Jewelers",
  "treatment",
  "EVLTN Martial Arts",
  "Grechow's Beauty",
  "Kalōhs",
  "North-Baltic Sea Logistics",
  "Remco",
  "Müller Therapy Practice",
  "Holiday apartments at Brill",
  "University of Bremen",
  "Clickless",
  "Life Lounge & Bar",
  "Oxzy",
  "Vehrs Antiques",
  "Clockwise",
  "The Choice in Beauty",
];

export const industries: Industry[] = partners.map((title, index) => ({
  title,
  focus: "Selected partner",
  image: photo(frames[index % frames.length]!, title),
}));
