import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { DropdownListPage } from '../pages/DropdownListPage';
import { goto, run, stop } from '../utils/browser';

describe('Dropdown list page', function () {
  let page, dropdownListPage;

  beforeEach(async function () {
    await run();
    page = await goto('/dropdown');
    dropdownListPage = new DropdownListPage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should open the page', async function () {
    const pageTitle = await dropdownListPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await dropdownListPage.getHeaderText();
    expect(pageHeader).toEqual('Dropdown List');
  });

  test('should have first option selected by default', async function () {
    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(1);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(1);
    expect(dropdownOptionText).toEqual('Please select an option');
  });

  test('should have second option selected', async function () {
    await dropdownListPage.selectOptionWith('Option 1');

    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(2);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(2);
    expect(dropdownOptionText).toEqual('Option 1');
  });

  test('should have third option selected', async function () {
    await dropdownListPage.selectOptionWith('Option 2');

    const isDropdownOptionSelected = await dropdownListPage.isOptionSelected(3);
    expect(isDropdownOptionSelected).toBe(true);

    const dropdownOptionText = await dropdownListPage.getOptionText(3);
    expect(dropdownOptionText).toEqual('Option 2');
  });
});
