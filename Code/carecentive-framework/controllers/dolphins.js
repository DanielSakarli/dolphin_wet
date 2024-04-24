const DolphinService = require('../services/DolphinService');
const { validationResult } = require('express-validator');

/**
 * Get all info of dolphins in database.
 */
async function getAllDolphins(req, res, next) {
	try {
		const dolphins = await DolphinService.getAllDolphins();
		res.status(200).json(dolphins);
	} catch (error) {
		res.status(500);
		next(error);
	}
}

/**
 * Get the info of a single dolphin.
 * In router, the param is set to 'name'.
 */
async function getSingleDolphin(req, res, next) {
	try {
		// Get the dolphin name in the router param.
		const dolphinName = req.params.name;

		const dolphin = await DolphinService.getOneDolphin(dolphinName);

		res.status(200).json(dolphin);
	} catch (error) {
		next(error);
	}
}

/**
 * Create a dolphin in database.
 */
async function createDolphin(req, res, next) {
	try {
		// Validates request body.
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}

		const dolphinObj = req.body;
		const dolphinCreated = await DolphinService.createDolphin(dolphinObj);
		res.status(201).json(dolphinCreated);
	} catch (error) {
		next(error);
	}
}

/**
 * Update the info of a given dolphin.
 */
async function updateDolphin(req, res, next) {
	try {
		// Validates request body.
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Handle validation errors
			return res.status(400).json({ errors: errors.array() });
		}

		const dolphinName = req.params.name;
		const updateInfo = req.body;
		const dolphinUpdated = await DolphinService.updateDolphin(
			dolphinName,
			updateInfo
		);
		res.status(200).json(dolphinUpdated);
	} catch (error) {
		next(error);
	}
}

/**
 * Delete a dolphin.
 */
async function deleteDolphin(req, res, next) {
	try {
		const dolphinName = req.params.name;
		await DolphinService.deleteDolphin(dolphinName);
		// Return all existing dolphins after deleting the given one.
		const dolphins = await DolphinService.getAllDolphins();
		res.status(200).json(dolphins);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllDolphins,
	getSingleDolphin,
	createDolphin,
	updateDolphin,
	deleteDolphin,
};
