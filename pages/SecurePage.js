import { BasePage } from './BasePage';

class SecurePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.successMessage = '#flash.success';
    this.logoutButton = 'a.button:visible';
  }

  async getSuccessMessage() {
    const text = await this.getElementContent(this.successMessage);
    return text.trim();
  }

  async clickOnLogoutButton() {
    await this.page.click(this.logoutButton);
  }
}

module.exports = {
  SecurePage,
};
