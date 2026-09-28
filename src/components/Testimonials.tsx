import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { Section } from "./Section";
import { Overline } from "./Overline";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

/** Homepage preview: the three shortest reviews, not the first three. The grid
   is three columns with no line clamp, so quote length is what decides card
   height — leading with the shortest keeps the row even instead of hanging one
   card several times deeper than its neighbours. The full set, longest reviews
   included, is one click away on /testimonials. */
export function Testimonials() {
  const preview = [...testimonials]
    .sort((a, b) => a.quote.length - b.quote.length)
    .slice(0, 3);

  return (
    <Section className="bg-warm-white">
      <FadeIn>
        <Overline className="mb-4">Testimonials</Overline>
        <h2 className="font-display text-heading text-charcoal mb-14">
          What Michael&apos;s clients say.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {preview.map((t, i) => (
          <FadeIn key={i} direction="up">
            <TestimonialCard testimonial={t} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/testimonials"
          className="group inline-flex items-center gap-2 rounded-sm bg-navy px-7 py-3 text-small font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy-light"
        >
          Read more testimonials
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
