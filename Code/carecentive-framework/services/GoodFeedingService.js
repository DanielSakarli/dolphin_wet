const GoodFeeding = require('../models/GoodFeeding');
const { raw } = require('objection');

class GoodFeedingService {
	/**
	 * Load the good feeding test result to the database.
	 * @param {Object} result - The result object of good feeding test in object format.
	 * @param {Number} result.user_id The id of user(test conductor)
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.body_condition_score
	 * @param {Number} result.weight
	 * @param {Number} result.weight_measured
	 * @param {Number} result.kcal_calculations
	 * @param {Number} result.blood_hydration
	 * @param {Number} result.fish_quality
	 * @param {Number} result.fish_variety
	 * @returns {Object} Inserted result in database
	 */
	static async loadTestResult(result) {
		try {
			const insertedResult = await GoodFeeding.query().insert({
				...result,
			});
			return insertedResult;
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
