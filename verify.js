const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(2000); // wait for animations
  await page.screenshot({ path: 'login.png' });

  await page.goto('http://localhost:3000/signup');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'signup.png' });

  await browser.close();
  console.log('Screenshots generated');
})();
