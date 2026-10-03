import { useRef, useState } from "react";
import { products, productsIntro } from "@/data/products";
import { images } from "@/data/images";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";

export function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return <section id="products" className="bg-secondary py-24 md:py-36">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <p className="eyebrow text-primary">{productsIntro.eyebrow}</p>
      <div className="mt-5 grid gap-7 md:grid-cols-[1fr_0.65fr] md:items-end"><h2 className="display text-5xl md:text-7xl">{productsIntro.title}</h2><p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{productsIntro.description}</p></div>
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div ref={ref} className="relative mx-auto w-full max-w-xl py-10 transition-transform duration-300 motion-reduce:transform-none" onMouseMove={(e) => { const box = ref.current?.getBoundingClientRect(); if (box) setTilt({ x: (e.clientY - box.top - box.height / 2) / -60, y: (e.clientX - box.left - box.width / 2) / 60 }); }} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <LaptopMockup image={images.amrut.dashboard} />
          <div className="absolute bottom-0 right-2 w-[25%] transition-transform duration-300 hover:-translate-y-3"><PhoneMockup image={images.amrut.mobileHome} /></div>
          <p className="eyebrow mt-8 text-center text-muted-foreground">{productsIntro.exampleLabel}</p>
        </div>
        <div className="grid gap-px border-y border-border bg-border sm:grid-cols-2">
          {products.map((product, i) => <article key={product.title} className="bg-secondary px-5 py-7 transition-transform duration-300 hover:-translate-y-1 hover:bg-card sm:px-7"><span className="text-xs text-primary">0{i + 1}</span><h3 className="mt-7 text-xl font-semibold">{product.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p></article>)}
        </div>
      </div>
    </div>
  </section>;
}