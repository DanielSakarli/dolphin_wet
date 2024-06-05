const { validationResult } = require('express-validator');
const { isUserAuth } = require('./authSwitch');
const GoodHealthService = require('../services/GoodHealthService');

/**
 * Controller of post request of /api/good_health.
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
			//console.log('authdata: ', req.authData);
			userID = user_id;
			userName = name;
			const roleName = req.role;
			// attach userID to test result in req.body
			let test_result = req.body;
			test_result = { userID, user_name: userName, ...test_result };

		///////////////////////////////////////////////////////////////////////////
		// Get the photo paths from the session storage
		// Reset the photo_path in session storage, so no duplicate photo paths
		//req.session.photo_path = {};
		//console.log('App.use Photo_path in session storage: ' + req.session.photo_path);
			
		if(req.session && (req.session.photo_path.eye_photo_path != 'empty' || req.session.photo_path.teeth_photo_path != 'empty' || req.session.photo_path.odontogramm_photo_path != 'empty' || req.session.photo_path.marks_photo_path != 'empty' || req.session.video_path != 'empty')) {
			// attach userID to test result in req.body
			let test_result = req.body;
			test_result = { user_id: userID, user_name: userName, ...test_result };

			/*console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.eye_photo_path);
			console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.teeth_photo_path);	
			console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.odontogramm_photo_path);
			console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.marks_photo_path);*/

			//First check if session storage exists at all	
			if(req.session.photo_path.eye_photo_path != 'empty')
				{
					console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.eye_photo_path);
				// Iterate over the arrays in test_result
				
					// Check if the dolphin_name in the array is 'Dolly'
					if (test_result.dolphin_name === req.session.dolphin_name) {
					// Append eye_photo_path to the array
					test_result.eye_photo_path = req.session.photo_path.eye_photo_path.toString();
					//fileData = fs.readFileSync(test_result.eye_photo_path);
					//test_result.image = fileData;
					//console.log(fileData);
					console.log('test result eye path: ', test_result.eye_photo_path, 'for dolphin: ', test_result.dolphin_name);
				}
				
				}

			if(req.session.photo_path.teeth_photo_path != 'empty')
				{
					console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.teeth_photo_path);
				// Iterate over the arrays in test_result
				
					// Check if the dolphin_name in the array is 'Dolly'
					if (test_result.dolphin_name === req.session.dolphin_name) {
					// Append teeth_photo_path to the array
					test_result.teeth_photo_path = req.session.photo_path.teeth_photo_path.toString();
					//fileData = fs.readFileSync(test_result.teeth_photo_path);
					//test_result.image = fileData;
					console.log('test result teeth path: ', test_result.teeth_photo_path, 'for dolphin: ', test_result.dolphin_name);
				}
				
				}

			if(req.session.photo_path.odontogramm_photo_path != 'empty')
				{
					console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.odontogramm_photo_path);
				// Iterate over the arrays in test_result
				
					// Check if the dolphin_name in the array is 'Dolly'
					if (test_result.dolphin_name === req.session.dolphin_name) {
					// Append teeth_photo_path to the array
					test_result.odontogramm_photo_path = req.session.photo_path.odontogramm_photo_path.toString();
					//fileData = fs.readFileSync(test_result.teeth_photo_path);
					//test_result.image = fileData;
					console.log('test result odontogramm path: ', test_result.odontogramm_photo_path, 'for dolphin: ', test_result.dolphin_name);
					}
				}

			if(req.session.photo_path.marks_photo_path != 'empty')
				{
					console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.marks_photo_path);
				// Iterate over the arrays in test_result
				
					// Check if the dolphin_name in the array is 'Dolly'
					if (test_result.dolphin_name === req.session.dolphin_name) {
					// Append marks_photo_path to the array
					test_result.marks_photo_path = req.session.photo_path.marks_photo_path.toString();
					console.log('test result marks path: ', test_result.marks_photo_path, 'for dolphin: ', test_result.dolphin_name);
					}
				}

				if(req.session.photo_path.silhouette_photo_path != 'empty')
					{
						console.log('Photo path in req.session in good_health.js: ' + req.session.photo_path.silhouette_photo_path);
					// Iterate over the arrays in test_result
					
						// Check if the dolphin_name in the array is e.g. 'Dolly'
						if (test_result.dolphin_name === req.session.dolphin_name) {
						// Append silhouette_photo_path to the array
						test_result.silhouette_photo_path = req.session.photo_path.silhouette_photo_path.toString();
						//fileData = fs.readFileSync(test_result.silhouette_photo_path);
						//test_result.image = fileData;
						//console.log(fileData);
						console.log('test result silhouette path: ', test_result.silhouette_photo_path, 'for dolphin: ', test_result.dolphin_name);
					}
					
					}
			
				if(req.session.video_path != 'empty')
					{
						console.log('Video path in req.session in good_health.js: ' + req.session.video_path);
					// Iterate over the arrays in test_result
					
						// Check if the dolphin_name in the array is 'Dolly'
						if (test_result.dolphin_name === req.session.dolphin_name) {
						// Append eye_photo_path to the array
						test_result.video_path = req.session.video_path.toString();
						//fileData = fs.readFileSync(test_result.eye_photo_path);
						//test_result.image = fileData;
						//console.log(fileData);
						console.log('test result video path: ', test_result.video_path, 'for dolphin: ', test_result.dolphin_name);
					}
					
					}

				const insertedResult = await GoodHealthService.loadTestResult(test_result, roleName);
				res.status(201).json(insertedResult);
		} else {
		///////////////////////////////////////////////////////////////////////////
		// NO photo path to upload
		// attach userID to test result in req.body
			let test_result = req.body;
			
			test_result = { user_id: userID, user_name: userName, ...test_result };
			console.log('No photo or video to be uploaded for this dolphin: ', test_result.dolphin_name);
			const insertedResult = await GoodHealthService.loadTestResult(test_result, roleName);
			
			res.status(201).json(insertedResult);
		}
	}
	} catch (error) {
		next(error);
	}
}

/**
 * Controller of get request of /api/good_health?name.
 * Gets the test result in the database.
 * By default it returns the test results of last three months of the given dolphin.
 */
async function getTestResult(req, res, next) {
	try {
		if (isUserAuth) {
			console.log('authdata: ', req.authData);
			const { user_id } = req.authData;
			const userID = user_id;
			const roleName = req.role;
			console.log('User ID: ', userID);
		// Gets the dolphin name
		const { name, numMonths } = req.query;
		console.log('name: ', name);
		if(name === '') {
		// when name is '' it should get the data of all dolphins
		// If numMonths is 10, return all results, not just past 10 months
		if(numMonths === 10) {
			const queryAllResults = await GoodHealthService.getAllTestResults(roleName);
			res.status(200).json(queryAllResults);
		}
		// All dolphins for specific months
		const queryResult = await GoodHealthService.getAllTestResultNMonths(numMonths, roleName);
		res.status(200).json(queryResult);
		} else {
			// Get the test result of the given dolphin
				// All the data of that dolphin
			if(numMonths === 10) {
				const queryAllResults = await GoodHealthService.getTestResultByDolphin(name, roleName);
				res.status(200).json(queryAllResults);
			}
				// Past numMonths data of that dolphin
			const queryResult = await GoodHealthService.getTestResultNMonths(name, numMonths, roleName);
			res.status(200).json(queryResult);
		}
	} else {
		res.status(400).json('USER_IS_NOT_AUTHENTICATED');
	}
	} catch (error) {
		next(error);
	}
}

module.exports = { setResult, getTestResult };
