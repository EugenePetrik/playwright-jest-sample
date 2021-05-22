import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';
import browser from '../config/browser';

describe('Add Remove Elements page', function () {
  let addRemoveElementsPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    addRemoveElementsPage = new AddRemoveElementsPage(page);
    await addRemoveElementsPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await addRemoveElementsPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await addRemoveElementsPage.getHeaderText();
    expect(pageHeader).toEqual('Add/Remove Elements');
  });

  test('should add one element', async function () {
    await addRemoveElementsPage.clickOnAddElementButton();

    const removeButtons = await addRemoveElementsPage.getDeleteButtons();
    expect(removeButtons).toHaveLength(1);
  });

  test('should add 10 elements', async function () {
    await addRemoveElementsPage.clickOnAddElementButton(10);

    const removeButtons = await addRemoveElementsPage.getDeleteButtons();
    expect(removeButtons).toHaveLength(10);
  });

  test('should remove all elements', async function () {
    await addRemoveElementsPage.clickOnAddElementButton(10);

    await addRemoveElementsPage.clickOnDeleteButton();

    const removeButtons = await addRemoveElementsPage.getDeleteButtons();
    expect(removeButtons).toHaveLength(0);
  });
});
