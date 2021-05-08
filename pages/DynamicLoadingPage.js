import { BasePage } from './BasePage';

class DynamicLoadingPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h3';
    this.subheader = 'h4';
    this.startButton = 'button:text("Start")';
    this.loading = '#loading';
    this.finishText = '#finish h4';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async getSubHeaderText() {
    const subHeader = await this.getElementContent(this.subheader);
    return subHeader.trim();
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
