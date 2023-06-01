const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const authentication = require('carecentive-core/source/Authentication');

const UserService = require('carecentive-core/services/UserService');

const User = require('carecentive-core/models/User');

/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *       properties:
 *         name:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: user email
 *         password:
 *           type: string
 *           description: user password
 *       example:
 *         name: John Doe
 *         email: john.doe@example.email
 *         password: secret_password
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: create user
 *     tags: [users]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description:
 *           the user to create in database
 *         schema:
 *           $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was created successfully
 *       400:
 *         description: didn't provide full user info
 */
router.post('/register', async function (req, res, next) {
	try {
		if (!req.body.name) {
			return res.status(400).send('NAME_MUST_BE_PROVIDED.');
		}

		if (!req.body.email) {
			return res.status(400).send('EMAIL_MUST_BE_PROVIDED.');
		}

		if (!req.body.password) {
			return res.status(400).send('PASSWORD_MUST_BE_PROVIDED.');
		}

		await UserService.register(
			req.body.name,
			req.body.email,
			req.body.password
		);

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: user login
 *     tags: [users]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description:
 *           user info
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         content:
 *           string:
 *             example: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiam9obiBkb2UiLCJpYXQiOjE2ODU2MjEzNzAsImV4cCI6MTY4NTY2NDU3MH0.VXvBnOcUNHNND2HKXBfbcgk-Bb5GWlyYWNon6Go4cdE"'
 *         description: The token of user
 *       400:
 *         description: didn't provide full user info
 */
router.post('/login', async function (req, res, next) {
	try {
		let username = req.body.username;
		let password = req.body.password;

		if (!username) {
			return res.status(400).send('USERNAME_NOT_PROVIDED.');
		}

		if (!password) {
			return res.status(400).send('PASSWORD_NOT_PROVIDED.');
		}

		let token = await UserService.login(username, password);

		res.cookie('token', token, { httpOnly: true });
		return res.json(token);
	} catch (err) {
		next(err);
	}
});

router.get('/logout', async function (req, res, next) {
	try {
		res.clearCookie('token');
		res.end();
	} catch (err) {
		next(err);
	}
});

/**
 * @swagger
 * /api/users/changePassword:
 *   post:
 *     summary: change the password of a user
 *     tags: [users]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user info
 *         description:
 *           the new password of user
 *         schema:
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Changed password successfully
 *       400:
 *         description: didn't provide new password
 */
router.post(
	'/changePassword',
	authentication.authenticateToken,
	async function (req, res, next) {
		try {
			let userId = req.authData.user_id;

			if (!req.body.newPassword || req.body.newPassword === 0) {
				return res.status(400).send('NEW_PASSWORD_NOT_PROVIDED');
			}

			UserService.changePassword(userId, req.body.newPassword);

			// Hash password
			let newPasswordHash = await bcrypt.hash(req.body.newPassword, 12);

			await User.query()
				.patch({
					password_hash: newPasswordHash,
				})
				.findById(userId);

			res.sendStatus(200);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
