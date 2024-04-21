const express = require('express');
const router = express.Router();

const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const csvWriter = require('../controllers/csvWriter');

/**
 * Gets the test result based on given query params.
 */
router.get(
	'/',
	authenticateTokenWithSwitch,
	[query('dolphin_name').notEmpty().isString().withMessage('dolphin_name can not be empty!')],
    [query('numMonths').optional().isInt().withMessage('numMonths must be an integer!')],
    [query('section').optional().isString().withMessage('section must be a string!')],
	csvWriter
);

module.exports = router;
