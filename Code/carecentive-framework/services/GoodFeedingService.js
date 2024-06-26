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
			//console.log('Role in service layer: ', roleName);
			if (roleName) {
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			console.log('Feeding model: ', modelName);
			////////////////////////////////////////////////


			//console.log("Date sent to backend: ", result.created_at);
			if (result.created_at !== "") {
				console.log("Results to be inserted: ", result)
				const insertedResult = await GoodFeeding.query().insert({
					dolphin_id,
					...result,
					created_at: new Date(result.created_at),
				});
			} else {
				console.log("Results to be inserted: ", result)
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
	 * Body weight oscillation calculation
	 */
	static async bwosCalculation(test_result) {
		try {
		console.log('Arrived at bwos calc in service layer');
		// get the past data for the body weight oscillation calculation
		const dataPast3Months = await GoodFeedingService.getTestResultNMonths(test_result.dolphin_name, 3, roleName);
		const dataPast12Months = await GoodFeedingService.getTestResultNMonths(test_result.dolphin_name, 12, roleName);
		console.log('Data past 3 months: ', dataPast3Months);
		console.log('Data past 12 months: ', dataPast12Months);

		// Helper function to extract valid weights
		const extractValidWeights = (data) => {
			return Object.values(data)
				.flat()  // Flatten the array of arrays
				.map(item => item.weight_measured)  // Map to weight_measured values
				.filter(weight => weight != null);  // Filter out null or undefined values
		};
	
		// Extract valid weights for past 3 and 12 months
		const validWeights3Months = extractValidWeights(dataPast3Months);
		const validWeights12Months = extractValidWeights(dataPast12Months);
		
		// Add the current test result weight if it's not null or undefined
		if (test_result.weight_measured != null) {
			validWeights3Months.push(test_result.weight_measured);
			validWeights12Months.push(test_result.weight_measured);
		}

		// Logging the extracted valid weights
		console.log('Valid weights 3 months: ', validWeights3Months);
		console.log('Valid weights 12 months: ', validWeights12Months);
	
		// Helper function to calculate weight statistics
		const calculateWeightStats = (weights) => {
			if (weights.length === 0) return { max: 0, min: 0, avg: 0 };
			const max = Math.max(...weights);
			const min = Math.min(...weights);
			const sum = weights.reduce((acc, curr) => acc + curr, 0);
			const avg = sum / weights.length;
			return { max, min, avg };
		};
	
		// Calculate statistics for past 3 and 12 months
		const { max: maxWeight3Months, min: minWeight3Months, avg: avgWeight3Months } = calculateWeightStats(validWeights3Months);
		const { max: maxWeight12Months, min: minWeight12Months, avg: avgWeight12Months } = calculateWeightStats(validWeights12Months);
		
		// Logging the calculated weight statistics
		console.log('Max weight 3 months: ', maxWeight3Months);
		console.log('Min weight 3 months: ', minWeight3Months);
		console.log('Avg weight 3 months: ', avgWeight3Months);
		console.log('Max weight 12 months: ', maxWeight12Months);
		console.log('Min weight 12 months: ', minWeight12Months);
		console.log('Avg weight 12 months: ', avgWeight12Months);
	
		// Helper function to calculate body weight oscillation (BWO)
		const calculateBWO = (max, min, avg) => {
			if (avg === 0) return 0; // Avoid division by zero
			return ((max - min) / avg) * 100;
		};
	
		// Calculate BWO for past 3 and 12 months
		const bwo3Months = calculateBWO(maxWeight3Months, minWeight3Months, avgWeight3Months);
		const bwo12Months = calculateBWO(maxWeight12Months, minWeight12Months, avgWeight12Months);
	
		// Logging the calculated BWO
		console.log("BWO 3 months: ", bwo3Months);
		console.log("BWO 12 months: ", bwo12Months);
	
		// Calculate BWO score
		const bwoScore = (bwo3Months <= 5 && bwo12Months <= 13) ? 0 : (bwo3Months > 5 && bwo12Months > 13) ? 2 : 0;
		console.log('BWO score: ', bwoScore);
	
		// Insert the BWO score into the test result
		test_result = { ...test_result, bwo_score: bwoScore, bwo_3_months: bwo3Months, bwo_12_months: bwo12Months };
	
		// Final logs for clarity
		console.log(`Average weight in the past 3 months: ${avgWeight3Months.toFixed(2)}`);
		console.log(`Maximum weight in the past 3 months: ${maxWeight3Months}`);
		console.log(`Minimum weight in the past 3 months: ${minWeight3Months}`);
		console.log(`Body weight oscillation score: ${bwoScore}`);
		
		return test_result;
		
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
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

				let result = await GoodFeeding.query().where(
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
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodFeeding.query();
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
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			let result = await GoodFeeding.query().where('dolphin_name', '=', name);
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
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////

			let result = await GoodFeeding.query()
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
			//console.log('role: ', roleName);
			const location = roleName;
			const modelName = `${location}GoodFeeding`;
			const GoodFeeding = require(`../models/${modelName}`); // Get the respective model, depending on which zoo the user works at
			////////////////////////////////////////////////
			let result = await GoodFeeding.query()
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
		//const roleName = req.role;
		if (roleName) {
		//console.log('role: ', roleName);
		
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
		// Sort the data according to 'created_at' date
		//returnedResults = await this.sortData(returnedResults);
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
			//console.log('role: ', roleName);
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

		// Sort the data according to 'created_at' date
		//returnedResults = await this.sortData(returnedResults);
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

module.exports = GoodFeedingService;
