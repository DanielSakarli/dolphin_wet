async function loadDummyGoodHealth(knex) {
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

	const testGoodHealthResult1 = {
		dolphin_id: dolphin1_id,
		dolphin_name: 'test_dolphin1',
		user_id: 1,
		normal_floatability: 1,
		eye_lesions: null,
		visual_cues: 1,
		mouth_exam: 1,
		respiratory_disease: null,
		force_expiration: 1,
		external_disease_signs: 1,
	};
	const testGoodHealthResult2 = {
		dolphin_id: dolphin2_id,
		dolphin_name: 'test_dolphin2',
		user_id: 2,
		normal_floatability: 1,
		eye_lesions: 2,
		visual_cues: 1,
		mouth_exam: 1,
		respiratory_disease: null,
		force_expiration: 1,
		external_disease_signs: null,
	};
	const testGoodHealthResult3 = {
		dolphin_id: dolphin3_id,
		dolphin_name: 'test_dolphin3',
		user_id: 3,
		normal_floatability: 1,
		eye_lesions: 1,
		visual_cues: 1,
		mouth_exam: 1,
		respiratory_disease: 2,
		force_expiration: 1,
		external_disease_signs: 1,
	};

	return knex('good_health').insert([
		testGoodHealthResult1,
		testGoodHealthResult2,
		testGoodHealthResult3,
	]);
}

module.exports = loadDummyGoodHealth;
