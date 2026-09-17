"use client";

import { useInView } from "./useInView";
import { CountUp } from "./CountUp";

interface Stat {
  value: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  light?: boolean;
}

export function AnimatedStats({ stats, light = false }: AnimatedStatsProps) {
  const { ref, inView } = useInView(0.3);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`transition-all duration-700 ease-out ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <p
            className={`font-display text-4xl md:text-5xl mb-2 ${
              light ? "text-white" : "text-charcoal"
            }`}
          >
            <CountUp value={stat.value} inView={inView} />
          </p>
          <p className={`text-small ${light ? "text-white/70" : "text-charcoal-muted"}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
