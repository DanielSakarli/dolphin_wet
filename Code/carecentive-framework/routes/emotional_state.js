const express = require('express');
const router = express.Router();
const {
	emotionalStatePostValidateRequestBody,
} = require('../validators/dolphinWetValidators');

const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const { setResult, getTestResult } = require('../controllers/emotional_state');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	emotionalStatePostValidateRequestBody,
	setResult
);

/**
 * Gets the test result based on given query params.
 */
router.get(
	'/',
	authenticateTokenWithSwitch,
	[query('name').notEmpty().isString().withMessage('Name can not be empty!')],
	[query('numMonths').optional().isInt().withMessage('numMonths must be an integer!')],
	getTestResult
);

module.exports = router;
