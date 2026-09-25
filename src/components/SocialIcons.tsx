/**
 * The two glyphs the feed still needs, drawn inline so the band costs no
 * extra request.
 *
 * Each card marks which platform its post came from, so both glyphs are
 * needed again now that the band carries an Instagram rail and a LinkedIn
 * one. The header row still names its accounts in words, not logos.
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

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm7 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.31-2.02 2.66v5.14h-4v-11z" />
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
