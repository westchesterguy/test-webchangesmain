import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "What's your home worth? | A complimentary valuation from Michael Winter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "For Sellers",
    title: "What's your home worth?",
    subtitle: "A complimentary valuation from Michael Winter",
  });
}
