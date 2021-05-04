import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { goto, run, stop } from '../utils/browser';

describe('Checkboxes page', function () {
  let page, checkboxesPage;

  beforeEach(async function () {
    await run();
    page = await goto('/checkboxes');
    checkboxesPage = new CheckboxesPage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should have header', async function () {
    const pageTitle = await checkboxesPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await checkboxesPage.getHeaderText();
    expect(pageHeader).toEqual('Checkboxes');
  });

  test('should have first checkbox unchecked by default', async function () {
    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(1);
    expect(isCheckboxChecked).toBe(false);
  });

  test('should have second checkbox checked by default', async function () {
    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(2);
    expect(isCheckboxChecked).toBe(true);
  });

  test('should have first checkbox checked', async function () {
    await checkboxesPage.clickOnCheckbox(1);

    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(1);
    expect(isCheckboxChecked).toBe(true);
  });

  test('should have second checkbox unchecked', async function () {
    await checkboxesPage.clickOnCheckbox(2);

    const isCheckboxChecked = await checkboxesPage.isCheckboxChecked(2);
    expect(isCheckboxChecked).toBe(false);
  });
});
