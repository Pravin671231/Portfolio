import { test, expect, type Locator } from "@playwright/test";

/**
 * Regression coverage for the "custom cursor not visible" bug: `useSpring` fed
 * plain numbers never re-targets in motion@13, so the cursor (and GlowBackground
 * parallax) stayed frozen at the origin. See src/hooks/useMousePositionValue.ts.
 *
 * Projects filter these by tag (see playwright.config.ts): the `desktop` project
 * runs `@desktop`, the reduced-motion and mobile projects run `@opt-out`.
 */

function center(box: { x: number; y: number; width: number; height: number }) {
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function distanceToPointer(dot: Locator, target: { x: number; y: number }) {
  const box = await dot.boundingBox();
  if (!box) return Number.POSITIVE_INFINITY;
  const c = center(box);
  return Math.hypot(c.x - target.x, c.y - target.y);
}

test.describe("custom cursor — desktop @desktop", () => {
  test("dot springs to and tracks the pointer", async ({ page }) => {
    await page.goto("/");

    const dot = page.getByTestId("custom-cursor").locator("div").first();
    await expect(dot).toBeAttached();

    await page.mouse.move(20, 20);
    const target = { x: 512, y: 360 };
    await page.mouse.move(target.x, target.y, { steps: 24 });

    await expect
      .poll(() => distanceToPointer(dot, target), { timeout: 2000 })
      .toBeLessThan(6);

    // Follows a second move too — not a one-off.
    const next = { x: 900, y: 200 };
    await page.mouse.move(next.x, next.y, { steps: 24 });
    await expect
      .poll(() => distanceToPointer(dot, next), { timeout: 2000 })
      .toBeLessThan(6);
  });

  test("native cursor is hidden while the custom cursor is active", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toHaveClass(/cursor-none-desktop/);
  });

  test("cursor grows into a label on an interactive hover target", async ({ page }) => {
    await page.goto("/");

    // Contact's CTA sets cursor mode "talk" on mouseenter -> label "LET'S TALK".
    // Lenis drives an inertial scroll off gsap.ticker, so the CTA can still be
    // drifting when the pointer lands on it (mouseenter then immediately
    // mouseleave). Retry the whole hover+assert until the scroll has settled.
    const cta = page.locator('#contact a[href^="mailto:"]');
    const cursor = page.getByTestId("custom-cursor");

    await expect(async () => {
      await page.mouse.move(0, 0);
      await cta.hover();
      await expect(cursor).toContainText("LET'S TALK", { timeout: 500 });
    }).toPass({ timeout: 10_000 });
  });

  test("GlowBackground parallax blob reacts to pointer movement", async ({ page }) => {
    await page.goto("/");

    const blob = page.getByTestId("glow-blob").first();
    await expect(blob).toBeAttached();

    const viewport = page.viewportSize() ?? { width: 1280, height: 720 };

    await page.mouse.move(40, 40, { steps: 10 });
    await page.waitForTimeout(400); // let the (slow, stiffness 60) spring settle
    const before = await blob.evaluate((el) => getComputedStyle(el).transform);

    await page.mouse.move(viewport.width - 40, viewport.height - 40, { steps: 24 });
    await expect
      .poll(() => blob.evaluate((el) => getComputedStyle(el).transform), { timeout: 2000 })
      .not.toBe(before);
  });
});

test.describe("custom cursor — touch / reduced-motion opt-out @opt-out", () => {
  test("no custom cursor is rendered and the native cursor is kept", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("custom-cursor")).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveClass(/cursor-none-desktop/);
  });
});
