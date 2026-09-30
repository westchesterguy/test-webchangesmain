"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { agent } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * TODO before launch: the sender domain must be verified in Resend, and this
 * address probably has to change with it.
 *
 * Deliberately still michaelwinterrealestate.com while the rest of the site
 * moved to westchesterguy.com on 2026-09-30. A sending domain is not a
 * branding string: mail only leaves if that exact domain holds verified SPF
 * and DKIM records in Resend. Switching this to contact@westchesterguy.com
 * before those records exist would silently stop every contact form and
 * valuation request from arriving, which is the most expensive thing on this
 * site to break quietly. Change it once westchesterguy.com is verified.
 */
const FROM = "Michael Winter <contact@michaelwinterrealestate.com>";

export type FormState = {
  success: boolean;
  error: string | null;
};

const genericError =
  "Something went wrong. Please try again, or call Michael directly.";

export async function submitContactForm(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) {
    return { success: true, error: null };
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return { success: true, error: null };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || "";
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const consentGiven = Boolean(formData.get("consent"));
  const consentText = (formData.get("consentText") as string) || "";
  const submittedAt = new Date().toISOString();

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Please complete all required fields." };
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: agent.leadEmail,
      replyTo: email,
      subject: `[Website] ${subject} — ${name}`,
      text: `New inquiry from westchesterguy.com\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\nSubject: ${subject}\n\n${message}\n\n— SMS consent record —\nConsent given: ${consentGiven ? "Yes" : "No"}\nConsent text shown: ${consentText}\nSubmitted at: ${submittedAt}`,
    });
    return { success: true, error: null };
  } catch {
    return { success: false, error: genericError };
  }
}

export async function submitValuationRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) {
    return { success: true, error: null };
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return { success: true, error: null };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || "";
  const address = formData.get("address") as string;
  const timeframe = (formData.get("timeframe") as string) || "(not specified)";
  const notes = (formData.get("notes") as string) || "";
  const consentGiven = Boolean(formData.get("consent"));
  const consentText = (formData.get("consentText") as string) || "";
  const submittedAt = new Date().toISOString();

  if (!name || !email || !address) {
    return { success: false, error: "Please provide your name, email, and property address." };
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: agent.leadEmail,
      replyTo: email,
      subject: `[Home Valuation Request] ${address} — ${name}`,
      text: `New home valuation request from westchesterguy.com\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\nProperty address: ${address}\nSelling timeframe: ${timeframe}\n\nNotes:\n${notes || "(none)"}\n\n— SMS consent record —\nConsent given: ${consentGiven ? "Yes" : "No"}\nConsent text shown: ${consentText}\nSubmitted at: ${submittedAt}`,
    });
    return { success: true, error: null };
  } catch {
    return { success: false, error: genericError };
  }
}
