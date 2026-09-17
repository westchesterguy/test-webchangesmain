import Image from "next/image";

/**
 * The dog-over-MW mark, in a ring. This is the masthead mark on both sites,
 * and this file is kept identical to westchesterhorseproperties' copy.
 *
 * There is no dog+MW asset on disk, only the dog alone and the full lockup,
 * so this crops the full lockup instead of introducing a third file that
 * could drift from the other two. Measured alpha bands in the 748x1000
 * source: dog 0-346, MW 416-714, MICHAEL 793-887, WINTER 907-999. Cutting at
 * 714 keeps the dog and MW and drops the wordmark, which is the brand rule
 * everywhere except the horse site's hero and footer lockups.
 *
 * The crop is geometric, not a magic number: the frame is 748x714, the image
 * runs full width at its natural ratio, and everything below 714 is clipped.
 * Re-measure the bands if either lockup file is ever replaced.
 *
 * Note this is mw-lockup-white.png, not this site's older square
 * mw-lockup.png — that one is black art on an opaque white ground and only
 * works in the header because it is inverted and cropped to a circle.
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
      <span className="block w-[58%] overflow-hidden aspect-[748/714]">
        <Image
          src={`/images/mw-lockup-${variant}.png`}
          alt=""
          aria-hidden
          width={748}
          height={1000}
          className="block h-auto w-full max-w-none"
        />
      </span>
    </span>
  );
}
