/**
 * Low-level site configuration — single place to swap the domain and the
 * agent's contact facts before launch. Everything that needs an absolute URL
 * or a piece of contact/office data reads from here so there is no drift.
 *
 * TODO before launch: verify the 2023-era Facebook/X profiles are still live.
 */

/** Canonical origin — the hub domain. */
export const SITE_URL = "https://michaelwinterrealestate.com";

export interface Office {
  brokerage: string;
  street: string;
  city: string;
  region: "CT" | "NY";
  postalCode: string;
  label: string;
  primary?: boolean;
}

export const agent = {
  name: "Michael Winter",
  fullName: "Michael Winter",
  givenName: "Michael",
  familyName: "Winter",
  title: "Licensed Real Estate Salesperson",
  /** His cultivated moniker — used in titles, CTAs, and Person JSON-LD alternateName. */
  alternateName: "The Westchester Guy",

  // Phone from his 2023 site footer; matches current IG-era materials.
  phone: "+19145253378",
  phoneDisplay: "(914) 525-3378",

  // Confirmed 2026-09-04: leads go to Michael's Julia B. Fee work address.
  leadEmail: "michael.winter@juliabfee.com",

  // Confirmed 2026-09-04: no third-party booking tool; scheduling CTAs use the
  // contact form.
  scheduling: "https://michaelwinterrealestate.com/contact",

  // Real headshot (provided 2026-07-11, 1212x1600).
  headshot: "/michael-winter-headshot.jpg",

  offices: {
    bedford: {
      brokerage: "Julia B. Fee Sotheby's International Realty",
      street: "4 Court Road",
      city: "Bedford",
      region: "NY",
      postalCode: "10506",
      label: "Bedford, NY (Primary Office)",
      primary: true,
    } as Office,
    // WPSIR New Canaan, CT: the second office (Bedford stays primary).
    newCanaan: {
      brokerage: "William Pitt Sotheby's International Realty",
      street: "26 Cherry Street",
      city: "New Canaan",
      region: "CT",
      postalCode: "06840",
      label: "New Canaan, CT",
    } as Office,
  },

  social: {
    // Verified 2026-07-10: blue-check account, 22.3k followers.
    instagram: "https://www.instagram.com/westchesternyhomes/",
    threads: "https://www.threads.net/@westchesternyhomes",
    // From the 2023 site footer — TODO: verify these are still live before launch.
    facebook: "https://www.facebook.com/bedfordny.homes",
    twitter: "https://www.twitter.com/BFDNYHomes",
    // Confirmed 2026-09-04.
    linkedin: "https://www.linkedin.com/in/michael-winter-3203594/",
    // Single Sotheby's agent profile — WPSIR and JBF SIR share one platform, so
    // his William Pitt and Julia B. Fee profiles are the same page.
    sothebysProfile: "https://www.williampitt.com/agents/michaelwinter/",
  },
} as const;

/** Home search — Michael's Sotheby's IDX listing search. */
export const LISTINGS_URL = "https://www.williampitt.com/agents/michaelwinter/search/";

/** Home valuation — Michael's Sotheby's home-estimate tool. */
export const HOME_VALUATION_URL =
  "https://www.williampitt.com/agents/michaelwinter/sell-your-home/home-estimate/";

export const officeList: Office[] = [
  agent.offices.bedford,
  agent.offices.newCanaan,
];
