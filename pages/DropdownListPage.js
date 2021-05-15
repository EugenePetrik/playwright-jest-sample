import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class DropdownListPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
    this.dropdown = 'css=#dropdown';
  }

  async selectOptionWith(option) {
    const selectElement = await this.page.$(this.dropdown);
    await selectElement.type(option);
    logger.debug(`Select dropdown option - ${option} on the Dropdown List page`);
  }

  getDropdownSelector(index) {
    return `xpath=//select[@id='dropdown']/option[${index}]`;
  }

  async isOptionSelected(index) {
    const isOptionSelected = await this.page.$eval(this.getDropdownSelector(index), element => element.selected);
    logger.debug(
      `Dropdown option ${index} is ${isOptionSelected ? 'selected' : 'not selected'} on the Dropdown List page`,
    );
    return isOptionSelected;
  }

  async getOptionText(index) {
    const text = await this.getElementContent(this.getDropdownSelector(index));
    logger.debug(`Dropdown option ${index} has text ${text.trim()} on the Dropdown List page`);
    return text.trim();
  }
}

module.exports = {
  DropdownListPage,
};
