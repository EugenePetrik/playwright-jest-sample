import { BasePage } from './BasePage';

class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h1.heading';
    this.links = 'css=li a';
    this.footer = 'css=#page-footer';
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
