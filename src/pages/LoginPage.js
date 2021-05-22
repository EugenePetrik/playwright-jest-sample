import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h2';
    this.usernameInput = 'css=#username';
    this.passwordInput = 'css=#password';
    this.loginButton = 'button[type=submit]:visible';
    this.successMessage = 'css=#flash.success';
    this.errorMessage = 'css=#flash.error';
  }

  async open() {
    logger.info('Open the Login page');
    await super.open('/login');
  }

  async signInAs({ username, password }) {
    logger.debug(`Login with username - ${username} and password - ${password}`);
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getSuccessMessage() {
    const text = await (await this.getElementContent(this.successMessage)).match(/^.*!/g)[0];
    logger.debug(`Success message is ${text} on the Login page`);
    return text;
  }

  async getErrorMessage() {
    const text = await (await this.getElementContent(this.errorMessage)).match(/^.*!/g)[0];
    logger.debug(`Error message is ${text} on the Login page`);
    return text;
  }
}

module.exports = {
  LoginPage,
};
