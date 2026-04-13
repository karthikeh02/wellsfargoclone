import puppeteer from 'puppeteer';

async function compare() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Taking clone section screenshots...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));

  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log('Page height:', h);

  // Sections
  await page.screenshot({ path: 'screenshots/v3-header.png', clip: { x: 0, y: 0, width: 1440, height: 180 } });
  await page.screenshot({ path: 'screenshots/v3-hero.png', clip: { x: 0, y: 130, width: 1440, height: 520 } });
  await page.screenshot({ path: 'screenshots/v3-cards.png', clip: { x: 0, y: 650, width: 1440, height: 250 } });
  await page.screenshot({ path: 'screenshots/v3-promo.png', clip: { x: 0, y: 900, width: 1440, height: 380 } });
  await page.screenshot({ path: 'screenshots/v3-guidance.png', clip: { x: 0, y: 1280, width: 1440, height: 550 } });
  await page.screenshot({ path: 'screenshots/v3-fargo.png', clip: { x: 0, y: 1830, width: 1440, height: 400 } });
  await page.screenshot({ path: 'screenshots/v3-community.png', clip: { x: 0, y: 2230, width: 1440, height: 550 } });
  if (h > 2780) {
    await page.screenshot({ path: 'screenshots/v3-footer.png', clip: { x: 0, y: 2780, width: 1440, height: Math.min(700, h - 2780) } });
  }

  await browser.close();
  console.log('Done!');
}

compare().catch(e => { console.error(e); process.exit(1); });
