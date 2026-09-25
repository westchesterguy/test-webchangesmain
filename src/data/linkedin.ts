import { agent } from "@/lib/site";

/**
 * The LinkedIn rail.
 *
 * Curated by hand, and it has to be: LinkedIn publishes no API for reading a
 * member profile's posts — only Company Pages — and Michael's presence is a
 * personal profile. No aggregator can do it either, so there is nothing to
 * automate here and nothing that can silently break.
 *
 * The images are screenshots with the LinkedIn chrome cropped off: no profile
 * row, no reaction bar, and in particular no impressions count, which is
 * private analytics and has no business on a public page. Each was cut to its
 * media band, measured rather than eyeballed, and left at its full portrait
 * frame so the card centre-crops it exactly as it does an Instagram reel.
 *
 * Every card links to the profile rather than to a post. Screenshots carry no
 * permalink, and a card linking to the wrong post would be worse than one
 * linking to the feed it came from. Give a post its own URL here when you
 * have it and the card will use it.
 *
 * To add one: drop a cropped screenshot in public/linkedin and add a line
 * below. Order here is the order on the page.
 */

export interface LinkedInPost {
  image: string;
  /** Defaults to the profile. A post's own permalink is better when known. */
  href?: string;
}

export const linkedInProfile = agent.social.linkedin;

export const linkedInPosts: LinkedInPost[] = [
  { image: "/linkedin/01.jpg" },
  { image: "/linkedin/02.jpg" },
  { image: "/linkedin/03.jpg" },
  { image: "/linkedin/04.jpg" },
  { image: "/linkedin/05.jpg" },
];
