import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class HoversPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
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
    await this.page.hover(this.getUserAvatar(index));
  }

  async isUserInfoSectionVisible(index) {
    const isUserInfoVisible = await this.page.isVisible(this.getUserInfoSection(index));
    logger.debug(`User info is ${isUserInfoVisible ? 'visible' : 'invisible'} for ${index} avatar on the Hover page`);
    return isUserInfoVisible;
  }

  async getUserData(index) {
    const userData = {
      avatar: await this.page.$eval(this.getUserAvatar(index), element => element.src),
      name: await this.getElementContent(this.getUserName(index)),
      profile: await this.page.$eval(this.getUserProfileLink(index), element => element.href),
    };
    logger.debug(`User info for avatar ${index} is ${JSON.stringify(userData)} on the Hovers page`);
    return userData;
  }
}

module.exports = {
  HoversPage,
};
