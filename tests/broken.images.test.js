import { BrokenImagesPage } from '../pages/BrokenImagesPage';
import browser from '../config/browser';

describe('Broken Images page', function () {
  let brokenImagesPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    brokenImagesPage = new BrokenImagesPage(page);
    await brokenImagesPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await brokenImagesPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await brokenImagesPage.getHeaderText();
    expect(pageHeader).toEqual('Broken Images');
  });

  test('should have first broken image', async function () {
    const imgSrcAttr = await brokenImagesPage.getImageSrcForAvatar(1);
    expect(imgSrcAttr).toMatch(/\/asdf\.jpg$/);
  });

  test('should have second broken image', async function () {
    const imgSrcAttr = await brokenImagesPage.getImageSrcForAvatar(2);
    expect(imgSrcAttr).toMatch(/\/hjkl.jpg$/);
  });

  test('should have third valid image', async function () {
    const imgSrcAttr = await brokenImagesPage.getImageSrcForAvatar(3);
    expect(imgSrcAttr).toMatch(/\/img\/avatar-blank.jpg$/);
  });
});
