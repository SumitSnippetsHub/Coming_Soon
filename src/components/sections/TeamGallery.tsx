import { Mail } from "lucide-react";
import { team, leadershipIntro } from "@/data/team";
import { HighlightZynovate } from "@/components/ui/Zynovate";

export function TeamGallery() {
  return (
    <section className="bg-background px-5 py-20 text-foreground sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-about-highlight">{leadershipIntro.eyebrow}</p>
        <h2 className="mt-5 text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-tight">
          <HighlightZynovate text={leadershipIntro.title} />
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/75">
          <HighlightZynovate text={leadershipIntro.description} />
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-3xl">
          {team.map((member) => (
            <article key={member.name} className="group">
              <div className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-foreground/10 bg-background">
                {member.image ? (
                  <img
                    src={member.image.src}
                    alt={member.image.alt}
                    width={member.image.width}
                    height={member.image.height}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <p className="display absolute inset-x-0 top-[18%] text-center text-7xl text-foreground">
                    {member.name.slice(0, 1)}
                  </p>
                )}
                <div
                  className={
                    member.image
                      ? "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20"
                      : "relative border-t border-foreground/10 px-5 py-6 sm:px-6"
                  }
                >
                  <h3
                    className={
                      member.image
                        ? "text-xl font-semibold leading-tight text-white sm:text-2xl"
                        : "text-xl font-semibold leading-tight text-foreground sm:text-2xl"
                    }
                  >
                    {member.name}
                  </h3>
                  <p className={member.image ? "mt-1 text-sm font-medium text-white/80" : "mt-1 text-sm font-medium text-foreground/70"}>
                    {member.role}
                  </p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-foreground/80 hover:text-foreground hover:underline"
                    >
                      <Mail className="size-3.5 opacity-80" />
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
