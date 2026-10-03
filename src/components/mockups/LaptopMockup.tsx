import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScreenImage } from "./ScreenImage";

export function LaptopMockup({
  image,
  className,
  priority,
}: {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-t-[1.1rem] bg-espresso p-[2.2%] shadow-float">
        <div className="aspect-[16/10] overflow-hidden rounded-[0.4rem] bg-card">
          <ScreenImage image={image} {...(priority ? { priority } : {})} />
        </div>
      </div>
      <div className="relative mx-[-6%] h-3 rounded-b-xl bg-gradient-to-b from-taupe to-espresso">
        <div className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-md bg-espresso/60" />
      </div>
    </div>
  );
}
