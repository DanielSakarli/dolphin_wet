const express = require('express');
const router = express.Router();
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { uploadFile } = require('../controllers/fileUpload');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	uploadFile
);

module.exports = router;
