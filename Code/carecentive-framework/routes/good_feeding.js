const express = require('express');
const router = express.Router();
const {
	goodFeedingPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const { setResult, getTestResult } = require('../controllers/good_feeding');

/**
 * Loads the test result of good_feeding.
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	goodFeedingPostValidateRequestBody,
	setResult
);

/**
 * Gets the test result based on given query params.
 */
router.get(
	'/',
	[
		query('name').notEmpty().isString().withMessage('Name can not be empty!'),
		query('numMonths').optional().isInt().withMessage('numMonths must be an integer!')
	],
	getTestResult
);

module.exports = router;
