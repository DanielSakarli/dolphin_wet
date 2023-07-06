const express = require('express');
const router = express.Router();
const {
	goodHealthPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { setResult } = require('../controllers/good_health');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	goodHealthPostValidateRequestBody,
	setResult
);

/**
 * Gets test result for good_health
 */
router.get('/');

module.exports = router;
