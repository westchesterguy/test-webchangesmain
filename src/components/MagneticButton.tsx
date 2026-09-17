"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps an interactive element and nudges it toward the cursor within a small
 * radius. Purely decorative — degrades to a static element on touch / reduced
 * motion, and never interferes with keyboard activation (it only translates).
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        raf = 0;
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
