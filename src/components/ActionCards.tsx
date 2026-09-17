import Link from "next/link";

/**
 * Buy / Sell / Rent — the 2023 signature triptych at full bleed. Three tall
 * panels separated by hairlines, grayscale at rest, color on hover. Type at
 * editorial scale; the panel is the button.
 */
const cards = [
  {
    title: "Buy",
    description: "Find the right town, then the right home.",
    href: "/buyers",
    cta: "Start your search",
    image: "/images/buy-card.jpg",
  },
  {
    title: "Sell",
    description: "Brand-level marketing for your home.",
    href: "/sellers",
    cta: "Get a valuation",
    image: "/images/estate-generic.jpg",
  },
  {
    title: "Rent",
    description: "Try a town before you commit to it.",
    href: "/contact",
    cta: "Find a rental",
    image: "/images/rent-card.jpg",
  },
];

export function ActionCards() {
  return (
    <section className="bg-border">
      <div className="grid grid-cols-1 gap-px md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative block min-h-[56svh] overflow-hidden bg-black md:min-h-[68svh]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-75 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
              <p className="font-display text-5xl text-white md:text-6xl">
                {card.title}
              </p>
              <p className="mt-2 max-w-[24ch] text-body text-white/75">
                {card.description}
              </p>
              <p className="mt-8 inline-flex translate-y-2 items-center gap-2 text-small font-medium uppercase tracking-[0.08em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
                {card.cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
