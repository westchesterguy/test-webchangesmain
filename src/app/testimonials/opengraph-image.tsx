import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "What clients say | Michael Winter, Sotheby's International Realty";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    overline: "Testimonials",
    title: "What clients say",
    subtitle: "Michael Winter · Sotheby's International Realty",
  });
}
