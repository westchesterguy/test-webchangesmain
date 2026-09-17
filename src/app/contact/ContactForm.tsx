"use client";

import { useActionState } from "react";
import { submitContactForm, type FormState } from "./actions";

const initialState: FormState = { success: false, error: null };

const SMS_CONSENT_TEXT =
  "I agree to receive text messages from Michael Winter about my inquiry. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of any service. See our Privacy Policy and Terms of Service.";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.success) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-6 rounded-full border-2 border-accent flex items-center justify-center">
          <svg
            className="w-6 h-6 text-accent-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-3">
          Message sent.
        </h3>
        <p className="text-body text-charcoal-light">
          Thank you for reaching out. I&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <p className="text-small text-charcoal-muted mb-6">* Required</p>
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-sm px-4 py-3">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-overline uppercase text-charcoal-muted font-medium mb-2"
          >
            Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-overline uppercase text-charcoal-muted font-medium mb-2"
          >
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-overline uppercase text-charcoal-muted font-medium mb-2"
        >
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          className="w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          value="yes"
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border accent-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent"
        />
        <label
          htmlFor="consent"
          className="text-small text-charcoal-light leading-relaxed"
        >
          I agree to receive text messages from Michael Winter about my
          inquiry. Message frequency varies. Msg &amp; data rates may apply. Reply
          STOP to opt out, HELP for help. Consent is not a condition of any
          service. See our{" "}
          <a
            href="/privacy"
            className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/tos"
            className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors"
          >
            Terms of Service
          </a>
          .
        </label>
      </div>
      <input type="hidden" name="consentText" value={SMS_CONSENT_TEXT} />

      <div>
        <label
          htmlFor="subject"
          className="block text-overline uppercase text-charcoal-muted font-medium mb-2"
        >
          Subject<span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors"
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="Buying a Home">Buying a Home</option>
          <option value="Selling a Home">Selling a Home</option>
          <option value="Home Valuation">Home Valuation</option>
          <option value="Renting">Renting</option>
          <option value="General Question">General Question</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-overline uppercase text-charcoal-muted font-medium mb-2"
        >
          Message<span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending..." : "Send Message"}
        {!isPending && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
