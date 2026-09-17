import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared Open Graph / Twitter card renderer. Keeps every page's social image
 * on-brand (navy field, sage accent, serif headline) from one place.
 */
export function ogImage({
  overline,
  title,
  subtitle,
}: {
  overline: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#14283F",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#A9B7A0",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "#A9B7A0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {overline}
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: subtitle ? "24px" : "0",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: "26px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE }
  );
}
