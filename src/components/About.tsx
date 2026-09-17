import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { AccentLine } from "./AccentLine";
import { Section } from "./Section";
import { Overline } from "./Overline";

export function About() {
  return (
    <Section id="about" className="bg-warm-white">
        <div className="max-w-3xl">
          <FadeIn>
          <Overline className="mb-4">About Michael</Overline>

          <h2 className="font-display text-heading text-charcoal mb-10">
            The towns, the homes,
            {" "}<br className="hidden md:block" />
            the guy who knows them.
          </h2>

          <AccentLine className="mb-10" />

          <div className="space-y-6 text-body text-charcoal-light leading-relaxed">
            <p>
              Known across Northern Westchester as The Westchester Guy, Michael
              Winter pairs deep local knowledge with a career spent building
              brands, bringing marketing instincts most listings never get.
            </p>
            <p>
              A Licensed Real Estate Salesperson with Julia B. Fee
              Sotheby&apos;s International Realty in Bedford, NY, Michael serves
              buyers, sellers, and renters throughout Bedford, Katonah,
              Chappaqua, Pound Ridge, and the surrounding towns. Before real
              estate, he held senior executive roles at Ralph Lauren, Nautica,
              and Brand-Aid.
            </p>
            <p>
              Licensed in New York and Connecticut, Michael is proud to guide
              clients through one of life&apos;s most important decisions.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 py-3 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
            >
              Full bio
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
          </FadeIn>
        </div>
    </Section>
  );
}
