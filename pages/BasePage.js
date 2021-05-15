import { logger } from '../config/logger_config';

class BasePage {
  constructor(page) {
    this.page = page;
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

  async getElementContent(element) {
    return await this.page.textContent(element);
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    logger.debug(`Page header - ${header.trim()}`);
    return header.trim();
  }

  async getSubHeaderText() {
    const subHeader = await this.getElementContent(this.subheader);
    logger.debug(`Page subheader - ${subHeader.trim()}`);
    return subHeader.trim();
  }
}

module.exports = {
  BasePage,
};
