import { agent } from "@/lib/site";

/**
 * Content for the social band that closes every page.
 *
 * Rules this file follows, and must keep following:
 * - Nothing here asserts a follower count, a view count or a post date. Those
 *   are facts and they are not verified in this repo.
 * - Every Instagram entry is a real @westchesternyhomes reel, linked to its
 *   own permalink, with its own thumbnail.
 * - The YouTube lane is STAND-IN. There is no channel URL anywhere in this
 *   codebase, so nothing is invented: the tiles show this site's own films,
 *   titled for what they actually are, and they carry no href. Give the lane
 *   real videos and a `profile` and they become links; until then it reads as
 *   a layout, not as a claim.
 */

export type LaneKey = "instagram" | "youtube";

export interface SocialPost {
  lane: LaneKey;
  poster: string;
  /** Optional mp4 previewed on hover. */
  clip?: string;
  /** Omit to render an unlinked tile rather than a dead link. */
  href?: string;
  title: string;
  meta: string;
  alt: string;
}

export const socialLanes = {
  /** Lane render order, top to bottom. */
  order: ["instagram", "youtube"] as LaneKey[],
  instagram: {
    label: "Reels",
    handle: "@westchesternyhomes",
    profile: agent.social.instagram,
  },
  youtube: {
    label: "Long form",
    /** No channel is known. Set it and the lane gains a follow action. */
    profile: null as string | null,
  },
};

export const socialFeed: SocialPost[] = [
  {
    lane: "instagram",
    poster: "/images/reels/reel-ask-michael.jpg",
    href: "https://www.instagram.com/reel/Danl7dZOqrX/",
    title: "Ask Michael",
    meta: "#thewestchesterguy",
    alt: "Ask Michael reel: Michael Winter on a Times Square billboard",
  },
  {
    lane: "instagram",
    poster: "/images/reels/reel-now-jbf.jpg",
    href: "https://www.instagram.com/reel/DYmzeokukNP/",
    title: "Now at Julia B. Fee Sotheby's",
    meta: "Bedford, NY",
    alt: "Michael Winter at the Julia B. Fee Sotheby's office in Bedford",
  },
  {
    lane: "instagram",
    poster: "/images/reels/reel-spotlight.jpg",
    href: "https://www.instagram.com/reel/DaeXRx0ML89/",
    title: "Local business spotlight",
    meta: "Northern Westchester",
    alt: "Michael Winter spotlighting a local Northern Westchester business",
  },
  {
    lane: "instagram",
    poster: "/images/reels/reel-moving.jpg",
    href: "https://www.instagram.com/reel/DYUc9T_OdE_/",
    title: "Making the move",
    meta: "Bedford, NY",
    alt: "Michael Winter beside a moving truck in Bedford",
  },

  // Stand-in tiles. This site's own town films, not YouTube uploads.
  {
    lane: "youtube",
    poster: "/videos/bedfordnynew-poster.jpg",
    clip: "/videos/bedfordnynew.mp4",
    title: "Bedford",
    meta: "Town film",
    alt: "Aerial footage over Bedford, New York",
  },
  {
    lane: "youtube",
    poster: "/videos/katonnah-poster.jpg",
    clip: "/videos/katonnah.mp4",
    title: "Katonah",
    meta: "Town film",
    alt: "Footage of Katonah, New York",
  },
  {
    lane: "youtube",
    poster: "/videos/north-poster.jpg",
    clip: "/videos/north.mp4",
    title: "North Salem",
    meta: "Town film",
    alt: "Footage of North Salem, New York",
  },
];
