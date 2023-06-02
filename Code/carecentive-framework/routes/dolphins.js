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
router.post('/', createDolphin);

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
router.patch('/:name', updateDolphin);

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
router.delete('/:name', deleteDolphin);

module.exports = router;
