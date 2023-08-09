const { body } = require('express-validator');

/**
 * Validation rules for express-validator.
 * This rule validates the request body of /api/photo.
 * should have fields "test_date" and "test_name".
 */
const photoPostValidateRequestBody = [
	body('test_date')
		.exists()
		.withMessage('Date parameter is required')
		.matches(/^\d{4}-\d{2}-\d{2}$/) // regex of yyyy-mm-dd
		.withMessage(
			'Invalid date format. Please provide a date in the format yyyy-mm-dd'
		),
	body('test_name').notEmpty().isString().withMessage('Invalid test name'),
];

module.exports = { photoPostValidateRequestBody };
