import { BasePage } from './BasePage';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passswordInput = '#password';
    this.loginButton = 'button[type=submit]:visible';
    this.successMessage = '#flash.success';
    this.errorMessage = '#flash.error';
  }

  async signInAs({ username, password }) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passswordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    const text = await this.getElementContent(this.errorMessage);
    return text.trim();
  }

  async getSuccessMessage() {
    const text = await this.getElementContent(this.successMessage);
    return text.trim();
  }
}

module.exports = {
  LoginPage,
};
