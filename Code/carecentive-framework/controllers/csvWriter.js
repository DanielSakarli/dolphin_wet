const path = require('path');


async function csvWriter(req, res, next) {
    try {
    res.sendStatus(200);
    } catch (error) {
    console.error(error);
    // An unknown error occurred
    res.sendStatus(500);
    }
}

module.exports = csvWriter;
