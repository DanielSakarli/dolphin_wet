const GoodFeeding = require('../models/GoodFeeding');
const { raw } = require('objection');
const {
	getCurrentDate,
	getOneMonthBefore,
	getLastNMonths,
} = require('../source/CustomSource');
const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');

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

	/**
	 * Gets all good_feeding test results by the given dolphin name.
	 * @param {String} name - The name of dolphin
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultByDolphin(name) {
		try {
			const result = await GoodFeeding.query().where('dolphin_name', '=', name);
			return result;
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
	static async getTestResultByDolphinAndMonth(name, year, month) {
		try {
			const result = await GoodFeeding.query()
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
	 * Gets the test result of last three month of given dolphin.
	 * @param {string} name - The name of dolphin
	 * @param {number} numMonths - The number of past months to include in the result.
	 * @returns {Promise<Array>} list of query result
	 */
	static async getTestResultThreeMonths(name, numMonths = 3) {
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
				GoodFeedingService.getTestResultByDolphinAndMonth(
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
}

module.exports = GoodFeedingService;
