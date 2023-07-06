const express = require('express');
const router = express.Router();
const {
	goodHousingPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { setResult } = require('../controllers/good_housing');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	goodHousingPostValidateRequestBody,
	setResult
);

/**
 * Gets test result for good_health
 */
router.get('/');

module.exports = router;
