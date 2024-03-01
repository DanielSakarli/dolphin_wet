const express = require('express');
const router = express.Router();
/*const {
	photoPostValidateRequestBody,
} = require('../validators/photoValidator');*/
//const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { handlePhotoUpload } = require('../controllers/photoUpload');

/**
 * Loads photos
 */
router.post(
	'/',
	//authenticateTokenWithSwitch,
	//photoPostValidateRequestBody, //Commented out to allow for testing
	handlePhotoUpload
);

module.exports = router;
