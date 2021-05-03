import { chromium, webkit, firefox, devices } from 'playwright';
import { CONFIG } from '../config/env';

const browserName = CONFIG.BROWSER_NAME;
const deviceName = CONFIG.DEVICE_NAME;
const width = parseInt(CONFIG.VIEWPORT_WIDTH);
const height = parseInt(CONFIG.VIEWPORT_HEIGHT);
const isNetworkSubscriptionEnabled = CONFIG.NETWORK_SUBSCRIPTION == 'true';
const headless = CONFIG.HEADLESS == 'true';
const devtools = CONFIG.DEVTOOLS == 'true';
const slowMo = parseInt(CONFIG.SLOWMO);
const defaultViewport = CONFIG.VIEWPORT;

let browser, context, page;

export async function goto(path) {
  await page.goto(CONFIG.THE_INTERNET_URL + path, { waitUntil: 'load' });
  return page;
}

export async function run(viewport = defaultViewport) {
  browser = await { chromium, webkit, firefox }[browserName].launch({
    headless,
    devtools,
    slowMo,
  });

  switch (viewport) {
    case 'desktop':
      context = await browser.newContext();
      page = await context.newPage();
      await page.setViewportSize({
        width,
        height,
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

  if (isNetworkSubscriptionEnabled) {
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));
  }
}

export async function stop() {
  await page.close();
  await context.close();
  await browser.close();
}
