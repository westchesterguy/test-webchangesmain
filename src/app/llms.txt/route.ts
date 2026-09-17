import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const p = profile;
  const lines: string[] = [
    `# ${p.name}: ${p.title}`,
    "",
    `> ${p.tagline}`,
    "",
    "## About",
    "",
    ...p.aboutShort.flatMap((para) => [para, ""]),
    "## Site Structure",
    "",
    ...p.siteStructure.map((s) => `- [${s.label}](${s.url}): ${s.desc}`),
    `- [Full content for LLMs](${SITE_URL}/llms-full.txt): Detailed version of this file`,
    "",
    "## Communities Served",
    "",
    `- New York (Northern Westchester County): ${p.serviceAreas.ny.join(", ")}`,
    ...(p.serviceAreas.ct.length
      ? [`- Connecticut (Fairfield County): ${p.serviceAreas.ct.join(", ")}`]
      : []),
    "",
    "## Key Facts",
    "",
    ...p.keyFacts.map((f) => `- ${f}`),
    "",
    "## Recognition",
    "",
    ...p.recognition.map((r) => `- ${r}`),
    "",
    "## Contact",
    "",
    `- Phone: ${p.contact.phoneDisplay}`,
    `- Contact Form: ${p.contact.form}`,
    `- Schedule a Consultation: ${p.contact.scheduling}`,
    `- LinkedIn: ${p.contact.linkedin}`,
    `- Instagram: ${p.contact.instagram}`,
    `- Sotheby's International Realty Profile: ${p.contact.sothebysProfile}`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
