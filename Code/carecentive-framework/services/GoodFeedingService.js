const GoodFeeding = require('../models/GoodFeeding');

class GoodFeedingService {
	/**
	 * Load the good feeding test result to the database.
	 * @param {*} result The result of good feeding test in object format.
	 */
	static async loadTestResult(result) {
		try {
			const {
				user_id,
				dolphin_id,
				body_condition_score,
				weight,
				weight_measured,
				kal_calculations,
				blood_hydration,
				fish_quality,
				fish_variety,
			} = result;
			const testResult = await GoodFeeding.query().insert({
				user_id,
				dolphin_id,
				body_condition_score,
				weight,
				weight_measured,
				kal_calculations,
				blood_hydration,
				fish_quality,
				fish_variety,
			});
			return testResult;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = GoodFeedingService;
