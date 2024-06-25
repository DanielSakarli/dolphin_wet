const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
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
	 * @param {String} result.marks_photo_path
	 * @param {String} result.odontogramm_photo_path
	 * @param {String} result.silhouette_photo_path
	 * @param {String} result.video_path
	 * @param {String} result.created_at The date of test result
	 * @param {BinaryData} result.image The image of the test result as a binary String
	 * @returns {Object} The inserted test data
	 */
	static async loadTestResult(result, roleName) {
		try {
			// Get the id of current dolphin by name
			const myDolphinDao = new DolphinDAO(roleName);
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

			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(result.user_id).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHealth`;
			const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////


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
	static async getTestResultByDolphinAndMonth(name, year, month, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHealth`;
			const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodHealth.query()
				.select('*'
					/*'health_record_id',
					'user_id',
					'user_name',
					'dolphin_id',
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
					'eye_photo_path',
					'teeth_photo_path',
					'odontogramm_photo_path',
					'marks_photo_path',
					'video_path',
					'created_at',
					'updated_at'*/
				)
				.where('dolphin_name', '=', name)
				.where(
					raw(
						`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
						[month, year]
					)
				);
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
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
	static async getTestResultByMonth(year, month, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHealth`;
			const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodHealth.query()
				.select('*'
					/*'health_record_id',
					'user_id',
					'user_name',
					'dolphin_id',
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
					'eye_photo_path',
					'teeth_photo_path',
					'odontogramm_photo_path',
					'marks_photo_path',
					'video_path',
					'created_at',
					'updated_at'*/
				)
				.where(
					raw(
						`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
						[month, year]
					)
				);
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
			}
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
	static async getTestResultNMonths(name, numMonths = 3, roleName) {
		try {
			const myDolphinDAO = new DolphinDAO(roleName);

		// if this dolphin is not in database,
		// 404: not found.
		if (!(await myDolphinDAO.getDolphinByName(name))) {
			throw new DolphinError(`Dolphin ${name} doesn't exist!`, 404);
		}
		// Check if user has a role and if, which role (i.e. which zoo he is working at)
		//const user = await User.query().findById(userID).withGraphFetched('roles');
		//const roleName = user.roles[0].name;
		if (roleName) {
		console.log('role: ', roleName);
		const location = roleName;
		const modelName = `${location}GoodHealth`;
		const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////

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
					lastNMonths[i].month,
					roleName
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
	}
	catch (error) {
		throw error;
	}
	}


	/**
	 * Gets all good_health test results by the given dolphin name.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResults(roleName) {
		try {
			console.log('Inside getAllTestResults method');
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHealth`;
			const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodHealth.query();
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
			} else {
				throw new Error('USER_IS_NOT_AUTHENTICATED');
			}
		} catch (error) {
			throw error;
		}
	}




	/**
	 * Gets the test result of last N month of all dolphins. The default value of month is 3.
	 * @param {number} numMonths - The number of past months to include in the result.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResultNMonths(numMonths = 3, roleName) {
		try {
		// Check if user has a role and if, which role (i.e. which zoo he is working at)
		//const user = await User.query().findById(userID).withGraphFetched('roles');
		//const roleName = user.roles[0].name;
		if (roleName) {
		console.log('role: ', roleName);
		const location = roleName;
		const modelName = `${location}GoodHealth`;
		const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////
		
		// Gets the year and month numbers of last numMonths months
		const lastNMonths = getLastNMonths(numMonths);
		const allResultsPromises = [];

		// Gets all test results in pending promise
		// Stores them in allResultsPromises array
		for (let i = 0; i < lastNMonths.length; i++) {
			allResultsPromises.push(
				GoodHealthService.getTestResultByMonth(
					lastNMonths[i].year,
					lastNMonths[i].month,
					roleName
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

		} else {
		throw new Error('USER_IS_NOT_AUTHENTICATED');
		} 
	} catch (error) {
		throw error;
	}
	}




	/**
	 * Gets all good_health test results by the given dolphin name.
	 * @param {String} name - The name of dolphin
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByDolphin(name, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHealth`;
			const GoodHealth = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodHealth.query().where('dolphin_name', '=', name);
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
			} else {
				throw new Error('USER_IS_NOT_AUTHENTICATED');
			}
		} catch (error) {
			throw error;
		}
	}

/**
 * Sorts the data to be returned according to 'created at' date
 */
static async sortData(data) {
	try {
		const sortedData = data.sort((a, b) => {
			return new Date(b.created_at) - new Date(a.created_at);
		});
		return sortedData;
	} catch (error) {
		throw error;
	}	
}
}

module.exports = GoodHealthService;
