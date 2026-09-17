import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { Section } from "./Section";
import { Overline } from "./Overline";
import { nyCommunities } from "@/data/communities";

function TownList({ heading, towns }: { heading: string; towns: { slug: string; name: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-xl text-charcoal mb-5">{heading}</h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
        {towns.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/communities/${t.slug}`}
              className="group inline-flex items-center gap-1.5 text-body text-charcoal-light hover:text-accent-dark transition-colors"
            >
              <span className="h-px w-3 bg-accent/50 group-hover:w-5 transition-all" aria-hidden="true" />
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommunitiesPreview() {
  return (
    <Section className="bg-cream">
      <FadeIn>
        <Overline className="mb-4">Communities</Overline>
        <h2 className="font-display text-heading text-charcoal mb-6">
          Where Michael can help you call home.
        </h2>
        <p className="text-body text-charcoal-light leading-relaxed max-w-2xl mb-14">
          Deep, local knowledge of Northern Westchester: from Bedford&apos;s
          horse country to Katonah&apos;s Main Street. Explore the towns
          Michael serves.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12 md:gap-16">
        <FadeIn direction="left">
          <TownList heading="Northern Westchester County, New York" towns={nyCommunities} />
        </FadeIn>
      </div>

      <div className="mt-12">
        <Link
          href="/communities"
          className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
        >
          View all communities
          <svg
            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}
