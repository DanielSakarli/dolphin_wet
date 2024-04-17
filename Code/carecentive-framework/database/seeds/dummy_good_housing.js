async function loadDummyGoodHousing(knex) {
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
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult2 = {
		dolphin_id: donnaID.dolphin_id,
		dolphin_name: 'Donna',
		user_id: 2,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult3 = {
		dolphin_id: jennyID.dolphin_id,
		dolphin_name: 'Jenny',
		user_id: 3,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult4 = {
		dolphin_id: namiID.dolphin_id,
		dolphin_name: 'Nami',
		user_id: 1,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult5 = {
		dolphin_id: NynkeID.dolphin_id,
		dolphin_name: 'Nynke',
		user_id: 2,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult6 = {
		dolphin_id: SunnyID.dolphin_id,
		dolphin_name: 'Sunny',
		user_id: 3,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};
	const testGoodHealthResult7 = {
		dolphin_id: dörteID.dolphin_id,
		dolphin_name: 'Dörte',
		user_id: 1,
		enclosure_barrier_safety: Math.floor(Math.random() * 2) + 1,
		foreign_body_ingestion: Math.floor(Math.random() * 2) + 1,
		pool_design: Math.floor(Math.random() * 2) + 1,
		forced_loneliness: Math.floor(Math.random() * 2) + 1,
		water_quality: Math.floor(Math.random() * 2) + 1,
		water_temperature: Math.floor(Math.random() * 2) + 1,
		sufficient_shade: Math.floor(Math.random() * 2) + 1,
		acoustic_comfort: Math.floor(Math.random() * 2) + 1,
	};

	return knex('nuernberg_good_housing').insert([
		testGoodHealthResult1,
		testGoodHealthResult2,
		testGoodHealthResult3,
		testGoodHealthResult4,
		testGoodHealthResult5,
		testGoodHealthResult6,
		testGoodHealthResult7,
	]);
}

module.exports = loadDummyGoodHousing;
