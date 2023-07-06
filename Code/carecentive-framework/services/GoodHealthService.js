const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
const GoodHealth = require('../models/GoodHealth');

class GoodHealthService {
	/**
	 * Loading the test result of good health to database.
	 * @param {Object} result The test result object of good health
	 * @param {Number} result.user_id The id of user
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.normal_floatability
	 * @param {Number} result.eye_lesions
	 * @param {Number} result.visual_cues
	 * @param {Number} result.mouth_exam
	 * @param {Number} result.respiratory_disease
	 * @param {Number} result.force_expiration
	 * @param {Number} result.external_disease_signs
	 * @returns {Object} The inserted test data
	 */
	static async loadTestResult(result) {
		try {
			// Get the id of current dolphin by name
			const myDolphinDao = new DolphinDAO();
			const dolphin_name = result.dolphin_name;
			const dolphin_data = await myDolphinDao.getDolphinByName(dolphin_name);
			// If the dolphin is not in the database, throws error
			// 400: bad request
			if (!dolphin_data) {
				throw new DolphinError(
					`Dolphin ${result.dolphin_name} does not exist`,
					400
				);
			}

			const { dolphin_id } = dolphin_data;
			// Inserts data into database.
			const insertedResult = await GoodHealth.query().insert({
				dolphin_id,
				...result,
			});
			return insertedResult;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = GoodHealthService;
