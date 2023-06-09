const GoodFeedingService = require('../services/GoodFeedingService');

async function setResult(req, res, next) {
	res.send('hello');
}

module.exports = { setResult };
