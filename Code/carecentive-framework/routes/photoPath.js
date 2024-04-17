const express = require('express');
const router = express.Router();
/*const {
	goodHealthPostValidateRequestBody,
} = require('../validators/dolphinWetValidators');*/
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const { uploadPhoto } = require('../controllers/photoUpload');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	uploadPhoto
);

module.exports = router;
