import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScreenImage } from "./ScreenImage";

export function PhoneMockup({ image, className }: { image: ImageAsset; className?: string }) {
  return (
    <div className={cn("relative rounded-[2.2rem] bg-espresso p-[5%] shadow-float", className)}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-card">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-1/3 -translate-x-1/2 rounded-full bg-espresso" />
        <ScreenImage image={image} />
      </div>
    </div>
  );
}
