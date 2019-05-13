/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Images', table => {
    table.increments('id').primary();
    table.string('url').notNullable();
    table.string('original').notNullable();
    table.string('createdAt').notNullable();
    table.integer('createdBy');
    table
      .foreign('createdBy')
      .references('User.id')
      .onDelete('SET NULL');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Images');
};
