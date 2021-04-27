import { beforeEach, afterEach, describe, test, expect } from '@jest/globals';
import playwrigth from 'playwright';

describe('Login Page', function () {
  let browser, context, page;

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
    await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'load' });
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type=submit]:visible');

    const pageUrl = await page.url();
    expect(pageUrl).toEqual('https://the-internet.herokuapp.com/secure');

    const successMessage = await page.textContent('#flash.success');
    expect(successMessage).toContain('You logged into a secure area!');
  });

  test('user should get an error when login with invalid username', async function () {
    await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'load' });
    await page.fill('#username', 'username');
    await page.fill('#password', 'SuperSecretPassword!!!');
    await page.click('button[type=submit]:visible');

    const pageUrl = await page.url();
    expect(pageUrl).toEqual('https://the-internet.herokuapp.com/login');

    const errorMessage = await page.textContent('#flash.error');
    expect(errorMessage).toContain('Your username is invalid!');
  });

  test('user should get an error when login with invalid password', async function () {
    await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'load' });
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'password');
    await page.click('button[type=submit]:visible');

    const pageUrl = await page.url();
    expect(pageUrl).toEqual('https://the-internet.herokuapp.com/login');

    const errorMessage = await page.textContent('#flash.error');
    expect(errorMessage).toContain('Your password is invalid!');
  });

  test('user should logout from the system', async function () {
    await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'load' });
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type=submit]:visible');

    await page.waitForSelector('a.button', { state: 'visible' });
    await page.click('a.button');

    const pageUrl = await page.url();
    expect(pageUrl).toEqual('https://the-internet.herokuapp.com/login');

    const successMessage = await page.textContent('#flash.success');
    expect(successMessage).toContain('You logged out of the secure area!');
  });
});
