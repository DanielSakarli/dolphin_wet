const express = require('express');
const router = express.Router();
const {
	goodHealthPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const { getImages } = require('../controllers/get_image');

/**
 * Gets the test result based on given query params.
 */
router.get(
	'/',
	[query('id').isInt().withMessage('Health record id must be an integer')],
    [query('filename').isString().withMessage('Filename must be a string')],
    getImages
);

module.exports = router;
