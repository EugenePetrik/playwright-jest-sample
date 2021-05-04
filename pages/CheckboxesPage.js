import { BasePage } from './BasePage';

class CheckboxesPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h3';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async clickOnCheckbox(index) {
    await this.page.click(`//*[@id="checkboxes"]/input[${index}]`, { timeout: 3000 });
  }

  async isCheckboxChecked(index) {
    // return await this.page.$eval(`//*[@id="checkboxes"]/input[${index}]`, element => element.checked);
    return await this.page.isChecked(`//*[@id="checkboxes"]/input[${index}]`, { timeout: 3000 });
  }
}

module.exports = {
  CheckboxesPage,
};
