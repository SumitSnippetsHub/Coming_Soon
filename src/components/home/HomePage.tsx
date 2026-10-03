"use client";

import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Technologies } from "@/components/sections/Technologies";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";
import { ParallaxCloser } from "@/components/sections/ParallaxCloser";
import { Footer } from "@/components/layout/Footer";

export function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="grain">
        <a
          href="#main"
          className="sr-only rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1} className="focus-visible:shadow-none focus-visible:outline-none">
          <Hero />
          <About />
          <Services />
          <Products />
          <FeaturedWork />
          <Technologies />
          <WhyUs />
          <Process />
          <Industries />
          <Testimonials />
          <Faq />
          <CtaBanner />
          <Contact />
          <ParallaxCloser />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
