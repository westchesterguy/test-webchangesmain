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

/** Decides a tile's shape in the rail: portrait for reels, wide for film. */
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
  instagram: {
    handle: "@westchesternyhomes",
    profile: agent.social.instagram,
  },
  youtube: {
    /**
     * No channel is known, so there is nothing to link to. Set it and the
     * rail gains a second follow action. Do not guess a URL.
     */
    profile: null as string | null,
  },
};

/**
 * Rail order. The band is one row, so reels and films are interleaved rather
 * than grouped: four narrow tiles in a block then three wide ones reads as
 * two clumps, while alternating them gives the strip a rhythm and lets a
 * wide frame breathe between the portrait ones. Order is by eye, not by date
 * — nothing here claims to be chronological.
 */
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
    lane: "youtube",
    poster: "/videos/bedfordnynew-poster.jpg",
    clip: "/videos/bedfordnynew.mp4",
    title: "Bedford",
    meta: "Town film",
    alt: "Aerial footage over Bedford, New York",
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
    lane: "youtube",
    poster: "/videos/katonnah-poster.jpg",
    clip: "/videos/katonnah.mp4",
    title: "Katonah",
    meta: "Town film",
    alt: "Footage of Katonah, New York",
  },
  {
    lane: "instagram",
    poster: "/images/reels/reel-moving.jpg",
    href: "https://www.instagram.com/reel/DYUc9T_OdE_/",
    title: "Making the move",
    meta: "Bedford, NY",
    alt: "Michael Winter beside a moving truck in Bedford",
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
