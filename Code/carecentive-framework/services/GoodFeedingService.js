const GoodFeeding = require('../models/GoodFeeding');
const { raw } = require('objection');

class GoodFeedingService {
	/**
	 * Load the good feeding test result to the database.
	 * @param {object} result - The result object of good feeding test in object format.
	 */
	static async loadTestResult(result) {
		try {
			const {
				user_id,
				dolphin_id,
				body_condition_score,
				weight,
				weight_measured,
				kcal_calculations,
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
				kcal_calculations,
				blood_hydration,
				fish_quality,
				fish_variety,
			});
			return testResult;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets the test result of good feeding of given date.
	 * @param {string} date - date in format `yyyy-mm-dd`.
	 */
	static async getTestResultWithDate(date) {
		try {
			const result = await GoodFeeding.query().where(
				raw(`DATE(created_at) = ?`, [date])
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = GoodFeedingService;
