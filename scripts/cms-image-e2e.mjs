// Proof of image-upload + new sections: log in, open the "Need Guidance CTA"
// section, upload an image + change the title, save, then verify both appear on
// the public home page. Screenshots at each step.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = "scripts/.shots";
mkdirSync(OUT, { recursive: true });
const UPLOAD_SRC = path.resolve("public/images/finance.jpg"); // distinctive test image

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Login
  await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle" });
  await page.fill("#email", "admin@test.com");
  await page.fill("#password", "Admin@1234");
  await Promise.all([
    page.waitForURL("**/admin", { timeout: 20000 }),
    page.click('button[type="submit"]'),
  ]);
  console.log("logged in");

  // Show the CMS section list (new sections should appear)
  await page.goto(`${BASE}/admin/cms/home`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/10-cms-section-list.png`, fullPage: true });
  console.log("📸 10-cms-section-list");

  // Open Need Guidance CTA editor
  await page.goto(`${BASE}/admin/cms/home/needguidance`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/11-needguidance-editor.png`, fullPage: true });

  // Change title + upload an image
  const testTitle = "Book a Free Strategy Call (CMS+IMG ✓)";
  await page.fill("#title", testTitle);
  await page.setInputFiles('input[type="file"]', UPLOAD_SRC);
  // wait for the path field to reflect the uploaded /uploads/... url
  await page.waitForFunction(() => {
    const el = document.querySelector('input[placeholder^="/uploads"]');
    return el && el.value.startsWith("/uploads/");
  }, { timeout: 20000 });
  const uploadedPath = await page.locator('input[placeholder^="/uploads"]').inputValue();
  console.log("uploaded to:", uploadedPath);
  await page.screenshot({ path: `${OUT}/12-needguidance-uploaded.png`, fullPage: true });

  // Save
  await page.click('button:has-text("Save changes")');
  await page.waitForSelector("text=/Saved\\./", { timeout: 20000 });
  console.log("saved");

  // Verify on home page
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const section = page.locator('section:has-text("Need Expert Advice?")').first();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await section.screenshot({ path: `${OUT}/13-home-needguidance.png` });
  console.log("📸 13-home-needguidance");

  const titleVisible = await page.getByText(testTitle).first().isVisible().catch(() => false);
  const imgOnPage = await page.locator(`img[src="${uploadedPath}"]`).count();
  console.log("home shows new title:", titleVisible);
  console.log("home shows uploaded image:", imgOnPage > 0);

  await browser.close();
  console.log("DONE ✅");
};

run().catch((e) => { console.error("E2E FAILED:", e); process.exit(1); });
