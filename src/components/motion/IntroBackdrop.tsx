"use client";

import { useEffect, useRef } from "react";

const lines = [
  { className: "l1", d: "M-20 190 C150 250 300 330 470 470 C560 545 640 640 720 745" },
  { className: "l2", d: "M-20 430 C120 330 260 250 420 190 C560 135 700 90 860 -20" },
  { className: "l3", d: "M1180 -20 C1260 110 1380 210 1520 300 C1640 380 1780 470 1911 520" },
  { className: "l4", d: "M1500 -20 C1560 60 1680 130 1800 150 C1850 160 1880 200 1911 235" },
  { className: "l5", d: "M1250 745 C1400 665 1560 605 1700 565 C1780 540 1850 505 1911 480" },
  { className: "l6 faint", d: "M330 -20 C420 60 520 110 640 150" },
];

export function IntroBackdrop() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = layer.current;
    const host = node?.parentElement;
    if (!node || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      node.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      node.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    };
    const leave = () => {
      node.style.setProperty("--mx", "0");
      node.style.setProperty("--my", "0");
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={layer} aria-hidden className="intro-grain pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="intro-grain-lines" viewBox="0 0 1891 726" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="intro-blur-halo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="intro-blur-core" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {lines.map((line) => (
          <g key={line.d} className={`intro-line ${line.className}`}>
            <path className="halo" d={line.d} filter="url(#intro-blur-halo)" />
            <path className="core" d={line.d} filter="url(#intro-blur-core)" />
          </g>
        ))}
      </svg>
      <div className="intro-grain-noise" />
    </div>
  );
}
