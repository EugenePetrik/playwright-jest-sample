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
}

module.exports = {
  BasePage,
};
