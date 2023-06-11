const GoodFeedingService = require('../services/GoodFeedingService');
const { validationResult } = require('express-validator');

/**
 * Controller of post request of /api/good_feeding.
 * Loads the result into the database and response with the given result if it's valid.
 */
async function setResult(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}
		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		const { user_id } = req.authData;
		const bodyData = req.body;
		const testResult = { ...bodyData, user_id };
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
