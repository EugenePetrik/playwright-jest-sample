import { FileUploadPage } from '../pages/FileUploadPage';
import { goto, run, stop } from '../config/browser_config';
import path from 'path';

describe('File Upload page', function () {
  let page, fileUploadPage;

  beforeEach(async function () {
    await run();
    page = await goto('/upload');
    fileUploadPage = new FileUploadPage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should open the page', async function () {
    const pageTitle = await fileUploadPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await fileUploadPage.getHeaderText();
    expect(pageHeader).toEqual('File Uploader');
  });

  test('should upload file', async function () {
    const imagePath = path.resolve(path.join('.', 'fixtures', 'dogs-image.jpg'));

    await fileUploadPage.uploadFile(imagePath);
    await fileUploadPage.clickOnUploadButton();

    const pageHeader = await fileUploadPage.getHeaderText();
    expect(pageHeader).toEqual('File Uploaded!');

    const fileName = await fileUploadPage.getUploadedFileName();
    expect(fileName).toBe('dogs-image.jpg');
  });
});
