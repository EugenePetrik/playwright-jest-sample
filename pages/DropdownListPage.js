import { BasePage } from './BasePage';

class DropdownListPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'h3';
    this.dropdown = '#dropdown';
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async selectOptionWith(option) {
    const selectElement = await this.page.$(this.dropdown);
    await selectElement.type(option);
  }

  getDropdownSelector(index) {
    return `//select[@id="dropdown"]/option[${index}]`;
  }

  async isOptionSelected(index) {
    return await this.page.$eval(this.getDropdownSelector(index), element => element.selected);
  }

  async getOptionText(index) {
    const text = await this.getElementContent(this.getDropdownSelector(index));
    return text.trim();
  }
}

module.exports = {
  DropdownListPage,
};
