import { test, expect } from "@playwright/test";

test.describe("Responsive Layout", () => {
  test("should render correctly on mobile screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("http://localhost:3000");
    expect(await page.locator("nav").boundingBox()).toBeTruthy();
    expect(await page.locator("text=Dynamic Form Generator")).toBeVisible();
  });

  test("should render correctly on desktop screens", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
    expect(await page.locator("nav").boundingBox()).toBeTruthy();
    expect(await page.locator("text=Dynamic Form Generator")).toBeVisible();
  });
});
