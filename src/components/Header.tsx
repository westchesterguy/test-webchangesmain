"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarkBadge } from "./Lockup";
import { ChevronIcon } from "./SocialIcons";
import { openLiveChat } from "@/lib/liveChat";
import { ASK_MICHAEL_URL, CURRENT_BRAND, brands, navLinks } from "@/data/nav";

/**
 * Two-tier masthead, shared with the horse site.
 *
 * Tier one is three zones: the site you are on at the left beside the mark,
 * Ask Michael in the middle, the other site at the right. Both names are set
 * in the same face at the same size and sit on the same line, so the pair
 * reads as two addresses under one roof — the rule under the left one is the
 * only thing that says which you are at, and it appears only on the site you
 * are on. The current site always takes the left, whichever site this is.
 *
 * All three zones are present at every width, phones included, and the grid
 * is minmax(0,1fr) auto minmax(0,1fr) at every width: the side columns are
 * always equal, so Ask Michael sits on the window's centre line however much
 * longer one name is than the other. The zero minimum is what holds it there
 * when room runs short; with a plain 1fr the longer side widens its column
 * and pushes the button off centre. Below lg the columns used to size to
 * their content, which left the button visibly left of centre on phones.
 * The cost is that the longer name gets only half the row less the button,
 * so the type steps below are sized to that, and the full domains wait for
 * lg (see `short` in the brand data).
 *
 * Both names carry min-w-0 and truncate their own span. Without it the links
 * refuse to shrink below their text and the two names run straight into each
 * other on a phone, which is what a nowrap on the link itself caused.
 *
 * Both bands run the full width of the window with a small gutter, so the
 * mark sits near the edge rather than indented to the text column. Keep this
 * file in step with the other site's copy; only the config differs.
 *
 * Tier two is the near-black band carrying this site's own navigation. It is
 * the only part of the chrome that differs between the two codebases.
 *
 * Heights are load-bearing: 64 + 48 = 112px below md, 80 + 48 = 128px at md
 * and up. Page heros reserve pt-36 md:pt-40 against those.
 */
/**
 * Typography shared by both site names and by the "Visit" that introduces
 * the second, so "same face, same size" cannot drift between them. Capitals,
 * by Michael's direction. The steps are set by the tightest fit: at each
 * step's narrowest width, "Visit", the longer name and the arrow have to sit
 * in half the row beside the centred button with 6px to spare. Measured with
 * Playfair loaded, the binding widths are 320, 360, 390, 414, 1024 and 1280,
 * each within half a pixel of its limit, so re-measure before raising one.
 * lg is smaller than md because lg is where the full domains replace the
 * short names.
 */
/**
 * The domain, in the hero's serif.
 *
 * The leading is 1.35 rather than none because these names carry the
 * descenders of g, p and y, and the spans truncate — which means
 * overflow:hidden. At line-height 1 the line box is exactly the font
 * size, so Playfair's descenders fall outside it and are sliced off flat:
 * measured at 1440px, 8.4px of a 34px glyph box, a third of it gone. The
 * band does not grow, because the link centres the line box inside a row
 * of fixed height and the rule underneath is pinned to the link, not the
 * text.
 */
