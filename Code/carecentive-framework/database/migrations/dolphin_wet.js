/**
 * Migration file of Dolphin Wet
 */

exports.up = function (knex) {
	return Promise.all([
		// Dolphins table
		knex.schema.createTable('dolphins', function (table) {
			table.increments('dolphin_id').primary();
			table.string('name');
			table.boolean('sex'); //1: female, 0: male
			table.boolean('on_site'); //1: yes, 0: no
			table.smallint('year_of_birth').unsigned();
			table.string('place_of_birth');

			table.timestamps(false, true); //Timestamp: created at, updated at
		}),

		// good_feeding table
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
			table.string('dolphin_name')
			table.tinyint('body_condition_score').unsigned(); //1, 2, 3
			table.tinyint('weight').unsigned(); //1, 3
			table.double('weight_measured'); //weekly measured weight of dolphin
			table.tinyint('kcal_calculations').unsigned(); //1, 3
			table.tinyint('blood_hydration').unsigned(); //1, 2, 3
			table.tinyint('fish_quality').unsigned(); //1, 3
			table.tinyint('fish_variety').unsigned(); //1, 2, 3
			table.timestamps(true, true); //Timestamp: created at, updated at
		}),

		// good_health table
		knex.schema.createTable('good_health', function (table) {
			table.increments('health_record_id').primary();
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
			table.string('dolphin_name')

			table.tinyint('normal_floatability').unsigned(); //1, 3
			table.tinyint('eye_lesions').unsigned(); //1, 3
			table.tinyint('visual_cues').unsigned(); //1, 3
			table.tinyint('mouth_exam').unsigned(); //1, 3
			table.tinyint('respiratory_disease').unsigned(); //1, 3
			table.tinyint('force_expiration').unsigned(); //1, 3
			table.tinyint('external_disease_signs').unsigned(); //1, 3
			table.string('eye_photo_path');
			table.string('teeth_photo_path');
			table.timestamps(true, true); //Timestamp: created at, updated at
		}),

		// good_housing table
		knex.schema.createTable('good_housing', function (table) {
			table.increments('housing_record_id').primary();
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
			table.string('dolphin_name')

			table.tinyint('enclosure_barrier_safety').unsigned(); //1, 3
			table.tinyint('foreign_body_ingestion').unsigned(); //1, 3
			table.tinyint('pool_design').unsigned(); //1, 3
			table.tinyint('forced_loneliness').unsigned(); //1, 3
			table.tinyint('water_quality').unsigned(); //1, 3
			table.tinyint('water_temperature').unsigned(); //1, 3
			table.tinyint('sufficient_shade').unsigned(); //1, 3
			table.tinyint('acoustic_comfort').unsigned(); //1, 3
			table.timestamps(true, true); //Timestamp: created at, updated at
		}),

		// good_behavior table
		knex.schema.createTable('appropriate_behaviour', function (table) {
			table.increments('behaviour_record_id').primary();
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
			table.string('dolphin_name')

			table.tinyint('environmental_enrichment').unsigned(); //1, 2, 3
			table.tinyint('affiliative_behaviour').unsigned(); //1, 3
			table.tinyint('play_behaviour').unsigned(); //1, 3
			table.tinyint('socio_sexual_behaviour').unsigned(); //1, 3
			table.tinyint('maternal_behaviour').unsigned(); //1, 3
			table.tinyint('displacement_behaviour').unsigned(); //1, 3
			table.tinyint('oral_stereotypic_behaviour').unsigned(); //1, 3
			table.tinyint('repetitive_body_movement').unsigned(); //1, 3
			table.tinyint('self_grooming_behaviour').unsigned(); //1, 3
			table.tinyint('regurgitation_reingestion').unsigned(); //1, 3
			table.tinyint('rake_marks').unsigned(); //1, 2, 3
			//And a photo for the rake_marks!
			table.tinyint('displaying_aggressive_behaviour').unsigned(); //1, 3
			table.tinyint('receiving_aggressive_behaviour').unsigned(); //1, 3
			table.tinyint('social_isolation').unsigned(); //1, 3
			table.tinyint('avoidance_pool_areas').unsigned(); //1, 2, 3

			table.timestamps(true, true); //Timestamp: created at, updated at
		}),
	]);
};

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTable('dolphins'),
		knex.schema.dropTable('good_feeding'),
		knex.schema.dropTable('good_health'),
		knex.schema.dropTable('good_housing'),
		knex.schema.dropTable('appropriate_behavior'),
	]);
};
