import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';
import { goto, run, stop } from '../utils/browser';

describe('Add Remove Elements page', function () {
  let page, dynamicLoadingPage;

  beforeEach(async function () {
    await run();
    page = await goto('/dynamic_loading/1');
    dynamicLoadingPage = new DynamicLoadingPage(page);
  });

  afterEach(async function () {
    await stop();
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