const SITE_NAME =
  "min-w-0 font-display font-semibold uppercase leading-[1.35] tracking-[0.02em] text-[0.42rem] min-[360px]:text-[0.5rem] min-[390px]:text-[0.56rem] sm:text-[0.85rem] md:text-[1rem] lg:text-[0.95rem] xl:text-[1.3rem]";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // The navigation row scrolls sideways when it does not fit. Nothing about a
  // cut-off row says "there is more" on a touch screen — no scrollbar, no
  // cursor — so the edges report themselves: a fade and a chevron appear on
  // whichever side still has items, and go when that side runs out.
  const navRef = useRef<HTMLElement>(null);
  const [navAtStart, setNavAtStart] = useState(true);
  const [navAtEnd, setNavAtEnd] = useState(true);

  const syncNav = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setNavAtStart(el.scrollLeft <= 1);
    // max <= 1 means the row fits, so neither edge should show anything.
    setNavAtEnd(max <= 1 || el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    syncNav();
    window.addEventListener("resize", syncNav);
    return () => window.removeEventListener("resize", syncNav);
    // pathname is a dependency because the active item changes width.
  }, [syncNav, pathname]);

  const here = brands.find((b) => b.label === CURRENT_BRAND) ?? brands[0];
  const there = brands.find((b) => b.label !== CURRENT_BRAND);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-2 top-2 z-60 px-4 py-2 bg-masthead text-white text-sm rounded outline-2 outline-accent outline-offset-2 -translate-y-full opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all"
      >
        Skip to content
      </a>
      <header
      className={`on-navy fixed inset-x-0 top-0 z-50 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      {/* Tier one — the shared band. */}
      <div className="bg-masthead">
        {/* Equal side columns keep Ask Michael on the window's centre line
            at every width, however the two names differ in length. */}
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 px-3 min-[360px]:px-4 md:h-20 md:gap-5 md:px-6 lg:px-8">
          <div className="flex h-full min-w-0 items-center gap-1.5 min-[414px]:gap-3 md:gap-5">
            <Link
              href="/"
              aria-label={`${here.label}, home`}
              className="shrink-0 rounded-full transition-opacity hover:opacity-80"
            >
              <MarkBadge variant="white" className="h-7 w-7 min-[360px]:h-8 min-[360px]:w-8 sm:h-9 sm:w-9 md:h-11 md:w-11" />
            </Link>

            {/* Where you are. The rule sits on the band's bottom edge. Set in
                the hero's serif, because that face is the brand's voice. */}
            <Link
              href="/"
              aria-current="true"
              className={`${SITE_NAME} relative flex h-full items-center text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-white`}
            >
              <span className="block truncate whitespace-nowrap lg:hidden">{here.short}</span>
              <span className="hidden truncate whitespace-nowrap lg:block">{here.label}</span>
            </Link>
          </div>

          {/* Ask Michael, in the centre cell at every width. It raises the
              Tawk widget and falls back to its href when the embed has not
              loaded or was blocked. */}
          <Link
            href={ASK_MICHAEL_URL}
            onClick={(e) => {
              if (openLiveChat()) e.preventDefault();
            }}
            className="shrink-0 whitespace-nowrap border border-white px-2 py-1 text-[0.42rem] font-medium uppercase tracking-[0.04em] transition-colors hover:bg-white hover:text-masthead min-[414px]:px-2.5 min-[414px]:text-[0.52rem] min-[414px]:tracking-[0.06em] sm:px-4 sm:py-2 sm:text-[0.62rem] sm:tracking-[0.1em] lg:px-6 lg:py-2.5 lg:text-[0.72rem] lg:tracking-[0.12em]"
          >
            Ask Michael
          </Link>

          {/* Where you could go. The name is the same face and the same size
              as the one on the left, with no rule under it — the rule means
              "you are here", so it belongs to one of the two at a time. A
              different origin, so a plain anchor rather than a Next link. */}
          {there ? (
            <a
              href={there.href}
              className={`${SITE_NAME} group flex min-w-0 items-center justify-end gap-1.5 text-white transition-opacity hover:opacity-80 min-[414px]:gap-2`}
            >
              {/* Deliberately not the names' face: the sans against the serif
                  is what separates the instruction from the address, so the
                  two do not read as one long phrase. Same size and same
                  white, at every width. */}
              <span className="shrink-0 font-sans font-medium uppercase tracking-[0.06em]">
                Visit
              </span>
              <span className="block truncate whitespace-nowrap lg:hidden">{there.short}</span>
              <span className="hidden truncate whitespace-nowrap lg:block">{there.label}</span>
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className="h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3v4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>

      {/* Tier two — this site's own navigation. Scrolls sideways on small
          screens rather than collapsing into a menu, so the chrome keeps the
          same two-band shape at every width. */}
      <div className="bg-masthead-sub">
        <div className="flex h-12 items-center px-4 md:px-6 lg:px-8">
          <div className="relative min-w-0 flex-1">
            <nav
              aria-label="Main navigation"
              ref={navRef}
              onScroll={syncNav}
              className="flex items-center gap-6 overflow-x-auto scroll-smooth pr-8 [scrollbar-width:none] md:gap-8 md:pr-0 [&::-webkit-scrollbar]:hidden"
            >
              {navLinks.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-small text-white/65 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  );
                }
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 text-small transition-colors ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {/* Decorative: the row itself is what scrolls. Kept out of the
                tap targets so a thumb reaching for the last item does not
                land on the hint instead. */}
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-masthead-sub to-transparent transition-opacity duration-200 ${
                navAtStart ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-end bg-gradient-to-l from-masthead-sub from-25% to-transparent transition-opacity duration-200 ${
                navAtEnd ? "opacity-0" : "opacity-100"
              }`}
            >
              <ChevronIcon className="h-3.5 w-3.5 animate-nudge text-white/80" />
            </div>
          </div>

        </div>
      </div>
    </header>
    </>
  );
}
