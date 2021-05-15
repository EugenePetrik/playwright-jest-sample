import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h1.heading';
    this.links = 'css=li a';
    this.footer = 'css=#page-footer';
  }

  async getLinks() {
    const linkText = await this.page.$$eval(this.links, links => links.map(link => link.innerText.trim()));
    logger.debug(`Link text is ${linkText} on the Main page`);
    return linkText;
  }

  async getFooterText() {
    const footer = await this.getElementContent(this.footer);
    logger.debug(`Footer text is ${footer.trim()} on the Main page`);
    return footer.trim();
  }
}

module.exports = {
  MainPage,
};
