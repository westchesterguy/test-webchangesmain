"use client";

import { useInView } from "./useInView";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  threshold?: number;
}

export function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.2,
}: FadeInProps) {
  const { ref, inView } = useInView(threshold);

  const translateMap = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${translateMap[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
