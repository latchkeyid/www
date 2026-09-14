import { expect, test, type Page } from "@playwright/test";

// Every product's accent on the same page, light and dark, desktop and
// phone: the proof that the shell is one design with thirteen skins.
const themes = ["latchkey", "tripline", "runsheet", "wardroom", "purser", "foghorn", "grapevine", "inflow", "payntally", "ten99", "optrader", "thirtysixzero", "projectmesh"] as const;

async function open(page: Page, path: string, theme: string, dark: boolean) {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: dark ? "dark" : "light" });
  await page.addInitScript((d) => localStorage.setItem("www.theme", d ? "dark" : "light"), dark);
  await page.goto(`${path}?theme=${theme}&controls=0`);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  // the accent link is appended by the switcher script; wait for the primary to change from neutral
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--primary").trim())).not.toMatch(/mauve/);
}

test.describe("landing pages @screenshots", () => {
  for (const theme of themes) {
    for (const dark of [false, true]) {
      test(`${theme} ${dark ? "dark" : "light"}`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await open(page, "/", theme, dark);
        await expect(page.locator("h1")).toBeVisible();
        await page.screenshot({ path: `docs/screenshots/${theme}-${dark ? "dark" : "light"}.png`, fullPage: false });
        expect(errors).toEqual([]);
      });
    }
  }

  test("latchkey full page, pricing, docs, changelog", async ({ page }) => {
    await open(page, "/", "latchkey", false);
    await page.screenshot({ path: "docs/screenshots/latchkey-full.png", fullPage: true });
    await open(page, "/pricing", "latchkey", false);
    await page.screenshot({ path: "docs/screenshots/pricing-light.png" });
    await open(page, "/docs/quickstart", "latchkey", true);
    await page.screenshot({ path: "docs/screenshots/docs-dark.png" });
    await open(page, "/changelog", "latchkey", false);
    await page.screenshot({ path: "docs/screenshots/changelog-light.png" });
  });

  test("phone width has no horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 860 });
    await open(page, "/", "foghorn", false);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({ path: "docs/screenshots/foghorn-phone.png", fullPage: false });
  });
});
