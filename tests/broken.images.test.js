import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { BrokenImagesPage } from '../pages/BrokenImagesPage';
import { goto, run, stop } from '../utils/browser';

describe('Broken Images page', function () {
  let page, brokenImagesPage;

  beforeEach(async function () {
    await run();
    page = await goto('/broken_images');
    brokenImagesPage = new BrokenImagesPage(page);
  });

  afterEach(async function () {
    await stop();
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
