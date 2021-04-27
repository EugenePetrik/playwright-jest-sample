import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import playwrigth from 'playwright';
import faker from 'faker';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';
import { roles } from '../data/roles';

describe('Login Page', function () {
  let browser, context, page;
  let loginPage, securePage;

  beforeEach(async function () {
    browser = await playwrigth.chromium.launch({
      headless: false,
      slowMo: 500,
      devtools: false,
    });

    context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(function () {
    page.close();
    context.close();
    browser.close();
  });

  test('user should login with valid credentials', async function () {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.signInAs(roles.admin);

    securePage = new SecurePage(page);

    const pageUrl = await securePage.getPageUrl();
    expect(pageUrl).toContain('/secure');

    const pageTitle = await securePage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await securePage.getSuccessMessage();
    expect(successMessage).toContain('You logged into a secure area!');
  });

  test('user should get an error when login with invalid username', async function () {
    const adminWithInvalidUsername = {
      username: faker.name.firstName(),
      password: roles.admin.password,
    };

    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.signInAs(adminWithInvalidUsername);

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await loginPage.getErrorMessage();
    expect(successMessage).toContain('Your username is invalid!');
  });

  test('user should get an error when logging in with a non-existent user', async function () {
    loginPage = new LoginPage(page);

    await loginPage.open();
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

    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.signInAs(adminWithInvalidPassword);

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const successMessage = await loginPage.getErrorMessage();
    expect(successMessage).toContain('Your password is invalid!');
  });

  test('user should logout from the system', async function () {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.signInAs(roles.admin);

    securePage = new SecurePage(page);

    await securePage.clickOnLogoutButton();

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toContain('You logged out of the secure area!');
  });
});
