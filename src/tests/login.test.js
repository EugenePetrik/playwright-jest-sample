import faker from 'faker';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';
import { roles } from '../data/roles';
import browser from '../config/browser';

describe('Login page', function () {
  let loginPage, securePage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page);
    await loginPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await loginPage.getHeaderText();
    expect(pageHeader).toEqual('Login Page');
  });

  test('user should login with valid credentials', async function () {
    await loginPage.signInAs(roles.adminUser);

    const pageUrl = await securePage.getPageUrl();
    expect(pageUrl).toContain('/secure');

    const pageTitle = await securePage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await loginPage.getHeaderText();
    expect(pageHeader).toEqual('Secure Area');

    const successMessage = await securePage.getSuccessMessage();
    expect(successMessage).toBe('You logged into a secure area!');
  });

  test('user should logout from the system', async function () {
    await loginPage.signInAs(roles.adminUser);

    await securePage.clickOnLogoutButton();

    const pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toContain('/login');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toBe('You logged out of the secure area!');
  });

  const negativeTestData = [
    {
      testName: 'user should get an error when logging in with invalid username',
      userData: {
        username: faker.name.firstName(),
        password: roles.adminUser.password,
      },
      expectedErrorMessage: 'Your username is invalid!',
    },
    {
      testName: 'user should get an error when logging in with a non-existent user',
      userData: roles.fakeUser,
      expectedErrorMessage: 'Your username is invalid!',
    },
    {
      testName: 'user should get an error when logging in with invalid password',
      userData: {
        username: roles.adminUser.username,
        password: faker.internet.password(),
      },
      expectedErrorMessage: 'Your password is invalid!',
    },
    {
      testName: 'user should get an error when logging in with empty username and password',
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
      expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
  });
});
