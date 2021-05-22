import { DropdownListPage } from '../pages/DropdownListPage';
import browser from '../config/browser';

describe('Dropdown list page', function () {
  let dropdownListPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    dropdownListPage = new DropdownListPage(page);
    await dropdownListPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await dropdownListPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await dropdownListPage.getHeaderText();
    expect(pageHeader).toEqual('Dropdown List');
  });

  test('should have first option selected by default', async function () {
    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(1);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(1);
    expect(dropdownOptionText).toEqual('Please select an option');
  });

  test('should have second option selected', async function () {
    await dropdownListPage.selectOptionWith('Option 1');

    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(2);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(2);
    expect(dropdownOptionText).toEqual('Option 1');
  });

  test('should have third option selected', async function () {
    await dropdownListPage.selectOptionWith('Option 2');

    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(3);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(3);
    expect(dropdownOptionText).toEqual('Option 2');
  });
});
