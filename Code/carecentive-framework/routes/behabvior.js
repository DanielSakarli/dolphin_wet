const express = require('express');
const router = express.Router();
const {
	behaviorPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { setResult } = require('../controllers/behaviour');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	behaviorPostValidateRequestBody,
	setResult
);

/**
 * Gets test result for good_health
 */
router.get('/');

module.exports = router;
