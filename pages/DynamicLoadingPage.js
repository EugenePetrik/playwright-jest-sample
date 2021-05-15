import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class DynamicLoadingPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
    this.subheader = 'css=h4';
    this.startButton = 'button:text("Start")';
    this.loading = 'css=#loading';
    this.finishText = 'css=#finish h4';
  }

  async clickOnStartButton() {
    logger.debug('Click on the [Start] button on the Dynamic Loading page');
    await this.page.click(this.startButton);
  }

  async isLoadingHidden() {
    logger.debug('Wait until loading element is hidden on the Dynamic Loading page');
    return await this.page.waitForSelector(this.loading, { state: 'hidden' });
  }

  async getFinishText() {
    const text = await this.getElementContent(this.finishText);
    logger.debug(`Finish text is ${text.trim()} on the Dynamic Loading page`);
    return text.trim();
  }
}

module.exports = {
  DynamicLoadingPage,
};
