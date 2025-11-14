const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const assert = require("assert");

setDefaultTimeout(30 * 1000);

let browser;
let page;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

Given("the user opens the Sign Up page", async () => {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
  await page.goto("http://localhost:8081/signUp", { waitUntil: "networkidle0" });
});

When('the user enters {string} into the name field', async (name) => {
  await page.waitForSelector('input[placeholder="Name"]');
  await page.type('input[placeholder="Name"]', name);
});

When('the user enters {string} into the email field', async (email) => {
  await page.waitForSelector('input[placeholder="E-mail"]');
  await page.type('input[placeholder="E-mail"]', email);
});

When('the user enters {string} into the password field', async (password) => {
  await page.waitForSelector('input[placeholder="Password"]');
  await page.type('input[placeholder="Password"]', password);
});

Then('the Sign Up button should be enabled', async () => {
  const exists = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll("div"));
    return divs.some(d => d.innerText.trim() === "Sign Up");
  });

  assert.strictEqual(exists, true, "Sign Up button not found");
});

When('the user clicks the Sign Up button', async () => {
  await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll("div"));
    const btn = divs.find(d => d.innerText.trim() === "Sign Up");
    if (btn) btn.click();
  });

  await wait(500);
});

When('the user clicks {string} link', async (text) => {
  const found = await page.evaluate((expected) => {
    const normalize = (str) =>
      str.replace(/\s+/g, " ").trim().toLowerCase();
    const expectedNorm = normalize(expected);

    const divs = Array.from(document.querySelectorAll("div"));
    const match = divs.find(d => normalize(d.innerText || "").includes(expectedNorm));

    if (!match) return false;

    (match.parentElement || match).click();
    return true;
  }, text);

  assert.strictEqual(found, true, `${text} link not found`);

  await wait(700);


  const html = await page.content();
  console.log("### DOM AFTER CLICK ###");
  console.log(html);
});

Then('the Sign In page should open', async () => {
  await wait(800);

  const found = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll("*"));
    return allElements.some(el => el.innerText && el.innerText.trim().toLowerCase() === "sign in");
  });

  assert.strictEqual(found, true, "Sign In screen did not open");
});

Then('the user should remain on the Sign Up page', async () => {
  await wait(500);
  const url = page.url();
  assert(url.includes("/signUp"), "Did not remain on Sign Up page");
});

Then("close the browser", async () => {
  await browser.close();
});
