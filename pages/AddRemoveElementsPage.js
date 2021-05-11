import { BasePage } from './BasePage';

class AddRemoveElementsPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
    this.addElementButton = 'button:text("Add Element")';
    this.deleteButton = 'button:text("Delete")';
  }

  async clickOnAddElementButton(count = 1) {
    for (let i = 0; i < count; i++) {
      await this.page.click(this.addElementButton);
    }
  }

  async getDeleteButtonsLength() {
    return await this.page.$$(this.deleteButton);
  }

  async clickOnDeleteButton() {
    const buttons = await this.getDeleteButtonsLength();

    for (let i = 0; i < buttons.length; i++) {
      await this.page.click(this.deleteButton);
    }
  }
}

module.exports = {
  AddRemoveElementsPage,
};
