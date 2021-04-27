import { chromium, webkit, firefox, devices } from 'playwright';

const browserName = 'chromium';
const deviceName = 'iPhone X';

let browser, context, page;

export async function goto(path) {
  await page.goto('https://the-internet.herokuapp.com' + path, { waitUntil: 'load' });
  return page;
}

export async function run(viewport = 'desktop') {
  browser = await { chromium, webkit, firefox }[browserName].launch({
    headless: false,
    devtools: false,
    slowMo: 50,
  });

  switch (viewport) {
    case 'desktop':
      context = await browser.newContext();
      page = await context.newPage();
      await page.setViewportSize({
        width: 1920,
        height: 1080,
      });
      break;
    case 'mobile':
      context = await browser.newContext({
        ...devices[deviceName],
      });
      page = await context.newPage();
      break;
    default:
      throw new Error('[ERROR] Please, select the browser viewport');
  }

  // page.on('request', request => console.log('>>', request.method(), request.url()));
  // page.on('response', response => console.log('<<', response.status(), response.url()));
}

export async function stop() {
  await page.close();
  await context.close();
  await browser.close();
}
