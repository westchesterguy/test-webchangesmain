import { agent, LISTINGS_URL } from "@/lib/site";

export interface NavLink {
  href: string;
  label: string;
  /** Off-site: rendered as a plain anchor that opens in a new tab. */
  external?: boolean;
}

/** Single source of truth for primary navigation — used by Header and the command palette. */
// Testimonials returns to primary nav once real reviews replace the
// placeholders; the page stays routable and footer-linked meanwhile.
export const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: LISTINGS_URL, label: "Listings", external: true },
  { href: "/communities", label: "Communities" },
  { href: "/buyers", label: "Buyers" },
  { href: "/sellers", label: "Sellers" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export const social = {
  linkedin: agent.social.linkedin,
  instagram: agent.social.instagram,
  email: agent.leadEmail,
};

/**
 * Where the switcher's other tab points.
 *
 * This is the production domain. It used to default to the horse site's
 * branch preview so the sandbox pair pointed at each other, but a preview URL
 * is generated per branch and per deployment: left in place it goes stale the
 * moment the branch is renamed or the preview expires, and it would put a
 * vercel.app address in front of a client on the live site.
 *
 * NEXT_PUBLIC_HORSE_URL still overrides it per Vercel project, which is how a
 * preview deployment gets pointed back at a matching preview of the horse
 * site without a code change.
 */
export const HORSE_URL =
  process.env.NEXT_PUBLIC_HORSE_URL ?? "https://westchesterhorseproperties.com";

export interface Brand {
  label: string;
  short: string;
  href: string;
  /** Absolute, cross-domain: rendered as a plain anchor, not a Next link. */
  external: boolean;
}

/**
 * The masthead's site switcher.
 *
 * Both public sites share one header so the pair reads as a single property
 * rather than two brokerages. Order is fixed — this site first, the horse site
 * second — and must stay identical there so the tabs do not move when a visitor
 * crosses domains.
 *
 * The tabs carry the domains, not the brand names: "westchesterguy.com" next
 * to "westchesterhorseproperties.com" tells a visitor these are two addresses
 * under one roof, which is the whole point of the switcher. Mixing a brand
 * name with a URL would read as a mistake, so they change together or not at
 * all. `short` drops the suffix below lg, where two full domains do not fit
 * in the half row each name gets beside the centred button. The masthead
 * sets both in capitals with CSS, so the strings stay lowercase here.
 */
export const brands: Brand[] = [
  {
    label: "westchesterguy.com",
    short: "westchesterguy",
    href: "/",
    external: false,
  },
  {
    label: "westchesterhorseproperties.com",
    short: "horse properties",
    href: HORSE_URL,
    external: true,
  },
];

/** Which brand tab reads as current. This codebase is the hub. */
export const CURRENT_BRAND = "westchesterguy.com";

/**
 * Fallback for the masthead's Ask Michael button. The button raises the Tawk
 * widget; this is where it lands when the embed has not loaded or was blocked
 * by an extension. See components/Header.tsx and lib/liveChat.ts.
 */
export const ASK_MICHAEL_URL = "/contact";
