import { test, expect } from "@playwright/test";

test.describe("Sign In Screen - simplified", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8081/signIn");
  });

  // 1️⃣ Kontrollib, et Sign In lehe pealkiri on nähtav
  test("pealkiri on nähtav", async ({ page }) => {
    const title = page.locator('div:has-text("Sign In")').first();
    await expect(title).toBeVisible();
  });

  // 2️⃣ Kontrollib, et Sign In nupp töötab, kui väljad on täidetud
  test("Sign In nupp lubab sisse logida", async ({ page }) => {
    const emailInput = page.locator('input[placeholder="E-mail"]');
    const passwordInput = page.locator('input[placeholder="Password"]');
    const signInButton = page.locator('button:has-text("Sign In")');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("123456");
    await signInButton.click();

    // Oletame, et pärast sisselogimist suunatakse põhivaatesse
    await expect(page).toHaveURL(/\/\(tabs\)/);
  });



});
