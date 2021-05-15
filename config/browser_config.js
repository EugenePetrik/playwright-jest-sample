import { chromium, webkit, firefox, devices } from 'playwright';
import { CONFIG } from './env';
import { logger } from './logger_config.js';
import chalk from 'chalk';

const browserName = CONFIG.BROWSER_NAME;
const deviceName = CONFIG.DEVICE_NAME;
const width = CONFIG.VIEWPORT_WIDTH;
const height = CONFIG.VIEWPORT_HEIGHT;
const isNetworkSubscriptionEnabled = CONFIG.NETWORK_SUBSCRIPTION;
const headless = CONFIG.HEADLESS;
const devtools = CONFIG.DEVTOOLS;
const slowMo = CONFIG.SLOW_MO;
const defaultViewport = CONFIG.VIEWPORT;

let browser, context, page;

export async function goto(path) {
  const pageUrl = CONFIG.THE_INTERNET_URL + path;
  logger.info(`Open page - ${pageUrl}`);
  await page.goto(pageUrl, { waitUntil: 'load' });
  return page;
}

export async function run(viewport = defaultViewport) {
  browser = await { chromium, webkit, firefox }[browserName].launch({
    headless,
    devtools,
    slowMo,
  });

  logger.info(`Current browser - ${browserName}`);
  logger.info(`Current viewport - ${viewport}`);

  switch (viewport) {
    case 'desktop':
      context = await browser.newContext({
        viewport: {
          width,
          height,
        },
      });
      page = await context.newPage();
      break;
    case 'mobile':
      logger.info(`Device - ${deviceName}`);
      context = await browser.newContext({
        ...devices[deviceName],
      });
      page = await context.newPage();
      break;
    default:
      throw new Error('[ERROR] Please, select the browser viewport');
  }

  if (isNetworkSubscriptionEnabled) {
    page.on('request', request => logger.debug(chalk.green('>>', request.method(), request.url())));
    page.on('response', response => logger.debug(chalk.green('<<', response.status(), response.url())));
  }
}

export async function stop() {
  await page.close();
  await context.close();
  await browser.close();
}
