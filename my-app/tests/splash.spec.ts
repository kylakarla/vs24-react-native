import { test, expect } from "@playwright/test";

test.describe("Splash Screen", () => {
  test("kuvab kõik elemendid õigesti", async ({ page }) => {
    // Ava SplashScreen
    await page.goto("http://localhost:8081/splash");

    // Kontrolli, kas pilt on nähtav
    const image = page.locator("img");
    await expect(image).toBeVisible();

    // Kontrolli, kas peamine tekst eksisteerib ja sisaldab õiget fraasi
    const mainText = page.locator("text=You’ll find all you need here!");
    await expect(mainText).toBeVisible();

    // Kontrolli, kas “Sign Up” nupp on nähtav
    const signUpButton = page.locator("text=Sign Up");
    await expect(signUpButton).toBeVisible();

    // Kontrolli, kas “Sign In” nupp on nähtav
    const signInButton = page.locator("text=Sign In");
    await expect(signInButton).toBeVisible();
  });

});