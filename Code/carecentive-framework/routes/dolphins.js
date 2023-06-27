const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
	authenticateToken,
} = require('@carecentive/carecentive-core/source/Authentication');

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

/**
 * @swagger
 * components:
 *   schemas:
 *     dolphins:
 *       type: object
 *       required:
 *        - name
 *        - birthday
 *        - place_of_birth
 *        - sex
 *       properties:
 *         name:
 *           type: string
 *           description: The name of dolphin
 *         birthday:
 *           type: string
 *           description: The birthday of dolphin
 *         place_of_birth:
 *           type: string
 *           description: The place of birth of dolphin
 *         sex:
 *           type: string
 *           description: The sex of dolphin
 *         on_site:
 *           type: boolean
 *       example:
 *         name: John Doe
 *         birthday: 2010-01-01
 *         place_of_birth: Nuremberg
 *
 */

/**
 * @swagger
 * tags:
 *   name: dolphins
 *   description: create, read, update, and delete dolphins
 */

/**
 * @swagger
 * /api/dolphins:
 *   get:
 *     summary: Returns all dolphins in database
 *     tags: [dolphins]
 *     responses:
 *       200:
 *         description: the list of all dolphins
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/dolphins'
 */
router.get('/', getAllDolphins);

/**
 * @swagger
 * /api/dolphins:
 *   post:
 *     summary: Create a new dolphin in database
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     tags: [dolphins]
 *     parameters:
 *       - in: body
 *         name: dolphin
 *         description: The dolphin to create in database
 *         schema:
 *           $ref: '#/components/schemas/dolphins'
 *     responses:
 *       200:
 *         description: The dolphin was successfully created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/dolphins'
 *       500:
 *         description: Some server error
 */
const validateRequestBody = [
	// Validation rules generated by express-validator
	body('name').notEmpty().withMessage('Name is required'),
	body('sex')
		.isInt({ min: 0, max: 1 })
		.withMessage('Sex should be either 0 or 1'),
	body('on_site')
		.isInt({ min: 0, max: 1 })
		.withMessage('On-site value should be either 0 or 1'),
	body('year_of_birth')
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('Invalid year of birth'),
	body('place_of_birth').notEmpty().withMessage('Place of birth is required'),
];
// router.post('/', authenticateToken, validateRequestBody, createDolphin);
router.post('/', validateRequestBody, createDolphin);

// Single dolphin
/**
 * @swagger
 * /api/dolphins/{name}:
 *   get:
 *     summary: get one dolphin info using name
 *     tags: [dolphins]
 *     parameters:
 *       - in: path
 *         name: name
 *         description: the name of dolphin
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: get dolphin successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/dolphins'
 *       500:
 *         description: some server error
 *
 */
router.get('/:name', getSingleDolphin);

/**
 * @swagger
 * /api/dolphins/{name}:
 *   patch:
 *     summary: update the info of a dolphin
 *     tags: [dolphins]
 *     parameters:
 *       - in: path
 *         name: name
 *         description: the name of dolphin
 *         schema:
 *           type: string
 *         required: true
 */
// Patch request validation rules
const patchDolphinValidationRules = [
	// Validate update information
	body().custom((value) => {
		const allowedFields = [
			'on_site',
			'name',
			'sex',
			'year_of_birth',
			'place_of_birth',
		];
		const keys = Object.keys(value);

		// Check if any key is not allowed
		const disallowedKeys = keys.filter((key) => !allowedFields.includes(key));
		if (disallowedKeys.length > 0) {
			throw new Error(`Invalid update fields: ${disallowedKeys.join(', ')}`);
		}

		return true;
	}),
];

// router.patch(
// 	'/:name',
// 	authenticateToken,
// 	patchDolphinValidationRules,
// 	updateDolphin
// );
router.patch('/:name', patchDolphinValidationRules, updateDolphin);

/**
 * @swagger
 * /api/dolphins/{name}:
 *   delete:
 *     summary: delete a dolphin in database
 *     tags: [dolphins]
 *     parameters:
 *       - in: path
 *         name: name
 *         description: the name of dolphin
 *         schema:
 *           type: string
 *         required: true
 */
// router.delete('/:name', authenticateToken, deleteDolphin);
router.delete('/:name', deleteDolphin);

module.exports = router;
