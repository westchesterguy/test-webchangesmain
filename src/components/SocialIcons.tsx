/**
 * The platform glyphs the feed needs, drawn inline so the band costs no
 * extra request.
 *
 * Each card marks which platform its post came from, which matters most on
 * the aggregated rail: those posts arrive mixed, so the glyph is the only
 * thing telling a TikTok card from an Instagram one. The header row still
 * names its accounts in words, not logos.
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

export function TikTokIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.2 2h-3.1v13.2a2.6 2.6 0 1 1-2.2-2.57V9.5a5.7 5.7 0 1 0 5.3 5.68V8.9a6.9 6.9 0 0 0 4.05 1.3V7.1a4.06 4.06 0 0 1-4.05-4.05V2z" />
    </svg>
  );
}

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.7-6.8a.6.6 0 0 0 0-1l-10.7-6.8a.6.6 0 0 0-.92.5z" />
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
