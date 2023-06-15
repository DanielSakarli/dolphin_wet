async function loadDummyGoodFeeding(knex) {
	const dolphinQueryResult1 = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'test_dolphin1');
	const dolphinQueryResult2 = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'test_dolphin2');
	const dolphinQueryResult3 = await knex('dolphins')
		.select('dolphin_id')
		.where('name', 'test_dolphin3');

	const dolphin1_id = dolphinQueryResult1[0].dolphin_id;
	const dolphin2_id = dolphinQueryResult2[0].dolphin_id;
	const dolphin3_id = dolphinQueryResult3[0].dolphin_id;

	const testGoodFeedingResult1 = {
		dolphin_id: dolphin1_id,
		body_condition_score: 3,
		weight: 3,
		weight_measured: 15.5,
		kcal_calculations: 3,
		blood_hydration: 1,
		fish_quality: 3,
		fish_variety: 3,
	};
	const testGoodFeedingResult2 = {
		dolphin_id: dolphin2_id,
		body_condition_score: 3,
		weight: 3,
		weight_measured: 15.5,
		kcal_calculations: 3,
		blood_hydration: 1,
		fish_quality: 3,
		fish_variety: 3,
	};
	const testGoodFeedingResult3 = {
		dolphin_id: dolphin3_id,
		body_condition_score: 3,
		weight: 3,
		weight_measured: 15.5,
		kcal_calculations: 3,
		blood_hydration: 1,
		fish_quality: 3,
		fish_variety: 3,
	};

	return knex('good_feeding').insert([
		testGoodFeedingResult1,
		testGoodFeedingResult2,
		testGoodFeedingResult3,
	]);
}

module.exports = loadDummyGoodFeeding;
