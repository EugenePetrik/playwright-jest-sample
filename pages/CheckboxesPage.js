import { BasePage } from './BasePage';
import { logger } from '../config/logger_config';

class CheckboxesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  getCheckboxSelector(index) {
    return `xpath=//*[@id='checkboxes']/input[${index}]`;
  }

  async clickOnCheckbox(index) {
    logger.debug(`Click on checkbox ${index} on the Checkboxes page`);
    await this.page.click(this.getCheckboxSelector(index));
  }

  async isCheckboxChecked(index) {
    // return await this.page.$eval(`//*[@id='checkboxes']/input[${index}]`, element => element.checked);
    const isChecked = await this.page.isChecked(this.getCheckboxSelector(index));
    logger.debug(`Checkbox ${index} is ${isChecked ? 'checked' : 'unchecked'} on the Checkboxes page`);
    return isChecked;
  }
}

module.exports = {
  CheckboxesPage,
};
