import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class BrokenImagesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  async open() {
    logger.debug('Open the Broken Images page');
    await super.open('/broken_images');
  }

  getImageSelector(index) {
    return `xpath=//div[@class='example']/img[${index}]`;
  }

  async getImageSrcForAvatar(index) {
    // await this.page.evaluate(element => element.value, await this.page.$('input'));
    // await this.page.evaluate(() => document.querySelector('input').getAttribute('value'));
    // await this.page.$eval(this.getImageSelector(index), element => element.src);
    const imageSrcAttr = await this.getElementAttribute(this.getImageSelector(index), 'src');
    logger.debug(`Image ${index} has src ${imageSrcAttr} on the Broken Images page`);
    return imageSrcAttr;
  }
}

module.exports = {
  BrokenImagesPage,
};
