import faker from 'faker';

const roles = {
  admin: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  fakeUser: {
    username: faker.name.firstName(),
    password: faker.internet.password(),
  },
};

module.exports = {
  roles,
};
