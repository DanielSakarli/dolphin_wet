async function loadDummyDolphins(knex) {
	// Insert dummy dolphins.
	await knex('nuernberg_dolphins').del();
	await knex('nuernberg_dolphins').insert([
		{
			name: 'Dolly',
			sex: 1,
			on_site: 1,
			year_of_birth: 2007,
			place_of_birth: 'Duisburg Zoo',
		},
		{
			name: 'Donna',
			sex: 1,
			on_site: 1,
			year_of_birth: 2007,
			place_of_birth: 'Duisburg Zoo',
		},
		{
			name: 'Jenny',
			sex: 1,
			on_site: 1,
			year_of_birth: 1987,
			place_of_birth: 'Wild Born',
		},
		{
			name: 'Nami',
			sex: 1,
			on_site: 1,
			year_of_birth: 2014,
			place_of_birth: 'Nuremberg Zoo',
		},
		{
			name: 'Nynke',
			sex: 1,
			on_site: 1,
			year_of_birth: 1983,
			place_of_birth: 'Wild Born',
		},
		{
			name: 'Sunny',
			sex: 1,
			on_site: 1,
			year_of_birth: 1999,
			place_of_birth: 'Heidepark Soltau',
		},
		{
			name: 'Dörte',
			sex: 1,
			on_site: 1,
			year_of_birth: 2011,
			place_of_birth: 'Duisburg Zoo',
		},
	]);
}

module.exports = loadDummyDolphins;
