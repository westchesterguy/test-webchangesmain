"use client";

import { useState } from "react";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border relative">
      {!loaded && (
        <div className="absolute inset-0 map-skeleton flex items-center justify-center">
          <svg
            className="w-8 h-8 text-charcoal-muted/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}
      <iframe
        src="https://www.google.com/maps?q=4+Court+Road%2C+Bedford%2C+NY+10506&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office location: 4 Court Road, Bedford, NY 10506"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
