import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { TeamGallery } from "@/components/sections/TeamGallery";
import { RouteHero } from "@/components/sections/RouteHero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <SiteShell>
      <RouteHero route="about" />
      <About />
      <TeamGallery />
    </SiteShell>
  );
}
