import { BasePage } from './BasePage';

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
    await this.page.click(this.startButton);
  }

  async isLoadingHidden() {
    return await this.page.waitForSelector(this.loading, { state: 'hidden' });
  }

  async getFinishText() {
    const text = await this.getElementContent(this.finishText);
    return text.trim();
  }
}

module.exports = {
  DynamicLoadingPage,
};
