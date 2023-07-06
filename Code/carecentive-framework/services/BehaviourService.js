const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
const Behaviour = require('../models/Behaviour');

class BehaviourService {
	/**
	 * Loading the test result of good health to database.
	 * @param {Object} result The test result object of good health
	 * @param {Number} result.user_id The id of user
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.environmental_enrichment
	 * @param {Number} result.affiliative_behaviour
	 * @param {Number} result.play_behaviour
	 * @param {Number} result.socio_sexual_behaviour
	 * @param {Number} result.maternal_behaviour
	 * @param {Number} result.displacement_behaviour
	 * @param {Number} result.oral_stereotypic_behaviour
	 * @param {Number} result.repetitive_body_movement
	 * @param {Number} result.self_grooming_behaviour
	 * @param {Number} result.regurgitation_reingestion
	 * @param {Number} result.rake_marks
	 * @param {Number} result.displaying_aggressive_behaviour
	 * @param {Number} result.receiving_aggressive_behaviour
	 * @param {Number} result.social_isolation
	 * @param {Number} result.avoidance_pool_areas
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
			const insertedResult = await Behaviour.query().insert({
				dolphin_id,
				...result,
			});
			return insertedResult;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = BehaviourService;
