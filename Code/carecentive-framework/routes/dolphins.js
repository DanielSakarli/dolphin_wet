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
const { roleAuthorizerGet, roleAuthorizerPost } = require('../controllers/role_authorizer');

// Gets all dolphins.
router.get(
	'/',
	authenticateTokenWithSwitch,
	roleAuthorizerPost,
	getAllDolphins
);

// Creates a dolphin.
router.post(
	'/',
	authenticateTokenWithSwitch,
	roleAuthorizerPost,
	dolphinPostValidateRequestBody,
	createDolphin
);

// Gets a single dolphin.
router.get(
	'/:name',
	authenticateTokenWithSwitch,
	roleAuthorizerPost,
	getSingleDolphin
);

// Updates a single dolphin.
router.patch(
	'/:name',
	authenticateTokenWithSwitch,
	roleAuthorizerGet,
	dolphinPatchValidateRequestBody,
	updateDolphin
);

// Deletes a single dolphin.
router.delete(
	'/:name',
	authenticateTokenWithSwitch,
	roleAuthorizerGet,
	deleteDolphin
);

module.exports = router;
