import { BasePage } from './BasePage';

class SecurePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h2';
    this.successMessage = '#flash.success';
    this.logoutButton = 'a.button:visible';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
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
