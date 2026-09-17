import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Michael Winter | Sotheby's International Realty";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({
    overline: "Sotheby's International Realty",
    title: "Michael Winter",
    subtitle: "The Westchester Guy · Northern Westchester real estate",
  });
}
