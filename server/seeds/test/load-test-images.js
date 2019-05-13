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
          original:
            'http://res.cloudinary.com/drwjeyjxc/image/upload/v1557729426/images/moinwhljt8j2wz7v8lyk.jpg',
          createdAt: '2019-05-08T00:06:35Z',
          createdBy: 1
        }
      ])
    );
};
