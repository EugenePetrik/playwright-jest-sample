import { FileUploadPage } from '../pages/FileUploadPage';
import browser from '../config/browser';
import path from 'path';

describe('File Upload page', function () {
  let fileUploadPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await fileUploadPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await fileUploadPage.getHeaderText();
    expect(pageHeader).toEqual('File Uploader');
  });

  test('should upload file', async function () {
    const imagePath = path.resolve(path.join('.', 'src', 'fixtures', 'dogs-image.jpg'));

    await fileUploadPage.uploadFile(imagePath);
    await fileUploadPage.clickOnUploadButton();

    const pageHeader = await fileUploadPage.getHeaderText();
    expect(pageHeader).toEqual('File Uploaded!');

    const fileName = await fileUploadPage.getUploadedFileName();
    expect(fileName).toBe('dogs-image.jpg');
  });
});
