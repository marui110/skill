const { chromium } = require("playwright");

const targetUrl = process.env.TARGET_URL;
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

if (!targetUrl || !email || !password) {
  throw new Error("TARGET_URL, TEST_EMAIL, and TEST_PASSWORD are required");
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

  try {
    await page.goto(`${targetUrl}/login`, { waitUntil: "networkidle", timeout: 30000 });
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);
    if (!/\/app(?:\/|$)/.test(new URL(page.url()).pathname)) {
      const messages = await page
        .locator('[role="alert"], [data-sonner-toast]')
        .allInnerTexts();
      console.log(JSON.stringify({ loginUrl: page.url(), loginMessages: messages }, null, 2));
      process.exitCode = 2;
      return;
    }
    await page.goto(`${targetUrl}/app/settings`, { waitUntil: "networkidle", timeout: 30000 });

    const body = await page.locator("body").innerText();
    const forbidden = [
      "Usage Stats",
      "Add Douyin",
      "Add Kuaishou",
      "Add Xiaohongshu",
      "Add Bilibili",
      "Add WeChat Channels",
    ];
    const present = forbidden.filter((label) => body.includes(label));
    const overseas = ["Add YouTube", "Add Threads", "Add Reddit", "Add LinkedIn", "Add Lemon8"]
      .filter((label) => body.includes(label));

    console.log(JSON.stringify({
      url: page.url(),
      forbiddenPresent: present,
      overseasOptionsPresent: overseas,
    }, null, 2));
    await page.screenshot({ path: "/tmp/outangle-channel-verify.png", fullPage: true });

    if (present.length > 0) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
