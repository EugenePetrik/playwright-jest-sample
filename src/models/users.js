import faker from 'faker';
import { env } from '../config/env';

export const users = {
  adminUser: {
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
  },
  fakeUser: {
    username: faker.name.firstName(),
    password: faker.internet.password(),
  },
};
