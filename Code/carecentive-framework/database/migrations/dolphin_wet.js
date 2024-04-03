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
			
			// Reference areas for the dolphins
			table.smallint('min_weight_measured').unsigned();
			table.smallint('max_weight_measured').unsigned();
			table.smallint('min_kcal_calculations').unsigned();
			table.smallint('max_kcal_calculations').unsigned();

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
			table.string('user_name');		
			table.integer('dolphin_id').unsigned().notNullable();
			// Foreign key constrains for dolphin_id.
			table
				.foreign('dolphin_id')
				.references('dolphins.dolphin_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.string('dolphin_name');

			table.tinyint('body_condition_score').unsigned(); //1, 2, 3
			table.string('body_condition_score_comments'); //1, 2, 3
			// table.tinyint('weight').unsigned(); //1, 3
			table.double('weight_measured'); //weekly measured weight of dolphin
			table.string('weight_measured_comments');
			table.tinyint('kcal_calculations').unsigned(); //1, 3
			table.string('kcal_calculations_comments'); //1, 3
			table.tinyint('blood_hydration').unsigned(); //1, 2, 3
			table.string('blood_hydration_comments'); //1, 2, 3
			table.tinyint('fish_quality').unsigned(); //1, 3
			table.string('fish_quality_comments'); //1, 3
			table.tinyint('fish_variety').unsigned(); //1, 2, 3
			table.string('fish_variety_comments'); //1, 2, 3
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
			table.string('user_name');	
			table.integer('dolphin_id').unsigned().notNullable();
			// Foreign key constrains for dolphin_id.
			table
				.foreign('dolphin_id')
				.references('dolphins.dolphin_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.string('dolphin_name');

			table.tinyint('normal_floatability').unsigned(); //0, 2
			table.string('normal_floatability_comments');
			table.tinyint('records_normal_floatability').unsigned(); //0, 2
			table.string('records_normal_floatability_comments');
			table.tinyint('inspection_eye_lesions').unsigned();
			table.string('inspection_eye_lesions_comments');
			table.tinyint('response_visual_cues').unsigned();
			table.string('response_visual_cues_comments');
			table.tinyint('records_eye_lesions').unsigned();
			table.string('records_eye_lesions_comments');
			table.tinyint('mouth_exam').unsigned();
			table.string('mouth_exam_comments');
			table.tinyint('records_oral_lesions').unsigned();
			table.string('records_oral_lesions_comments');
			table.tinyint('records_gastric_abnormality').unsigned();
			table.string('records_gastric_abnormality_comments');
			table.tinyint('inspection_respiratory').unsigned();
			table.string('inspection_respiratory_comments');
			table.tinyint('force_expiration').unsigned();
			table.string('force_expiration_comments');
			table.tinyint('records_respiratory_disease').unsigned();
			table.string('records_respiratory_disease_comments');
			table.tinyint('inspection_marks').unsigned();
			table.string('inspection_marks_comments');
			table.tinyint('records_external_disease').unsigned();
			table.string('records_external_disease_comments');

			table.string('eye_photo_path');
			table.string('teeth_photo_path');
			//table.binary('image'); //Holds image as binary data
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
			table.string('user_name');
			table.integer('dolphin_id').unsigned().notNullable();
			// Foreign key constrains for dolphin_id.
			table
				.foreign('dolphin_id')
				.references('dolphins.dolphin_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.string('dolphin_name');

			table.tinyint('enclosure_barrier_safety').unsigned(); //1, 3
			table.string('enclosure_barrier_safety_comments');
			table.tinyint('foreign_body_ingestion').unsigned(); //1, 3
			table.string('foreign_body_ingestion_comments');
			table.tinyint('pool_design').unsigned(); //1, 3
			table.string('pool_design_comments');
			table.tinyint('forced_loneliness').unsigned(); //1, 3
			table.string('forced_loneliness_comments');
			table.tinyint('water_quality').unsigned(); //1, 3
			table.string('water_quality_comments');
			table.tinyint('water_temperature').unsigned(); //1, 3
			table.string('water_temperature_comments');
			table.tinyint('sufficient_shade').unsigned(); //1, 3
			table.string('sufficient_shade_comments');
			table.tinyint('acoustic_comfort').unsigned(); //1, 3
			table.string('acoustic_comfort_comments');

			// Comments columns

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
			table.string('user_name');	
			table.integer('dolphin_id').unsigned().notNullable();
			// Foreign key constrains for dolphin_id.
			table
				.foreign('dolphin_id')
				.references('dolphins.dolphin_id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			table.string('dolphin_name');

			table.tinyint('environmental_enrichment').unsigned(); //1, 2, 3
			table.string('environmental_enrichment_comments');
			table.tinyint('affiliative_behaviour').unsigned(); //1, 3
			table.string('affiliative_behaviour_comments');
			table.tinyint('play_behaviour').unsigned(); //1, 3
			table.string('play_behaviour_comments');
			table.tinyint('socio_sexual_behaviour').unsigned(); //1, 3
			table.string('socio_sexual_behaviour_comments');
			table.tinyint('maternal_behaviour').unsigned(); //1, 3
			table.string('maternal_behaviour_comments');
			table.tinyint('displacement_behaviour').unsigned(); //1, 3
			table.string('displacement_behaviour_comments');
			table.tinyint('oral_stereotypic_behaviour').unsigned(); //1, 3
			table.string('oral_stereotypic_behaviour_comments');
			table.tinyint('repetitive_body_movement').unsigned(); //1, 3
			table.string('repetitive_body_movement_comments');
			table.tinyint('self_grooming_behaviour').unsigned(); //1, 3
			table.string('self_grooming_behaviour_comments');
			table.tinyint('regurgitation_reingestion').unsigned(); //1, 3
			table.string('regurgitation_reingestion_comments');
			table.tinyint('rake_marks').unsigned(); //1, 2, 3
			table.string('rake_marks_comments');
			//And a photo for the rake_marks!
			table.tinyint('displaying_aggressive_behaviour').unsigned(); //1, 3
			table.string('displaying_aggressive_behaviour_comments');
			table.tinyint('receiving_aggressive_behaviour').unsigned(); //1, 3
			table.string('receiving_aggressive_behaviour_comments');
			table.tinyint('social_isolation').unsigned(); //1, 3
			table.string('social_isolation_comments');
			table.tinyint('avoidance_pool_areas').unsigned(); //1, 2, 3
			table.string('avoidance_pool_areas_comments');

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
