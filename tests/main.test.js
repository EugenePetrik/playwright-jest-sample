import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { MainPage } from '../pages/MainPage';
import { goto, run, stop } from '../utils/browser';

describe('Main page', function () {
  let page, mainPage;

  beforeEach(async function () {
    await run();
    page = await goto('/');
    mainPage = new MainPage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should have header', async function () {
    const pageTitle = await mainPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const header = await mainPage.getHeaderText();
    expect(header).toEqual('Welcome to the-internet');
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
