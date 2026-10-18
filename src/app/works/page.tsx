import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { WorksIndex } from "@/components/sections/WorksIndex";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected websites, shops and apps by grow2gether.",
};

export default function WorksPage() {
  return (
    <SiteShell>
      <WorksIndex />
    </SiteShell>
  );
}
