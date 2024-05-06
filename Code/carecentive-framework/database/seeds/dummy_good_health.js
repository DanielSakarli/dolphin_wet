async function loadDummyGoodHealth(knex) {
	const dollyID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Dolly')
		.first();
	const donnaID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Donna')
		.first();
	const jennyID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Jenny')
		.first();
	const namiID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Nami')
		.first();
	const NynkeID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Nynke')
		.first();
	const SunnyID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Sunny')
		.first();
	const dörteID = await knex('nuernberg_dolphins')
		.select('dolphin_id')
		.where('name', 'Dörte')
		.first();

	const testGoodHealthResult1 = {
		dolphin_id: dollyID.dolphin_id,
		dolphin_name: 'Dolly',
		user_id: 1,	
        normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult2 = {
		dolphin_id: donnaID.dolphin_id,
		dolphin_name: 'Donna',
		user_id: 2,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult3 = {
		dolphin_id: jennyID.dolphin_id,
		dolphin_name: 'Jenny',
		user_id: 3,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult4 = {
		dolphin_id: namiID.dolphin_id,
		dolphin_name: 'Nami',
		user_id: 1,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult5 = {
		dolphin_id: NynkeID.dolphin_id,
		dolphin_name: 'Nynke',
		user_id: 2,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult6 = {
		dolphin_id: SunnyID.dolphin_id,
		dolphin_name: 'Sunny',
		user_id: 3,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};
	const testGoodHealthResult7 = {
		dolphin_id: dörteID.dolphin_id,
		dolphin_name: 'Dörte',
		user_id: 1,
		normal_floatability: 0,
        records_normal_floatability: 1,
        inspection_eye_lesions: 2,
        response_visual_cues: 0,
        records_eye_lesions: 1,
        mouth_exam: 2,
        records_oral_lesions: 0,
        records_gastric_abnormality: 1,
        inspection_respiratory: 2,
        force_expiration: 0,
        records_respiratory_disease: 1,
        inspection_marks: 2,
        records_external_disease: 0,
	};

	return knex('nuernberg_good_health').insert([
		testGoodHealthResult1,
		testGoodHealthResult2,
		testGoodHealthResult3,
		testGoodHealthResult4,
		testGoodHealthResult5,
		testGoodHealthResult6,
		testGoodHealthResult7,
	]);
}

module.exports = loadDummyGoodHealth;
