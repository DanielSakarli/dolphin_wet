const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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
console.log(uuidv4());

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
 *       example:
 *         name: John Doe
 *         birthday: 2010-01-01
 *         place_of_birth: Nuremberg
 *
 */

// All dolphins
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
 *         description: this list of all dolphins
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
router.get('/:name', getSingleDolphin);
router.patch('/:name', updateDolphin);
router.delete('/:name', deleteDolphin);
router.patch('/:name', updateDolphin);

module.exports = router;
