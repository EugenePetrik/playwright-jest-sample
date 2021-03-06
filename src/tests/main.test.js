import { MainPage } from '../pages/MainPage';
import browser from '../config/browser';

describe('Main page', function () {
  let mainPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await mainPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await mainPage.getHeaderText();
    expect(pageHeader).toEqual('Welcome to the-internet');
  });

  test('should have available examples', async function () {
    const expectedLinks = [
      'A/B Testing',
      'Add/Remove Elements',
      'Basic Auth',
      'Broken Images',
      'Challenging DOM',
      'Checkboxes',
      'Context Menu',
      'Digest Authentication',
      'Disappearing Elements',
      'Drag and Drop',
      'Dropdown',
      'Dynamic Content',
      'Dynamic Controls',
      'Dynamic Loading',
      'Entry Ad',
      'Exit Intent',
      'File Download',
      'File Upload',
      'Floating Menu',
      'Forgot Password',
      'Form Authentication',
      'Frames',
      'Geolocation',
      'Horizontal Slider',
      'Hovers',
      'Infinite Scroll',
      'Inputs',
      'JQuery UI Menus',
      'JavaScript Alerts',
      'JavaScript onload event error',
      'Key Presses',
      'Large & Deep DOM',
      'Multiple Windows',
      'Nested Frames',
      'Notification Messages',
      'Redirect Link',
      'Secure File Download',
      'Shadow DOM',
      'Shifting Content',
      'Slow Resources',
      'Sortable Data Tables',
      'Status Codes',
      'Typos',
      'WYSIWYG Editor',
    ];

    const actualLinks = await mainPage.getLinks();
    expect(actualLinks).toEqual(expectedLinks);
  });

  test('should have footer', async function () {
    const footerText = await mainPage.getFooterText();
    expect(footerText).toEqual('Powered by Elemental Selenium');
  });
});
