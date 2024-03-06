const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const GoodHousingService = require('../services/GoodHousingService');
const GoodHealthService = require('../services/GoodHealthService');
const BehaviourService = require('../services/BehaviourService');
const { isUserAuth } = require('./authSwitch');
const { validationResult } = require('express-validator');


// Sample data
const data = [
	{ id: 1, name: 'John Doe', email: 'john@example.com' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	// Add more data as needed
  ];


async function csvWriter(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Handle validation errors
		return res.status(400).json({ errors: errors.array() });
	}

	if (isUserAuth) {
		const { user_id, name } = req.authData;
		console.log('authdata: ', req.authData);
		userID = user_id;
		userName = name;
		console.log('user name: ', userName);
	} else {
		userID = 1;
	}
	
	let data = [];
	let resultFeeding;
	let resultHousing;
	let resultHealth;
	let resultBehaviour;
	let resultEmotions;
	let csvWriter;
	let { dolphin_name, numMonths, section } = req.body;
	
	if(section === 'feeding') {
	if (numMonths != '') {
		if(dolphin_name != ''){
			// Data of a specific dolphin_name and specific numMonths
			resultFeeding = await GoodFeedingService.getTestResultNMonths(dolphin_name, numMonths);
		} else {
			// Data of all dolphins and specific numMonths
			resultFeeding = await GoodFeedingService.getAllTestResultNMonths(numMonths);
		}

		// Save resultFeeding in data
		for (const month in resultFeeding) {
			data.push(...resultFeeding[month]);
		}
		resultFeeding = null; //reset feeding results
	} else {
		if(dolphin_name != '')
		{
			resultFeeding = await GoodFeedingService.getTestResultByDolphin(dolphin_name);
		} else {
			resultFeeding = await GoodFeedingService.getAllTestResults();
		}

		//console.log('result feeding: ', resultFeeding);
		data = resultFeeding; //save the results of feeding tests in data
		resultFeeding = null; //reset feedig results
	}

	csvWriter = createCsvWriter({
		path: 'out2.csv',
		header: [
			{id: 'feeding_record_id', title: 'Feeding Record ID'},
			{id: 'user_id', title: 'User ID'},
			{id: 'user_name', title: 'User Name'},
			{id: 'dolphin_id', title: 'Dolphin ID'},
			{id: 'dolphin_name', title: 'Dolphin Name'},
			{id: 'body_condition_score', title: 'Body Condition Score'},
			{id: 'weight_measured', title: 'Weight Measured'},
			{id: 'kcal_calculations', title: 'Kcal Calculations'},
			{id: 'blood_hydration', title: 'Blood Hydration'},
			{id: 'fish_quality', title: 'Fish Quality'},
			{id: 'fish_variety', title: 'Fish Variety'},
			{id: 'body_condition_score_comments', title: 'Body Condition Score Comments'},
			{id: 'weight_measured_comments', title: 'Weight Measured Comments'},
			{id: 'kcal_calculations_comments', title: 'Kcal Calculations Comments'},
			{id: 'blood_hydration_comments', title: 'Blood Hydration Comments'},
			{id: 'fish_quality_comments', title: 'Fish Quality Comments'},
			{id: 'fish_variety_comments', title: 'Fish Variety Comments'},
			{id: 'created_at', title: 'Created At'},
			{id: 'updated_at', title: 'Updated At'}
		]
	});
	}

	csvWriter
		.writeRecords(data)
		.then(() => {
			console.log('...Done');
			res.download('out2.csv');
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(500);
		});
}

module.exports = csvWriter;
