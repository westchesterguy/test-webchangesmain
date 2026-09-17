import Script from "next/script";
import { TAWK } from "@/lib/site";

/**
 * Tawk.to live chat, shared with the other site.
 *
 * Tawk's own snippet, run through next/script on `lazyOnload` so it waits for
 * the window load event. The chat is not why anyone came to the page, and the
 * embed pulls a fair amount behind it, so it must never compete with the hero
 * video or the first paint.
 *
 * The snippet body is kept verbatim rather than replaced with a bare
 * `<Script src>`: it sets Tawk_API and Tawk_LoadStart before the embed runs,
 * which is what lets anything configure the widget ahead of load, and keeping
 * one inline script means that ordering is guaranteed instead of a race
 * between two tags.
 *
 * Production only. `next dev` skips it so local work does not open live
 * conversations in Michael's inbox; Vercel previews build in production mode
 * and do load it.
 */
export function LiveChat() {
  if (process.env.NODE_ENV !== "production") return null;
  if (!TAWK.propertyId || !TAWK.widgetId) return null;

  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/${TAWK.propertyId}/${TAWK.widgetId}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
      `}
    </Script>
  );
}
