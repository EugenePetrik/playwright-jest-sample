import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class SecurePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h2';
    this.successMessage = 'css=#flash.success';
    this.logoutButton = 'css=a.button:visible';
  }

  async getSuccessMessage() {
    const text = await (await this.getElementContent(this.successMessage)).trim().match(/^.*!/g)[0];
    logger.debug(`Success message is ${text} on the Secure page`);
    return text;
  }

  async clickOnLogoutButton() {
    logger.debug('Click on the [Log out] button on the Secure page');
    await this.page.click(this.logoutButton);
  }
}

module.exports = {
  SecurePage,
};
