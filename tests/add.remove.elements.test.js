import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';
import { goto, run, stop } from '../utils/browser';

describe('Add Remove Elements page', function () {
  let page, addRemoveElementsPage;

  beforeEach(async function () {
    await run();
    page = await goto('/add_remove_elements/');
    addRemoveElementsPage = new AddRemoveElementsPage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should open the page', async function () {
    const pageTitle = await addRemoveElementsPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await addRemoveElementsPage.getHeaderText();
    expect(pageHeader).toEqual('Add/Remove Elements');
  });

  test('should add one element', async function () {
    await addRemoveElementsPage.clickOnAddElementButton();

    const removeButtons = await addRemoveElementsPage.getDeleteButtonsLength();
    expect(removeButtons).toHaveLength(1);
  });

  test('should add 10 elements', async function () {
    await addRemoveElementsPage.clickOnAddElementButton(10);

    const removeButtons = await addRemoveElementsPage.getDeleteButtonsLength();
    expect(removeButtons).toHaveLength(10);
  });

  test('should remove all elements', async function () {
    await addRemoveElementsPage.clickOnAddElementButton(10);

    await addRemoveElementsPage.clickOnDeleteButton();

    const removeButtons = await addRemoveElementsPage.getDeleteButtonsLength();
    expect(removeButtons).toHaveLength(0);
  });
});
