const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

/**
 * Controllers
 */
const { setResult } = require('../controllers/good_feeding');

/**
 * Load the test result of good_feeding.
 */
const validateGoodFeedingRequestBody = [
	body('')
]
router.post('/', setResult);

module.exports = router;
