import Link from "next/link";
import { agent, officeList } from "@/lib/site";
import { social } from "@/data/nav";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-12 pb-8 md:pt-16 md:pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section A: Offices + Social Links */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            {officeList.map((office) => (
              <div key={office.label}>
                <p className="text-small font-medium tracking-wide text-charcoal mb-2">
                  {office.brokerage}
                </p>
                <address className="not-italic text-caption text-charcoal-muted leading-relaxed">
                  {office.street}
                  <br />
                  {office.city}, {office.region} {office.postalCode}
                </address>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${agent.phone}`}
              className="p-2 -m-2 text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="Call the Westchester Guy"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -m-2 text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -m-2 text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Brokerage lockup — both Sotheby's affiliations */}
        <div className="border-t border-border py-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wpjbf-sir-logo.png"
            alt="William Pitt Sotheby's International Realty and Julia B. Fee Sotheby's International Realty"
            className="h-auto w-full max-w-lg"
          />
        </div>

        {/* Section B: Compliance Symbols + Notice Links */}
        <div className="border-t border-border py-6">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-caption text-charcoal-muted">
            <span className="inline-flex items-center gap-1.5" aria-label="Equal Housing Opportunity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1L1 10h3v12h16V10h3L12 1zm6 18H6V9.5l6-5.1 6 5.1V19z" />
                <rect x="8.5" y="12" width="7" height="1.5" />
                <rect x="8.5" y="15" width="7" height="1.5" />
              </svg>
              Equal Housing Opportunity
            </span>
            <span className="text-border">|</span>
            <span className="tracking-wide">REALTOR&reg;</span>
            <span className="text-border">|</span>
            <Link
              href="/fair-housing"
              className="hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Fair Housing Notice
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/sop"
              className="hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Standard Operating Procedure
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/accessibility"
              className="hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Accessibility
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/privacy"
              className="hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/tos"
              className="hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Section C: Disclaimers */}
        <div className="border-t border-border py-6">
          <div className="max-w-4xl mx-auto space-y-3">
            <p className="text-caption text-charcoal-muted/70 leading-relaxed">
              Michael Winter is a Licensed Real Estate Salesperson affiliated with
              Julia B. Fee Sotheby&apos;s International Realty (Bedford, NY) and
              William Pitt Sotheby&apos;s International Realty (New Canaan, CT).
              Licensed in New York and Connecticut.
            </p>
            <p className="text-caption text-charcoal-muted/70 leading-relaxed">
              Julia B. Fee Sotheby&apos;s International Realty and William Pitt
              Sotheby&apos;s International Realty are fully committed to and abide by
              the Fair Housing Act and the Equal Opportunity Act. Each office is
              independently owned and operated. Sotheby&apos;s International Realty
              and the Sotheby&apos;s International Realty logo are service marks
              licensed to Sotheby&apos;s International Realty Affiliates LLC and used
              with permission.
            </p>
          </div>
        </div>

        {/* Section D: Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-caption tracking-wide text-charcoal-muted">
            &copy; {currentYear} Michael Winter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
