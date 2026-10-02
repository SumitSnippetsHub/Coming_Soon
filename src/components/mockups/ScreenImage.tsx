import { useState } from "react";
import type { ImageAsset } from "@/lib/types";

/** Image that falls back to a labeled placeholder frame if the file is missing. */
export function ScreenImage({ image }: { image: ImageAsset }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="grid h-full w-full place-items-center bg-secondary p-4 text-center">
        <span className="eyebrow text-muted-foreground">Screenshot placeholder</span>
      </div>
    );
  return (
    <img
      src={image.src}
      alt={image.alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top"
      draggable={false}
    />
  );
}
