import { BasePage } from './BasePage';

class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h1.heading';
    this.links = 'li a';
    this.footer = '#page-footer';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async getLinks() {
    return await this.page.$$eval(this.links, links => links.map(link => link.innerText.trim()));
  }

  async getFooterText() {
    const footer = await this.getElementContent(this.footer);
    return footer.trim();
  }
}

module.exports = {
  MainPage,
};
