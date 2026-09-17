"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.15, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Only compute when in/near viewport
      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;
      const center = rect.top + rect.height / 2;
      const viewCenter = windowHeight / 2;
      setOffset((center - viewCenter) * speed);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="w-full h-full"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
