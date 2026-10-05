import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { RouteHero } from "@/components/sections/RouteHero";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return (
    <SiteShell>
      <RouteHero route="works" />
      <FeaturedWork />
      <Testimonials />
    </SiteShell>
  );
}
