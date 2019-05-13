/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('Comments', table => {
    table.increments('id').primary();
    table.text('body').notNullable();
    table.string('createdAt');
    table.integer('image');
    table
      .foreign('image')
      .references('Images.id')
      .onDelete('SET NULL');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Comments');
};
