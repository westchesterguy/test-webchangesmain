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
