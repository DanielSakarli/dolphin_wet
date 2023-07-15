const express = require('express');
const router = express.Router();
const {
	goodFeedingPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

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
router.get('/', getTestResult);

module.exports = router;
