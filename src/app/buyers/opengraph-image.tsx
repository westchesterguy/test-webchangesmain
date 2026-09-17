import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Buy with confidence | Michael Winter, for buyers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "For Buyers",
    title: "Buy with confidence",
    subtitle: "Northern Westchester County, NY",
  });
}
