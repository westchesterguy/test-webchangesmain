import { navLinks, social } from "./nav";

export type CommandGroup = "Navigation" | "Actions" | "Connect";

export interface Command {
  id: string;
  label: string;
  group: CommandGroup;
  keywords?: string[];
  /** Internal route (next/router push). */
  href?: string;
  /** External URL (opens in a new tab). */
  external?: string;
  /** Built-in action handled by the palette. */
  action?: "copy-email";
}

export const commands: Command[] = [
  // Navigation
  { id: "nav-home", label: "Home", group: "Navigation", href: "/", keywords: ["start", "landing"] },
  ...navLinks.map(
    (l): Command => ({
      id: `nav-${l.href}`,
      label: l.label,
      group: "Navigation",
      href: l.href,
    })
  ),

  // Actions
  {
    id: "action-copy-email",
    label: "Copy email address",
    group: "Actions",
    action: "copy-email",
    keywords: ["contact", "mail", "reach"],
  },
  {
    id: "action-rss",
    label: "View RSS feed",
    group: "Actions",
    external: "/feed.xml",
    keywords: ["feed", "subscribe", "syndication"],
  },

  // Connect
  {
    id: "connect-linkedin",
    label: "LinkedIn",
    group: "Connect",
    external: social.linkedin,
    keywords: ["social", "profile", "connect"],
  },
  {
    id: "connect-instagram",
    label: "Instagram",
    group: "Connect",
    external: social.instagram,
    keywords: ["social", "photos", "connect"],
  },
];
