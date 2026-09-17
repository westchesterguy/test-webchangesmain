import { SITE_URL, agent } from "@/lib/site";
import { profile } from "@/data/profile";
import { communities } from "@/data/communities";

export function JsonLd() {
  const areaServed = [
    ...communities.map((c) => ({
      "@type": "City",
      name: `${c.name}, ${c.state}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${c.county}, ${c.state === "CT" ? "Connecticut" : "New York"}`,
      },
    })),
    {
      "@type": "City",
      name: "New Canaan, CT",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Fairfield County, Connecticut",
      },
    },
  ];

  const agentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#realestateagent`,
    name: agent.fullName,
    // The cultivated moniker is the AEO asset: "who is the Westchester guy"
    // should resolve to Michael in AI engines.
    alternateName: agent.alternateName,
    givenName: agent.givenName,
    familyName: agent.familyName,
    jobTitle: agent.title,
    description: profile.aboutShort[0],
    url: SITE_URL,
    image: `${SITE_URL}${agent.headshot}`,
    telephone: agent.phone,
    email: agent.leadEmail,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: agent.offices.bedford.street,
      addressLocality: agent.offices.bedford.city,
      addressRegion: agent.offices.bedford.region,
      postalCode: agent.offices.bedford.postalCode,
      addressCountry: "US",
    },
    worksFor: [
      {
        "@type": "RealEstateOrganization",
        name: agent.offices.bedford.brokerage,
        url: "https://www.juliabfee.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: agent.offices.bedford.street,
          addressLocality: agent.offices.bedford.city,
          addressRegion: agent.offices.bedford.region,
          postalCode: agent.offices.bedford.postalCode,
          addressCountry: "US",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Sotheby's International Realty",
          url: "https://www.sothebysrealty.com",
        },
      },
      {
        "@type": "RealEstateOrganization",
        name: agent.offices.newCanaan.brokerage,
        url: "https://www.williampitt.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: agent.offices.newCanaan.street,
          addressLocality: agent.offices.newCanaan.city,
          addressRegion: agent.offices.newCanaan.region,
          postalCode: agent.offices.newCanaan.postalCode,
          addressCountry: "US",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Sotheby's International Realty",
          url: "https://www.sothebysrealty.com",
        },
      },
    ],
    areaServed,
    knowsAbout: [
      "residential real estate",
      "luxury real estate",
      "listing marketing and brand strategy",
      "Northern Westchester County New York real estate",
      "Bedford NY real estate",
      "Katonah real estate",
      "Chappaqua real estate",
      "Pound Ridge real estate",
      "North Salem real estate",
      "South Salem real estate",
      "Armonk real estate",
      "Mount Kisco real estate",
    ],
    knowsLanguage: [{ "@type": "Language", name: "English", alternateName: "en" }],
    // Confirmed by Michael 2026-09-04.
    memberOf: [
      {
        "@type": "Organization",
        name: "National Association of REALTORS®",
        url: "https://www.nar.realtor/",
      },
      {
        "@type": "Organization",
        name: "OneKey MLS",
        url: "https://www.onekeymls.com/",
      },
    ],
    sameAs: [
      agent.social.instagram,
      agent.social.threads,
      agent.social.facebook,
      agent.social.twitter,
      agent.social.linkedin,
      agent.social.sothebysProfile,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Michael Winter Real Estate",
    alternateName: "The Westchester Guy",
    url: SITE_URL,
    description:
      "Professional website of Michael Winter — The Westchester Guy — Licensed Real Estate Salesperson with Julia B. Fee Sotheby's International Realty in Bedford, NY.",
    publisher: {
      "@id": `${SITE_URL}/#realestateagent`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
