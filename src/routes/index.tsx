import { createFileRoute } from "@tanstack/react-router";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { images } from "@/data/images";

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
      { property: "og:image", content: images.hero.src },
      { name: "twitter:image", content: images.hero.src },
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
          <About />
          <Services />
          <Products />
          <FeaturedWork />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
