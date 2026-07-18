// Seeds the Our Story (/our-story) "missionvision" section content, which gained
// a CMS-managed Leadership & Team block (CEO + team members). Existing saved
// content wins on merge, so this only ADDS the new default fields to an existing
// row and never overwrites edits. Safe to run repeatedly (idempotent).
//
// Standalone (no `@/` alias) so it runs directly under Node, like db:migrate.
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/seed-our-story.mjs
import dns from "node:dns";
import mongoose from "mongoose";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

// Full default content for page.our-story.missionvision. Mirrors the defaults in
// src/server/content/page-sections.ts (missionvision section). Keep in sync.
const MISSIONVISION_DEFAULT = {
  eyebrow: "AFTERWORD",
  heading: "Pioneering the Agentic Future",
  missionText:
    "To empower modern brands with high-performance custom engineering, future-proof agentic AI systems, and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth.",
  visionText:
    "To establish ourselves as a global benchmark for digital execution and next-generation agentic AI, proving that client transparency, clean scalable code, and forward-looking automation can consistently win on the international stage.",
  creedText:
    "We make commitments, not excuses. We work with absolute accountability, leverage AI responsibly to amplify human intelligence, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch.",
  leadershipEyebrow: "Leadership & Team",
  leadershipHeading: "The People Behind The Pages",
  leadershipDescription:
    "One clear leadership voice, supported by a focused team of builders, designers, and growth specialists.",
  ceoName: "Vikash Kumar",
  ceoRole: "Founder & CEO",
  ceoExperience: "13+ Years of Experience",
  ceoImage: "/images/team/VIKASH.jpeg",
  ceoMessage:
    "Fillip Technologies was built with a simple belief: technology should make businesses clearer, faster, and more capable. Every solution we deliver carries our promise of discipline, transparency, and meaningful digital impact for the businesses we serve.",
  signatureLead: "Signed in code and character,",
  signatureName: "The Fillip Team",
  teamMembers: [
    { name: "Risabh Choubey", role: "Account Manager", image: "", imagePosition: "" },
    { name: "Shruti Sinha", role: "IT Team Lead", image: "/images/team/shruti-sinha.jpeg", imagePosition: "" },
    { name: "Payal Kumari", role: "Digital Marketing Head", image: "/images/team/Payal.jpeg", imagePosition: "" },
    { name: "Shruti Chouhan", role: "Software Development Engineer II", image: "/images/team/shruti-singh.png", imagePosition: "" },
    { name: "Abhishek Prajapati", role: "Backend Developer", image: "/images/team/ABHISHEK.jpeg", imagePosition: "" },
    { name: "Prince Raj", role: "Associate Software Developer", image: "/images/team/prince-kumar.png", imagePosition: "object-[50%_18%]" },
    { name: "Govind Kumar", role: "Associate Software Developer", image: "/images/team/Govind-Kumar.png", imagePosition: "object-[50%_18%]" },
    { name: "Aman Sharma", role: "Digital Marketing Executive", image: "", imagePosition: "" },
    { name: "Mukta Trivedy", role: "UI Designer", image: "/images/team/mukta-trivedy.png", imagePosition: "" },
    { name: "Wagish Karna", role: "Content Writer", image: "/images/team/wagish-karna.jpeg", imagePosition: "object-[50%_18%]" },
    { name: "Khushi Bharti", role: "HR Generalist", image: "", imagePosition: "" },
    { name: "Lincy Bhardwaj", role: "HR Executive", image: "", imagePosition: "" },
    { name: "Anushka Raj", role: "BDE", image: "", imagePosition: "" },
  ],
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const db = mongoose.connection.db;
  const key = "page.our-story.missionvision";

  const existing = await db.collection("site_content").findOne({ key });
  // Existing saved values win, so edits are preserved and only the new
  // Leadership & Team fields get filled in from the defaults.
  const data = { ...MISSIONVISION_DEFAULT, ...(existing?.data ?? {}) };

  await db.collection("site_content").updateOne(
    { key },
    { $set: { key, data, updated_at: new Date() } },
    { upsert: true }
  );

  const added = Object.keys(MISSIONVISION_DEFAULT).filter(
    (k) => !(existing?.data && k in existing.data)
  );
  console.log(
    existing
      ? `✓ Updated ${key}; filled ${added.length} missing field(s): ${added.join(", ") || "(none)"}`
      : `✓ Inserted ${key} with default Our Story content.`
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("✗ Seed failed:", err.message ?? err);
  process.exit(1);
});
