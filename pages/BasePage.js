class BasePage {
  constructor(page) {
    this.page = page;
  }

  async getPageUrl() {
    return await this.page.url();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getElementContent(element) {
    return await this.page.textContent(element);
  }

  async getHeaderText() {
    const header = await this.getElementContent(this.header);
    return header.trim();
  }

  async getSubHeaderText() {
    const subHeader = await this.getElementContent(this.subheader);
    return subHeader.trim();
  }
}

module.exports = {
  BasePage,
};
