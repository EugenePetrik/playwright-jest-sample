import { bool, cleanEnv, num, str, url } from 'envalid';

export const CONFIG = cleanEnv(process.env, {
  THE_INTERNET_URL: url({
    default: 'https://the-internet.herokuapp.com',
    desc: 'App URL to be tested',
  }),
  BROWSER_NAME: str({
    default: 'chromium',
    desc: 'Web browser to be tested - chromium, firefox, or webkit',
  }),
  DEVICE_NAME: str({
    default: 'iPhone X',
    desc: 'Mobile browser to be tested - iPhone X, iPhone 11 Pro, iPhone 8, etc.',
  }),
  HEADLESS: bool({
    default: false,
    desc: 'Headless browser enabled',
  }),
  DEVTOOLS: bool({
    default: false,
    desc: 'DevTools enabled',
  }),
  SLOWMO: num({
    default: 50,
    desc: 'Emplicit wait',
  }),
  VIEWPORT: str({
    default: 'desktop',
    desc: 'Browser viewport to be tested - desktop or mobile',
  }),
  VIEWPORT_WIDTH: num({
    default: 1920,
    desc: 'Web browser viewport width',
  }),
  VIEWPORT_HEIGHT: num({
    default: 1080,
    desc: 'Web browser viewport height',
  }),
  NETWORK_SUBSCRIPTION: bool({
    default: false,
    desc: 'Network Subscription enabled',
  }),
});
