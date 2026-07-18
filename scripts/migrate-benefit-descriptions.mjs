// Gives every solution-page benefit card its own description.
//
// Before: the Solutions renderer showed ONE shared "benefit supporting line"
// (whyChoose.benefitDescription) under all four benefit cards, so they were
// identical and not individually editable. The benefits schema now stores a
// { text, description } per card. This backfills each card's `description` with
// the page's current shared line, so the pages look identical but each card is
// now independently editable in the CMS.
//
// Idempotent: cards that already have a non-empty description are left untouched.
// Standalone (no `@/` alias) so it runs directly under Node, like db:migrate.
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/migrate-benefit-descriptions.mjs
import dns from "node:dns";
import mongoose from "mongoose";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const db = mongoose.connection.db;
  const col = db.collection("site_content");

  // Every solution page's benefits row (servicepage.<slug>.benefits).
  const benefitRows = await col.find({ key: /^servicepage\..+\.benefits$/ }).toArray();
  let updatedPages = 0;
  let updatedCards = 0;

  for (const row of benefitRows) {
    const slug = row.key.split(".")[1];
    const items = row.data?.benefits;
    if (!Array.isArray(items) || items.length === 0) continue;

    // The page's current shared supporting line, used as each card's default.
    const whyChoose = await col.findOne({ key: `servicepage.${slug}.whyChoose` });
    const shared = String(whyChoose?.data?.benefitDescription ?? "").trim();

    let changed = false;
    const next = items.map((item) => {
      const text = typeof item === "string" ? item : String(item?.text ?? "");
      const existing = typeof item === "string" ? "" : String(item?.description ?? "").trim();
      if (existing) return { text, description: existing };
      changed = true;
      updatedCards += 1;
      return { text, description: shared };
    });

    if (!changed) continue;
    await col.updateOne(
      { key: row.key },
      { $set: { data: { benefits: next }, updated_at: new Date() } }
    );
    updatedPages += 1;
    console.log(`✓ ${slug}: filled ${next.length} benefit description(s)`);
  }

  console.log(`\nDone. Updated ${updatedCards} card(s) across ${updatedPages} page(s).`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err.message ?? err);
  process.exit(1);
});
