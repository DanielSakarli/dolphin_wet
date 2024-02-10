const DolphinService = require('../services/DolphinService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const GoodHousingService = require('../services/GoodHousingService');

/**
 * Controller of post request of /api/good_housing.
 * Loads the result into the database and response with the given result if it's valid.
 * @returns {Object} The inserted test result
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

		// attach user_id to test result in req.body
		
		////////////////////////////////////////
		//test
		const {
			dolphin_name,
			enclosure_barrier_safety,
			foreign_body_ingestion,
			pool_design,
			forced_loneliness,
			water_quality,
			water_temperature,
			sufficient_shade,
			acoustic_comfort,
			comments,
		} = req.body;		
		////////////////////////////////////////		
		//let test_result = req.body;
		//test_result = { user_id, ...test_result };
		////////////////////////////////////////
		// test

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
			enclosure_barrier_safety,
			foreign_body_ingestion,
			pool_design,
			forced_loneliness,
			water_quality,
			water_temperature,
			sufficient_shade,
			acoustic_comfort,
			comments,
		};
		const testResultAdded = await GoodHousingService.loadTestResult(testResult);

		res.status(201).json(testResultAdded);
	} catch (error) {
		next(error);
	}
}
		////////////////////////////////////////



		//const insertedResult = await GoodHousingService.loadTestResult(test_result);
	//	res.status(201).json(insertedResult);
	//} catch (error) {
		//next(error);
	//}
//}

/**
 * Controller of get request of /api/good_housing?name.
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

		// Gets the dolphin name
		const { name } = req.query;

		const queryResult = await GoodHousingService.getTestResultNMonths(name);

		res.status(200).json(queryResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
