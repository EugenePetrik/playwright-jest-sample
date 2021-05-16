import { HoversPage } from '../pages/HoversPage';
import { goto, run, stop } from '../config/browser_config';

describe('Hovers page', function () {
  let page, hoversPage;

  beforeEach(async function () {
    await run();
    page = await goto('/hovers');
    hoversPage = new HoversPage(page);
  });

  afterEach(async function () {
    await stop();
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
      avatar: 'https://the-internet.herokuapp.com/img/avatar-blank.jpg',
      name: 'name: user3',
      profile: 'https://the-internet.herokuapp.com/users/3',
    });
  });
});
