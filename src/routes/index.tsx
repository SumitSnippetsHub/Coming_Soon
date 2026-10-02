import { createFileRoute } from "@tanstack/react-router";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZYNOVATE — Build. Launch. Evolve." },
      {
        name: "description",
        content:
          "ZYNOVATE builds custom software, web and mobile apps, SaaS platforms and digital products around your ideas.",
      },
      { property: "og:title", content: "ZYNOVATE — Build. Launch. Evolve." },
      {
        property: "og:description",
        content: "Technology solutions built around your ideas, business, and digital goals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScrollProvider>
      <div className="grain">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          {/* Following sections are added in later stages */}
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
