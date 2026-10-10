"use client";

import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Solutions } from "@/components/sections/Solutions";
import { Work } from "@/components/sections/Work";
import { Technologies } from "@/components/sections/Technologies";
import { MatterOfCourse } from "@/components/sections/MatterOfCourse";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Investment } from "@/components/sections/Investment";
import { Sequence } from "@/components/sections/Sequence";
import { SiteShell } from "@/components/layout/SiteShell";

export function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Intro />
      <Solutions />
      <Work />
      <Technologies />
      <MatterOfCourse />
      <Investment />
      <Sequence />
      <Industries />
      <Testimonials />
      <Faq />
    </SiteShell>
  );
}
