/**
 * Migration file of Dolphin Wet
 */

exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('dolphins', function (table) {
			table.increments('dolphin_id').primary();
			table.string('name');
			table.boolean('sex'); //1: female, 0: male
			table.boolean('on_site'); //1: yes, 0: no
			table.smallint('year_of_birth').unsigned();
			table.string('place_of_birth');

			table.timestamps(false, true); //Timestamp: created at, updated at
		}),

		knex.schema.createTable('good_feeding', function (table) {
			table.increments('feeding_record_id').primary();
			table.integer('user_id').unsigned();
			// Foreign key constrains for user_id.
			table
				.foreign('user_id')
				.references('users.id')
				.onDelete('SET NULL')
				.onUpdate('CASCADE');
			table.integer('dolphin_id').unsigned().notNullable();
			// Foreign key constrains for dolphin_id.
			table
				.foreign('dolphin_id')
				.references('dolphins.dolphin_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.tinyint('body_condition_score').unsigned(); //1, 2, 3
			table.tinyint('weight').unsigned(); //1, 3
			table.double('weight_measured'); //weekly measured weight of dolphin
			table.tinyint('kcal_calculations').unsigned(); //1, 3
			table.tinyint('blood_hydration').unsigned(); //1, 2, 3
			table.tinyint('fish_quality').unsigned(); //1, 3
			table.tinyint('fish_variety').unsigned(); //1, 2, 3
			table.timestamps(true, true); //Timestamp: created at, updated at
		}),
	]);
};

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTable('good_feeding'),
		knex.schema.dropTable('dolphins'),
	]);
};
