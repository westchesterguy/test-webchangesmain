export interface InsightPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  /** Last meaningful content edit. Bump when a post is revised so search
      engines and AI see a real freshness signal. Defaults to dateISO. */
  dateModifiedISO: string;
  topic: string;
  readTime: string;
}

/**
 * Phase 2 adds the three launch posts (Northern Westchester town guides and
 * market perspectives). The welcome post below keeps the insights
 * infrastructure (feed.xml, sitemap, lastUpdated) live until then.
 */
export const insightPosts: InsightPost[] = [
  {
    slug: "moving-from-nyc-to-northern-westchester",
    title:
      "Moving from NYC to Northern Westchester: An Honest Starter Guide",
    description:
      "What city buyers actually need to know before house-hunting up here: how the towns differ, why the Harlem Line shapes everything, and why renting first is a smart move, not a cop-out.",
    date: "July 2026",
    dateISO: "2026-07-08",
    dateModifiedISO: "2026-07-08",
    topic: "Buyer Education",
    readTime: "7 min read",
  },
  {
    slug: "bedford-bedford-hills-katonah-explained",
    title:
      "Bedford, Bedford Hills, or Katonah? One Town, Three Very Different Lifestyles",
    description:
      "Bedford, Bedford Hills, and Katonah are three hamlets of a single town that feel nothing alike. Here's the historic village, the commuter hamlet, and the walkable Main Street explained, and who each one suits.",
    date: "July 2026",
    dateISO: "2026-07-06",
    dateModifiedISO: "2026-07-06",
    topic: "Community Guide",
    readTime: "6 min read",
  },
  {
    slug: "why-video-sells-homes",
    title: "What Fashion Taught Me About Selling Your Home",
    description:
      "Before real estate, Michael Winter ran brands at Ralph Lauren and Nautica. Here's how a career in fashion (merchandising, film, and story) shapes the way he markets a listing today.",
    date: "July 2026",
    dateISO: "2026-07-03",
    dateModifiedISO: "2026-07-03",
    topic: "Seller Education",
    readTime: "5 min read",
  },
  {
    slug: "introducing-the-westchester-guy",
    title: "Welcome to the New Home of The Westchester Guy",
    description:
      "Michael Winter's new digital home is live: the place for Northern Westchester town guides, market perspectives, and a direct line to the Westchester Guy. Here's what's coming.",
    date: "July 2026",
    dateISO: "2026-07-10",
    dateModifiedISO: "2026-07-10",
    topic: "Announcement",
    readTime: "2 min read",
  },
];

export function getPostBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return insightPosts.map((post) => post.slug);
}
