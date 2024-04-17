async function loadDummyBehaviour(knex) {
	const dollyID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Dolly')
		.first();
	const donnaID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Donna')
		.first();
	const jennyID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Jenny')
		.first();
	const namiID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Nami')
		.first();
	const NynkeID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Nynke')
		.first();
	const SunnyID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Sunny')
		.first();
	const dörteID = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'Dörte')
		.first();

	const testGoodHealthResult1 = {
		dolphin_id: dollyID.dolphin_id,
		dolphin_name: 'Dolly',
		user_id: 1,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult2 = {
		dolphin_id: donnaID.dolphin_id,
		dolphin_name: 'Donna',
		user_id: 2,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult3 = {
		dolphin_id: jennyID.dolphin_id,
		dolphin_name: 'Jenny',
		user_id: 3,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult4 = {
		dolphin_id: namiID.dolphin_id,
		dolphin_name: 'Nami',
		user_id: 1,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult5 = {
		dolphin_id: NynkeID.dolphin_id,
		dolphin_name: 'Nynke',
		user_id: 2,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult6 = {
		dolphin_id: SunnyID.dolphin_id,
		dolphin_name: 'Sunny',
		user_id: 3,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult7 = {
		dolphin_id: dörteID.dolphin_id,
		dolphin_name: 'Dörte',
		user_id: 1,
		environmental_enrichment: Math.floor(Math.random() * 2) + 1,
		affiliative_behaviour: Math.floor(Math.random() * 2) + 1,
		play_behaviour: Math.floor(Math.random() * 2) + 1,
		socio_sexual_behaviour: Math.floor(Math.random() * 2) + 1,
		maternal_behaviour: Math.floor(Math.random() * 2) + 1,
		displacement_behaviour: Math.floor(Math.random() * 2) + 1,
		oral_stereotypic_behaviour: Math.floor(Math.random() * 2) + 1,
		repetitive_body_movement: Math.floor(Math.random() * 2) + 1,
		self_grooming_behaviour: Math.floor(Math.random() * 2) + 1,
		regurgitation_reingestion: Math.floor(Math.random() * 2) + 1,
		rake_marks: Math.floor(Math.random() * 2) + 1,
		displaying_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		receiving_aggressive_behaviour: Math.floor(Math.random() * 2) + 1,
		social_isolation: Math.floor(Math.random() * 2) + 1,
		avoidance_pool_areas: Math.floor(Math.random() * 2) + 1,
	};

	return knex('nuernberg_appropriate_behaviour').insert([
		testGoodHealthResult1,
		testGoodHealthResult2,
		testGoodHealthResult3,
		testGoodHealthResult4,
		testGoodHealthResult5,
		testGoodHealthResult6,
		testGoodHealthResult7,
	]);
}

module.exports = loadDummyBehaviour;
