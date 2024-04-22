//const GoodFeeding = require('../models/GoodFeeding');
const { raw } = require('objection'); //What does the function raw do? It allows us to use SQL functions in our queries. In this case, we are using the SQL function DATE() to extract the date from the created_at column. We are then comparing it to the date passed in as a parameter.
const { getLastNMonths } = require('../source/CustomSource');
const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');
const User = require('../carecentive/carecentive-core/models/User');
//const e = require('express');

class GoodFeedingService {
	/**
	 * Load the good feeding test result to the database.
	 * @param {Object} result - The result object of good feeding test in object format.
	 * @param {Number} result.user_id The id of user(test conductor)
	 * @param {String} result.user_name The name of user(test conductor)
	 * @param {String} result.dolphin_name The name of dolphin
	 * @param {Number} result.body_condition_score
	 * @param {Number} result.weight
	 * @param {Number} result.weight_measured
	 * @param {Number} result.kcal_calculations
	 * @param {Number} result.blood_hydration
	 * @param {Number} result.fish_quality
	 * @param {Number} result.fish_variety
	 * @param {String} result.body_condition_score_comments
	 * @param {String} result.weight_measured_comments
	 * @param {String} result.kcal_calculations_comments
	 * @param {String} result.blood_hydration_comments
	 * @param {String} result.fish_quality_comments
	 * @param {String} result.fish_variety_comments
	 * @param {String} result.file_path The path(s) of the file(s)
	 * @param {String} result.created_at The date of test result
	 * @returns {Object} Inserted result in database
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
			//const user = await User.query().findById(result.user_id).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			console.log('Role in service layer: ', roleName);
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////


			console.log("Date sent to backend: ", result.created_at);
			if (result.created_at !== "") {
				const insertedResult = await GoodFeeding.query().insert({
					dolphin_id,
					...result,
					created_at: new Date(result.created_at),
				});
				return insertedResult;
			} else {
				const insertedResult = await GoodFeeding.query().insert({
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
	 * Gets the test result of good feeding of given date.
	 * @param {string} date - date in format `yyyy-mm-dd`.
	 */
	static async getTestResultWithDate(date, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

				const result = await GoodFeeding.query().where(
				raw(`DATE(created_at) = ?`, [date])
			);
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets all good_feeding test results by the given dolphin name.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getAllTestResults(roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////


			const result = await GoodFeeding.query();
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
		} catch (error) {
			throw error;
		}
	}



	/**
	 * Gets all good_feeding test results by the given dolphin name.
	 * @param {String} name - The name of dolphin
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByDolphin(name, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			const result = await GoodFeeding.query().where('dolphin_name', '=', name);
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets all good_feeding test results by given dolphin and month.
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
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			const result = await GoodFeeding.query()
				.where('dolphin_name', '=', name)
				.where(
					raw( 
						`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
						[month, year]
					)
				);
			return result;
			} else {
				throw new Error('USER_HAS_NO_ROLE');
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets all good_feeding test results by given month.
	 * @param {number} year - Year
	 * @param {number} month - Month
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByMonth(year, month, roleName) {
		try {
			// Check if user has a role and if, which role (i.e. which zoo he is working at)
			//const user = await User.query().findById(userID).withGraphFetched('roles');
			//const roleName = user.roles[0].name;
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			const result = await GoodFeeding.query()
				.where(
					raw( 
						`EXTRACT(MONTH FROM created_at) = ? AND EXTRACT(YEAR FROM created_at) = ?`,
						[month, year]
					)
				);
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
		//const roleName = req.role;
		if (roleName) {
		console.log('role: ', roleName);
		
		// Gets the year and month numbers of last numMonths months
		const lastNMonths = getLastNMonths(numMonths);
		const allResultsPromises = [];

		// Gets all test results in pending promise
		// Stores them in allResultsPromises array
		for (let i = 0; i < lastNMonths.length; i++) {
			allResultsPromises.push(
				GoodFeedingService.getTestResultByDolphinAndMonth(
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
			//const roleName = req.role;
			if (roleName) {
			console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
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
				GoodFeedingService.getTestResultByMonth(
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
}

module.exports = GoodFeedingService;
