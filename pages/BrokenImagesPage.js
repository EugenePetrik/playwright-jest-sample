import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class BrokenImagesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  getImageSelector(index) {
    return `xpath=//div[@class='example']/img[${index}]`;
  }

  async getImageSrcForAvatar(index) {
    // await this.page.evaluate(element => element.value, await this.page.$('input'));
    // await this.page.evaluate(() => document.querySelector('input').getAttribute('value'));
    const imgSrc = await this.page.$eval(this.getImageSelector(index), element => element.src);
    logger.debug(`Image ${index} has src ${imgSrc} on the Broken Images page`);
    return imgSrc;
  }
}

module.exports = {
  BrokenImagesPage,
};
