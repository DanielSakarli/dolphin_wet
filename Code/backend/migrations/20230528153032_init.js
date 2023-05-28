/**
 * Create tables in mysql database.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('dolphins', function (table) {
			/**
			 * Dolphin Table
			 */
			// Mysql doesn't have built-in uuid type, so stored in string type.
			// Please note that the responsibility of generating UUIDs will be shifted to
			// your application logic rather than relying on the database's default value expression.
			table.string('dolphin_id', 36).primary();
			table.string('name').notNullable();
			table.date('birthday');
			table.string('place_of_birth');
		})
		.createTable('assessment', function (table) {
			/**
			 * Assessment Table
			 */
			table.string('assessment_id', 36).primary();
			table.date('date').notNullable();
			table
				.uuid('fk_dolphin_id')
				.references('dolphin_id')
				.inTable('dolphins')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.timestamps(true, true);
		});
};

/**
 * Drop all tables in mysql database.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('dolphins')
		.dropTableIfExists('assessment');
};
