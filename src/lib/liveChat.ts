/**
 * Opening the Tawk widget from our own chrome.
 *
 * The masthead's Ask Michael button should raise the chat rather than send
 * someone to the contact form — but the embed is a third party on a lazy
 * load, so at any given moment it may not have arrived, may have been blocked
 * by an extension, or may be disabled for the visitor's region. That is why
 * this reports whether it succeeded instead of assuming: the caller keeps its
 * real href and only cancels the navigation when the chat actually opened.
 * A button that silently does nothing is worse than one that goes to /contact.
 */

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      showWidget?: () => void;
    };
  }
}

export function openLiveChat(): boolean {
  if (typeof window === "undefined") return false;
  const api = window.Tawk_API;
  if (typeof api?.maximize !== "function") return false;
  try {
    // Harmless if it is already showing; needed if anything hid it.
    api.showWidget?.();
    api.maximize();
    return true;
  } catch {
    return false;
  }
}
