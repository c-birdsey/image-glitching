/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Users', table => {
    table.increments('id');
    table
      .string('username')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.text('token');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
