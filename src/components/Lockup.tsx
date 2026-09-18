import Image from "next/image";

/**
 * Brand marks. This file is identical on both sites.
 *
 * The artwork is 590x940 and stacks dog, MW, then MICHAEL WINTER on one
 * centre axis. It was recomposed from mw-lockup-{variant}.png, where MW ran
 * the full 748 of a 748x1000 canvas against a 590-wide wordmark and so
 * overhung the name by 27%. MW is now scaled to the wordmark's measure, which
 * is what makes the three elements read as one mark rather than three stacked
 * pieces. The originals stay on disk as the source the v2 art was cut from.
 *
 * The "-v2" in the filename is load-bearing, not tidiness: next.config serves
 * /images/* with `immutable` and a one-year max-age, so art replaced at the
 * same path never reaches a visitor who has been here before, and the CDN and
 * Next's own image optimiser both keep serving the old bytes. New art needs a
 * new URL.
 *
 * Measured alpha bands in the current art: dog 0-346, MW 417-652,
 * MICHAEL 732-826, WINTER 847-939. MarkBadge's crop depends on those — if the
 * artwork is replaced again, re-measure before touching the numbers below.
 */

export function Lockup({
  variant = "white",
  className = "",
  width = 132,
}: {
  variant?: "white" | "navy";
  className?: string;
  width?: number;
}) {
  return (
    <Image
      src={`/images/mw-lockup-${variant}-v2.png`}
      alt="Michael Winter"
      width={width}
      height={Math.round((width * 940) / 590)}
      className={className}
      priority
    />
  );
}

/**
 * The dog-over-MW mark, in a ring. This is the masthead mark on both sites.
 *
 * There is no dog+MW asset on disk, only the dog alone and the full lockup,
 * so this crops the full lockup rather than adding a third file that could
 * drift from the other two. The frame is 590x653 — everything below the MW
 * is clipped — and the crop is geometric, not a magic number: the image runs
 * full width at its natural ratio and the frame cuts it at the band boundary.
 */
export function MarkBadge({
  variant = "white",
  className = "",
}: {
  variant?: "white" | "navy";
  className?: string;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border ${
        variant === "white" ? "border-white/40" : "border-navy/40"
      } ${className}`}
    >
      <span className="block w-[52%] overflow-hidden aspect-[590/653]">
        <Image
          src={`/images/mw-lockup-${variant}-v2.png`}
          alt=""
          aria-hidden
          width={590}
          height={940}
          className="block h-auto w-full max-w-none"
        />
      </span>
    </span>
  );
}
