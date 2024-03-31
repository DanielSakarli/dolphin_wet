const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
const GoodHealth = require('../models/GoodHealth');
const { getLastNMonths } = require('../source/CustomSource');
const { raw } = require('objection');

class GoodHealthService {
	/**
	 * Loading the test result of good health to database.
	 * @param {Object} result The test result object of good health
	 * @param {Number} result.user_id The id of user
	 * @param {String} result.user_name The name of user
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.normal_floatability
	 * @param {Number} result.eye_lesions
	 * @param {Number} result.visual_cues
	 * @param {Number} result.mouth_exam
	 * @param {Number} result.respiratory_disease
	 * @param {Number} result.force_expiration
	 * @param {Number} result.gastric_abnormality
	 * @param {Number} result.external_disease_signs
	 * @param {String} result.normal_floatability_comments
	 * @param {String} result.eye_lesions_comments
	 * @param {String} result.visual_cues_comments
	 * @param {String} result.mouth_exam_comments
	 * @param {String} result.respiratory_disease_comments
	 * @param {String} result.force_expiration_comments
	 * @param {String} result.gastric_abnormality_comments
	 * @param {String} result.external_disease_signs_comments
	 * @param {String} result.eye_photo_path
	 * @param {String} result.teeth_photo_path
	 * @param {String} result.created_at The date of test result
	 * @param {BinaryData} result.image The image of the test result as a binary String
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
			if (result.created_at !== "") {
				const insertedResult = await GoodHealth.query().insert({
					dolphin_id,
					...result,
					created_at: new Date(result.created_at),
				});
				return insertedResult;
			} else {
				const insertedResult = await GoodHealth.query().insert({
					dolphin_id,
					...result,
					created_at: new Date().toISOString().split('.')[0],
				});
				return insertedResult;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets all good_health test results by given dolphin and month.
	 * @param {string} name - The name of dolphin
	 * @param {number} year - Year
	 * @param {number} month - Month
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByDolphinAndMonth(name, year, month) {
		try {
			const result = await GoodHealth.query()
				.select(
					'health_record_id',
					'user_id',
					'user_name',
					'dolphin_id',
					'dolphin_name',
					'normal_floatability',
					'normal_floatability_comments',
					'eye_lesions',
					'eye_lesions_comments',
					'visual_cues',
					'visual_cues_comments',
					'mouth_exam',
					'mouth_exam_comments',
					'respiratory_disease',
					'respiratory_disease_comments',
					'gastric_abnormality',
					'gastric_abnormality_comments',
					'force_expiration',
					'force_expiration_comments',
					'external_disease_signs',
					'external_disease_signs_comments',
					'eye_photo_path',
					'teeth_photo_path',
					'created_at',
					'updated_at',
					'image'
				)
				.where('dolphin_name', '=', name)
				.where(
					raw(
						`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
						[month, year]
					)
				);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets good_health images by given health record id.
	 * @param {id} health_record_id - The id of health record
	 * @returns {Promise<Array>} list of query result
	 */
	static async getImages(health_record_id) {
		try {
			// Gets the image of the given health record id
			const result = await GoodHealth.query()
			.findById(health_record_id)
			.select('image', 'eye_photo_path', 'teeth_photo_path');
			console.log('This is the image data in the getImages method: ', result);
			return result;

		} catch (error) {
			throw error;
		}
	}



	/**
	 * Gets the test result of last N month of given dolphin. The default value of month is 3.
	 * @param {string} name - The name of dolphin
	 * @param {number} numMonths - The number of past months to include in the result.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultNMonths(name, numMonths = 3) {
		const myDolphinDAO = new DolphinDAO();

		// if this dolphin is not in database,
		// 404: not found.
		if (!(await myDolphinDAO.getDolphinByName(name))) {
			throw new DolphinError(`Dolphin ${name} doesn't exist!`, 404);
		}

		// Gets the year and month numbers of last numMonths months
		const lastNMonths = getLastNMonths(numMonths);
		const allResultsPromises = [];

		// Gets all test results in pending promise
		// Stores them in allResultsPromises array
		for (let i = 0; i < lastNMonths.length; i++) {
			allResultsPromises.push(
				GoodHealthService.getTestResultByDolphinAndMonth(
					name,
					lastNMonths[i].year,
					lastNMonths[i].month
				)
			);
		}

		// Uses Promise.all([]) to resolve them concurrently.
		const allResults = await Promise.all(allResultsPromises);

		// final return value
		const returnedResults = {};

		// Sets up the returned result
		for (let i = 0; i < allResults.length; i++) {
			returnedResults[`${lastNMonths[i].year}-${lastNMonths[i].month}`] =
				allResults[i];
		}

		return returnedResults;
	}


	/**
	 * Gets all good_health test results by the given dolphin name.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResults() {
		try {
			const result = await GoodHealth.query();
			return result;
		} catch (error) {
			throw error;
		}
	}




	/**
	 * Gets the test result of last N month of all dolphins. The default value of month is 3.
	 * @param {number} numMonths - The number of past months to include in the result.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResultNMonths(numMonths = 3) {
		// Gets the year and month numbers of last numMonths months
		const lastNMonths = getLastNMonths(numMonths);
		const allResultsPromises = [];

		// Gets all test results in pending promise
		// Stores them in allResultsPromises array
		for (let i = 0; i < lastNMonths.length; i++) {
			allResultsPromises.push(
				GoodHealthService.getTestResultByMonth(
					lastNMonths[i].year,
					lastNMonths[i].month
				)
			);
		}

		// Uses Promise.all([]) to resolve them concurrently.
		const allResults = await Promise.all(allResultsPromises);

		// final return value
		const returnedResults = {};

		// Sets up the returned result
		for (let i = 0; i < allResults.length; i++) {
			returnedResults[`${lastNMonths[i].year}-${lastNMonths[i].month}`] =
				allResults[i];
		}

		return returnedResults;
	}




	/**
	 * Gets all good_health test results by the given dolphin name.
	 * @param {String} name - The name of dolphin
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByDolphin(name) {
		try {
			const result = await GoodHealth.query().where('dolphin_name', '=', name);
			return result;
		} catch (error) {
			throw error;
		}
	}

}

module.exports = GoodHealthService;
