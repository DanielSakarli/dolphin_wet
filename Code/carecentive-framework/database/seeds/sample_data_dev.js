exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('dolphins')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('dolphins').insert([
				{
					name: 'dolphin1',
					sex: 1,
					on_site: 1,
					year_of_birth: 2010,
					place_of_birth: 'Nuremberg',
				},
				{
					name: 'dolphin2',
					sex: 0,
					on_site: 1,
					year_of_birth: 2011,
					place_of_birth: 'Erlangen',
				},
				{
					name: 'dolphin3',
					sex: 1,
					on_site: 1,
					year_of_birth: 2015,
					place_of_birth: 'Fuerth',
				},
			]);
		});
	
};
