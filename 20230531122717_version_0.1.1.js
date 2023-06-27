// 31.05.2023: Version 0.1.1
// this tables contain following sections: Good Feeding, Appropriate Behaviour, Good Housing
// still missing and waiting for responsefrom the Tiergarten: Good Health and Emotional State
// The checkbox options were chosen according to the table provided by the Tiergarten (e.g. 1,
// 2 or 3 as options to choose from)

exports.up = function (knex) {
    return Promise.all([


        knex.schema.createTable('good_feeding', function (table) {
            table.increments('feeding_record_id').primary();
            table.integer('user_id');
            table.integer('dolphin_id');

            table.integer('body_condition_score'); //1, 2, 3
         
            table.double('weight_measured'); //weekly measured weight of dolphin                

            table.integer('kcal_calculations'); //1, 3

            table.integer('blood_hydration'); //1, 2, 3

            table.integer('fish_quality'); //1, 3

            table.integer('fish_variety'); //1, 2, 3

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),

        knex.schema.createTable('good_health', function (table) {
            table.increments('health_record_id').primary();
            table.integer('user_id');
            table.integer('dolphin_id');



            table.timestamps(false, true); //Timestamp: created at, updated at
        }),


        knex.schema.createTable('appropriate_behaviour', function (table) {
            table.increments('behaviour_record_id').primary();
            table.integer('user_id');
            table.integer('dolphin_id');

            table.integer('environmental_enrichment'); //1, 2, 3

            table.integer('affiliative_behaviour'); //1, 3

            table.integer('play_behaviour'); //1, 3

            table.integer('socio_sexual_behaviour'); //1, 3

            table.integer('maternal_behaviour'); //1, 3

            table.integer('displacement_behaviour'); //1, 3

            table.integer('oral_stereotypic_behaviour'); //1, 3

            table.integer('repetitive_body_movement'); //1, 3

            table.integer('self_grooming_behaviour'); //1, 3

            table.integer('regurgitation_reingestion'); //1, 3

            table.integer('rake_marks'); //1, 2, 3
            //And a photo for the rake_marks!

            table.integer('displaying_aggressive_behaviour'); //1, 3

            table.integer('receiving_aggressive_behaviour'); //1, 3

            table.integer('social_isolation'); //1, 3

            table.integer('avoidance_pool_areas'); //1, 2, 3

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),


        knex.schema.createTable('dolphins', function (table) {
            table.increments('dolphin_id').primary();
            table.string('name');
            table.boolean('sex'); //1: female, 0: male
            table.boolean('on_site'); //1: yes, 0: no
            table.integer('year_of_birth');
            table.string('place_of_birth');

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),


        // Table users already exists! How do I resolve this? The existing table needs a name and role field
        //knex.schema.createTable('users', function (table) {
        //    table.increments('user_id').primary();
        //    table.string('name');
        //    table.integer('role'); //1: vet, 2: biologist, 3: trainer

        //    table.timestamps(false, true); //Timestamp: created at, updated at
        //}),


        knex.schema.createTable('calculated_data', function (table) {
            table.increments('dolphin_id').primary();
            table.integer('date'); //date as an integer, e.g. 20230531 for the 31th May 2023, or maybe use timestamp?

            //To be done:
            // Adding all calculated data which corresponds to table "Good Health". Tiergarten still has to send us this table
            table.integer('weight_oscillation'); //1, 3

            table.double('WET_total_score'); //defined by the Innolab group as an overall welfare check which contains different welfare parameters

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),


        knex.schema.createTable('laboratory_data', function (table) {
            table.increments('lab_data_id').primary();
            table.integer('dolphin_id');
            table.integer('user_id');

            table.integer('date'); //date as an integer, e.g. 20230531 for the 31th May 2023, or maybe use timestamp?

            //To be done:
            //gastric, fecal abnormalities
            //signs on disease in data

            table.double('data'); //what kind of data will we receive?

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),

        knex.schema.createTable('dolphin_variables', function (table) {
            table.integer('dolphin_id').primary();
            table.integer('date'); //date as an integer, e.g. 20230531 for the 31th May 2023, or maybe use timestamp?

            table.integer('kcal_calculation'); //1, 3

            table.double('blood_hydration_upper_limit'); //inidividual specific range of blood hydration values
            table.double('blood_hydration_lower_limit')

            table.double('weight_target'); //target weight for each animal

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),

        knex.schema.createTable('good_housing', function (table) {
            table.integer('housing_record_id').primary();

            table.integer('user_id');

            table.integer('dolphin_id');

            table.integer('enclosure_barrier_safety'); //1, 3

            table.integer('foreign_body_ingestion'); //1, 3

            table.integer('pool_design'); //1, 3

            table.integer('forced_loneliness'); //1, 3

            table.integer('water_quality'); //1, 3

            table.integer('water_temperature'); //1, 3

            table.integer('sufficient_shade'); //1, 3

            table.integer('acoustic_comfort'); //1, 3

            table.timestamps(false, true); //Timestamp: created at, updated at
        }),

        knex.schema.createTable('emotional_state', function (table) {
            table.integer('emotional_record_id').primary();
            table.integer('user_id');
            table.integer('dolphin_id');

            //To be done:
            //WtP (staff, visitors), Attitude index (staff, visitors), choice and control

            table.timestamps(false, true); //Timestamp: created at, updated at
        })
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('good_feeding'),
        knex.schema.dropTable('good_health'),
        knex.schema.dropTable('appropriate_behaviour'),
        knex.schema.dropTable('dolphins'),
        //knex.schema.dropTable('users'),
        knex.schema.dropTable('calculated_data'),
        knex.schema.dropTable('laboratory_data'),
        knex.schema.dropTable('dolphin_variables'),
        knex.schema.dropTable('good_housing'),
        knex.schema.dropTable('emotional_state')
    ])
};
