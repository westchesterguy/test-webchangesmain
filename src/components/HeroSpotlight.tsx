"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps the (server-rendered) hero content and adds a cursor-following
 * spotlight layer. The LCP image + heading are passed as children, so they
 * stay in the server tree; only the interactive tint is client-driven.
 */
export function HeroSpotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = ((e.clientX - rect.left) / rect.width) * 100;
      y = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--spot-x", `${x}%`);
          el.style.setProperty("--spot-y", `${y}%`);
          el.dataset.spot = "on";
          raf = 0;
        });
      }
    };

    const onLeave = () => {
      el.dataset.spot = "off";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-spot="off"
      className="hero-spotlight relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {children}
      <div className="hero-spotlight-layer pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
    </section>
  );
}
