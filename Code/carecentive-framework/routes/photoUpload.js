const express = require('express');
const router = express.Router();
const {
	photoPostValidateRequestBody,
} = require('../validators/photoValidator');
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { setPhoto, storage, upload } = require('../controllers/photoUpload');

/**
 * Loads photos
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	photoPostValidateRequestBody,
	setPhoto
);

module.exports = router;
