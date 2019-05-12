/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./server');

const user = {
  id: 1,
  googleId: '123456',
  familyName: 'Bar',
  givenName: 'Foo',
  email: 'foobar@middlebury.edu'
};

const images = [
  {
    id: 1,
    url:
      'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557273995/images/swxori8eyzaatqwjirgc.png',
    createdAt: '2019-05-08T00:06:35Z',
    createdBy: 1
  },
  {
    id: 2,
    url:
      'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557275130/images/zv6nmcyqtn8uvozdxnwt.png',
    createdAt: '2019-05-08T00:25:30Z',
    createdBy: 2
  }
];

describe('Image API', () => {
  beforeEach(() => {
    app.request.isAuthenticated = () => true;
    app.request.user = user;

    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  test('GET /profile/images should return users images', () => {
    return request(app)
      .get('/profile/images')
      .expect(200)
      .expect([images[0]]);
  });
});

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});
