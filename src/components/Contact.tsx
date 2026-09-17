import Link from "next/link";
import { Section } from "./Section";
import { Overline } from "./Overline";

export function Contact() {
  return (
    <Section id="contact" className="bg-warm-white">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Label */}
          <Overline className="mb-4">Contact</Overline>

          <h2 className="font-display text-heading text-charcoal mb-6">
            Get in touch.
          </h2>

          <p className="text-body text-charcoal-light leading-relaxed mb-12">
            For professional inquiries or to connect directly.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white text-small uppercase tracking-[0.08em] font-medium rounded-sm shadow-[var(--shadow-md)] hover:bg-navy-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] transition-all group"
          >
            Send a message
            <svg
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
    </Section>
  );
}
