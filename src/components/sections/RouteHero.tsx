import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import DotField from "@/components/motion/DotField";
import { BrowserMockup } from "@/components/mockups/BrowserMockup";
import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { images } from "@/data/images";

type Route = "about" | "services" | "products" | "works" | "contact";

const content = {
  about: {
    number: "01 / The studio",
    title: "Technology with a point of view.",
    description:
      "We are a product-minded digital studio for ambitious teams. We turn complex ideas into clear, useful experiences that feel unmistakably yours.",
    detail: "Strategy · Design · Engineering",
  },
  services: {
    number: "02 / Capabilities",
    title: "Every layer of the digital build, considered.",
    description:
      "From the first sketch to the systems behind it, our services connect strategy, design and engineering into one focused delivery team.",
    detail: "8 capabilities · 1 connected team",
  },
  products: {
    number: "03 / Solutions",
    title: "Digital products built to earn their place.",
    description:
      "We shape product ideas into useful, scalable tools — from internal systems to customer-facing platforms people return to.",
    detail: "Useful by design · Ready to evolve",
  },
  works: {
    number: "04 / Selected work",
    title: "Proof that good work moves the needle.",
    description:
      "A look at the digital platforms, interfaces and systems we build with our partners to make ambitious ideas real.",
    detail: "Selected projects · Real outcomes",
  },
  contact: {
    number: "05 / Start a conversation",
    title: "Bring us the challenge behind the brief.",
    description:
      "Tell us what you are trying to change, launch or make easier. We will bring the right questions, the right people and a clear next step.",
    detail: "Typically replies within 24 hours",
  },
} satisfies Record<Route, { number: string; title: string; description: string; detail: string }>;

function AboutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg -rotate-2 drop-shadow-2xl">
      <BrowserMockup image={images.amrut.about} url="zynovate.studio/about" />
      <div className="absolute -bottom-5 -left-5 rounded-2xl border border-primary/15 bg-white/90 px-4 py-3 shadow-lg">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
          Our principle
        </p>
        <p className="mt-1 text-sm font-semibold">Make it useful. Make it last.</p>
      </div>
    </div>
  );
}

function ServicesVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg rotate-1 drop-shadow-2xl">
      <LaptopMockup image={images.amrut.dashboard} priority />
      <div className="absolute -right-4 -top-5 rounded-2xl border border-primary/15 bg-white/95 px-4 py-3 shadow-lg">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
          Delivery system
        </p>
        <p className="mt-1 text-sm font-semibold">One team. Every layer.</p>
      </div>
    </div>
  );
}

function ProductsVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-lg items-end justify-center gap-[-1rem] drop-shadow-2xl">
      <div className="w-[88%] -rotate-2">
        <LaptopMockup image={images.amrut.llmsTxt} priority />
      </div>
      <div className="absolute -bottom-6 -right-1 w-24 rotate-6">
        <PhoneMockup image={images.amrut.mobileHome} priority />
      </div>
    </div>
  );
}

function WorksVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg rotate-2 drop-shadow-2xl">
      <BrowserMockup image={images.amrut.homeHero} url="amrut.ai" />
      <div className="absolute -bottom-2 -right-2 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <ArrowUpRight />
      </div>
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="relative mx-auto h-full min-h-56 w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-primary/20 shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
        alt="Team collaborating around a table"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-espresso/75 via-espresso/25 to-transparent" />
      <div className="absolute bottom-5 left-5 max-w-[15rem] text-white">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/65">
          Noida · Remote-first
        </p>
        <p className="mt-2 text-xl font-semibold leading-tight">
          Good work starts with a clear conversation.
        </p>
      </div>
    </div>
  );
}

function Showcase({ route }: { route: Route }) {
  if (route === "about") return <AboutVisual />;
  if (route === "services") return <ServicesVisual />;
  if (route === "products") return <ProductsVisual />;
  if (route === "works") return <WorksVisual />;
  return <ContactVisual />;
}

export function RouteHero({ route }: { route: Route }) {
  const item = content[route];
  return (
    <section className="relative isolate overflow-hidden rounded-b-[2rem] bg-white text-foreground shadow-[0_18px_50px_-36px_rgba(76,43,25,0.55)] md:rounded-b-[3rem]">
      <DotField
        colors={["#7a4426", "#9a5b36", "#b58468", "#2b1a10"]}
        ringGap={25}
        dotSpacing={31}
        centerX={0.76}
        centerY={0.48}
        innerRadius={0.08}
        interaction={0.75}
        className="opacity-[0.22]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_44%,rgba(196,137,106,0.14),transparent_25%),linear-gradient(105deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.76)_44%,rgba(255,255,255,0.3)_100%)]" />
      <div className="pointer-events-none absolute right-[8%] top-1/2 size-[min(38vw,28rem)] -translate-y-1/2 rounded-full border border-primary/10 md:right-[10%]" />
      <div className="pointer-events-none absolute right-[14%] top-1/2 size-[min(27vw,20rem)] -translate-y-1/2 rounded-full border border-primary/10" />
      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-5 px-5 pb-10 pt-28 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-12 md:pb-12 md:pt-32 ${
          route === "contact" ? "min-h-[40svh]" : "min-h-[46svh]"
        }`}
      >
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary/70" />
            {item.number}
          </p>
          <h1 className="display mt-5 max-w-2xl text-[clamp(2.45rem,5.5vw,5.3rem)] leading-[0.94] tracking-[-0.045em]">
            {item.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/65 md:text-lg">
            {item.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-primary/15 bg-white/55 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-foreground/60">
              {item.detail}
            </span>
            <ArrowDownRight className="size-5 text-primary" />
          </div>
        </div>
        <div className="relative min-h-64">
          {/* Each route intentionally gets its own visual language. */}
          <Showcase route={route} />
        </div>
      </div>
    </section>
  );
}
