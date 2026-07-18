/**
 * One-off fix: repoint the "Challenges We Solve" mega-menu sub-links from the
 * removed /challenges/<slug> pages to the site's case studies, and delete the
 * now-orphaned challenge service pages.
 *
 * Usage:
 *   node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/fix-challenges-menu.mjs
 *
 * Safe to run repeatedly (idempotent).
 */
import mongoose from "mongoose";

const CASE_STUDY_LINKS = [
  { label: "Healthcare — Increase in Patient Leads", href: "/case-studies/healthcare-increase-in-patient-leads" },
  { label: "E-Commerce — Revenue Growth", href: "/case-studies/e-commerce-revenue-growth" },
  { label: "Real Estate — Qualified Leads", href: "/case-studies/real-estate-qualified-leads" },
  { label: "Education — Enrollment Growth", href: "/case-studies/education-enrollment-growth" },
  { label: "FinTech — Faster Customer Acquisition", href: "/case-studies/fintech-faster-customer-acquisition" },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (add it to .env / .env.local).");

  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  console.log("Connected.");

  // 1) Ensure the category exists and is published so it renders in the What We
  //    Do dropdown exactly like the other categories.
  await db.collection("service_categories").updateOne(
    { slug: "challenges-we-solve" },
    {
      $set: { published: true, updated_at: new Date() },
      $setOnInsert: {
        slug: "challenges-we-solve",
        label: "Challenges We Solve",
        sort_order: 6,
        created_at: new Date(),
      },
    },
    { upsert: true }
  );

  // 2) Overwrite the saved menu links with the case-study links.
  const res = await db.collection("site_content").updateOne(
    { key: "whatwedo.challenges-we-solve.menuLinks" },
    {
      $set: {
        key: "whatwedo.challenges-we-solve.menuLinks",
        data: { items: CASE_STUDY_LINKS },
        updated_at: new Date(),
      },
    },
    { upsert: true }
  );
  console.log(
    `menuLinks updated (matched=${res.matchedCount}, upserted=${res.upsertedCount ? 1 : 0}) → ${CASE_STUDY_LINKS.length} case-study links.`
  );

  // Show the category's current published state so we know it renders in the nav.
  const cat = await db
    .collection("service_categories")
    .findOne({ slug: "challenges-we-solve" });
  console.log(
    `Category challenges-we-solve: ${cat ? `published=${cat.published}` : "MISSING"}`
  );

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
