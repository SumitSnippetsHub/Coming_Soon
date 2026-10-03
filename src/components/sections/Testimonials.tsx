import { testimonials, testimonialsIntro } from "@/data/testimonials";

export function Testimonials() {
  const flagged = testimonials.length === 0 || testimonials.every((item) => item.isPlaceholder);

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-secondary py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <p className="eyebrow text-primary">{testimonialsIntro.eyebrow}</p>
        <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <h2 id="testimonials-title" className="display max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)]">
            {flagged ? testimonialsIntro.title : "Notes from clients."}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {testimonialsIntro.description}
          </p>
        </div>
        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.role}
                className={
                  item.isPlaceholder
                    ? "flex min-h-64 flex-col justify-between border border-dashed border-primary/40 bg-card p-6"
                    : "flex min-h-64 flex-col justify-between border border-border bg-card p-6"
                }
              >
                {item.isPlaceholder ? <p className="eyebrow text-primary">Placeholder</p> : null}
                <blockquote className="mt-8 text-lg leading-relaxed text-foreground/80">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 text-sm font-medium">{item.role}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
