import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/JsonLd";
import { CommandPalette } from "@/components/CommandPalette";
import { SITE_URL, agent } from "@/lib/site";
import { LiveChat } from "@/components/LiveChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Editorial serif. Swap here only; components read --font-display-serif.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Michael Winter — The Westchester Guy",
    default:
      "Michael Winter — The Westchester Guy | Northern Westchester Real Estate | Julia B. Fee Sotheby's International Realty",
  },
  description:
    "Michael Winter — The Westchester Guy — is a Licensed Real Estate Salesperson with Julia B. Fee Sotheby's International Realty in Bedford, NY, serving Bedford, Katonah, Chappaqua, Pound Ridge, and Northern Westchester County.",
  keywords: [
    "Michael Winter",
    "The Westchester Guy",
    "Westchester County realtor",
    "Bedford NY real estate",
    "Katonah NY homes",
    "Chappaqua NY homes",
    "Pound Ridge NY homes",
    "Julia B. Fee Sotheby's International Realty",
    "Northern Westchester luxury real estate",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: agent.fullName }],
  openGraph: {
    title: "Michael Winter — The Westchester Guy | Sotheby's International Realty",
    description:
      "Northern Westchester real estate with brand-level marketing. Licensed in NY and CT. Call the Westchester Guy.",
    url: SITE_URL,
    siteName: "Michael Winter Real Estate",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Winter — The Westchester Guy",
    description:
      "Northern Westchester real estate with brand-level marketing. Licensed in NY and CT.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="alternate" type="application/rss+xml" title="Michael Winter | Insights" href="/feed.xml" />
        <link rel="alternate" type="text/plain" title="LLM-friendly summary (llms.txt)" href="/llms.txt" />
      </head>
      <body>
        <JsonLd />
        {children}
        <CommandPalette />
        <Analytics />
        <SpeedInsights />
        <LiveChat />
      </body>
    </html>
  );
}
