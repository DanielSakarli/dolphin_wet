const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const BehaviourService = require('../services/BehaviourService');

/**
 * Controller of post request of /api/behaviour.
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
		let userName;
		if (isUserAuth) {
			const { user_id, name } = req.authData;
			userID = user_id;
			userName = name;
		} else {
			userID = 1;
		}

		// attach user_id to test result in req.body
		// when the user JWT authentication works add also the user_name, not only the user_id
		let test_result = req.body;
		test_result = { user_id, user_name: userName, ...test_result };

		const insertedResult = await BehaviourService.loadTestResult(test_result);
		res.status(201).json(insertedResult);
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/behaviour?name.
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
		if(numMonths===10){
			const queryAllResults = await BehaviourService.getTestResultByDolphin(name);
			res.status(200).json(queryAllResults);
		}

		const queryResult = await BehaviourService.getTestResultNMonths(name, numMonths);
		res.status(200).json(queryResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
