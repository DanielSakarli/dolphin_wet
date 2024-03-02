/*const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const PhotoService = require('../services/PhotoService');

/**
 * Controller of post request of /api/good_health.
 * Loads the result into the database and response with the given result if it's valid.
 * @returns {Object} The inserted test result
 */
/*async function handlePhotoPath(req, res, next) {
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

		const insertedResult = await PhotoService.loadTestResult(test_result);
		res.status(201).json(insertedResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { handlePhotoPath };

/**
 * Controller of get request of /api/good_health?name.
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
/*async function getTestResult(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}

		// Gets the dolphin name
		const { name, numMonths } = req.query;

		// If numMonths is 10, return all results, not just past 10 months
		if(numMonths===10){
			const queryAllResults = await GoodHealthService.getTestResultByDolphin(name);
			res.status(200).json(queryAllResults);
		}

		const queryResult = await GoodHealthService.getTestResultNMonths(name, numMonths);
		res.status(200).json(queryResult);
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };











/**
 * Validates whether a input date conforms the format of yyyy-mm-dd.
 * @param {String} dateString
 * @returns True if the input conforms the format, otherwise return false
 */
/*function postPhotoValidateRequestBodyDate(dateString) {
	// Regular expression pattern to match the format yyyy-mm-dd
	const pattern = /^\d{4}-\d{2}-\d{2}$/;

	// Check if the dateString matches the pattern
	return pattern.test(dateString);
}

/**
 * Validates the input test name.
 * @param {String} testNameString
 * @returns
 */
/*function postPhotoValidateRequestBodyTestName(testNameString) {
	// TODO: talk with frontend, complete the validation logic.
	return true;
}
*/
/**
 * Controller of post request of /api/photo.
 */
/*function setPhoto(req, res, next) {
	app.post('/api/photo', upload.single("file"), (req, res) => {
		res.send('File uploaded');
});
}

*/
		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		/*let user_id;
		if (isUserAuth) {
			user_id = req.authData.user_id;
		} else {
			user_id = 1;
		}
		
		upload.single("files"), (req, res, (err) => {
			if (err) {
				res.status(400).json({ error: err.message });
			} else {
				const { test_date, test_name } = req.body;

				if (!postPhotoValidateRequestBodyDate(test_date)) {
					res.status(400).json({ error: 'Invalid test date' });
				}
				if (!postPhotoValidateRequestBodyTestName(test_name)) {
					res.status(400).json({ error: 'Invalid test name' });
				}
				/*let result = req.body;
				result = { user_id, ...result };

				const insertedResult = PhotoService.loadTestResult(result);
				res.status(201).json({ insertedResult });

				res.status(201).json({ success: 'Photo uploaded successfully' });				
			}
		});
	

module.exports = { setPhoto, storage, upload };
*/