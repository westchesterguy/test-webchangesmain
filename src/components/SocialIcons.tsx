/**
 * The two glyphs the feed still needs, drawn inline so the band costs no
 * extra request.
 *
 * The platform logo set that used to live here is gone: the header row names
 * its accounts in words now, so adding a verified account is a line in
 * socialProfiles and needs no artwork at all. InstagramIcon stays because
 * each card still marks which platform its post came from.
 */

type IconProps = { className?: string };

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
