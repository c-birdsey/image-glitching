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
