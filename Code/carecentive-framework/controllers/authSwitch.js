const {
	authenticateToken,
} = require('../carecentive/carecentive-core/source/Authentication');

/**
 * This file contains a flag of whether applying user auth to all controllers.
 */
const isUserAuth = true;


/**
 * Wraps the authenticateToken middleware provided by carecentive with a isUserAuth parameter.
 * So that I can control whether do user auth in this middleware.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function authenticateTokenWithSwitch(req, res, next) {
	console.log('This is the cookie in our authenticateTokenWithSwitch() method: ', req.cookies);
	if (isUserAuth) {
		authenticateToken(req, res, next);
	} else {
		next();
	}
}

module.exports = { isUserAuth, authenticateTokenWithSwitch };
