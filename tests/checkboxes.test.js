import { CheckboxesPage } from '../pages/CheckboxesPage';
import browser from '../config/browser';

describe('Checkboxes page', function () {
  let checkboxesPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await checkboxesPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await checkboxesPage.getHeaderText();
    expect(pageHeader).toEqual('Checkboxes');
  });

  test('should have first checkbox unchecked by default', async function () {
    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(1);
    expect(isCheckboxChecked).toBe(false);
  });

  test('should have second checkbox checked by default', async function () {
    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(2);
    expect(isCheckboxChecked).toBe(true);
  });

  test('should have first checkbox checked', async function () {
    await checkboxesPage.clickOnCheckbox(1);

    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(1);
    expect(isCheckboxChecked).toBe(true);
  });

  test('should have second checkbox unchecked', async function () {
    await checkboxesPage.clickOnCheckbox(2);

    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(2);
    expect(isCheckboxChecked).toBe(false);
  });
});
