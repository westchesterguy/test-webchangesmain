import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { insightPosts } from "@/data/insights";
import { communities } from "@/data/communities";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = insightPosts.reduce((latest, post) => {
    const d = new Date(post.dateISO);
    return d > latest ? d : latest;
  }, new Date(insightPosts[0].dateISO));

  const insightUrls: MetadataRoute.Sitemap = insightPosts.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.dateModifiedISO),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const communityUrls: MetadataRoute.Sitemap = communities.map((c) => ({
    url: `${SITE_URL}/communities/${c.slug}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    { url: SITE_URL, lastModified: latestPostDate, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/communities`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.9 },
    ...communityUrls,
    { url: `${SITE_URL}/buyers`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/sellers`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/insights`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.85 },
    ...insightUrls,
    { url: `${SITE_URL}/testimonials`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/fair-housing`, lastModified: new Date("2026-06-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/sop`, lastModified: new Date("2026-06-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/accessibility`, lastModified: new Date("2026-06-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date("2026-06-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/tos`, lastModified: new Date("2026-06-01"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
