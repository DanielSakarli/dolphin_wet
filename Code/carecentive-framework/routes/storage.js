const express = require('express');
const router = express.Router();
const { authenticateTokenWithSwitch } = require('../controllers/authSwitch');
const { query } = require('express-validator');

/**
 * Controllers
 */
const { setSessionStorage, getSessionStorage } = require('../controllers/storage');

/**
 * Sets the Redis in-memory storage
 */
router.post(
	'/',
	authenticateTokenWithSwitch,
	setSessionStorage
);

/**
 * Gets the Redis in-memory storage
 */
router.get(
    '/',
    authenticateTokenWithSwitch,
    getSessionStorage
);

module.exports = router;
