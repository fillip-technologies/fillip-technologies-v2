// Migrates every /hardware-solutions page onto the shared Security-Surveillance
// layout. All hardware pages now render through the SecuritySurveillance
// component via the `hardware-solution` template (7 sections: hero, priority,
// services, support, benefits, testimonials, faqs). This transforms the existing
// content into that shape:
//   (a) 9 generic slugs: map servicepage.<slug>.{hero,about,promise,
//       solutionsHeading,solutions,whyChoose,benefits,testimonials,faqs}
//       -> servicepage.<slug>.{hero,priority,services,support,benefits,
//          testimonials,faqs}
//   (b) security-surveillance: copy page.security-surveillance.* ->
//       servicepage.security-surveillance.* (already SS-shaped), filling the
//       benefits + faqs sections (never saved separately) from defaults.
//
// Idempotent: a slug whose servicepage.<slug>.hero already has `backgroundImage`
// is treated as already migrated and skipped. Legacy generic-only rows (about,
// promise, solutionsHeading, whyChoose) are left in place (harmless, unused).
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/migrate-hardware-to-security-layout.mjs
import dns from "node:dns";
import { readFile } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

const GENERIC_SLUGS = [
  "networking", "control-room", "server-solutions", "fiber-optic-connectivity",
  "local-area-network", "wide-area-network", "system-integration",
  "it-infrastructure", "gps-solution",
];

const arr = (x) => (Array.isArray(x) ? x : []);
const titleCase = (slug) => slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

// ---- generic (flat) -> security-surveillance (flat) section mappers ----------
const mapHero = (hero) => {
  const h = hero ?? {};
  const heading = [String(h.title ?? "").trim(), String(h.highlightedTitle ?? "").trim()]
    .filter(Boolean)
    .join("\n");
  return {
    backgroundImage: h.image || "/images/new-hero-hard.png",
    badge: h.badge || "Hardware Solutions",
    heading,
    description: h.description ?? "",
    primaryCtaLabel: h.ctaLabel || "Explore Solutions",
    secondaryCtaLabel: "Watch Video",
    statusLabel: "System Status",
    statusValue: "Site Coverage Ready",
    statusItem1: "Deployment Ready",
    statusItem2: "Multi-Site Coverage",
  };
};
const mapPriority = (about, solutions) => ({
  heading: about?.heading ?? "",
  description: about?.description ?? "",
  ctaLabel: about?.ctaLabel || "Contact Us",
  cards: arr(solutions?.solutions).map((s) => ({
    image: s.image ?? "", title: s.title ?? "", description: s.description ?? "",
  })),
});
const mapServices = (promise, solutions, hero) => ({
  eyebrow: promise?.eyebrow || "/ Our Promise",
  heading: promise?.heading ?? "",
  description: promise?.description ?? "",
  image: arr(solutions?.solutions)[0]?.image || hero?.image || "/images/hardware/security_lens_bg.png",
  videoTitle: "",
  watchLabel: "Watch Video",
  features: arr(promise?.features).map((f) => ({ title: f.title ?? "", description: f.description ?? "" })),
});
const mapSupport = (solutionsHeading, solutions) => ({
  heading: solutionsHeading?.heading ?? "",
  description: solutionsHeading?.description ?? "",
  ctaLabel: solutionsHeading?.cardCtaLabel || "Explore Solution",
  solutions: arr(solutions?.solutions).map((s) => ({
    image: s.image ?? "", imageAlt: s.title ?? "", title: s.title ?? "", description: s.description ?? "",
  })),
});
const mapBenefits = (whyChoose, benefits) => {
  const shared = whyChoose?.benefitDescription ?? "";
  return {
    eyebrow: whyChoose?.eyebrow || "/ Why Choose Us",
    heading: whyChoose?.heading ?? "",
    benefits: arr(benefits?.benefits).map((b) => {
      const title = typeof b === "string" ? b : (b.text ?? b.title ?? "");
      const description = (typeof b === "object" && b.description) ? b.description : shared;
      return { title, description };
    }),
  };
};
const mapTestimonials = (t) => ({
  badge: t?.badge || "Customer Stories",
  title: t?.title ?? "",
  description: t?.description ?? "",
  testimonials: arr(t?.items ?? t?.testimonials).map((i) => ({
    name: i.name ?? "", role: i.role ?? "", review: i.review ?? "", image: i.image ?? "",
  })),
});
const mapFaqs = (faqHeading, faqs, label) => ({
  badge: faqHeading?.badge || `${label} FAQs`,
  title: faqHeading?.title || "Everything You Need To Know",
  description: faqHeading?.description || `Common questions about ${label.toLowerCase()} planning, installation, and support.`,
  faqs: arr(faqs?.faqs).map((q) => ({ question: q.question ?? "", answer: q.answer ?? "" })),
});

