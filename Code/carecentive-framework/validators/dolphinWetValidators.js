const { body } = require('express-validator');
/**
 * This file contains all validation rules of request body generated by express-validator.
 */

/**
 * Dolphin route validator.
 */
// Post request of dolphin endpoint validation rules.
const dolphinPostValidateRequestBody = [
	body('name').notEmpty().withMessage('Dolphin name is required'),
	body('sex')
		.isInt({ min: 0, max: 1 })
		.withMessage('Sex should be either 0 or 1'),
	body('on_site')
		.isInt({ min: 0, max: 1 })
		.withMessage('On-site value should be either 0 or 1'),
	body('year_of_birth')
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('Invalid year of birth'),
	body('place_of_birth').notEmpty().withMessage('Place of birth is required'),
	body('min_weight_measured')
		.isInt({ min: 0, max: 1000 })
		.withMessage('Invalid minimum wanted weight'),
	body('max_weight_measured')
		.isInt({ min: 0, max: 1000 })
		.withMessage('Invalid maximum wanted weight'),
	body('min_kcal_calculations')
		.isInt({ min: 0, max: 30000 })
		.withMessage('Invalid minimum kcal calculations'),
	body('max_kcal_calculations')
		.isInt({ min: 0, max: 30000 })
		.withMessage('Invalid maximum kcal calculations'),

];

// Patch request of dolphin endpoint validation rules.
const dolphinPatchValidateRequestBody = [
	// Validate update information
	body().custom((value) => {
		const allowedFields = [
			'on_site',
			'name',
			'sex',
			'year_of_birth',
			'place_of_birth',
			'min_weight_measured',
			'max_weight_measured',
			'min_kcal_calculations',
			'max_kcal_calculations',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(`Invalid update fields: ${disallowedKeys.join(', ')}`);
		}

		return true;
	}),
];
/**
 * End of Dolphin route validator.
 */

/**
 * Good feeding validation rules.
 */
const goodFeedingPostValidateRequestBody = [
	body().custom((value) => {
		const allowedFields = [
			'dolphin_name',
			'body_condition_score',
			'body_condition_score_comments',
			'weight_measured',
			'weight_measured_comments',
			'kcal_calculations',
			'kcal_calculations_comments',
			'blood_hydration',
			'blood_hydration_comments',
			'fish_quality',
			'fish_quality_comments',
			'fish_variety',
			'fish_variety_comments',
			'created_at',
			//'weight',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid good_feeding fields: ${disallowedKeys.join(', ')}`
			);
		}

		return true;
	}),
	body('dolphin_name')
		.notEmpty()
		.isString()
		.withMessage('Invalid dolphin name'),
	body('body_condition_score')
		.optional({ values: 'null' })
		.isIn([1, 2, 3])
		.toInt()
		.withMessage('Invalid body condition score'),
	body('body_condition_score_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for body condition score'),
	body('weight_measured')
		.optional({ values: 'null' })
		.isFloat({ min: 0 })
		.toFloat()
		.withMessage('Invalid measured weight'),
	body('weight_measured_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for body measured weight'),
	body('kcal_calculations')
		.optional({ values: 'null' })
		.isIn([1, 2, 3])
		.toInt()
		.withMessage('Invalid kcal calculations'),
	body('kcal_calculations_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for kal calculations'),
	body('blood_hydration')
		.optional({ values: 'null' })
		.isIn([1, 2, 3])
		.toInt()
		.withMessage('Invalid blood hydration'),
	body('blood_hydration_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for blood hydration'),
	body('fish_quality')
		.optional({ values: 'null' })
		.isIn([1, 2, 3])
		.toInt()
		.withMessage('Invalid fish quality'),
	body('fish_quality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for fish quality'),
	body('fish_variety')
		.optional({ values: 'null' })
		.isIn([1, 2, 3])
		.toInt()
		.withMessage('Invalid fish variety'),
	body('fish_variety_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for fish variety'),
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of Good feeding validation rules.
 */

/**
 * Good health validation rules.
 */
