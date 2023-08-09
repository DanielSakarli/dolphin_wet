async function loadDummyGoodFeeding(knex) {
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

	const testGoodFeedingResult1 = {
		dolphin_id: dollyID.dolphin_id,
		dolphin_name: 'Dolly',
		user_id: 1,
		body_condition_score: 1,
		weight_measured: 165,
		kcal_calculations: 2,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult2 = {
		dolphin_id: donnaID.dolphin_id,
		dolphin_name: 'Donna',
		user_id: 2,
		body_condition_score: 1,
		weight_measured: 172,
		kcal_calculations: 1,
		blood_hydration: 2,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult3 = {
		dolphin_id: jennyID.dolphin_id,
		dolphin_name: 'Jenny',
		user_id: 3,
		body_condition_score: 2,
		weight_measured: 180.5,
		kcal_calculations: 1,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult4 = {
		dolphin_id: namiID.dolphin_id,
		dolphin_name: 'Nami',
		user_id: 3,
		body_condition_score: 1,
		weight_measured: 195,
		kcal_calculations: 1,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult5 = {
		dolphin_id: NynkeID.dolphin_id,
		dolphin_name: 'Nynke',
		user_id: 1,
		body_condition_score: 2,
		weight_measured: 155,
		kcal_calculations: 1,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult6 = {
		dolphin_id: SunnyID.dolphin_id,
		dolphin_name: 'Sunny',
		user_id: 2,
		body_condition_score: 1,
		weight_measured: 161,
		kcal_calculations: 1,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};
	const testGoodFeedingResult7 = {
		dolphin_id: dörteID.dolphin_id,
		dolphin_name: 'Dörte',
		user_id: 1,
		body_condition_score: 1,
		weight_measured: 164,
		kcal_calculations: 1,
		blood_hydration: 1,
		fish_quality: 1,
		fish_variety: 1,
	};

	return knex('good_feeding').insert([
		testGoodFeedingResult1,
		testGoodFeedingResult2,
		testGoodFeedingResult3,
		testGoodFeedingResult4,
		testGoodFeedingResult5,
		testGoodFeedingResult6,
		testGoodFeedingResult7,
	]);
}

module.exports = loadDummyGoodFeeding;
