import { env } from '../config/env';
import { logger } from '../config/logger';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path) {
    const pageUrl = env.BASE_URL + path;
    logger.info(`Page URL - ${pageUrl}`);
    await this.page.goto(pageUrl, { waitUntil: 'load' });
    return this.page;
  }

  async getPageUrl() {
    const pageUrl = await this.page.url();
    logger.debug(`Page URL - ${pageUrl}`);
    return pageUrl;
  }

  async getPageTitle() {
    const pageTitle = await this.page.title();
    logger.debug(`Page title - ${pageTitle}`);
    return pageTitle;
  }

  async getElementContent(selector) {
    return await (await this.page.textContent(selector)).trim();
  }

  async getElementAttribute(selector, attr) {
    return await this.page.getAttribute(selector, attr);
  }

  async isChecked(selector) {
    return await this.page.isChecked(selector);
  }

  async waitForSelector(selector, state) {
    return await this.page.waitForSelector(selector, { state });
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async uploadFile(selector, path) {
    await this.page.setInputFiles(selector, path);
  }

  async hoverToElement(selector) {
    await this.page.hover(selector);
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    logger.debug(`Page header - ${header}`);
    return header;
  }

  async getSubHeaderText() {
    const subHeader = await this.getElementContent(this.subheader);
    logger.debug(`Page subheader - ${subHeader}`);
    return subHeader;
  }
}

module.exports = {
  BasePage,
};
