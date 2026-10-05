import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Products } from "@/components/sections/Products";
import { RouteHero } from "@/components/sections/RouteHero";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <SiteShell>
      <RouteHero route="products" />
      <Products />
    </SiteShell>
  );
}
