import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Allows the placeholder headshot SVG to render via next/image.
    // Safe here because we only serve our own SVG assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        // bedfordnyhomes.com is a standalone brand domain (it matches the
        // Facebook page facebook.com/bedfordny.homes), so it lands on the
        // Bedford community page rather than the homepage. Temporary on
        // purpose: Michael may build it out as its own site later, and a
        // cached permanent redirect would make that painful to undo.
        source: "/:path*",
        has: [{ type: "host", value: "bedfordnyhomes.com" }],
        destination: "https://michaelwinterrealestate.com/communities/bedford",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);
