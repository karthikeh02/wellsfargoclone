import puppeteer from 'puppeteer';

async function grab() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://www.wellsfargo.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Scroll to load deferred images
  await page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 400) {
      window.scrollTo(0, i);
      await new Promise(r => setTimeout(r, 200));
    }
  });
  await new Promise(r => setTimeout(r, 3000));

  // Get all image URLs
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({ src: img.src, alt: img.alt, width: img.naturalWidth })).filter(i => i.src && i.width > 100);
  });

  console.log('=== All loaded images ===');
  images.forEach(i => console.log(`${i.width}px - ${i.alt || 'no alt'} - ${i.src}`));

  // Get deferred-src images that loaded
  const deferred = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[data-deferred-src]'));
    return imgs.map(img => ({ src: img.src, deferredSrc: img.getAttribute('data-deferred-src'), alt: img.alt }));
  });

  console.log('\n=== Deferred images ===');
  deferred.forEach(i => console.log(`${i.alt || 'no alt'} - loaded: ${i.src} - deferred: ${i.deferredSrc}`));

  await browser.close();
}

grab().catch(e => { console.error(e); process.exit(1); });
