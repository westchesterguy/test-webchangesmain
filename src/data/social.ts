import { agent } from "@/lib/site";

/**
 * Content for the social feed that closes every page. Kept in step with the
 * other site's copy — one brand, one social presence, so the cards are the
 * same posts on both.
 *
 * Rules this file follows, and must keep following:
 * - No like count, comment count or post age anywhere. Those are facts about
 *   live posts, they change hourly, and they are not in this repo. A number
 *   typed in by hand would be wrong within the day and wrong in public. Wire
 *   the Instagram Graph API and the cards can carry real ones.
 * - Every card links to a real @westchesternyhomes reel and uses that reel's
 *   own thumbnail.
 * - The header row lists only accounts whose URL is confirmed. site.ts marks
 *   the Facebook and X handles as unverified since 2023; they stay out until
 *   someone checks them, then they are a one-line addition here — the row is
 *   set in words, so a new platform needs no artwork.
 */

export interface SocialProfile {
  /** Shown as the link's text, so it reads as a name, not a key. */
  label: string;
  href: string;
}

export const socialProfiles: SocialProfile[] = [
  { label: "Instagram", href: agent.social.instagram },
  { label: "LinkedIn", href: agent.social.linkedin },
];

export interface HeadingPart {
  text: string;
  weight: "strong" | "light";
}

export const socialAccount = {
  name: "The Westchester Guy",
  handle: "@westchesternyhomes",
  /**
   * The band's heading, in render order. The light part sets up the strong
   * part, so the name lands last and carries the weight — on the hub the
   * section is an invitation to follow a person, not a feature called
   * "Social Feed". Two parts, because one word of contrast is what keeps the
   * line from reading as a label.
   */
  heading: [
    { text: "Follow", weight: "light" },
    { text: "Michael Winter", weight: "strong" },
  ] as HeadingPart[],
};

export interface SocialPost {
  poster: string;
  /** Omit to render an unlinked card rather than a dead link. */
  href?: string;
  /** Short caption shown under the frame. Never a metric. */
  title: string;
  alt: string;
}

export const socialFeed: SocialPost[] = [
  {
    poster: "/images/reels/reel-ask-michael.jpg",
    href: "https://www.instagram.com/reel/Danl7dZOqrX/",
    title: "Ask Michael",
    alt: "Ask Michael reel: Michael Winter on a Times Square billboard",
  },
  {
    poster: "/images/reels/reel-now-jbf.jpg",
    href: "https://www.instagram.com/reel/DYmzeokukNP/",
    title: "Now at Julia B. Fee Sotheby's",
    alt: "Michael Winter at the Julia B. Fee Sotheby's office in Bedford",
  },
  {
    poster: "/images/reels/reel-spotlight.jpg",
    href: "https://www.instagram.com/reel/DaeXRx0ML89/",
    title: "Local business spotlight",
    alt: "Michael Winter spotlighting a local Northern Westchester business",
  },
  {
    poster: "/images/reels/reel-moving.jpg",
    href: "https://www.instagram.com/reel/DYUc9T_OdE_/",
    title: "Making the move",
    alt: "Michael Winter beside a moving truck in Bedford",
  },

  // Stills from this site's own town films, so the row is long enough to
  // scroll. Unlinked: they are not posts.
  {
    poster: "/videos/bedfordnynew-poster.jpg",
    title: "Bedford",
    alt: "Aerial footage over Bedford, New York",
  },
  {
    poster: "/videos/katonnah-poster.jpg",
    title: "Katonah",
    alt: "Footage of Katonah, New York",
  },
  {
    poster: "/videos/north-poster.jpg",
    title: "North Salem",
    alt: "Footage of North Salem, New York",
  },
];
