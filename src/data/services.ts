import type { Service } from "@/lib/types";
import { services as detailServices, getService, type DetailPage, type Highlight, type Step, type Faq } from "./detailPages";

export { getService };
export type { DetailPage, Highlight, Step, Faq };

export const servicesIntro = {
  eyebrow: "Solutions",
  title: "High-quality software.",
  description:
    "From websites to digital products. Years of experience, applied to the thing your company actually needs.",
};

export type FullService = Service & DetailPage;

export const services: FullService[] = detailServices.map((s) => ({
  ...s,
  description: s.summary,
  icon: s.icon ?? "Globe2",
}));