// Defaults for security-surveillance's never-saved benefits + faqs sections
// (mirror the security-surveillance group in page-sections.ts).
const SS_BENEFITS_DEFAULT = {
  eyebrow: "/ Why Choose Us",
  heading: "Security you can trust.\nService you can count on.",
  benefits: [
    { title: "Tender-Ready Execution", description: "Project documentation, BOQ understanding, technical planning, and professional deployment for government and institutional requirements." },
    { title: "Large-Site Installation", description: "Structured cabling, camera mounting, network setup, storage configuration, and clean handover for big premises." },
    { title: "Centralized Monitoring", description: "Live feeds, recording access, multi-camera viewing, and control room support for security teams and operators." },
    { title: "Reliable Support", description: "Post-installation support, troubleshooting, maintenance, and system health checks for long-term performance." },
  ],
};
const SS_FAQS_DEFAULT = {
  badge: "Security FAQs",
  title: "CCTV Questions, Answered",
  description: "Everything you need to know about tender-based CCTV projects, large-site installation, camera planning, control room setup, access control integration, and support.",
  faqs: [
    { question: "Do you provide CCTV work for government tenders and large projects?", answer: "Yes. Fillip Technologies executes CCTV surveillance projects for government tenders, public infrastructure, institutions, industrial sites, warehouses, campuses, hospitals, parks, and large commercial premises." },
    { question: "Do you help with site survey and camera point planning?", answer: "Yes. We assess the site layout, entry points, blind spots, cable routes, network requirements, storage needs, and monitoring workflow before finalizing the CCTV plan." },
    { question: "Can you set up a control room for CCTV monitoring?", answer: "Yes. We can configure NVR/DVR systems, storage, monitoring displays, video walls, network access, and operator-ready control room setups for large sites." },
    { question: "Can CCTV be integrated with access control and other security systems?", answer: "Yes. We can integrate CCTV with biometric access control, RFID systems, gate security, attendance systems, alarms, and site-level monitoring workflows." },
    { question: "Do you provide maintenance and support after installation?", answer: "Yes. Our team supports camera health checks, troubleshooting, recording setup, network checks, storage review, and ongoing maintenance for reliable long-term performance." },
  ],
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");

  const staticJson = JSON.parse(
    await readFile(path.join(process.cwd(), "src/data/hardware-solutions/solutions.json"), "utf8")
  );
  const staticBySlug = Object.fromEntries((staticJson.pages ?? []).map((p) => [p.slug, p]));

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const col = mongoose.connection.db.collection("site_content");
  const now = new Date();

  const readData = async (key) => (await col.findOne({ key }))?.data ?? null;
  const write = (slug, id, data) =>
    col.updateOne(
      { key: `servicepage.${slug}.${id}` },
      { $set: { key: `servicepage.${slug}.${id}`, data, updated_at: now } },
      { upsert: true }
    );

  // (a) 9 generic slugs
  for (const slug of GENERIC_SLUGS) {
    const existingHero = await readData(`servicepage.${slug}.hero`);
    if (existingHero && "backgroundImage" in existingHero) {
      console.log(`• ${slug}: already migrated, skipping`);
      continue;
    }
    const label = staticBySlug[slug]?.label ?? titleCase(slug);
    const g = {};
    for (const id of ["hero", "about", "promise", "solutionsHeading", "solutions", "whyChoose", "benefits", "testimonials", "faqs", "faqHeading"]) {
      g[id] = await readData(`servicepage.${slug}.${id}`);
    }
    const hero = g.hero ?? staticBySlug[slug]?.hero ?? {};

    await write(slug, "hero", mapHero(hero));
    await write(slug, "priority", mapPriority(g.about, g.solutions));
    await write(slug, "services", mapServices(g.promise, g.solutions, hero));
    await write(slug, "support", mapSupport(g.solutionsHeading, g.solutions));
    await write(slug, "benefits", mapBenefits(g.whyChoose, g.benefits));
    await write(slug, "testimonials", mapTestimonials(g.testimonials));
    await write(slug, "faqs", mapFaqs(g.faqHeading, g.faqs, label));
    console.log(`✓ ${slug}: migrated to security-surveillance layout`);
  }

  // (b) security-surveillance: copy page.* -> servicepage.* + fill benefits/faqs
  {
    const slug = "security-surveillance";
    const existingHero = await readData(`servicepage.${slug}.hero`);
    if (existingHero && "backgroundImage" in existingHero) {
      console.log(`• ${slug}: already migrated, skipping`);
    } else {
      for (const id of ["hero", "priority", "services", "support", "testimonials"]) {
        const data = (await col.findOne({ key: `page.${slug}.${id}` }))?.data;
        if (data) await write(slug, id, data);
      }
      await write(slug, "benefits", (await readData(`page.${slug}.benefits`)) ?? SS_BENEFITS_DEFAULT);
      await write(slug, "faqs", (await readData(`page.${slug}.faqs`)) ?? SS_FAQS_DEFAULT);
      console.log(`✓ ${slug}: copied bespoke content into servicepage.*`);
    }
  }

  console.log("\nDone.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err.message ?? err);
  process.exit(1);
});
