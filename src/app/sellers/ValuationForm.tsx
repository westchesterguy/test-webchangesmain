"use client";

import { useActionState } from "react";
import { submitValuationRequest, type FormState } from "../contact/actions";

const initialState: FormState = { success: false, error: null };

const SMS_CONSENT_TEXT =
  "I agree to receive text messages from Michael Winter about my home valuation request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of any service. See our Privacy Policy and Terms of Service.";

const inputClass =
  "w-full px-4 py-3 bg-warm-white border border-border rounded-sm text-body text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent focus:border-accent transition-colors";
const labelClass =
  "block text-overline uppercase text-charcoal-muted font-medium mb-2";

export function ValuationForm() {
  const [state, formAction, isPending] = useActionState(
    submitValuationRequest,
    initialState,
  );

  if (state.success) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-6 rounded-full border-2 border-accent flex items-center justify-center">
          <svg className="w-6 h-6 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-3">Request received.</h3>
        <p className="text-body text-charcoal-light">
          Thank you. Michael will personally prepare your home&apos;s valuation
          and follow up with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="v-website">Website</label>
        <input type="text" id="v-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <p className="text-small text-charcoal-muted">* Required</p>
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-sm px-4 py-3">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="v-address" className={labelClass}>
          Property Address<span className="text-red-500 ml-1">*</span>
        </label>
        <input type="text" id="v-address" name="address" required autoComplete="street-address" className={inputClass} placeholder="123 Main Street, Bedford, NY" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="v-name" className={labelClass}>
            Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input type="text" id="v-name" name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="v-email" className={labelClass}>
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <input type="email" id="v-email" name="email" required autoComplete="email" className={inputClass} placeholder="your@email.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="v-phone" className={labelClass}>Phone (optional)</label>
          <input type="tel" id="v-phone" name="phone" autoComplete="tel" className={inputClass} placeholder="(555) 555-5555" />
        </div>
        <div>
          <label htmlFor="v-timeframe" className={labelClass}>Selling Timeframe</label>
          <select id="v-timeframe" name="timeframe" defaultValue="" className={inputClass}>
            <option value="" disabled>Select a timeframe</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="6–12 months">6–12 months</option>
            <option value="Just curious / researching">Just curious / researching</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="v-notes" className={labelClass}>Anything Michael should know? (optional)</label>
        <textarea id="v-notes" name="notes" rows={4} className={`${inputClass} resize-none`} placeholder="Recent renovations, unique features, questions..." />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="v-consent" name="consent" value="yes" className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border accent-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-accent" />
        <label htmlFor="v-consent" className="text-small text-charcoal-light leading-relaxed">
          I agree to receive text messages from Michael Winter about my home
          valuation request. Message frequency varies. Msg &amp; data rates may
          apply. Reply STOP to opt out, HELP for help. Consent is not a condition
          of any service. See our{" "}
          <a href="/privacy" className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors">Privacy Policy</a>{" "}
          and{" "}
          <a href="/tos" className="text-accent-dark hover:text-charcoal underline underline-offset-2 transition-colors">Terms of Service</a>.
        </label>
      </div>
      <input type="hidden" name="consentText" value={SMS_CONSENT_TEXT} />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white text-small uppercase tracking-[0.08em] font-medium rounded-sm hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending..." : "Request My Home Value"}
        {!isPending && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  );
}
