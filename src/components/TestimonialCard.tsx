import type { Testimonial } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-accent" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.343 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-sm border border-border bg-warm-white p-7 flex flex-col h-full">
      {typeof testimonial.rating === "number" && <Stars rating={testimonial.rating} />}
      <blockquote className="text-body text-charcoal-light leading-relaxed flex-1">
        <span className="font-display text-3xl text-accent/40 leading-none mr-1 align-top">&ldquo;</span>
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 pt-5 border-t border-border">
        <p className="text-small font-medium text-charcoal">{testimonial.author}</p>
        <p className="text-caption text-charcoal-muted">{testimonial.location}</p>
      </figcaption>
    </figure>
  );
}
