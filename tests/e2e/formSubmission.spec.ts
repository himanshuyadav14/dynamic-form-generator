import { test, expect } from "@playwright/test";

test.describe("Form Validation and Submission", () => {
  test("should display validation errors for empty required fields", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.fill("input[name=username]", ""); // Assuming form field names match JSON keys
    await page.click("button[type=submit]");
    await expect(page.locator("text=Username is required")).toBeVisible();
  });

  test("should submit the form successfully when fields are valid", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.fill("input[name=username]", "testuser");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Form submitted successfully")).toBeVisible();
  });
});
