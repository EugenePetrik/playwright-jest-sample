import { BasePage } from './BasePage';

class CheckboxesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
  }

  getCheckboxSelector(index) {
    return `//*[@id='checkboxes']/input[${index}]`;
  }

  async clickOnCheckbox(index) {
    await this.page.click(this.getCheckboxSelector(index));
  }

  async isCheckboxChecked(index) {
    // return await this.page.$eval(`//*[@id='checkboxes']/input[${index}]`, element => element.checked);
    return await this.page.isChecked(this.getCheckboxSelector(index));
  }
}

module.exports = {
  CheckboxesPage,
};
