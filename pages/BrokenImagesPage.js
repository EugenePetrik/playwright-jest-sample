import { BasePage } from './BasePage';

class BrokenImagesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  getImageSelector(index) {
    return `//div[@class='example']/img[${index}]`;
  }

  async getImageSrcForAvatar(index) {
    // await this.page.evaluate(element => element.value, await this.page.$('input'));
    // await this.page.evaluate(() => document.querySelector('input').getAttribute('value'));
    return await this.page.$eval(this.getImageSelector(index), element => element.src);
  }
}

module.exports = {
  BrokenImagesPage,
};
