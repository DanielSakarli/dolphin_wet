const DolphinService = require('../services/DolphinService');
const EmotionalStateService = require('../services/EmotionalStateService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');

/**
 * Controller of post request of /api/emotional_state.
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
		if (isUserAuth) {
            let userID;
		    let userName;
			const { user_id, name } = req.authData;
			console.log('authdata: ', req.authData);
			userID = user_id;
			userName = name;
			console.log('user name: ', userName);

        let test_result = req.body;
		// If dolphin is not existing in database,
		// 400: bad request
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			test_result.dolphin_name
		);
		if (!isDolphinExisted) {
			res.status(400).json({ error: `Dolphin ${test_result.dolphin_name} does not exist` });
		}

		// Gets dolphin_id for test result.
		const dolphin_obj = await DolphinService.getOneDolphin(test_result.dolphin_name);
		const dolphin_id = dolphin_obj.dolphin_id;

		// attach userID to test result in req.body
		test_result = { user_id: userID, user_name: userName, ...test_result };
		console.log(test_result);
		const insertedResult = await EmotionalStateService.loadTestResult(test_result);
		res.status(201).json(insertedResult);
		
		} else {
			throw new Error('USER_IS_NOT_AUTHENTICATED');
		}
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/emotional_state?name=...&numMonths=...
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getTestResult(req, res, next) {
	try {
		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		console.log('isUserAuth: ', isUserAuth);
		if (isUserAuth) {
			console.log('authdata: ', req.authData);
			const { user_id } = req.authData;
			const userID = user_id;
			console.log('User ID: ', userID);
		// Gets the dolphin name and the number of months from query params
		const { name, numMonths } = req.query; 
		console.log('name: ', name);
		if(name === '') {
		// when name is '' it should get the data of all dolphins
		// If numMonths is 10, return all results, not just past 10 months
		if(numMonths === 10) {
			const queryAllResults = await EmotionalStateService.getAllTestResults(userID);
			res.status(200).json(queryAllResults);
		}
		// All dolphins for specific months
		const queryResult = await EmotionalStateService.getAllTestResultNMonths(numMonths, userID);;
		res.status(200).json(queryResult);
		} else {
			// Get the test result of the given dolphin
				// All the data of that dolphin
			if(numMonths === 10) {
				const queryAllResults = await EmotionalStateService.getTestResultByDolphin(name, userID);
				res.status(200).json(queryAllResults);
			}
				// Past numMonths data of that dolphin
			const queryResult = await EmotionalStateService.getTestResultNMonths(name, numMonths, userID);
			res.status(200).json(queryResult);
		}
	} else {
		throw new Error('USER_IS_NOT_AUTHENTICATED');
	}
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
