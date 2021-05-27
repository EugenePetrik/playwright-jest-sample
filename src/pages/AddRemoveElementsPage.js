import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class AddRemoveElementsPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
    this.addElementButton = 'button:text("Add Element")';
    this.deleteButton = 'button:text("Delete")';
  }

  async open() {
    logger.debug('Open the Add Remove Elements page');
    await super.open('/add_remove_elements/');
  }

  async clickOnAddElementButton(count = 1) {
    for (let i = 0; i < count; i++) {
      logger.debug('Click on the [Add Element] button on the Add Remove Elements page');
      await this.page.click(this.addElementButton);
    }
  }

  async getDeleteButtons() {
    logger.debug('Get all [Delete] buttons on the Add Remove Elements page');
    return await this.page.$$(this.deleteButton);
  }

  async clickOnDeleteButton() {
    const buttons = await this.getDeleteButtons();

    for (let i = 0; i < buttons.length; i++) {
      logger.debug('Click on the [Delete] button on the Add Remove Elements page');
      await this.page.click(this.deleteButton);
    }
  }
}

module.exports = {
  AddRemoveElementsPage,
};
