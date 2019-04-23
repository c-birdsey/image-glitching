/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./server');

const user = {
  username: 'itchy',
  password: '$2b$10$12nV8G5p0FSPrmkSE3ktT.uvvhjbWAcr76HUPO1ssoM5VSyF/Zc.a',
  email: 'itchy@gmail.com',
  token: 'ZA7giBJ4DqUTL+ZpxEoFWg=='
};

describe('Authentication API', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('Registration', () => {
    const newUser = {
      username: 'scratchy',
      password: 'foo',
      email: 'scratchy@gmail.com'
    };

    /*---------- user creation test ----------*/

    // need to check if response contains token
    test('Should create a new user', () => {
      return request(app)
        .post('/auth/register')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function(response) {
          response.body.username = newUser.username;
        });
    });

    /*---------- input validation tests ----------*/

    test('Should reject if username already in use', () => {
      const testUser = newUser;
      testUser.username = user.username;
      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    test('Should reject user with no username', () => {
      return request(app)
        .post('/auth/register')
        .send({
          password: 'abc',
          email: 'test@gmail.com'
        })
        .expect(400);
    });

    test('Should reject user with no password', () => {
      const testUser = {
        username: 'scratchy',
        email: 'test@gmail.com'
      };

      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    test('Should reject user with no email', () => {
      return request(app)
        .post('/auth/register')
        .send({
          user: 'scratchy',
          password: 'abc'
        })
        .expect(400);
    });

    test('Should reject user with empty username', () => {
      const testUser = newUser;
      testUser.username = '';
      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    test('Should reject user with empty password', () => {
      const testUser = newUser;
      testUser.password = '';
      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    test('Should reject user with empty email', () => {
      const testUser = newUser;
      testUser.email = '';
      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    test('Should reject a user with extra fields', () => {
      const testUser = newUser;
      testUser.junk = 'test';
      return request(app)
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });
  });

  describe('Login', () => {
    const authUser = {
      username: 'itchy',
      password: 'test'
    };

    test('Should log in user with proper credentials', () => {
      return request(app)
        .post('/auth/login')
        .send(authUser)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
          response.body.username = user.username;
        });
    });

    test('Should reject attempt with wrong password', () => {
      const nonUser = { username: 'itchy', password: 'foo' };
      return request(app)
        .post('/auth/login')
        .send(nonUser)
        .expect(401);
    });

    test('Should reject attempt with non-registered username', () => {
      const nonUser = { username: 'scratchy', password: 'test' };
      return request(app)
        .post('/auth/login')
        .send(nonUser)
        .expect(401);
    });

    test('Should reject attempt without username', () => {
      const nonUser = { password: 'test' };
      return request(app)
        .post('/auth/login')
        .send(nonUser)
        .expect(400);
    });

    test('Should reject attempt without a password', () => {
      const nonUser = { username: 'itchy' };
      return request(app)
        .post('/auth/login')
        .send(nonUser)
        .expect(400);
    });

    test('Should reject attempt without password', () => {});
  });
});
