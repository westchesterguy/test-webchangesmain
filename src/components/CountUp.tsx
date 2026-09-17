"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  value: string;
  inView: boolean;
  duration?: number;
}

export function CountUp({ value, inView, duration = 1600 }: CountUpProps) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;

    // Extract the numeric part and any prefix/suffix
    const match = value.match(/^([^0-9]*)([0-9][0-9,]*)([^0-9]*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    const hasCommas = numStr.includes(",");

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      const formatted = hasCommas
        ? current.toLocaleString("en-US")
        : current.toString();
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return <>{display}</>;
}
