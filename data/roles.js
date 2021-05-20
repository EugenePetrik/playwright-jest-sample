import faker from 'faker';

export const roles = {
  adminUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  fakeUser: {
    username: faker.name.firstName(),
    password: faker.internet.password(),
  },
};
