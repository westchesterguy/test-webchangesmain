"use client";

import { useInView } from "./useInView";

interface AccentLineProps {
  className?: string;
}

export function AccentLine({ className = "" }: AccentLineProps) {
  const { ref, inView } = useInView(0.5);

  return (
    <div
      ref={ref}
      className={`h-px bg-[image:var(--gradient-accent)] transition-all duration-700 ease-out ${
        inView ? "w-12" : "w-0"
      } ${className}`}
    />
  );
}
