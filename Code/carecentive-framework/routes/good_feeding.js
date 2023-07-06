const express = require('express');
const router = express.Router();
const {
	goodFeedingPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { validateDateQueryParam } = require('../validators/dateValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const {
	setResult,
	getResultWithTheDate,
} = require('../controllers/good_feeding');

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
 * Gets the test result of given day.
 */
router.get('/', validateDateQueryParam, getResultWithTheDate);

module.exports = router;
