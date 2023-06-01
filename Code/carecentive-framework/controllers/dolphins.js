/**
 * Get all info of dolphins in database.
 */
function getAllDolphins(err, req, res, next) {
	try {
		res.json([{ item: 'all items' }]);
	} catch (error) {
		next(err);
	}
}

/**
 * Get the info of a single dolphin.
 * In router, the param is set to 'name'.
 */
function getSingleDolphin(req, res) {
	// res.json({ name: req.params.name });
}

/**
 * Create a dolphin in database.
 */
function createDolphin(req, res) {
	console.log(req.body);
	res.json(req.body);
}

/**
 * Update the info of a given dolphin.
 */
function updateDolphin(req, res) {
	res.send('update dolphin');
}

/**
 * Delete a dolphin.
 */
function deleteDolphin(req, res) {
	res.send('delete dolphin');
}

module.exports = {
	getAllDolphins,
	getSingleDolphin,
	createDolphin,
	updateDolphin,
	deleteDolphin,
};