const goodHealthPostValidateRequestBody = [
	body().custom((value) => {
		const allowedFields = [
			'dolphin_name',
			'normal_floatability',
			'eye_lesions',
			'visual_cues',
			'mouth_exam',
			'respiratory_disease',
			'force_expiration',
			'gastric_abnormality',
			'external_disease_signs',
			'normal_floatability_comments',
			'eye_lesions_comments',
			'visual_cues_comments',
			'mouth_exam_comments',
			'respiratory_disease_comments',
			'force_expiration_comments',
			'gastric_abnormality_comments',
			'external_disease_signs_comments',
			'eye_photo_path',
			'teeth_photo_path',
			'created_at'
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid good_housing fields: ${disallowedKeys.join(', ')}`
			);
		}

		return true;
	}),
	body('dolphin_name')
		.notEmpty()
		.isString()
		.withMessage('Invalid dolphin name'),
	body('normal_floatability')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid normal floatability value'),
	body('eye_lesions')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid eye lesions value'),
	body('visual_cues')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid visual cues value'),
	body('mouth_exam')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid mouth exam value'),
	body('respiratory_disease')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid respiratory disease value'),
	body('force_expiration')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid force expiration value'),
	body('gastric_abnormality')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid gastric abnormality value'),
	body('external_disease_signs')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt()
		.withMessage('Invalid external disease signs value'),
	body('normal_floatability_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for normal floatability'),
	body('eye_lesions_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for eye lesions'),
	body('visual_cues_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for visual cues'),
	body('mouth_exam_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for mouth exam'),
	body('respiratory_disease_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for respiratory disease'),
	body('force_expiration_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for force expiration'),
	body('gastric_abnormality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for force expiration'),
	body('external_disease_signs_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for external disease signs'),
	body('eye_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid eye photo path'),
	body('teeth_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid teeth photo path'),
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of Good health validation rules.
 */

/**
 * Good housing validation rules.
 */
const goodHousingPostValidateRequestBody = [
	body().custom((value) => {
		const allowedFields = [
			'dolphin_name',
			'enclosure_barrier_safety',
			'foreign_body_ingestion',
			'pool_design',
			'forced_loneliness',
			'water_quality',
			'water_temperature',
			'sufficient_shade',
			'acoustic_comfort',
			'enclosure_barrier_safety_comments',
			'foreign_body_ingestion_comments',
			'pool_design_comments',
			'forced_loneliness_comments',
			'water_quality_comments',
			'water_temperature_comments',
			'sufficient_shade_comments',
			'acoustic_comfort_comments',
			'created_at'
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid good_housing fields: ${disallowedKeys.join(', ')}`
			);
		}

		return true;
	}),
	body('dolphin_name')
		.notEmpty()
		.isString()
		.withMessage('Invalid dolphin name'),
	body('enclosure_barrier_safety')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('enclosure_barrier_safety_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for enclosure barrier safety'),
	body('foreign_body_ingestion')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('foreign_body_ingestion_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for foreign body ingestion'),
	body('pool_design')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('pool_design_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for pool design'),
	body('forced_loneliness')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('forced_loneliness_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for forced loneliness'),
	body('water_quality')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('water_quality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for water quality'),
	body('water_temperature')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('water_temperature_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for water temperature'),
	body('sufficient_shade')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('sufficient_shade_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for sufficient shade'),
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of good housing validation rules.
 */

/**
 * Behavior validation rules.
 */
const behaviorPostValidateRequestBody = [
	body().custom((value) => {
		const allowedFields = [
			'dolphin_name',
			'environmental_enrichment',
			'affiliative_behaviour',
			'play_behaviour',
			'socio_sexual_behaviour',
			'maternal_behaviour',
			'displacement_behaviour',
			'oral_stereotypic_behaviour',
			'repetitive_body_movement',
			'self_grooming_behaviour',
			'regurgitation_reingestion',
			'rake_marks',
			'displaying_aggressive_behaviour',
			'receiving_aggressive_behaviour',
			'social_isolation',
			'avoidance_pool_areas',
			'environmental_enrichment_comments',
			'affiliative_behaviour_comments',
			'play_behaviour_comments',
			'socio_sexual_behaviour_comments',
			'maternal_behaviour_comments',
			'displacement_behaviour_comments',
			'oral_stereotypic_behaviour_comments',
			'repetitive_body_movement_comments',
			'self_grooming_behaviour_comments',
			'regurgitation_reingestion_comments',
			'rake_marks_comments',
			'displaying_aggressive_behaviour_comments',
			'receiving_aggressive_behaviour_comments',
			'social_isolation_comments',
			'avoidance_pool_areas_comments',
			'created_at',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid good_housing fields: ${disallowedKeys.join(', ')}`
			);
		}

		return true;
	}),
	body('dolphin_name')
		.notEmpty()
		.isString()
		.withMessage('Invalid dolphin name'),
	body('environmental_enrichment')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('affiliative_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('play_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('socio_sexual_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('maternal_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('displacement_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('oral_stereotypic_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('repetitive_body_movement')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('self_grooming_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('regurgitation_reingestion')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('rake_marks')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('displaying_aggressive_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('receiving_aggressive_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('social_isolation')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('avoidance_pool_areas')
		.optional({ values: 'null' })
		.isInt({ min: 1, max: 3 })
		.toInt(),
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of behavior validation rules.
 */

module.exports = {
	dolphinPostValidateRequestBody,
	dolphinPatchValidateRequestBody,
	goodFeedingPostValidateRequestBody,
	goodHealthPostValidateRequestBody,
	goodHousingPostValidateRequestBody,
	behaviorPostValidateRequestBody,
};
