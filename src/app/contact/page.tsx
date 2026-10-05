import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Contact } from "@/components/sections/Contact";
import { RouteHero } from "@/components/sections/RouteHero";
import { ContactExtras } from "@/components/sections/ContactExtras";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SiteShell>
      <RouteHero route="contact" />
      <Contact />
      <ContactExtras />
    </SiteShell>
  );
}
