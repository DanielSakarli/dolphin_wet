const DolphinService = require('../services/DolphinService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const GoodHousingService = require('../services/GoodHousingService');
const e = require('express');

/**
 * Controller of post request of /api/good_housing.
 * Loads the result into the database and response with the given result if it's valid.
 * @returns {Object} The inserted test result
 */
async function setResult(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ error: errors.array() });
		}

		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		let userID;
		let userName;
		if (isUserAuth) {
			const { user_id, name } = req.authData;
			userID = user_id;
			userName = name;
			const roleName = req.role;
		
		// attach user_id to test result in req.body
		
		////////////////////////////////////////
		//test
		const {
			dolphin_name,
			enclosure_barrier_safety,
			foreign_body_ingestion,
			pool_design,
			forced_loneliness,
			water_quality,
			water_temperature,
			sufficient_shade,
			acoustic_comfort,
			enclosure_barrier_safety_comments,
			foreign_body_ingestion_comments,
			pool_design_comments,
			forced_loneliness_comments,
			water_quality_comments,
			water_temperature_comments,
			sufficient_shade_comments,
			acoustic_comfort_comments,
			created_at,
		} = req.body;		
		////////////////////////////////////////		
		//let test_result = req.body;
		//test_result = { user_id, ...test_result };
		////////////////////////////////////////
		// test

		// If dolphin is not existed in database,
		// 400: bad request
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			dolphin_name,
			roleName
		);
		if (!isDolphinExisted) {
			res.status(400).json({ error: `Dolphin ${dolphin_name} does not exist` });
		}

		// Gets dolphin_id for test result.
		const dolphin_obj = await DolphinService.getOneDolphin(dolphin_name, roleName);
		const dolphin_id = dolphin_obj.dolphin_id;

		const testResult = {
			user_id: userID,
			user_name: userName,
			dolphin_id,
			dolphin_name,
			enclosure_barrier_safety,
			foreign_body_ingestion,
			pool_design,
			forced_loneliness,
			water_quality,
			water_temperature,
			sufficient_shade,
			acoustic_comfort,
			enclosure_barrier_safety_comments,
			foreign_body_ingestion_comments,
			pool_design_comments,
			forced_loneliness_comments,
			water_quality_comments,
			water_temperature_comments,
			sufficient_shade_comments,
			acoustic_comfort_comments,
			created_at,
		};
		const testResultAdded = await GoodHousingService.loadTestResult(testResult, roleName);

		res.status(201).json(testResultAdded);
	} else {
		throw new Error('USER_IS_NOT_AUTHENTICATED');
	}
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/good_housing?name.
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getTestResult(req, res, next) {
	try {
		if(isUserAuth) {
			console.log('authdata: ', req.authData);
			const { user_id } = req.authData;
			const userID = user_id;
			const roleName = req.role;
			console.log('User ID: ', userID);
			// Gets the dolphin name
			const { name, numMonths } = req.query;
			if(name === '') {
				// when name is '' it should get the data of all dolphins
				// If numMonths is 10, return all results, not just past 10 months
				if(numMonths === 10) {
					const queryAllResults = await GoodHousingService.getAllTestResults(roleName);
					res.status(200).json(queryAllResults);
				}
				// All dolphins for specific months
				const queryResult = await GoodHousingService.getAllTestResultNMonths(numMonths, roleName);
				res.status(200).json(queryResult);
				} else {
					// Get the test result of the given dolphin
						// All the data of that dolphin
					if(numMonths === 10) {
						const queryAllResults = await GoodHousingService.getTestResultByDolphin(name, roleName);
						res.status(200).json(queryAllResults);
					}
						// Past numMonths data of that dolphin
					const queryResult = await GoodHousingService.getTestResultNMonths(name, numMonths, roleName);
					res.status(200).json(queryResult);
				}
	} else {
		throw new Error('USER_IS_NOT_AUTHENTICATED');
	}
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
