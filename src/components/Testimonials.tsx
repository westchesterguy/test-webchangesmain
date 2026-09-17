import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { Section } from "./Section";
import { Overline } from "./Overline";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const preview = testimonials.slice(0, 3);

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
          className="inline-flex items-center gap-2 text-small uppercase tracking-[0.08em] text-accent-dark hover:text-charcoal font-medium transition-colors group"
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
