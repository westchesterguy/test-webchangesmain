import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getCommunityBySlug, getAllCommunitySlugs } from "@/data/communities";

export const alt = "Community real estate guide | Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);

  if (!community) {
    return ogImage({
      overline: "Communities",
      title: `${slug} Real Estate`,
      subtitle: "with Michael Winter · Sotheby's International Realty",
    });
  }

  return ogImage({
    overline: `${community.county}, ${community.state}`,
    title: `${community.name} Real Estate`,
    subtitle: "with Michael Winter · Sotheby's International Realty",
  });
}
