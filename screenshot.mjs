import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to http://localhost:3000/results');
  await page.goto('http://localhost:3000/results', { waitUntil: 'networkidle0' });
  
  console.log('Filling out email and submitting');
  await page.type('input[type="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  
  console.log('Waiting for animation');
  // wait for fade animations
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Taking screenshot');
  await page.screenshot({ path: 'dashboard.png' });
  
  await browser.close();
  console.log('Done');
})();
