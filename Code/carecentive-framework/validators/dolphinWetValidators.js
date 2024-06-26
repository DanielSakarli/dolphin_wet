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
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 1 })
		.withMessage('On-site value should be either 0 or 1'),
	body('year_of_birth')
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('Invalid year of birth'),
	body('place_of_birth').notEmpty().withMessage('Place of birth is required'),
	body('min_weight_measured')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 1000 })
		.withMessage('Invalid minimum wanted weight'),
	body('max_weight_measured')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 1000 })
		.withMessage('Invalid maximum wanted weight'),
	body('min_kcal_calculations')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 30000 })
		.withMessage('Invalid minimum kcal calculations'),
	body('max_kcal_calculations')
		.optional({ values: 'null' })
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
			'bwo_score',
			'bwo_3_months',
			'bwo_12_months',
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
		.isIn([0, 1, 2])
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
		.isIn([0, 1, 2])
		.toInt()
		.withMessage('Invalid kcal calculations'),
	body('kcal_calculations_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for kal calculations'),
	body('blood_hydration')
		.optional({ values: 'null' })
		.isIn([0, 1, 2])
		.toInt()
		.withMessage('Invalid blood hydration'),
	body('blood_hydration_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for blood hydration'),
	body('fish_quality')
		.optional({ values: 'null' })
		.isIn([0, 1, 2])
		.toInt()
		.withMessage('Invalid fish quality'),
	body('fish_quality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for fish quality'),
	body('fish_variety')
		.optional({ values: 'null' })
		.isIn([0, 1, 2])
		.toInt()
		.withMessage('Invalid fish variety'),
	body('fish_variety_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for fish variety'),
	body('bwo_score')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid body weight oscillation score'),
	body('bwo_3_months')
		.optional({ values: 'null' })
		.isFloat({ min: 0, max: 100 })
		.withMessage('Invalid body weight oscillation percentage 3 months'),
	body('bwo_12_months')
		.optional({ values: 'null' })
		.isFloat({ min: 0, max: 100 })
		.withMessage('Invalid body weight oscillation percentage 12 months'),
	body('file_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid file path'),
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
			'normal_floatability_comments',
			'records_normal_floatability',
			'records_normal_floatability_comments',
			'inspection_eye_lesions',
			'inspection_eye_lesions_comments',
			'response_visual_cues',
			'response_visual_cues_comments',
			'records_eye_lesions',
			'records_eye_lesions_comments',
			'mouth_exam',
			'mouth_exam_comments',
			'records_oral_lesions',
			'records_oral_lesions_comments',
			'records_gastric_abnormality',
			'records_gastric_abnormality_comments',
			'inspection_respiratory',
			'inspection_respiratory_comments',
			'force_expiration',
			'force_expiration_comments',
			'records_respiratory_disease',
			'records_respiratory_disease_comments',
			'inspection_marks',
			'inspection_marks_comments',
			'records_external_disease',
			'records_external_disease_comments',
			'bwo_score',
			'bwo_3_months',
			'bwo_12_months',
			'eye_photo_path',
			'teeth_photo_path',
			'odontogramm_photo_path',
			'marks_photo_path',
			'silhouette_photo_path',
			'video_path',
			'created_at',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid good_health fields: ${disallowedKeys.join(', ')}`
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
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid normal floatability value'),
	body('records_normal_floatability')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records normal floatability value'),
	body('inspection_eye_lesions')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid inspection eye lesions value'),
	body('response_visual_cues')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid response visual cues value'),
	body('records_eye_lesions')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records eye lesions value'),
	body('mouth_exam')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid mouth exam value'),
	body('records_oral_lesions')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records oral lesions value'),
	body('records_gastric_abnormality')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records gastric abnormality value'),
	body('inspection_respiratory')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid inspection respiratory value'),
	body('force_expiration')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid force expiration value'),
	body('records_respiratory_disease')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records respiratory disease value'),
	body('inspection_marks')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid inspection marks value'),
	body('records_external_disease')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt()
		.withMessage('Invalid records external disease value'),

	// Comments
	body('normal_floatability_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for normal floatability'),
	body('records_normal_floatability_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records normal floatability'),
	body('inspection_eye_lesions_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for inspection eye lesions'),
	body('response_visual_cues_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for response visual cues'),
	body('records_eye_lesions_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records eye lesions'),
	body('mouth_exam_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for mouth exam'),
	body('records_oral_lesions_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records oral lesions'),
	body('records_gastric_abnormality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records gastric abnormality'),
	body('inspection_respiratory_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for inspection respiratory'),
	body('force_expiration_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for force expiration'),
	body('records_respiratory_disease_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records respiratory disease'),
	body('inspection_marks_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for inspection marks'),
	body('records_external_disease_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for records external disease'),
	// Photos paths		
	body('eye_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid eye photo path'),
	body('teeth_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid teeth photo path'),
	body('odontogramm_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid odontogramm photo path'),
	body('marks_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid marks photo path'),
	body('silhouette_photo_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid silhouette photo path'),
	body('video_path')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid video path'),
	body('total_rake_marks_percentage')
		.optional({ values: 'null' })
		.isFloat({ min: 0, max: 100 })
		.withMessage('Invalid total rake marks percentage'),
	body('old_rake_marks_percentage')
		.optional({ values: 'null' })
		.isFloat({ min: 0, max: 100 })
		.withMessage('Invalid old rake marks percentage'),
	// Timestamps
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
			'reflecting_colours',
			'acoustic_comfort',
			'enclosure_barrier_safety_comments',
			'foreign_body_ingestion_comments',
			'pool_design_comments',
			'forced_loneliness_comments',
			'water_quality_comments',
			'water_temperature_comments',
			'sufficient_shade_comments',
			'reflecting_colours_comments',
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
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('enclosure_barrier_safety_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for enclosure barrier safety'),
	body('foreign_body_ingestion')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('foreign_body_ingestion_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for foreign body ingestion'),
	body('pool_design')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('pool_design_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for pool design'),
	body('forced_loneliness')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('forced_loneliness_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for forced loneliness'),
	body('water_quality')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('water_quality_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for water quality'),
	body('water_temperature')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('water_temperature_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for water temperature'),
	body('sufficient_shade')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('sufficient_shade_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for sufficient shade'),
	body('reflecting_colours')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('reflecting_colours_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for reflecting colours'),
	// Timestamps
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
				`Invalid behaviour fields: ${disallowedKeys.join(', ')}`
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
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('affiliative_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('play_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('socio_sexual_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('maternal_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('displacement_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('oral_stereotypic_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('repetitive_body_movement')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('self_grooming_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('regurgitation_reingestion')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('rake_marks')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('displaying_aggressive_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('receiving_aggressive_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('social_isolation')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('avoidance_pool_areas')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of behavior validation rules.
 */


/**
 * Emotional state validation rules.
 */
const emotionalStatePostValidateRequestBody = [
	body().custom((value) => {
		const allowedFields = [
			'dolphin_name',
			'willingness_to_participate',
			'synchronous_swimming',
			'rubbing_behaviour',
			'anticipatory_behaviour',
			'fast_swimming',
			'tail_slapping',
			'choice_and_control',
			'willingness_to_participate_comments',
			'synchronous_swimming_comments',
			'rubbing_behaviour_comments',
			'anticipatory_behaviour_comments',
			'fast_swimming_comments',
			'tail_slapping_comments',
			'choice_and_control_comments',			
			'created_at',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(
				`Invalid emotional_state fields: ${disallowedKeys.join(', ')}`
			);
		}

		return true;
	}),
	body('dolphin_name')
		.notEmpty()
		.isString()
		.withMessage('Invalid dolphin name'),
	body('willingness_to_participate')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('synchronous_swimming')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('rubbing_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('anticipatory_behaviour')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('fast_swimming')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('tail_slapping')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('choice_and_control')
		.optional({ values: 'null' })
		.isInt({ min: 0, max: 2 })
		.toInt(),
	body('willingness_to_participate_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for willingness to participate'),
	body('synchronous_swimming_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for synchronous swimming'),
	body('rubbing_behaviour_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for rubbing behaviour'),
	body('anticipatory_behaviour_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for anticipatory behaviour'),
	body('fast_swimming_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for fast swimming'),
	body('tail_slapping_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for tail slapping'),
	body('choice_and_control_comments')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid comments for choice and control'),
	// Timestamps
	body('created_at')
		.optional({ values: 'null' })
		.isString()
		.withMessage('Invalid created date'),
];
/**
 * End of emotional state validation rules.
 */

module.exports = {
	dolphinPostValidateRequestBody,
	dolphinPatchValidateRequestBody,
	goodFeedingPostValidateRequestBody,
	goodHealthPostValidateRequestBody,
	goodHousingPostValidateRequestBody,
	behaviorPostValidateRequestBody,
	emotionalStatePostValidateRequestBody,
};
