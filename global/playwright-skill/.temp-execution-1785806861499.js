/**
 * GSC setup outside sandbox — waits until REAL Search Console UI is visible.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const https = require("https");

const PROFILE = path.join(process.env.HOME, ".cache/outangle-seo-browser-gsc-v4");
const DOMAIN = "outangle.homes";
const SITE = "https://outangle.homes";
const WAIT_MS = 400_000;
const TEAM = "team_U4oP1B18v7t03MMvp1yRQkKM";

function vercelRequest(method, apiPath, bodyObj) {
  return new Promise((resolve, reject) => {
    const token = process.env.VERCEL_TOKEN;
    if (!token) return reject(new Error("VERCEL_TOKEN missing"));
    const sep = apiPath.includes("?") ? "&" : "?";
    const body = bodyObj ? JSON.stringify(bodyObj) : null;
    const req = https.request(
      {
        hostname: "api.vercel.com",
        path: `${apiPath}${sep}teamId=${TEAM}`,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body
            ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body),
              }
            : {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      },
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function ensureTxt(value) {
  const resList = await vercelRequest("GET", `/v2/domains/${DOMAIN}/records`);
  const parsed = JSON.parse(resList.data);
  const existing = (parsed.records || []).filter((r) => r.type === "TXT");
  if (
    existing.some(
      (r) => String(r.value).includes(value) || value.includes(String(r.value)),
    )
  ) {
    console.log("· TXT already on Vercel");
    return;
  }
  const res = await vercelRequest("POST", `/v2/domains/${DOMAIN}/records`, {
    type: "TXT",
    name: "",
    value,
    ttl: 60,
  });
  console.log("✓ Vercel TXT", res.status, res.data.slice(0, 280));
  if (res.status >= 400) throw new Error(`DNS TXT failed: ${res.data}`);
}

function urlLooksLikeGoogleAuth(url) {
  return /accounts\.google\.com|ServiceLogin|signin\/oauth|Identifier/i.test(url);
}

async function isGoogleLoginPage(page) {
  const url = page.url();
  if (urlLooksLikeGoogleAuth(url)) return true;
  // Login card copy
  if (
    await page
      .getByText(/请使用您的 Google 账号登录|Sign in to continue to Google Search Console/i)
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    return true;
  }
  if (
    (await page.getByLabel(/邮箱或电话号码|Email or phone/i).isVisible().catch(() => false)) &&
    (await page.getByRole("button", { name: /下一步|Next/i }).isVisible().catch(() => false))
  ) {
    return true;
  }
  return false;
}

async function isRealGsc(page) {
  if (await isGoogleLoginPage(page)) return false;
  const url = page.url();
  if (!/search\.google\.com\/search-console/i.test(url)) return false;
  if (urlLooksLikeGoogleAuth(url)) return false;

  // Strong signals unique to GSC app shell
  const strong = [
    page.locator('[aria-label*="Search Console" i]').first(),
    page.getByRole("link", { name: /效果|Performance/i }).first(),
    page.getByRole("link", { name: /网址检查|URL inspection/i }).first(),
    page.getByRole("link", { name: /站点地图|Sitemaps/i }).first(),
    page.getByRole("link", { name: /页面索引|Pages/i }).first(),
    page.getByText(/添加资源|Add property/i).first(),
    page.locator("text=Search Console").first(),
  ];
  for (const loc of strong) {
    if (await loc.isVisible().catch(() => false)) return true;
  }
  return false;
}

async function ensureLoggedIntoGsc(page) {
  const start = Date.now();
  while (Date.now() - start < WAIT_MS) {
    if (await isRealGsc(page)) return true;
    const left = Math.round((WAIT_MS - (Date.now() - start)) / 1000);
    const login = await isGoogleLoginPage(page);
    console.log(
      login
        ? `⏳ 【请在本机 Chrome 窗口登录 Google】剩余约 ${left}s`
        : `⏳ 等待 GSC 主界面… ${left}s | ${page.url().slice(0, 100)}`,
    );
    await page.waitForTimeout(5000);
  }
  return false;
}

async function extractTxt(page) {
  const body = await page.locator("body").innerText().catch(() => "");
  const m = body.match(/google-site-verification=[A-Za-z0-9_\-]+/);
  if (m) return m[0];
  const fields = page.locator("input, textarea");
  const n = await fields.count();
  for (let i = 0; i < Math.min(n, 50); i++) {
    const v = ((await fields.nth(i).inputValue().catch(() => "")) || "").trim();
    if (/google-site-verification=/i.test(v)) return v;
    if (/^google[a-z0-9_\-]{10,}$/i.test(v)) return `google-site-verification=${v}`;
  }
  const codes = await page.locator("code, pre").allTextContents().catch(() => []);
  for (const t of codes) {
    const mm = String(t).match(/google-site-verification=[A-Za-z0-9_\-]+/);
    if (mm) return mm[0];
  }
  return null;
}

async function gotoGsc(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.waitForTimeout(2000);
  if (await isGoogleLoginPage(page)) {
    console.log("→ 导航触发登录，等待你完成登录…");
    if (!(await ensureLoggedIntoGsc(page))) {
      throw new Error("登录超时");
    }
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120_000 });
    await page.waitForTimeout(2000);
  }
  if (!(await isRealGsc(page)) && (await isGoogleLoginPage(page))) {
    throw new Error("仍在登录页: " + page.url());
  }
}

(async () => {
  console.log("=== 非沙箱运行 Google Search Console 自动化 ===");
  console.log("会弹出本机 Chrome。请完整登录 Google，直到看到 Search Console 左侧菜单。\n");

  fs.mkdirSync(PROFILE, { recursive: true });
  const context = await chromium.launchPersistentContext(PROFILE, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1440, height: 900 },
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const page = context.pages()[0] || (await context.newPage());

  try {
    await page.goto("https://search.google.com/search-console", {
      waitUntil: "domcontentloaded",
      timeout: 120_000,
    });

    if (!(await ensureLoggedIntoGsc(page))) {
      await page.screenshot({ path: "/tmp/outangle-gsc-login-timeout.png", fullPage: true });
      throw new Error("登录超时 — /tmp/outangle-gsc-login-timeout.png");
    }
    console.log("✓ 确认已进入 Search Console 主界面");

    await gotoGsc(
      page,
      `https://search.google.com/search-console?resource_id=sc-domain%3A${DOMAIN}`,
    );

    let bodyText = await page.locator("body").innerText().catch(() => "");
    const needAdd =
      /welcome/i.test(page.url()) ||
      (/添加资源|Add property|开始使用|Get started|选择资源类型/i.test(bodyText) &&
        !/效果|Performance|概览|Overview/i.test(bodyText));

    if (needAdd) {
      console.log("→ 添加网域资源…");
      await gotoGsc(page, "https://search.google.com/search-console/welcome");
      const domainCard = page.getByText(/^网域$|^Domain$/).first();
      if (await domainCard.isVisible().catch(() => false)) {
        await domainCard.click();
        await page.waitForTimeout(500);
      }
      const input = page
        .locator(
          'input[placeholder*="example" i], input[aria-label*="domain" i], input[type="text"]',
        )
        .first();
      await input.fill(DOMAIN);
      await page.getByRole("button", { name: /继续|Continue/i }).first().click();
      await page.waitForTimeout(4000);
    }

    bodyText = await page.locator("body").innerText().catch(() => "");
    if (/验证所有权|Verify ownership|DNS|域名提供商/i.test(bodyText)) {
      console.log("→ DNS 验证");
      const dnsTab = page
        .getByRole("tab", { name: /DNS|域名提供商|Domain name provider/i })
        .first();
      if (await dnsTab.isVisible().catch(() => false)) {
        await dnsTab.click();
        await page.waitForTimeout(1000);
      }
      const txt = await extractTxt(page);
      if (!txt) {
        await page.screenshot({ path: "/tmp/outangle-gsc-no-txt.png", fullPage: true });
        throw new Error("未找到 TXT — /tmp/outangle-gsc-no-txt.png");
      }
      console.log("✓ TXT:", txt);
      await ensureTxt(txt);
      console.log("⏳ DNS 30s…");
      await page.waitForTimeout(30_000);
      const verifyBtn = page.getByRole("button", { name: /验证|Verify/i }).first();
      if (await verifyBtn.isVisible().catch(() => false)) {
        await verifyBtn.click();
        await page.waitForTimeout(12_000);
        console.log("✓ 已验证点击");
      }
    } else {
      console.log("ℹ 无验证门（可能已验证）");
    }

    console.log("→ 提交 sitemap");
    await gotoGsc(
      page,
      `https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3A${DOMAIN}`,
    );
    await page.waitForTimeout(2000);

    const sitemapInput = page
      .locator(
        'input[aria-label*="sitemap" i], input[placeholder*="sitemap" i], input[type="url"], input[type="text"]',
      )
      .first();
    if (await sitemapInput.isVisible().catch(() => false)) {
      await sitemapInput.fill("sitemap.xml");
      const submit = page.getByRole("button", { name: /提交|Submit/i }).first();
      if (await submit.isVisible().catch(() => false)) {
        await submit.click();
        await page.waitForTimeout(5000);
        console.log("✓ sitemap.xml 已提交");
      }
    } else {
      await page.screenshot({ path: "/tmp/outangle-gsc-sitemap-ui.png", fullPage: true });
      console.log("⚠ 无 sitemap 输入框 — /tmp/outangle-gsc-sitemap-ui.png");
    }

    for (const target of [`${SITE}/en`, `${SITE}/zh`]) {
      console.log("→ 网址检查", target);
      await gotoGsc(
        page,
        `https://search.google.com/search-console/inspect?resource_id=sc-domain%3A${DOMAIN}`,
      );
      const box = page
        .locator('input[type="text"], input[type="search"], input[aria-label*="URL" i]')
        .first();
      if (await box.isVisible().catch(() => false)) {
        await box.fill(target);
        await box.press("Enter");
        await page.waitForTimeout(6000);
      }
      const reqBtn = page
        .getByRole("button", { name: /请求编入索引|Request indexing/i })
        .first();
      if (
        (await reqBtn.isVisible().catch(() => false)) &&
        !(await reqBtn.isDisabled().catch(() => true))
      ) {
        await reqBtn.click();
        await page.waitForTimeout(4000);
        console.log("✓ 请求索引:", target);
      } else {
        console.log("ℹ 暂不可请求索引:", target);
      }
    }

    await page.screenshot({ path: "/tmp/outangle-gsc-done.png", fullPage: true });
    console.log("📸 /tmp/outangle-gsc-done.png");
    console.log("\n✅ GSC 完成");
  } catch (e) {
    console.error("\n❌", e.message || e);
    await page
      .screenshot({ path: "/tmp/outangle-gsc-error.png", fullPage: true })
      .catch(() => {});
    process.exitCode = 1;
  } finally {
    await page.waitForTimeout(10_000);
    await context.close();
  }
})();
