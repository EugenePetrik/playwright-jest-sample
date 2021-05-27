import { chromium, webkit, firefox, devices } from 'playwright';
import { env } from './env';
import { logger } from './logger';

class Browser {
  browser = null;
  context = null;
  page = null;

  async openBrowser() {
    this.browser = await { chromium, webkit, firefox }[env.BROWSER_NAME].launch({
      headless: env.HEADLESS,
      devtools: env.DEVTOOLS,
      slowMo: env.SLOW_MO,
    });
    logger.debug(`Browser name - ${env.BROWSER_NAME}`);
    return this.browser;
  }

  async openBrowserContext(viewport = env.VIEWPORT) {
    logger.debug(`Current viewport - ${viewport}`);
    switch (viewport) {
      case 'desktop':
        logger.debug(`Browser width - ${env.VIEWPORT_WIDTH}, browser height - ${env.VIEWPORT_HEIGHT}`);
        this.context = await this.browser.newContext({
          viewport: {
            width: env.VIEWPORT_WIDTH,
            height: env.VIEWPORT_HEIGHT,
          },
        });
        break;
      case 'mobile':
        logger.debug(`Device - ${env.DEVICE_NAME}`);
        this.context = await this.browser.newContext({
          ...devices[env.DEVICE_NAME],
        });
        break;
      default:
        throw new Error('[ERROR] Please, select the browser viewport');
    }

    return this.context;
  }

  async openPage() {
    this.page = await this.context.newPage();

    if (env.NETWORK_SUBSCRIPTION) {
      this.page.on('request', request => logger.debug(`>> ${request.method()} -> ${request.url()}`));
      this.page.on('response', response => logger.debug(`<< ${response.status()} -> ${response.url()}`));
    }

    return this.page;
  }

  async closePage() {
    await this.page.close();
  }

  async closeBrowserContext() {
    await this.context.close();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

export default new Browser();
