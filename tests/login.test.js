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

  test('user should get an error when login with invalid username', async function () {
    const adminWithInvalidUsername = {
      username: faker.name.firstName(),
      password: roles.admin.password,
    };

    const pageHeader = await loginPage.getHeaderText();
    expect(pageHeader).toEqual('Login Page');

    await loginPage.signInAs(adminWithInvalidUsername);

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await loginPage.getErrorMessage();
    expect(successMessage).toContain('Your username is invalid!');
  });

  test('user should get an error when logging in with a non-existent user', async function () {
    await loginPage.signInAs(roles.fakeUser);

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await loginPage.getErrorMessage();
    expect(successMessage).toContain('Your username is invalid!');
  });

  test('user should get an error when login with invalid password', async function () {
    const adminWithInvalidPassword = {
      username: roles.admin.username,
      password: faker.internet.password(),
    };

    await loginPage.signInAs(adminWithInvalidPassword);

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await loginPage.getErrorMessage();
    expect(successMessage).toContain('Your password is invalid!');
  });

  test('user should logout from the system', async function () {
    await loginPage.signInAs(roles.admin);

    await securePage.clickOnLogoutButton();

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toContain('You logged out of the secure area!');
  });
});
