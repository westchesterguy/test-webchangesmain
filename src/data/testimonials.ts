export interface Testimonial {
  quote: string;
  author: string;
  /** Town/role context, e.g. "Seller, Bedford, NY". */
  location: string;
  /** 1–5; omit if unknown. Drives AggregateRating when present across the set. */
  rating?: number;
}

/**
 * Real client reviews, verbatim as published on Michael's Julia B. Fee Sotheby's
 * International Realty agent page (https://www.williampitt.com/agents/michaelwinter/),
 * where they are syndicated from Zillow.
 *
 * Do NOT edit the quote text — these are the clients' own words, and /testimonials
 * emits Review schema from this array, so accuracy here is a compliance matter.
 *
 * `author` is the reviewer handle exactly as published; only Lynda Baquero signed her
 * review with her own name. `location` is derived solely from what each reviewer
 * states in their own review.
 *
 * `rating` is intentionally omitted: the source publishes review text without
 * per-review star values, and inventing them would fabricate AggregateRating data.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "How can I begin to tell the wondrous tale of Michael Winter? When we first spoke, Michael told me no one would work as hard for me as anyone could. He proved himself absolutely right. I grew up in Westchester, but have lived out of state for the past nearly 20 years. Most recently, we spent 6 years in Montana building our family. Now with three kids, my husband and I wanted to return to New York. We settled on Northern Westchester, and tried to find the balance between natural serenity and town access — while keeping schools, budget, proximity to work and family all in mind. We did this all remotely, from Montana. In a very challenging market, Michael went above and beyond to find us the perfect home. We spoke and texted often, he joked he’s like 7/11, “always open.” But he really was always available to answer a question or suggest a property to see. He is funny and delightful to work with. Michael spent days driving around Westchester and Connecticut — on his own, or with my friends and parents, sorting out neighborhoods, school districts and homes. He gracefully fielded many questions and comments from my mother. He clearly knows the market and players very well. I did not step foot in our new house until a few weeks after the closing. Even after closing, Michael’s dedication to our happiness and comfort in the new home did not end. He provided helpful support and suggestions all along the way. He was present on-site, when we could not be. I didn’t quite realize how far and beyond he went, until I started to mention it to other people. No one I’ve spoken to has had a realtor that worked so genuinely hard for their client. I hope I never move again — but if we do, 10/10 recommend Michael Winter.",
    author: "ZUSER20170212175423755",
    location: "Relocating buyer, Northern Westchester",
  },
  {
    quote:
      "My wife and I worked with Michael on and off for over a year until we found our perfect home. He was highly recommended by my sister as he had helped find her new home. In the beginning, I’m not sure we knew exactly what we wanted, but Michael helped us figure it out along the way. We must have seen over 50 homes with him and always appreciated his presence and expertise. We lost several bids in the highly competitive housing market, but Michael helped us navigate every step of the process until we finally got the house we wanted at under asking. He was always very communicative, both through the shopping, bidding, and buying process, keeping us updated on the status and next steps. Above everything else, Michael was driven to help us find the home that fit us. I think some other agents would have dropped us or pushed us towards homes we weren’t completely happy with because of the competitive market and the difficulty we were having. There were times when a house would only be listed for 2-3 days, but Michael always found a way to get us into a showing. That might have meant dragging him out on a Thursday night with 2 hours notice, but he always made time. Michael was always patient and supportive and never pressured us. In one case we pulled up to a house and Michael told us not to bother getting out of the car. It turned out that the backyard overlooked a machinery yard, something we would have hated. That kind of honesty and understanding made us feel safe in his hands and convinced us that he was the right agent for us.",
    author: "ZUSER20150331112518160",
    location: "Buyer",
  },
  {
    quote:
      "Michael was so easy to work with. I was nervous about making such a big decision and commitment as a first time home buyer. Michael was straightforward, honest, and gave insightful feedback about each neighborhood and property. He gave great recommendations. When we found “the one” he helped us navigate an competitive market and acted aggressively on our behalf to make sure we got the home we wanted! No detail was missed or was too small. He was a pleasure to work with and I would recommend without hesitation.",
    author: "BURYESA",
    location: "First-time buyer",
  },
  {
    quote:
      "\"Michael is so funny, kind, and super fun\" - words from my 8 year old and 5 1/2 year old. It is not easy house hunting with kids in tow, especially during pandemic times and in the current environment. Michael made it easy for us, and honestly, really enjoyable! He is patient, kind, hilarious, trustworthy, reliable and has a huge heart. Also extremely knowledgeable and responsive - he answered our endless lists of questions and gave such great, candid feedback and advice. We started our search with a list of possibilities being relatively unfamiliar with this area of Westchester, and by the end we found the perfect home and neighborhood for our family - because of Michael. He really looked out for us throughout this entire process from start to finish. Always had our backs and best interests at heart, and truly went above and beyond for our family. You're in the best hands with Michael!",
    author: "LSHARON265",
    location: "Buyer, Westchester",
  },
  {
    quote:
      "Michael was tremendous in helping us find our new home. As first time home buyers the process and experience is eye opening and Michael’s thoughtful approach informing and guiding us through the process made it such a great experience.",
    author: "BANKIT4",
    location: "First-time buyer",
  },
  {
    quote:
      "Michael Is a Superb real estate broker. He is dependable, reliable, resourceful, funny, hard working, extremely capable, honest and kind. He sold my house in a difficult market. He had multiple open houses and he worked tirelessly until the sale was complete. He was extremely helpful and gave me great advice. I recommend Michael Winter wholeheartedly. He is a terrific broker and he is a man of his word.",
    author: "JEALAN2",
    location: "Seller",
  },
  {
    quote:
      "My family and I recently conducted a thorough search of houses as we looked to make the move from a lifetime in Manhattan to the beautiful quiet of the Bedford/Armonk area. We were lucky to meet Michael Winter along the way! Michael immediately got a good sense of what we were looking for. As he selected homes to show us, he honed in on our needs and expectations. He didn't waste time with properties that didn't fit those wishes. A master at negotiation, Michael arranged a deal that was good for us, and appealed to the seller. Throughout the process, Michael maintained constant contact, making sure things were moving along as quickly and as smoothly as possible. We found Michael to be highly attentive. He's easy to talk to, always quick to respond to our calls, texts or emails and always readily available. He made us feel special, and we remain in contact, as he's been very helpful with referrals on everything from plumbing to snowplowing to dining in the area! I strongly recommend Michael Winter.",
    author: "Lynda Baquero",
    location: "Buyer, Bedford / Armonk",
  },
  {
    quote:
      "Michael was a pleasure to work with in our move from NYC to Pound Ridge. He gave my wife and I good information about the area as we were looking to move. And, since we had a definitive move out date from our apartment in NYC, Michael found and negotiated the perfect house for us. There were multiple bids and Michael was able to win it for us. Michael followed up with my wife and I after we had moved in to see how we liked the house. It was a great experience altogether.",
    author: "DNAYOR",
    location: "Buyer, Pound Ridge",
  },
  {
    quote:
      "I highly recommend Michael Winter. Our transaction would not have been completed without him. Michael is an excellent negotiator, has a sharp business sense, and keenly studies details. Michael always returns phone calls, goes above and beyond, and handles problems with ease. Michael knows the market, and knows people. I trust him, and his judgment, implicitly. If we didn't meet him we would still be searching.",
    author: "PAUL4207",
    location: "Buyer",
  },
  {
    quote:
      "My wife and I found Michael to be extremely knowledgeable and an excellent local resource. He was very patient with us and I would highly recommend him as a excellent local resource the northern Westchester and Fairfield counties region.",
    author: "USER4489271",
    location: "Buyer, Northern Westchester & Fairfield County",
  },
  {
    quote:
      "I found Michael to be extremely knowledgeable and had excellent negotiation skills. His honesty was very important to me as well as his reponsiveness in answering all questions in a timely manner. I would recommend him to anyone.",
    author: "USER68583773",
    location: "Buyer",
  },
];

/** Average rating across testimonials that carry one. Returns null if none. */
export function aggregateRating(): { value: number; count: number } | null {
  const rated = testimonials.filter((t) => typeof t.rating === "number");
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, t) => acc + (t.rating as number), 0);
  return { value: Math.round((sum / rated.length) * 10) / 10, count: rated.length };
}
