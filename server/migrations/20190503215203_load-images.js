/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

// TODO: Add relations to users & og / glitched images

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Images', table => {
    table.increments('id').primary();
    table.binary('data');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Images');
};
