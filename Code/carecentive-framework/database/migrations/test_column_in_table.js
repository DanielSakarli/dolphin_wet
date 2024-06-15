//Test file
//add a column to an existing table

exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.string('test_column');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('test_column');
    });
  };