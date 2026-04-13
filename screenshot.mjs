import puppeteer from 'puppeteer';

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--window-size=1440,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Screenshot of Wells Fargo original
  console.log('Taking Wells Fargo screenshots...');
  await page.goto('https://www.wellsfargo.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000)); // wait for dynamic content

  // Full page screenshot
  await page.screenshot({ path: 'screenshots/wf-original-full.png', fullPage: true });

  // Section-by-section screenshots
  await page.screenshot({ path: 'screenshots/wf-original-header.png', clip: { x: 0, y: 0, width: 1440, height: 180 } });
  await page.screenshot({ path: 'screenshots/wf-original-hero.png', clip: { x: 0, y: 180, width: 1440, height: 450 } });
  await page.screenshot({ path: 'screenshots/wf-original-cards.png', clip: { x: 0, y: 630, width: 1440, height: 250 } });
  await page.screenshot({ path: 'screenshots/wf-original-promo.png', clip: { x: 0, y: 880, width: 1440, height: 500 } });

  // Get total page height for more sections
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total page height:', totalHeight);

  if (totalHeight > 1400) {
    await page.screenshot({ path: 'screenshots/wf-original-guidance.png', clip: { x: 0, y: 1380, width: 1440, height: 600 } });
  }
  if (totalHeight > 2000) {
    await page.screenshot({ path: 'screenshots/wf-original-fargo.png', clip: { x: 0, y: 1980, width: 1440, height: 500 } });
  }
  if (totalHeight > 2500) {
    await page.screenshot({ path: 'screenshots/wf-original-community.png', clip: { x: 0, y: 2480, width: 1440, height: 600 } });
  }
  if (totalHeight > 3000) {
    await page.screenshot({ path: 'screenshots/wf-original-footer.png', clip: { x: 0, y: 3080, width: 1440, height: Math.min(800, totalHeight - 3080) } });
  }

  // Now screenshot our clone
  console.log('Taking clone screenshots...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'screenshots/clone-full.png', fullPage: true });
  await page.screenshot({ path: 'screenshots/clone-header.png', clip: { x: 0, y: 0, width: 1440, height: 180 } });
  await page.screenshot({ path: 'screenshots/clone-hero.png', clip: { x: 0, y: 180, width: 1440, height: 450 } });

  const cloneHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Clone page height:', cloneHeight);

  await browser.close();
  console.log('Done! Screenshots saved to screenshots/');
}

takeScreenshots().catch(e => { console.error(e); process.exit(1); });
