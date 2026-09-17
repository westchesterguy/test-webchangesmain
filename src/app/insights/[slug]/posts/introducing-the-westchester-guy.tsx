import Link from "next/link";

export function IntroducingTheWestchesterGuy() {
  return (
    <>
      <p className="text-subheading text-charcoal font-light leading-relaxed">
        Welcome. This site is the new digital home of Michael Winter, known
        around Northern Westchester as The Westchester Guy, and the newest
        member of Julia B. Fee Sotheby&apos;s International Realty in Bedford,
        New York.
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        What you&apos;ll find here
      </h2>

      <p>
        If you follow along on Instagram, you already know the format: real
        walks through real towns, local businesses worth knowing, and straight
        answers to the questions buyers and sellers actually ask. This site
        brings that same approach to a home base, with{" "}
        <Link href="/communities" className="underline underline-offset-2">
          guides to the towns
        </Link>{" "}
        Michael serves, market perspectives worth your time, and a simple way to{" "}
        <Link href="/contact" className="underline underline-offset-2">
          reach him directly
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        More to come
      </h2>

      <p>
        Town guides, market data perspectives, and the Ask Michael series are
        on the way. In the meantime: whether you&apos;re buying, selling,
        renting, or just curious what your place is worth, call the
        Westchester Guy.
      </p>
    </>
  );
}
