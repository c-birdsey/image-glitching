/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Users', table => {
    table.increments('id').primary();
    table.string('googleId');
    table.string('givenName');
    table.string('familyName');
    table.text('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
