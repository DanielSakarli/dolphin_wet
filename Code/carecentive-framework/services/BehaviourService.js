const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
const { raw } = require('objection');
const { getLastNMonths } = require('../source/CustomSource');
const User = require('../carecentive/carecentive-core/models/User');

class BehaviourService {
	/**
	 * Loading the test result of good health to database.
	 * @param {Object} result The test result object of good health
	 * @param {Number} result.user_id The id of user
	 * @param {String} result.user_name The name of user
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
	 * @param {String} result.created_at The date of test result
	 * @returns {Object} The inserted test data
	 */
	static async loadTestResult(result, roleName) {
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
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			const user = await User.query().findById(result.user_id).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}Behaviour`;
			const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			
			// Inserts data into database.			
			if (result.created_at !== "") {
				const insertedResult = await Behaviour.query().insert({
					dolphin_id,
					...result,
					created_at: new Date(result.created_at),
				});
				return insertedResult;
			} else {
				const insertedResult = await Behaviour.query().insert({
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
	 * Gets the test result of behaviour of given date.
	 * @param {string} date - date in format `yyyy-mm-dd`.
	 */
static async getTestResultWithDate(date, roleName) {
	try {
		// Check if user has a role and if, which role (i.e. which zoo he is working at)
		//const user = await User.query().findById(userID).withGraphFetched('roles');
		//const roleName = user.roles[0].name;
		if (roleName) {
		console.log('role: ', roleName);
		const location = roleName;
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////

			let result = await Behaviour.query().where(
			raw(`DATE(created_at) = ?`, [date])
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
 * Gets all behaviour test results by the given dolphin name.
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
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////


		let result = await Behaviour.query();
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
 * Gets all behaviour test results by the given dolphin name.
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
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////
		let result = await Behaviour.query().where('dolphin_name', '=', name);
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
 * Gets all behaviour test results by given dolphin and month.
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
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////

		let result = await Behaviour.query()
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
 * Gets all behaviour test results by given month.
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
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////
		let result = await Behaviour.query()
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
	const myDolphinDAO = new DolphinDAO();

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
			BehaviourService.getTestResultByDolphinAndMonth(
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

	return returnedResults;}
	else {
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
		const location = roleName;
		const modelName = `${location}Behaviour`;
		const Behaviour = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
		////////////////////////////////////////////////
	//const myDolphinDAO = new DolphinDAO();
	// if this dolphin is not in database,
	// 404: not found.
	/*if (!(await myDolphinDAO.getDolphinByName(name))) {
		throw new DolphinError(`Dolphin ${name} doesn't exist!`, 404);
	}*/

	// Gets the year and month numbers of last numMonths months
	const lastNMonths = getLastNMonths(numMonths);
	const allResultsPromises = [];

	// Gets all test results in pending promise
	// Stores them in allResultsPromises array
	for (let i = 0; i < lastNMonths.length; i++) {
		allResultsPromises.push(
			BehaviourService.getTestResultByMonth(
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


module.exports = BehaviourService;