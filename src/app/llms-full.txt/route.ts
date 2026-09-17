import { profile, lastUpdatedISO } from "@/data/profile";
import { insightPosts } from "@/data/insights";
import { communities } from "@/data/communities";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const p = profile;
  const lines: string[] = [
    `# ${p.name}: ${p.title}`,
    "",
    `> ${p.tagline}`,
    "",
    `Last updated: ${lastUpdatedISO()}`,
    "",
    "## About",
    "",
    ...p.aboutFull.flatMap((x) => [x, ""]),
    "## Credentials",
    "",
    ...p.credentials.map((c) => `- ${c}`),
    "",
    "## Specialties",
    "",
    ...p.specialties.map((s) => `- ${s}`),
    "",
    "## Recognition",
    "",
    ...p.recognition.map((r) => `- ${r}`),
    "",
    "## Community Involvement",
    "",
    ...p.communityInvolvement.map((c) => `- ${c}`),
    "",
    "## Communities Served",
    "",
    "### New York: Northern Westchester County",
    "",
    ...communities
      .filter((c) => c.state === "NY")
      .map((c) => `- ${c.name}, NY (${SITE_URL}/communities/${c.slug}): ${c.intro}`),
    "",
    ...(p.serviceAreas.ct.length
      ? [
          "### Connecticut: Fairfield County",
          "",
          `Served through William Pitt Sotheby's International Realty (New Canaan, CT): ${p.serviceAreas.ct.join(", ")}.`,
          "",
        ]
      : []),
    "## Insights (Articles)",
    "",
    ...insightPosts.flatMap((post) => [
      `### ${post.title}`,
      `- Date: ${post.date}`,
      `- Topic: ${post.topic}`,
      `- Summary: ${post.description}`,
      `- URL: ${SITE_URL}/insights/${post.slug}`,
      "",
    ]),
    "## Contact",
    "",
    `- Phone: ${p.contact.phoneDisplay}`,
    `- Contact Form: ${p.contact.form}`,
    `- Schedule a Consultation: ${p.contact.scheduling}`,
    `- LinkedIn: ${p.contact.linkedin}`,
    `- Instagram: ${p.contact.instagram}`,
    `- Sotheby's International Realty Profile: ${p.contact.sothebysProfile}`,
    "",
    "## Site Structure",
    "",
    ...p.siteStructure.map((s) => `- ${s.label}: ${s.url}`),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
