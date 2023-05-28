const { v4: uuidv4 } = require('uuid');

/**
 * Generate seed data into our mysql database
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	return await knex('dolphins').insert([
		{
			dolphin_id: uuidv4(),
			name: 'dolphin1',
			birthday: '2010-01-01',
			place_of_birth: 'Nuremberg, Germany',
		},
		{
			dolphin_id: uuidv4(),
			name: 'dolphin2',
			birthday: '2010-01-02',
			place_of_birth: 'Nuremberg, Germany',
		},
		{
			dolphin_id: uuidv4(),
			name: 'dolphin3',
			birthday: '2010-01-03',
			place_of_birth: 'Nuremberg, Germany',
		},
		{
			dolphin_id: uuidv4(),
			name: 'dolphin4',
			birthday: '2010-01-04',
			place_of_birth: 'Nuremberg, Germany',
		},
	]);
};
