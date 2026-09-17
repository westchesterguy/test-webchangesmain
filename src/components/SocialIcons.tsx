/** Platform glyphs, drawn inline so the band costs no extra request. */

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
    </svg>
  );
}
