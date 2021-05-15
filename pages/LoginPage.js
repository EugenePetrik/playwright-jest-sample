import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h2';
    this.usernameInput = 'css=#username';
    this.passswordInput = 'css=#password';
    this.loginButton = 'button[type=submit]:visible';
    this.successMessage = 'css=#flash.success';
    this.errorMessage = 'css=#flash.error';
  }

  async signInAs({ username, password }) {
    logger.debug(`Login with username - ${username} and password - ${password}`);
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passswordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    const text = await this.getElementContent(this.errorMessage);
    logger.debug(`Error message is ${text.trim().match(/^.*!/g)[0]} on the Login page`);
    return text.trim().match(/^.*!/g)[0];
  }

  async getSuccessMessage() {
    const text = await this.getElementContent(this.successMessage);
    logger.debug(`Success message is ${text.trim().match(/^.*!/g)[0]} on the Login page`);
    return text.trim().match(/^.*!/g)[0];
  }
}

module.exports = {
  LoginPage,
};
