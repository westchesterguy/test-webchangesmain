export interface CommunityFAQ {
  q: string;
  a: string;
}

export interface Community {
  slug: string;
  name: string;
  state: "CT" | "NY";
  county: string;
  /** Short lifestyle/character paragraph (lead/answer for AEO). */
  intro: string;
  /** What it's like to live here — schools, commute, character. */
  living: string[];
  /** Landmarks, neighborhoods, points of interest. */
  highlights: string[];
  /** Slugs of neighboring communities for internal linking. */
  neighboring: string[];
  /** 3–4 plain-language Q&A — mirrors FAQPage schema for AI answer engines. */
  faqs: CommunityFAQ[];
}

/**
 * Content is deliberately qualitative. We do not publish median prices or hard
 * market stats here (they go stale and risk inaccuracy); the CTA routes buyers
 * to Michael and to live listings instead. Commute/character details are
 * stable, verifiable facts about each town.
 */
export const communities: Community[] = [
  // ───────────────────────── New York (Northern Westchester County) ─────────────────────────
  {
    slug: "bedford",
    name: "Bedford",
    state: "NY",
    county: "Westchester County",
    intro:
      "Bedford is a historic, estate-scale town in northern Westchester where a National Historic Landmark village green anchors miles of stone walls, gentleman's farms, and horse fences. The town is really three places at once (Bedford Village, plus the hamlets of Bedford Hills and Katonah) so you can trade a wooded multi-acre parcel for a walk-to-the-train address without ever leaving the town line. Michael runs his Julia B. Fee Sotheby's International Realty office right here, at 4 Court Road.",
    living: [
      "The colonial-era village green and its surrounding district carry a National Historic Landmark designation, and the town works to keep that look intact.",
      "Public schools fall under the Bedford Central School District, with private and country-day options a short drive off.",
      "Two Metro-North Harlem Line stations, Bedford Hills and Katonah, put a single-seat ride to Grand Central inside the town.",
      "Much of the housing runs to acreage: gentleman's farms, equestrian setups, and older homes tucked behind reservoirs and protected land.",
      "The John Jay Homestead and thousands of acres of preserved open space keep the countryside genuinely rural.",
    ],
    highlights: [
      "Bedford Village green (National Historic Landmark district)",
      "John Jay Homestead State Historic Site",
      "The hamlets of Bedford Hills and Katonah",
      "Harlem Line service from two in-town stations",
      "Farms, stables, and reservoir-side estates",
    ],
    neighboring: ["bedford-hills", "katonah", "pound-ridge", "mount-kisco"],
    faqs: [
      {
        q: "What is Bedford, NY like?",
        a: "Bedford is a rural, historic town in northern Westchester built around a National Historic Landmark village green, with large properties, working farms, and equestrian land. It also contains two walkable hamlets, Bedford Hills and Katonah, that offer shops and train service.",
      },
      {
        q: "Which school district covers Bedford, NY?",
        a: "Bedford is served by the Bedford Central School District. Several private and independent schools sit within or near the town as well.",
      },
      {
        q: "Can you take the train to Manhattan from Bedford?",
        a: "Yes. The Metro-North Harlem Line stops at the Bedford Hills and Katonah stations, both inside the town, with direct service to Grand Central Terminal.",
      },
    ],
  },
  {
    slug: "bedford-hills",
    name: "Bedford Hills",
    state: "NY",
    county: "Westchester County",
    intro:
      "Bedford Hills is the most walkable of Bedford's three hamlets: a compact downtown built around its own Metro-North station, where the platform, the shops, and the ballfields sit within a few blocks of each other. It hands you Bedford's schools and open space with a walk-to-the-train convenience the estate sections don't have.",
    living: [
      "The hamlet has its own Metro-North Harlem Line station, so commuters can walk to the platform rather than park at it.",
      "A close-in business district covers everyday needs (grocery, restaurants, hardware, services) on foot.",
      "Homes here are part of the Bedford Central School District.",
      "Housing skews to in-town lots and neighborhood streets, generally more modest than the estates of Bedford Village.",
      "You're minutes from Katonah's Main Street and the wider town's parks and preserves.",
    ],
    highlights: [
      "Bedford Hills Metro-North station",
      "Walkable hamlet business district",
      "Bedford Central School District",
      "Neighborhood streets and in-town lots",
      "Quick reach to Katonah and Bedford Village",
    ],
    neighboring: ["bedford", "katonah", "mount-kisco"],
    faqs: [
      {
        q: "What is Bedford Hills, NY?",
        a: "Bedford Hills is a hamlet within the town of Bedford in northern Westchester County. It has a walkable business district and its own Metro-North Harlem Line station.",
      },
      {
        q: "Does Bedford Hills have its own train station?",
        a: "Yes. Bedford Hills has its own Metro-North Harlem Line station with direct service to Grand Central Terminal, one of the reasons the hamlet appeals to commuters.",
      },
      {
        q: "What schools serve Bedford Hills?",
        a: "Bedford Hills is part of the Bedford Central School District, the same district that serves the rest of the town of Bedford.",
      },
    ],
  },
  {
    slug: "katonah",
    name: "Katonah",
    state: "NY",
    county: "Westchester County",
    intro:
      "Katonah is the hamlet where northern Westchester goes to actually walk somewhere: a real Main Street of independent shops and restaurants, a Metro-North station a block off it, and a cluster of well-loved arts institutions. It's a hamlet of the town of Bedford that reads more like a small village than a bedroom suburb.",
    living: [
      "Main Street is genuinely walkable, with locally owned stores, restaurants, and the Katonah Village Library.",
      "The village's own Harlem Line station puts a train ride to Grand Central at the edge of downtown.",
      "Public schools are part of the Katonah-Lewisboro School District.",
      "Caramoor and the Katonah Museum of Art give the hamlet a cultural pull well beyond its size.",
      "In-town homes give way quickly to larger wooded lots on the surrounding roads.",
    ],
    highlights: [
      "Katonah Main Street",
      "Caramoor Center for Music and the Arts",
      "Katonah Museum of Art",
      "Katonah Metro-North station",
      "Katonah-Lewisboro schools",
    ],
    neighboring: ["bedford-hills", "mount-kisco", "north-salem", "south-salem"],
    faqs: [
      {
        q: "What is Katonah, NY known for?",
        a: "Katonah is known for its walkable Main Street, its Metro-North station, and its arts institutions: Caramoor and the Katonah Museum of Art. It's one of the town of Bedford's three hamlets.",
      },
      {
        q: "Is Katonah good for commuters?",
        a: "Yes. Katonah has its own Metro-North Harlem Line station within walking distance of Main Street, so residents can live in a walkable hamlet and still ride straight to Grand Central.",
      },
      {
        q: "What school district is Katonah in?",
        a: "Katonah is served by the Katonah-Lewisboro School District.",
      },
    ],
  },
  {
    slug: "chappaqua",
    name: "Chappaqua",
    state: "NY",
    county: "Westchester County",
    intro:
      "Chappaqua is the family-first hamlet of the town of New Castle: the kind of place people move to for the schools and the short train ride, then stay for the town parks and the Saturday-morning downtown. Its walkable center sits right around the Metro-North station, so daily life and the commute share the same few blocks.",
    living: [
      "The Chappaqua Central School District is the headline draw and consistently well regarded.",
      "Downtown clusters shops and restaurants around the train station, all reachable on foot.",
      "The Harlem Line commute here is among the quicker ones in northern Westchester.",
      "Streets are leafy and residential, mixing classic colonials with newer builds.",
      "Gedney Park and the town's recreation programs anchor a busy community calendar.",
    ],
    highlights: [
      "Downtown Chappaqua",
      "Chappaqua Metro-North station",
      "Chappaqua Central School District",
      "Gedney Park",
      "New Castle recreation programs",
    ],
    neighboring: ["mount-kisco", "armonk"],
    faqs: [
      {
        q: "Why do families move to Chappaqua, NY?",
        a: "Families are drawn to Chappaqua mainly for its well-regarded Chappaqua Central School District, its walkable downtown, and a relatively short Metro-North commute to Manhattan.",
      },
      {
        q: "How far is Chappaqua from New York City by train?",
        a: "Chappaqua sits on the Metro-North Harlem Line and offers one of the shorter northern-Westchester commutes to Grand Central Terminal, roughly an hour.",
      },
      {
        q: "What kind of homes does Chappaqua have?",
        a: "Chappaqua's neighborhoods run to classic colonials and traditional homes alongside newer construction, on lots that range from in-town to more private and wooded.",
      },
    ],
  },
  {
    slug: "mount-kisco",
    name: "Mount Kisco",
    state: "NY",
    county: "Westchester County",
    intro:
      "Mount Kisco is the one true village in this cluster of towns: an actual downtown with a train station, a hospital, and a wider spread of housing than the estate towns around it. If Bedford and Pound Ridge are about land, Mount Kisco is about a walkable center and more ways into the market.",
    living: [
      "A compact, walkable downtown packs shops, restaurants, and services into a real village grid.",
      "The village has its own Metro-North Harlem Line station with direct Grand Central service.",
      "Northern Westchester Hospital sits in the village, a regional anchor for care.",
      "Housing stock is more varied here: condos, townhouses, and single-family homes across a wider range of price points than the neighboring estate towns.",
      "School attendance is split among several districts, including the Bedford Central School District, depending on where in the village a home sits.",
    ],
    highlights: [
      "Walkable downtown Mount Kisco",
      "Mount Kisco Metro-North station",
      "Northern Westchester Hospital",
      "Varied housing stock and price points",
      "Central location among the Bedford-area towns",
    ],
    neighboring: ["bedford-hills", "katonah", "chappaqua", "armonk"],
    faqs: [
      {
        q: "What is Mount Kisco, NY like?",
        a: "Mount Kisco is a walkable village in northern Westchester with a genuine downtown, its own train station, and a hospital. Its housing is more varied than the surrounding estate towns, with a wider range of price points.",
      },
      {
        q: "Does Mount Kisco have a train station?",
        a: "Yes. Mount Kisco has its own Metro-North Harlem Line station with direct service to Grand Central Terminal, right in the village center.",
      },
      {
        q: "What schools serve Mount Kisco?",
        a: "Mount Kisco is split among several school districts depending on location, including the Bedford Central School District. It's worth confirming the district for a specific address before you buy.",
      },
    ],
  },
  {
    slug: "pound-ridge",
    name: "Pound Ridge",
    state: "NY",
    county: "Westchester County",
    intro:
      "Pound Ridge is a quiet, heavily wooded town pressed up against the Connecticut border, where large-lot zoning keeps the tree canopy intact and the pace unhurried. People come here for privacy, striking architecture, and the enormous nature reservation at its heart rather than for a bustling downtown.",
    living: [
      "Large-lot zoning and dense woods make privacy the town's defining feature.",
      "Ward Pound Ridge Reservation, the largest park in the Westchester County system at more than 4,000 acres, spreads across the town.",
      "Homes are part of the Bedford Central School District.",
      "The small hamlet of Scotts Corners handles day-to-day errands with a few shops and restaurants.",
      "There's no train in town, so most commuters drive to the Katonah station on the Harlem Line.",
    ],
    highlights: [
      "Ward Pound Ridge Reservation",
      "Scotts Corners hamlet",
      "Notable modern and architect-designed homes",
      "Bedford Central School District",
      "Wooded privacy on large lots",
    ],
    neighboring: ["south-salem", "bedford", "north-salem"],
    faqs: [
      {
        q: "What is Pound Ridge, NY like?",
        a: "Pound Ridge is a rural, wooded town on the Connecticut border known for privacy, large lots, and distinctive architecture. The huge Ward Pound Ridge Reservation covers much of the town.",
      },
      {
        q: "What school district is Pound Ridge in?",
        a: "Pound Ridge is served by the Bedford Central School District.",
      },
      {
        q: "How do people commute from Pound Ridge to the city?",
        a: "Pound Ridge has no train station of its own, so most residents drive to the Metro-North Harlem Line station in Katonah for service to Grand Central Terminal.",
      },
    ],
  },
  {
    slug: "north-salem",
    name: "North Salem",
    state: "NY",
    county: "Westchester County",
    intro:
      "North Salem is Westchester's horse country: rolling pasture, white fences, historic barns, and reservoirs in the far northeast corner of the county. It's the town to look at if you want real acreage, an equestrian setup, or simply the most pastoral landscape the county has to offer.",
    living: [
      "The town is defined by horse farms, riding trails, and the well-known Old Salem Farm show grounds.",
      "Public schools belong to the North Salem Central School District.",
      "Reservoirs and protected land keep density low and views open across much of the town.",
      "Two Harlem Line stations, Purdys and Croton Falls, handle the commute to Grand Central.",
      "It's rural and low-key, yet still within a reasonable train ride of Manhattan.",
    ],
    highlights: [
      "Old Salem Farm",
      "Hammond Museum & Japanese Stroll Garden",
      "Titicus Reservoir",
      "Purdys and Croton Falls stations",
      "Horse farms and riding trails",
    ],
    neighboring: ["south-salem", "katonah", "pound-ridge"],
    faqs: [
      {
        q: "What is North Salem, NY known for?",
        a: "North Salem is known as Westchester County's horse country, with equestrian farms, riding trails, reservoirs, and open land in the county's northeast corner. Old Salem Farm is one of its best-known landmarks.",
      },
      {
        q: "Is North Salem a good place to buy land or a horse property?",
        a: "Yes. North Salem is one of the strongest markets in northern Westchester for acreage and equestrian properties, thanks to its farms, trails, and low-density zoning.",
      },
      {
        q: "How do you get to NYC from North Salem?",
        a: "North Salem is served by the Metro-North Harlem Line at the Purdys and Croton Falls stations, both with service to Grand Central Terminal.",
      },
    ],
  },
  {
    slug: "south-salem",
    name: "South Salem",
    state: "NY",
    county: "Westchester County",
    intro:
      "South Salem is the lake-and-woods corner of the town of Lewisboro, a rural hamlet of private, tree-shaded lots close to the Connecticut line. It suits buyers who want land and quiet water without straying far from Katonah's train or the shops just over in Ridgefield.",
    living: [
      "The hamlet is dotted with lakes (Lake Truesdale and Lake Kitchawan among them) and plenty of surrounding woods.",
      "Public schools are part of the well-regarded Katonah-Lewisboro School District.",
      "Lots run large, which appeals to buyers hunting for privacy and land near the state line.",
      "Commuters usually drive to the Harlem Line stations in Katonah or Goldens Bridge.",
      "Cross River's shops and the dining in Ridgefield, CT are both an easy hop away.",
    ],
    highlights: [
      "Lake Truesdale",
      "Onatru Farm Park",
      "Katonah-Lewisboro schools",
      "Wooded, large-lot privacy",
      "Close to Ridgefield, CT and Cross River",
    ],
    neighboring: ["pound-ridge", "north-salem", "katonah"],
    faqs: [
      {
        q: "Where is South Salem, NY?",
        a: "South Salem is a hamlet in the town of Lewisboro, in northern Westchester County near the Connecticut border. It's known for lakes, woods, and larger residential lots.",
      },
      {
        q: "What school district serves South Salem?",
        a: "South Salem is served by the Katonah-Lewisboro School District.",
      },
      {
        q: "How do you commute from South Salem to New York City?",
        a: "South Salem has no station of its own, so residents typically drive to the Metro-North Harlem Line stations in Katonah or Goldens Bridge for trains to Grand Central Terminal.",
      },
    ],
  },
  {
    slug: "armonk",
    name: "Armonk",
    state: "NY",
    county: "Westchester County",
    intro:
      "Armonk is the polished, business-minded hamlet at the center of the town of North Castle, pairing an upgraded downtown with estate neighborhoods and a lot of the area's newest construction. Its position near White Plains, I-684, and the county airport makes it one of the more connected addresses in the region.",
    living: [
      "Public schools are part of the highly rated Byram Hills School District.",
      "A revitalized downtown offers a strong lineup of restaurants and shops.",
      "The market leans toward estate homes and high-end new construction on generous lots.",
      "Its central spot near White Plains, I-684, and Westchester County Airport keeps everything close.",
      "The annual Armonk Outdoor Art Show is a long-running community tradition.",
    ],
    highlights: [
      "Downtown Armonk",
      "Byram Hills School District",
      "Wampus Pond",
      "Armonk Outdoor Art Show",
      "Minutes from Westchester County Airport and I-684",
    ],
    neighboring: ["chappaqua", "mount-kisco"],
    faqs: [
      {
        q: "What is Armonk, NY known for?",
        a: "Armonk is known for the highly rated Byram Hills schools, an upscale walkable downtown, estate homes and new construction, and a central North Castle location near White Plains and Westchester County Airport.",
      },
      {
        q: "Does Armonk have a Metro-North station?",
        a: "No. Armonk has no train station of its own; residents generally drive to nearby Harlem Line stations or to White Plains, helped by quick access to I-684.",
      },
      {
        q: "Is Armonk a good market for newer homes?",
        a: "Yes. Armonk has been one of northern Westchester's more active areas for luxury new construction.",
      },
    ],
  },
];

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export function getAllCommunitySlugs(): string[] {
  return communities.map((c) => c.slug);
}

export const ctCommunities = communities.filter((c) => c.state === "CT");
export const nyCommunities = communities.filter((c) => c.state === "NY");
