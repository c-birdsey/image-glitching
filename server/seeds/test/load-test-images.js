/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.seed = function(knex, promise) {
  return knex('Images')
    .del()
    .then(() =>
      knex('Images').insert([
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
      ])
    );
};
