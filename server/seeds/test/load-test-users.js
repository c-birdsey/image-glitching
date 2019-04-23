/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('Users').insert([
        {
          id: 1,
          username: 'itchy',
          password:
            '$2b$10$um/7vMwVEfi8g2nUssYp3et9MdnXjJmTehfftL9xqnzjvxla3Otp6',
          email: 'itchy@gmail.com',
          token: 'ZA7giBJ4DqUTL+ZpxEoFWg=='
        }
      ])
    );
};
