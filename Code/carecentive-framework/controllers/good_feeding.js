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
		if (isUserAuth) {
			const { user_id } = req.authData;
			userID = user_id;
		} else {
			userID = 1;
		}

		const {
			dolphin_name,
			body_condition_score,
			weight,
			weight_measured,
			kcal_calculations,
			blood_hydration,
			fish_quality,
			fish_variety,
			comments,
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
			dolphin_id,
			dolphin_name,
			body_condition_score,
			weight,
			weight_measured,
			kcal_calculations,
			blood_hydration,
			fish_quality,
			fish_variety,
			comments,
		};
		const testResultAdded = await GoodFeedingService.loadTestResult(testResult);

		res.status(201).json(testResultAdded);
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/good_feeding?date.
 * Gets the test result in the database with the given day in format `yyyy-mm-dd`.
 */
async function getResultWithTheDate(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}
		const { date } = req.query;
		const queryResult = await GoodFeedingService.getTestResultWithDate(date);
		res.status(200).json(queryResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getResultWithTheDate };
