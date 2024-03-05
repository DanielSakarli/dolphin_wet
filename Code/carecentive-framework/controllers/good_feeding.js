const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');

/**
 * Controller of post request of /api/good_feeding.
 * Loads the result into the database and response with the given result if it's valid.
 */
async function setResult(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ error: errors.array() });
		}

		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		let userID;
		let userName;
		if (isUserAuth) {
			const { user_id, name } = req.authData;
			console.log('authdata: ', req.authData);
			userID = user_id;
			userName = name;
			console.log('user name: ', userName);
		} else {
			userID = 1;
		}

		const {
			dolphin_name,
			body_condition_score,
			weight_measured,
			kcal_calculations,
			blood_hydration,
			fish_quality,
			fish_variety,
			body_condition_score_comments,
			weight_measured_comments,
			kcal_calculations_comments,
			blood_hydration_comments,
			fish_quality_comments,
			fish_variety_comments,
		} = req.body;

		// If dolphin is not existed in database,
		// 400: bad request
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			dolphin_name
		);
		if (!isDolphinExisted) {
			res.status(400).json({ error: `Dolphin ${dolphin_name} does not exist` });
		}

		// Gets dolphin_id for test result.
		const dolphin_obj = await DolphinService.getOneDolphin(dolphin_name);
		const dolphin_id = dolphin_obj.dolphin_id;

		const testResult = {
			user_id: userID,
			user_name: userName,
			dolphin_id,
			dolphin_name,
			body_condition_score,
			weight_measured,
			kcal_calculations,
			blood_hydration,
			fish_quality,
			fish_variety,
			body_condition_score_comments,
			weight_measured_comments,
			kcal_calculations_comments,
			blood_hydration_comments,
			fish_quality_comments,
			fish_variety_comments,
		};
		const testResultAdded = await GoodFeedingService.loadTestResult(testResult);

		res.status(201).json(testResultAdded);
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/good_feeding?name=...&numMonths=...
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getTestResult(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}

		// Gets the dolphin name and the number of months from query params
		const { name, numMonths } = req.query; 
		
		// If numMonths is 10, return all results, not just past 10 months
		if(numMonths === 10) {
			const queryAllResults = await GoodFeedingService.getTestResultByDolphin(name);
			res.status(200).json(queryAllResults);
		}

		const queryResult = await GoodFeedingService.getTestResultNMonths(name, numMonths);;
		res.status(200).json(queryResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
