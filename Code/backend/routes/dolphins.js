const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const {
	getAllDolphins,
	getSingleDolphin,
	createDolphin,
	updateDolphin,
	deleteDolphin,
} = require('../controllers/dolphins');

// All dolphins
router.get('/', getAllDolphins);
router.post('/', createDolphin);

// Single dolphin
router.get('/:name', getSingleDolphin);
router.patch('/:name', updateDolphin);
router.delete('/:name', deleteDolphin);
router.patch('/:name', updateDolphin);

module.exports = router;
