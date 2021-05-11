import { BasePage } from './BasePage';

class SecurePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h2';
    this.successMessage = 'css=#flash.success';
    this.logoutButton = 'css=a.button:visible';
  }

  async getSuccessMessage() {
    const text = await this.getElementContent(this.successMessage);
    return text.trim().match(/^.*!/g)[0];
  }

  async clickOnLogoutButton() {
    await this.page.click(this.logoutButton);
  }
}

module.exports = {
  SecurePage,
};
