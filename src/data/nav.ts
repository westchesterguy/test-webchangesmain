import { agent } from "@/lib/site";

export interface NavLink {
  href: string;
  label: string;
}

/** Single source of truth for primary navigation — used by Header and the command palette. */
// Testimonials returns to primary nav once real reviews replace the
// placeholders; the page stays routable and footer-linked meanwhile.
export const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
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
 * The masthead's site switcher.
 *
 * Both public sites share one header so the pair reads as a single property
 * rather than two brokerages. Order is fixed — hub first, horse site second —
 * and is identical on westchesterhorseproperties, so the tabs do not move
 * when a visitor crosses domains. `short` is the label used below sm, where
 * the full names do not fit beside the mark and the button.
 *
 * SANDBOX DEFAULT — NOT THE PRODUCTION URL. This repo is the sandbox copy of
 * michaelwinterrealestate, so the horse site it points at is the sandbox copy
 * of the horse site, on its branch preview. Keeping the pair pointed at each
 * other means the switcher stays inside the sandbox instead of dropping you
 * onto the live site mid-test. When this change is ported to the live repo,
 * this constant goes back to "https://westchesterhorseproperties.com".
 *
 * NEXT_PUBLIC_HORSE_URL overrides it per Vercel project, so a deployment can
 * be pointed somewhere else without a code change.
 */
const SANDBOX_HORSE_URL =
  "https://test-webchanges-git-claude-vibrant-n-0bc257-the-westchester-guy.vercel.app";

export const HORSE_URL =
  process.env.NEXT_PUBLIC_HORSE_URL ?? SANDBOX_HORSE_URL;

export interface Brand {
  label: string;
  short: string;
  href: string;
  /** Absolute, cross-domain: rendered as a plain anchor, not a Next link. */
  external: boolean;
}

export const brands: Brand[] = [
  {
    label: "The Westchester Guy",
    short: "Westchester Guy",
    href: "/",
    external: false,
  },
  {
    label: "Westchester Horse Properties",
    short: "Horse Properties",
    href: HORSE_URL,
    external: true,
  },
];

/** Which brand tab reads as current. This codebase is the hub. */
export const CURRENT_BRAND = "The Westchester Guy";

/**
 * "Ask Michael" is the reel series on Instagram, not a chat route — neither
 * site has one yet. The masthead button goes to the contact page until it
 * does. Repoint it once the chat exists; do not guess a path.
 */
export const ASK_MICHAEL_URL = "/contact";
