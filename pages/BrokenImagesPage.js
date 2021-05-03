import { BasePage } from './BasePage';

class BrokenImagesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h3';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async getImageSrcForAvatar(index) {
    // await this.page.evaluate(element => element.value, await this.page.$('input'));
    // await this.page.evaluate(() => document.querySelector('input').getAttribute('value'));
    return await this.page.$eval(`//div[@class="example"]/img[${index}]`, element => element.src);
  }
}

module.exports = {
  BrokenImagesPage,
};
