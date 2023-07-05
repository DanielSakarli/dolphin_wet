const express = require('express');
const router = express.Router();
const {
	goodFeedingPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');

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
router.post('/', goodFeedingPostValidateRequestBody, setResult);

/**
 * Gets the test result of given day.
 */
router.get('/', getResultWithTheDate);

module.exports = router;
