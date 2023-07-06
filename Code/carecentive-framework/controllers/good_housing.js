const { validationResult } = require('express-validator');
const isUserAuth = require('./authSwitch');
const GoodHousingService = require('../services/GoodHousingService');

/**
 * Controller of post request of /api/good_health.
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
		let user_id;
		if (isUserAuth) {
			user_id = req.authData.user_id;
		} else {
			user_id = 1;
		}

		// attach user_id to test result in req.body
		let test_result = req.body;
		test_result = { user_id, ...test_result };

		const insertedResult = await GoodHousingService.loadTestResult(test_result);
		res.status(201).json(insertedResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult };
