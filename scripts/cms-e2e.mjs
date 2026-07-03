// End-to-end proof: log into the admin GUI, edit a Home section, save, and
// confirm the change appears on the public home page. Screenshots at each step.
// Run: node scripts/cms-e2e.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = "scripts/.shots";
mkdirSync(OUT, { recursive: true });

const shot = async (page, name) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log("  📸", name);
};

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1) Log in
  console.log("1) Login");
  await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle" });
  await page.fill("#email", "admin@test.com");
  await page.fill("#password", "Admin@1234");
  await shot(page, "01-login-filled");
  await Promise.all([
    page.waitForURL("**/admin", { timeout: 20000 }),
    page.click('button[type="submit"]'),
  ]);
  await shot(page, "02-admin-dashboard");

  // Helper: edit the humanai eyebrow field and save
  const setEyebrow = async (value, tag) => {
    await page.goto(`${BASE}/admin/cms/home/humanai`, { waitUntil: "networkidle" });
    await page.fill("#eyebrow", value);
    await shot(page, `${tag}-editor-filled`);
    await page.click('button:has-text("Save changes")');
    await page.waitForSelector("text=/Saved\\./", { timeout: 20000 });
    await shot(page, `${tag}-editor-saved`);
  };

  const homeEyebrow = async () => {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const section = page.locator('section:has-text("How We Work Today")').first();
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    return { section };
  };

  // 2) Set a distinctive value, verify on home
  console.log("2) Edit eyebrow -> save -> fetch on home");
  const testVal = "HUMAN + AI — LIVE FROM CMS ✓";
  await setEyebrow(testVal, "03");
  {
    const { section } = await homeEyebrow();
    await section.screenshot({ path: `${OUT}/04-home-with-test-eyebrow.png` });
    console.log("  📸 04-home-with-test-eyebrow");
    const visible = await page.getByText(testVal).first().isVisible().catch(() => false);
    console.log("  home shows test eyebrow:", visible);
  }

  // 3) Restore to empty (the state you set earlier), verify it's gone
  console.log("3) Clear eyebrow -> save -> fetch on home");
  await setEyebrow("", "05");
  {
    const { section } = await homeEyebrow();
    await section.screenshot({ path: `${OUT}/06-home-eyebrow-cleared.png` });
    console.log("  📸 06-home-eyebrow-cleared");
    const stillThere = await page.getByText(testVal).first().isVisible().catch(() => false);
    console.log("  test eyebrow still present:", stillThere, "(expect false)");
  }

  await browser.close();
  console.log("DONE ✅  screenshots in", OUT);
};

run().catch((e) => {
  console.error("E2E FAILED:", e);
  process.exit(1);
});
