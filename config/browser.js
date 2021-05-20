import { chromium, webkit, firefox, devices } from 'playwright';
import { env } from './env';
import { logger } from './logger';
import chalk from 'chalk';

class Browser {
  constructor() {
    this.browserName = env.BROWSER_NAME;
    this.deviceName = env.DEVICE_NAME;
    this.width = env.VIEWPORT_WIDTH;
    this.height = env.VIEWPORT_HEIGHT;
    this.isNetworkSubscriptionEnabled = env.NETWORK_SUBSCRIPTION;
    this.headless = env.HEADLESS;
    this.devtools = env.DEVTOOLS;
    this.slowMo = env.SLOW_MO;
    this.defaultViewport = env.VIEWPORT;

    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    this.browser = await { chromium, webkit, firefox }[this.browserName].launch({
      headless: this.headless,
      devtools: this.devtools,
      slowMo: this.slowMo,
    });

    logger.info(`Browser name - ${this.browserName}`);

    return this.browser;
  }

  async openBrowserContext(viewport = this.defaultViewport) {
    logger.info(`Current viewport - ${viewport}`);

    switch (viewport) {
      case 'desktop':
        logger.info(`Browser width - ${this.width}, browser height - ${this.height}`);
        this.context = await this.browser.newContext({
          viewport: {
            width: this.width,
            height: this.height,
          },
        });
        break;
      case 'mobile':
        logger.info(`Device - ${this.deviceName}`);
        this.context = await this.browser.newContext({
          ...devices[this.deviceName],
        });
        break;
      default:
        throw new Error('[ERROR] Please, select the browser viewport');
    }

    if (this.isNetworkSubscriptionEnabled) {
      page.on('request', request => logger.debug(chalk.green('>>', request.method(), request.url())));
      page.on('response', response => logger.debug(chalk.green('<<', response.status(), response.url())));
    }

    return this.context;
  }

  async openPage() {
    this.page = await this.context.newPage();
    return this.page;
  }

  async closePage() {
    this.page = await this.page.close();
    return this.page;
  }

  async closeBrowserContext() {
    this.context = await this.context.close();
    return this.context;
  }

  async closeBrowser() {
    this.browser = await this.browser.close();
    return this.browser;
  }
}

export default new Browser();
