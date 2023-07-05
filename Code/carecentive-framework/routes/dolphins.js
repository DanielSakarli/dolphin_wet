const express = require('express');
const router = express.Router();
const {
	dolphinPostValidateRequestBody,
	dolphinPatchValidateRequestBody,
} = require('../validators/dolphinWetValidators');

const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const {
	getAllDolphins,
	getSingleDolphin,
	createDolphin,
	updateDolphin,
	deleteDolphin,
} = require('../controllers/dolphins');

// Gets all dolphins.
router.get('/', getAllDolphins);

// Creates a dolphin.
router.post(
	'/',
	authenticateTokenWithSwitch,
	dolphinPostValidateRequestBody,
	createDolphin
);

// Gets a single dolphin.
router.get('/:name', getSingleDolphin);

// Updates a single dolphin.
router.patch(
	'/:name',
	authenticateTokenWithSwitch,
	dolphinPatchValidateRequestBody,
	updateDolphin
);

// Deletes a single dolphin.
router.delete('/:name', authenticateTokenWithSwitch, deleteDolphin);

module.exports = router;
