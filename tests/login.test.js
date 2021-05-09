import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import faker from 'faker';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';
import { roles } from '../data/roles';
import { goto, run, stop } from '../utils/browser';

describe('Login page', function () {
  let page, loginPage, securePage;

  beforeEach(async function () {
    await run();
    page = await goto('/login');
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page);
  });

  afterEach(async function () {
    await stop();
  });

  test('should open the page', async function () {
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await loginPage.getHeaderText();
    expect(pageHeader).toEqual('Login Page');
  });

  test('user should login with valid credentials', async function () {
    await loginPage.signInAs(roles.admin);

    const pageUrl = await securePage.getPageUrl();
    expect(pageUrl).toContain('/secure');

    const pageTitle = await securePage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await loginPage.getHeaderText();
    expect(pageHeader).toEqual('Secure Area');

    const successMessage = await securePage.getSuccessMessage();
    expect(successMessage).toContain('You logged into a secure area!');
  });

  test('user should logout from the system', async function () {
    await loginPage.signInAs(roles.admin);

    await securePage.clickOnLogoutButton();

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toContain('You logged out of the secure area!');
  });

  const negativeTestData = [
    {
      testName: 'user should get an error when login with invalid username',
      userData: {
        username: faker.name.firstName(),
        password: roles.admin.password,
      },
      expectedErrorMessage: 'Your username is invalid!',
    },
    {
      testName: 'user should get an error when logging in with a non-existent user',
      userData: roles.fakeUser,
      expectedErrorMessage: 'Your username is invalid!',
    },
    {
      testName: 'user should get an error when login with invalid password',
      userData: {
        username: roles.admin.username,
        password: faker.internet.password(),
      },
      expectedErrorMessage: 'Your password is invalid!',
    },
    {
      testName: 'user should get an error when login with empty username and password',
      userData: {
        username: '',
        password: '',
      },
      expectedErrorMessage: 'Your username is invalid!',
    },
  ];

  negativeTestData.forEach(({ testName, userData, expectedErrorMessage }) => {
    test(`${testName}`, async function () {
      await loginPage.signInAs(userData);

      const pageUrl = await loginPage.getPageUrl();
      expect(pageUrl).toContain('/login');

      const actualErrorMessage = await loginPage.getErrorMessage();
      expect(actualErrorMessage).toContain(expectedErrorMessage);
    });
  });
});
