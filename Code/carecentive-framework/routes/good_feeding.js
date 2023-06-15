const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const {
	authenticateToken,
} = require('@carecentive/carecentive-core/source/Authentication');
const { validateDateQueryParam } = require('../validators/dateValidators');

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
const goodFeedingValidationRules = [
	body('dolphin_name').notEmpty().isString().withMessage('Invalid dolphin name'),
	body('body_condition_score')
		.isIn([1, 2, 3])
		.withMessage('Invalid body condition score'),
	body('weight').isIn([1, 3]).withMessage('Invalid weight'),
	body('weight_measured')
		.isFloat({ min: 0 })
		.withMessage('Invalid measured weight'),
	body('kcal_calculations')
		.isIn([1, 3])
		.withMessage('Invalid kcal calculations'),
	body('blood_hydration')
		.isIn([1, 2, 3])
		.withMessage('Invalid blood hydration'),
	body('fish_quality').isIn([1, 3]).withMessage('Invalid fish quality'),
	body('fish_variety').isIn([1, 2, 3]).withMessage('Invalid fish variety'),
];
router.post('/', authenticateToken, goodFeedingValidationRules, setResult);

/**
 * Gets the test result of given day.
 */
router.get('/', validateDateQueryParam, getResultWithTheDate);

module.exports = router;
