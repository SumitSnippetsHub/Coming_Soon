"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, productsIntro } from "@/data/products";
import { images } from "@/data/images";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);
  useEffect(() => setCanTilt(!prefersReducedMotion() && !isTouchDevice()), []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!canTilt || !el) return;
    const box = el.getBoundingClientRect();
    const x = (e.clientY - box.top - box.height / 2) / -60;
    const y = (e.clientX - box.left - box.width / 2) / 60;
    el.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <section id="products" aria-labelledby="products-title" className="bg-secondary py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <p className="eyebrow text-primary">{productsIntro.eyebrow}</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <h2 id="products-title" className="display text-[clamp(2.5rem,7vw,4.5rem)]">
            {productsIntro.title}
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {productsIntro.description}
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div
            ref={ref}
            className="relative mx-auto w-full max-w-xl py-6 transition-transform duration-300 md:py-10"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <div aria-hidden>
              <LaptopMockup image={images.amrut.dashboard} />
              <div className="absolute bottom-12 right-2 w-[25%] transition-transform duration-300 hover:-translate-y-3 md:bottom-16">
                <PhoneMockup image={images.amrut.mobileHome} />
              </div>
            </div>
            <p className="eyebrow mt-8 text-center text-muted-foreground">{productsIntro.exampleLabel}</p>
          </div>
          <div className="grid gap-px border-y border-border bg-border sm:grid-cols-2">
            {products.map((product, i) => (
              <Link
                key={product.title}
                href={`/products/${product.slug}`}
                className="group block bg-secondary px-5 py-7 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-card sm:px-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-primary">0{i + 1}</span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#EDE4DB] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowRight className="size-3 stroke-[2]" />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold transition-colors group-hover:text-primary">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
