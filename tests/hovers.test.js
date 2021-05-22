import { HoversPage } from '../pages/HoversPage';
import browser from '../config/browser';

describe('Hovers page', function () {
  let hoversPage;

  beforeAll(async function () {
    await browser.openBrowser();
    await browser.openBrowserContext();
  });

  beforeEach(async function () {
    const page = await browser.openPage();
    hoversPage = new HoversPage(page);
    await hoversPage.open();
  });

  afterEach(async function () {
    await browser.closePage();
  });

  afterAll(async function () {
    await browser.closeBrowserContext();
    await browser.closeBrowser();
  });

  test('should open the page', async function () {
    const pageTitle = await hoversPage.getPageTitle();
    expect(pageTitle).toEqual('The Internet');

    const pageHeader = await hoversPage.getHeaderText();
    expect(pageHeader).toEqual('Hovers');
  });

  test('should hover to third user avatar', async function () {
    await hoversPage.hoverToAvatar(3);

    const isHovered = await hoversPage.isUserInfoSectionVisible(3);
    expect(isHovered).toBe(true);

    const userData = await hoversPage.getUserData(3);
    expect(userData).toEqual({
      avatar: '/img/avatar-blank.jpg',
      name: 'name: user3',
      profile: '/users/3',
    });
  });
});
