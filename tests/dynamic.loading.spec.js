import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';
import browser from '../config/browser';

describe('Dynamic Loading page', function () {
  let dynamicLoadingPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    dynamicLoadingPage = new DynamicLoadingPage(page);
    await dynamicLoadingPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await dynamicLoadingPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await dynamicLoadingPage.getHeaderText();
    expect(pageHeader).toEqual('Dynamically Loaded Page Elements');

    const pageSubHeader = await dynamicLoadingPage.getSubHeaderText();
    expect(pageSubHeader).toEqual('Example 1: Element on page that is hidden');
  });

  test('should show loading and finisg text', async function () {
    await dynamicLoadingPage.clickOnStartButton();

    const isLoadingHidden = await dynamicLoadingPage.isLoadingHidden();
    expect(isLoadingHidden).toBe(null);

    const finishText = await dynamicLoadingPage.getFinishText();
    expect(finishText).toEqual('Hello World!');
  });
});
