import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class HoversPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  async open() {
    logger.debug('Open the Hovers page');
    await super.open('/hovers');
  }

  getUserAvatar(index) {
    return `xpath=(//div[@class="figure"]/img)[${index}]`;
  }

  getUserInfoSection(index) {
    return `xpath=(//div[@class="figcaption"])[${index}]`;
  }

  getUserName(index) {
    return `xpath=(//div[@class="figcaption"]/h5)[${index}]`;
  }

  getUserProfileLink(index) {
    return `xpath=(//div[@class="figcaption"]/a)[${index}]`;
  }

  async hoverToAvatar(index) {
    logger.debug(`Hover to user avatar with index ${index} on the Hover page`);
    await this.hoverToElement(this.getUserAvatar(index));
  }

  async isUserInfoSectionVisible(index) {
    const isUserInfoVisible = await this.isVisible(this.getUserInfoSection(index));
    logger.debug(`User info is ${isUserInfoVisible ? 'visible' : 'invisible'} for ${index} avatar on the Hover page`);
    return isUserInfoVisible;
  }

  async getUserData(index) {
    // const userData = {
    //   avatar: await this.page.$eval(this.getUserAvatar(index), element => element.src),
    //   name: await this.getElementContent(this.getUserName(index)),
    //   profile: await this.page.$eval(this.getUserProfileLink(index), element => element.href),
    // };

    const userData = {
      avatar: await this.getElementAttribute(this.getUserAvatar(index), 'src'),
      name: await this.getElementContent(this.getUserName(index)),
      profile: await this.getElementAttribute(this.getUserProfileLink(index), 'href'),
    };

    logger.debug(`User info for avatar ${index} is ${JSON.stringify(userData)} on the Hovers page`);
    return userData;
  }
}

module.exports = {
  HoversPage,
};
