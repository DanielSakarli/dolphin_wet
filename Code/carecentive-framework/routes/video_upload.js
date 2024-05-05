const express = require('express');
const router = express.Router();
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');

/**
 * Controllers
 */
const { uploadVideo } = require('../controllers/videoUpload');

/**
 * Loads test result for good_health
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	uploadVideo
);

module.exports = router;
