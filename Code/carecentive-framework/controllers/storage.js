const { isUserAuth } = require('./authSwitch');
const StorageService = require('../services/StorageService');

/**
 * Controller of post request of /api/good_health.
 * Loads the result into the database and response with the given result if it's valid.
 * @returns {Object} The inserted test result
 */
async function setSessionStorage(req, res, next) {
	try {
        if (isUserAuth) {
            const { user_id } = req.authData;
            
            await StorageService.setStorage(user_id, data);
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Controller of get request of /api/good_health.
 * Gets the test result based on given query params.
 * @returns {Object} The test result
 */
async function getSessionStorage(req, res, next) {
    try {
        if (isUserAuth) {

        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        next(error);
    }
}   
module.exports = {
    setSessionStorage,
    getSessionStorage
};