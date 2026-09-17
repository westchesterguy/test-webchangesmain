import { SITE_URL, agent } from "@/lib/site";
import { insightPosts } from "./insights";

/**
 * Single source of truth for the profile facts surfaced to LLMs via
 * /llms.txt and /llms-full.txt and to JSON-LD. Keeping these here prevents
 * drift between the AI-facing summaries, the site content, and structured data.
 *
 * Bio sourced from the 2015 archive, the 2023 site, and the verified Instagram
 * profile. Do not add unsourced claims (years of experience, awards, sales volume).
 */
export const profile = {
  name: agent.name,
  fullName: agent.fullName,
  alternateName: agent.alternateName,
  title: agent.title,
  tagline:
    "The Westchester Guy. Licensed Real Estate Salesperson with Julia B. Fee Sotheby's International Realty in Bedford, NY and William Pitt Sotheby's International Realty in New Canaan, CT. Licensed in New York and Connecticut, serving Bedford, Katonah, Chappaqua, Pound Ridge, and the surrounding Northern Westchester towns, plus New Canaan, CT.",

  aboutShort: [
    "Michael Winter is a Licensed Real Estate Salesperson with Julia B. Fee Sotheby's International Realty in Bedford, New York and William Pitt Sotheby's International Realty in New Canaan, Connecticut. Known across Northern Westchester as “The Westchester Guy,” he is highly communicative and detail oriented, and he makes the real estate process enjoyable and stress free.",
    "A former CEO and senior executive at Brand-Aid, Nautica, and Ralph Lauren, Michael brings a fashion background, in-depth market knowledge, and a strength in creative sales and marketing to every home he represents. He is licensed in both New York and Connecticut.",
  ],

  aboutFull: [
    "Michael Winter is highly communicative and detail oriented, and he ensures every real estate transaction is seamless and professional. Clients and customers trust his intuition and knowledge, and, known for his honesty and integrity, he makes the process enjoyable and as stress free as possible.",
    "Michael was a former CEO and senior executive at Brand-Aid, Nautica, and Ralph Lauren. He has the unique combination of a fashion background, an in-depth knowledge of the market, and an unparalleled customer service approach, and his strength in creative sales and marketing plays an important role in his real estate career.",
    "Known across Northern Westchester as “The Westchester Guy,” Michael has built one of the area's most recognizable personal real estate brands, a video-forward presence followed by more than 22,000 people on Instagram. His excellent negotiation skills and customer service consistently produce positive results for his clients.",
    "Michael is intimately familiar with the individual lifestyle of each community he serves, including Armonk, Bedford, Chappaqua, Katonah, North Salem, and Pound Ridge in New York, along with New Canaan in Connecticut. Licensed in both New York and Connecticut, he works from Julia B. Fee Sotheby's International Realty in Bedford and William Pitt Sotheby's International Realty in New Canaan.",
  ],

  credentials: [
    "Licensed Real Estate Salesperson, New York and Connecticut",
    "Julia B. Fee Sotheby's International Realty, Bedford, NY",
    "William Pitt Sotheby's International Realty, New Canaan, CT",
    "Former senior executive: Ralph Lauren, Nautica, Brand-Aid",
    "Sales & marketing specialist",
  ],

  specialties: [
    "Luxury homes",
    "Single-family homes",
    "Rentals",
    "Buyer and seller representation",
    "Listing marketing and brand strategy",
  ],

  recognition: [
    "“The Westchester Guy,” with 22,000+ followers across Northern Westchester (@westchesternyhomes)",
  ],

  communityInvolvement: [
    "Local business spotlights across Northern Westchester towns (ongoing video series)",
  ],

  serviceAreas: {
    ny: [
      "Bedford",
      "Bedford Hills",
      "Katonah",
      "Chappaqua",
      "Pound Ridge",
      "North Salem",
      "South Salem",
      "Armonk",
      "Mount Kisco",
    ],
    ct: ["New Canaan"],
  },

  keyFacts: [
    `Name: ${agent.fullName}`,
    `Also known as: ${agent.alternateName}`,
    `Title: ${agent.title}`,
    "Brokerage: Julia B. Fee Sotheby's International Realty (Bedford, NY), primary office",
    "Office: 4 Court Road, Bedford, NY 10506",
    "Also affiliated with: William Pitt Sotheby's International Realty (New Canaan, CT)",
    "Second office: 26 Cherry Street, New Canaan, CT 06840",
    "Licensed: New York and Connecticut",
    "Market: Northern Westchester County, NY and New Canaan, CT",
    "Background: senior executive in fashion (Ralph Lauren, Nautica, Brand-Aid)",
    "Instagram: @westchesternyhomes (22.3k followers)",
  ],

  siteStructure: [
    { label: "Home", url: `${SITE_URL}/`, desc: "Overview, towns served, and how Michael helps buyers and sellers" },
    { label: "About", url: `${SITE_URL}/about`, desc: "Full background, credentials, and the Westchester Guy story" },
    { label: "Communities", url: `${SITE_URL}/communities`, desc: "Local guides to the Northern Westchester towns Michael serves" },
    { label: "Buyers", url: `${SITE_URL}/buyers`, desc: "How Michael guides buyers from search to closing" },
    { label: "Sellers", url: `${SITE_URL}/sellers`, desc: "Pricing, marketing, and a free home-value request" },
    { label: "Insights", url: `${SITE_URL}/insights`, desc: "Northern Westchester market insight and buyer/seller education" },
    { label: "Testimonials", url: `${SITE_URL}/testimonials`, desc: "What Michael's clients say" },
    { label: "Contact", url: `${SITE_URL}/contact`, desc: "Reach Michael, call the Westchester Guy" },
  ],

  contact: {
    phone: agent.phone,
    phoneDisplay: agent.phoneDisplay,
    form: `${SITE_URL}/contact`,
    scheduling: agent.scheduling,
    linkedin: agent.social.linkedin,
    instagram: agent.social.instagram,
    sothebysProfile: agent.social.sothebysProfile,
  },
};

/** Most recent content change across all posts — drives "Last updated". */
export function lastUpdatedISO(): string {
  return insightPosts.reduce(
    (latest, p) => (p.dateModifiedISO > latest ? p.dateModifiedISO : latest),
    insightPosts[0].dateModifiedISO
  );
}
