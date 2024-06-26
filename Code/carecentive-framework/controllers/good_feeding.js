const DolphinService = require('../services/DolphinService');
const GoodFeedingService = require('../services/GoodFeedingService');
const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');

/**
 * Controller of post request of /api/good_feeding.
 * Loads the result into the database and response with the given result if it's valid.
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
			//console.log('authdata: ', req.authData);
			userID = user_id;
			userName = name;
			//console.log('user name: ', userName);
			const roleName = req.role;
			//console.log('role in control layer: ', roleName);
			let test_result = req.body;

		// If dolphin is not existing in database,
		// 400: bad request
		const isDolphinExisted = await DolphinService.isDolphinExisted(
			test_result.dolphin_name,
			roleName
		);
		if (!isDolphinExisted) {
			res.status(400).json({ error: `Dolphin ${test_result.dolphin_name} does not exist` });
		}

		// Gets dolphin_id for test result.
		const dolphin_obj = await DolphinService.getOneDolphin(test_result.dolphin_name, roleName);
		const dolphin_id = dolphin_obj.dolphin_id;

		console.log('Finished dolphin service');
		//console.log('Dolphins approved');
		//console.log('Session in control layer: ', req.session);


		////////////////// BWOS CALCULATION ////////////////////////
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
		
		////////////////// BWOS CALCULATION ////////////////////////

		// Get the file paths from the session storage
		if(req.session.file_path && req.session.file_path != '') {
			//console.log('File path: ', req.session.file_path);
			// attach userID to test result in req.body
			test_result = { user_id: userID, user_name: userName, ...test_result };

				// Check if the dolphin_name is in the array of strings 'req.session.dolphin_name'
				if (req.session.dolphin_name.includes(test_result.dolphin_name)) {
					// Append file_path to the array
					test_result.file_path = req.session.file_path.toString();
				}
							
				const insertedResult = await GoodFeedingService.loadTestResult(test_result, roleName);
				res.status(201).json(insertedResult);
		} else {
		///////////////////////////////////////////////////////////////////////////
		// No file path to upload
		// attach userID to test result in req.body
			//let test_result = req.body;
			
			test_result = { user_id: userID, user_name: userName, ...test_result };
			console.log('no photo to be uploaded: ', test_result);
			const insertedResult = await GoodFeedingService.loadTestResult(test_result, roleName);
			res.status(201).json(insertedResult);
		}


		} else {
			throw new Error('USER_IS_NOT_AUTHENTICATED');
		}

		
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/good_feeding?name=...&numMonths=...
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getTestResult(req, res, next) {
	try {
		/*const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}*/
		// After gone through the authenticateToken middleware
		// the data of user is in the req.authData
		
		//console.log('isUserAuth: ', isUserAuth);
		if (isUserAuth) {
			//console.log('authdata: ', req.authData);
			const { user_id } = req.authData;
			const userID = user_id;
			//console.log('User ID: ', userID);
			const roleName = req.role;
			//console.log('role in control layer: ', roleName);
		// Gets the dolphin name and the number of months from query params
		const { name, numMonths } = req.query; 
		//console.log('name: ', name);
		if(name === '') {
		// when name is '' it should get the data of all dolphins
		// If numMonths is 10, return all results, not just past 10 months
		if(numMonths === 10) {
			const queryAllResults = await GoodFeedingService.getAllTestResults(roleName);
			res.status(200).json(queryAllResults);
		}
		// All dolphins for specific months
		const queryResult = await GoodFeedingService.getAllTestResultNMonths(numMonths, roleName);;
		res.status(200).json(queryResult);
		} else {
			// Get the test result of the given dolphin
				// All the data of that dolphin
			if(numMonths === 10) {
				const queryAllResults = await GoodFeedingService.getTestResultByDolphin(name, roleName);
				res.status(200).json(queryAllResults);
			}
				// Past numMonths data of that dolphin
			const queryResult = await GoodFeedingService.getTestResultNMonths(name, numMonths, roleName);
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
