const { query } = require('express-validator');

/**
 * Validation rules for express-validator.
 * This rule validates that the query parameter in request header
 * should be in the format of `yyyy-mm-dd`.
 */
const validateDateQueryParam = [
	query('date')
		.optional({ values: 'undefined' })
		.matches(/^\d{4}-\d{2}-\d{2}$/) // regex of yyyy-mm-dd
		.withMessage(
			'Invalid date format. Please provide a date in the format yyyy-mm-dd'
		),
];

module.exports = { validateDateQueryParam };
