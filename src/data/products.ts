import type { Product } from "@/lib/types";
import { products as detailProducts, getProduct, type DetailPage, type Highlight, type Step, type Faq } from "./detailPages";

export { getProduct };
export type { DetailPage, Highlight, Step, Faq };

export const productsIntro = {
  eyebrow: "Investment",
  title: "Great results from €5,900.",
  description:
    "Custom software, tailored to your goals and processes. 30 minutes, free of charge. You receive the fixed price afterwards.",
  exampleLabel: "Included with the project",
};

export type FullProduct = Product & DetailPage;

export const products: FullProduct[] = detailProducts.map((p) => ({
  ...p,
  description: p.summary,
}));
