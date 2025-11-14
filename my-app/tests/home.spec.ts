import { test, expect } from "@playwright/test";

test.describe("Sign Up Screen", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8081/signUp");
  });

  test("kuvab kõik elemendid õigesti", async ({ page }) => {
    await expect(page.locator('input[placeholder="Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="E-mail"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('text=I agree with')).toBeVisible();
    await expect(page.locator('text=Sign Up').nth(1)).toBeVisible(); // nupp
    await expect(page.locator('text=Or sign up with')).toBeVisible();
    await expect(page.locator('text=Already have an account?')).toBeVisible();
  });

  test("lubab registreerida, kui kõik väljad on täidetud", async ({ page }) => {
    await page.locator('input[placeholder="Name"]').fill("John Doe");
    await page.locator('input[placeholder="E-mail"]').fill("john@example.com");
    await page.locator('input[placeholder="Password"]').fill("123456");
  });

});
