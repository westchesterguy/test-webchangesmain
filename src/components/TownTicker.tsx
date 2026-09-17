import { nyCommunities } from "@/data/communities";

/**
 * Runway ticker — the site's signature strip. Town names stream past in
 * letterspaced caps between hairlines, with Michael's original animated dog
 * from the 2023 site trotting in the stream. Pauses on hover; static under
 * reduced motion. The towns ARE the product — this is structure, not decor.
 */
export function TownTicker() {
  const names = nyCommunities.map((c) => c.name);

  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <div
      className="ticker-track flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {names.map((name) => (
        <span
          key={name}
          className="flex items-center whitespace-nowrap px-8 text-caption uppercase tracking-[0.28em] text-charcoal"
        >
          {name}
          <span className="ml-16 inline-block h-1 w-1 rounded-full bg-charcoal/40" aria-hidden="true" />
        </span>
      ))}
      {/* the dog trots through once per loop */}
      <span className="flex items-center whitespace-nowrap px-8" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mw-dog-dark.png" alt="" className="h-6 w-auto" />
        <span className="ml-16 inline-block h-1 w-1 rounded-full bg-charcoal/40" />
      </span>
    </div>
  );

  return (
    <div
      className="ticker overflow-hidden border-y border-border bg-warm-white py-4"
      role="marquee"
      aria-label={`Towns Michael serves: ${names.join(", ")}`}
    >
      <div className="flex w-max">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
