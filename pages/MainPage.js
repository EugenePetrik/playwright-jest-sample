import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h1.heading';
    this.links = 'css=li a';
    this.footer = 'css=#page-footer';
  }

  async open() {
    logger.info('Open the Main page');
    await super.open('/');
  }

  async getLinks() {
    const linkText = await this.page.$$eval(this.links, links => links.map(link => link.innerText.trim()));
    logger.debug(`Link text is ${linkText.join(', ')} on the Main page`);
    return linkText;
  }

  async getFooterText() {
    const footer = await this.getElementContent(this.footer);
    logger.debug(`Footer text is ${footer} on the Main page`);
    return footer;
  }
}

module.exports = {
  MainPage,
};
