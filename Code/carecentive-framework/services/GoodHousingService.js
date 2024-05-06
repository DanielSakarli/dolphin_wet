const { DolphinError } = require('../source/Errors');
const DolphinDAO = require('../dao/dolphinDao');
const { raw } = require('objection');
const { getLastNMonths } = require('../source/CustomSource');
//const User = require('../carecentive/carecentive-core/models/User');

class GoodHousingService {
	/**
	 * Loading the test result of good health to database.
	 * @param {Object} result The test result object of good health
	 * @param {Number} result.user_id The id of user
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.enclosure_barrier_safety
	 * @param {Number} result.foreign_body_ingestion
	 * @param {Number} result.pool_design
	 * @param {Number} result.forced_loneliness
	 * @param {Number} result.water_quality
	 * @param {Number} result.sufficient_shade
	 * @param {Number} result.acoustic_comfort
	 * @param {String} result.enclosure_barrier_safety_comments
	 * @param {String} result.foreign_body_ingestion_comments
	 * @param {String} result.pool_design_comments
	 * @param {String} result.forced_loneliness_comments
	 * @param {String} result.water_quality_comments
	 * @param {String} result.sufficient_shade_comments
	 * @param {String} result.acoustic_comfort_comments
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
		const modelName = `${location}GoodHousing`;
		const GoodHousing = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////

			// Inserts data into database.			
			if (result.created_at !== "") {
				const insertedResult = await GoodHousing.query().insert({
					dolphin_id,
					...result,
					created_at: new Date(result.created_at),
				});
				return insertedResult;
			} else {
				const insertedResult = await GoodHousing.query().insert({
					dolphin_id,
					...result,
					created_at: new Date().toISOString().split('.')[0],
				});
				return insertedResult;
			}
		} else {
			throw new Error('USER_HAS_NO_ROLE');
		}
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Gets all good_housing test results by given dolphin and month.
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
			const modelName = `${location}GoodHousing`;
			const GoodHousing = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodHousing.query()
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
			} else {
				throw new Error('USER_HAS_NO_ROLE');
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
		// Gets the year and month numbers of last numMonths months
		const lastNMonths = getLastNMonths(numMonths);
		const allResultsPromises = [];

		// Gets all test results in pending promise
		// Stores them in allResultsPromises array
		for (let i = 0; i < lastNMonths.length; i++) {
			allResultsPromises.push(
				GoodHousingService.getTestResultByDolphinAndMonth(
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
	} else {
		throw new Error('USER_HAS_NO_ROLE');
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
		
		// Gets the year and month numbers of last numMonths months
	const lastNMonths = getLastNMonths(numMonths);
	const allResultsPromises = [];

	// Gets all test results in pending promise
	// Stores them in allResultsPromises array
	for (let i = 0; i < lastNMonths.length; i++) {
		allResultsPromises.push(
			GoodHousingService.getTestResultByMonth(
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
		throw new Error('USER_HAS_NO_ROLE');
	}
	} catch (error) {
		throw error;
	}
}


	/**
	 * Gets all good_housing test results by the given dolphin name.
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
			const modelName = `${location}GoodHousing`;
			const GoodHousing = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			let result = await GoodHousing.query().where('dolphin_name', '=', name);
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
		} catch (error) {
			throw error;
		}
	}

		/**
	 * Gets all good_housing test results by given month.
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
				const modelName = `${location}GoodHousing`;
				const GoodHousing = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
				////////////////////////////////////////////////
				let result = await GoodHousing.query()
					.where(
						raw( 
							`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
							[month, year]
						)
					);
				// Sort the data according to 'created_at' date
				result = await this.sortData(result);
				return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
			} catch (error) {
				throw error;
			}
		}


	/**
	 * Gets all good_housing test results by the given dolphin name.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResults(roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodHousing`;
			const GoodHousing = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			let result = await GoodHousing.query();
			// Sort the data according to 'created_at' date
			result = await this.sortData(result);
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
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

module.exports = GoodHousingService;
