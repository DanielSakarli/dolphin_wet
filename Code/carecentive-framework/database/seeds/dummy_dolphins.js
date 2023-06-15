async function loadDummyDolphins(knex) {
	// Insert dummy dolphins.
	await knex('dolphins').del();
	await knex('dolphins').insert([
		{
			name: 'test_dolphin1',
			sex: 1,
			on_site: 1,
			year_of_birth: 2010,
			place_of_birth: 'Nuremberg',
		},
		{
			name: 'test_dolphin2',
			sex: 0,
			on_site: 1,
			year_of_birth: 2011,
			place_of_birth: 'Erlangen',
		},
		{
			name: 'test_dolphin3',
			sex: 1,
			on_site: 1,
			year_of_birth: 2015,
			place_of_birth: 'Fuerth',
		},
	]);
}

module.exports = loadDummyDolphins;
