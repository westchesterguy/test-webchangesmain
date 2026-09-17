import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { Section } from "@/components/Section";
import { Overline } from "@/components/Overline";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/fair-housing" },
  title: "Fair Housing Notice",
  description:
    "Fair Housing Notice for Michael Winter, affiliated with William Pitt Sotheby's International Realty and Julia B. Fee Sotheby's International Realty. Committed to the letter and spirit of fair housing law.",
  openGraph: {
    title: "Fair Housing Notice | Michael Winter",
    description:
      "Fair Housing Notice for Michael Winter, affiliated with William Pitt Sotheby's International Realty and Julia B. Fee Sotheby's International Realty.",
    url: `${SITE_URL}/fair-housing`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FairHousingPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          {
            name: "Fair Housing Notice",
            url: `${SITE_URL}/fair-housing`,
          },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <Section padding="pt-36 md:pt-40 pb-16 md:pb-20" className="bg-cream">
            <Overline className="mb-4">Legal</Overline>
            <h1 className="font-display text-display text-charcoal">
              Fair Housing Notice
            </h1>
        </Section>

        {/* Content */}
        <Section padding="py-20 md:py-28" className="bg-warm-white">
            <div className="max-w-3xl prose-custom space-y-10 text-body text-charcoal-light leading-relaxed">
              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Our Commitment
                </h2>
                <p>
                  Michael Winter, a Licensed Real Estate Salesperson
                  affiliated with William Pitt Sotheby&apos;s International Realty
                  Julia B. Fee Sotheby&apos;s International
                  Realty (Bedford, NY), is fully committed to and abides by the
                  Fair Housing Act and the Equal Opportunity Act, pledged to the
                  letter and spirit of U.S. policy for the achievement of equal
                  housing opportunity throughout the nation.
                </p>
                <p>
                  We encourage and support an affirmative advertising and
                  marketing program in which there are no barriers to obtaining
                  housing because of race, color, religion, sex, handicap,
                  familial status, national origin, sexual orientation, gender
                  identity, lawful source of income, or any other protected
                  class.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Federal Fair Housing Act
                </h2>
                <p>
                  The Federal Fair Housing Act (Title VIII of the Civil Rights
                  Act of 1968, as amended) prohibits discrimination in the sale,
                  rental, and financing of housing based on race, color, national
                  origin, religion, sex, familial status, and disability. The law
                  applies to all types of housing transactions including sales,
                  rentals, mortgage lending, homeowner&apos;s insurance, and
                  zoning.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  State of Connecticut
                </h2>
                <p>
                  The Connecticut Fair Housing Act (Connecticut General Statutes
                  &sect;46a-64c) prohibits discrimination in housing on the basis
                  of race, color, religious creed, age, sex, gender identity or
                  expression, marital status, national origin, ancestry, present
                  or past history of mental disability, intellectual disability,
                  learning disability, physical disability, lawful source of
                  income, familial status, or sexual orientation.
                </p>
                <p>
                  The Connecticut Commission on Human Rights and Opportunities
                  (CHRO) enforces the state&apos;s fair housing laws and accepts
                  complaints of housing discrimination.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  State of New York
                </h2>
                <p>
                  The New York State Human Rights Law (Executive Law, Article 15)
                  prohibits discrimination in housing on the basis of age, race,
                  creed, color, national origin, sexual orientation, gender
                  identity or expression, military status, sex, disability,
                  familial status, marital status, lawful source of income, or
                  domestic violence victim status.
                </p>
                <p>
                  The New York State Division of Human Rights enforces the
                  state&apos;s fair housing laws and accepts complaints of
                  housing discrimination.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Filing a Complaint
                </h2>
                <p>
                  If you believe you have been the victim of housing
                  discrimination, you may file a complaint with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>
                      U.S. Department of Housing and Urban Development (HUD)
                    </strong>,{" "}
                    by calling 1-800-669-9777 or visiting{" "}
                    <a
                      href="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
                    >
                      hud.gov
                    </a>
                  </li>
                  <li>
                    <strong>
                      Connecticut Commission on Human Rights and Opportunities
                      (CHRO)
                    </strong>,{" "}
                    by calling 1-800-477-5737
                  </li>
                  <li>
                    <strong>
                      New York State Division of Human Rights
                    </strong>,{" "}
                    by calling 1-888-392-3644
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-heading font-display text-charcoal">
                  Equal Housing Opportunity
                </h2>
                <p>
                  Each office is Independently owned and operated.
                  Sotheby&apos;s International Realty and the Sotheby&apos;s
                  International Realty logo are service marks licensed to
                  Sotheby&apos;s International Realty Affiliates LLC and used
                  with permission.
                </p>
              </div>
            </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
