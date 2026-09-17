import { FadeIn } from "./FadeIn";

/**
 * Editorial statement — his own line from the 2015 site, set like a
 * magazine spread. One sentence, viewport-scale, nothing else.
 */
export function Statement() {
  return (
    <section className="bg-warm-white px-6 py-28 md:px-10 md:py-40">
      <FadeIn>
        <p className="mx-auto max-w-5xl text-center font-display text-heading text-charcoal md:text-[3.4rem] md:leading-[1.15]">
          &ldquo;From a cottage to a castle, every property gets the attention
          it deserves.&rdquo;
        </p>
        <p className="mt-8 text-center text-caption uppercase tracking-[0.28em] text-charcoal-muted">
          Michael Winter
        </p>
      </FadeIn>
    </section>
  );
}
