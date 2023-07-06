const request = require('supertest');
const app = require('../app');

/**
 * Sets up the database for test purpose.
 * @returns Knex database connection instance.
 */
function setupTestDb() {
	const knexInstance = require('knex')({
		client: 'mysql2',
		connection: {
			host: process.env.MYSQL_HOST,
			database: process.env.MYSQL_DATABASE,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
		},
	});
	return knexInstance;
}

/**
 * Dolphin database.
 */
function testDolphin(knexInstance) {
	const test_dolphin1 = {
		name: 'dolphin_test1',
		sex: 1,
		on_site: 1,
		year_of_birth: 2010,
		place_of_birth: 'Nuremberg',
	};
	const test_dolphin2 = {
		name: 'dolphin_test2',
		sex: 0,
		on_site: 1,
		year_of_birth: 2011,
		place_of_birth: 'Fuerth',
	};
	const test_dolphin3 = {
		name: 'dolphin_test3',
		sex: 1,
		on_site: 1,
		year_of_birth: 2012,
		place_of_birth: 'Elangen',
	};

	/**
	 * Gets all test dolphins in database.
	 * @returns {Array} array of all test dolphins data in database table.
	 */
	function getAllTestDolphins() {
		return [test_dolphin1, test_dolphin2, test_dolphin3];
	}

	/**
	 * Deletes all dolphin in database table.
	 * @returns {Promise<void>}
	 */
	async function deleteDolphins() {
		await knexInstance('dolphins').del();
		return;
	}

	/**
	 * Adds test dolphins to database table.
	 * @returns {Promise<void>}
	 */
	async function setDolphins() {
		return await knexInstance('dolphins').insert([
			test_dolphin1,
			test_dolphin2,
			test_dolphin3,
		]);
	}

	return { deleteDolphins, setDolphins, getAllTestDolphins };
}

/**
 * User test.
 * @returns {Object} functions of user operation for test purpose.
 */
function testUser(knexInstance) {
	const userName = 'jest_test_user';
	const userEmail = 'jest_test@example.test';
	const userPassword = '123456789';

	/**
	 * Registers a user via user api endpoint.
	 * @returns
	 */
	async function registerUser() {
		// register a user
		return request(app)
			.post('/api/users/register')
			.set('Content-Type', 'application/json')
			.send({
				name: userName,
				email: userEmail,
				password: userPassword,
			});
	}

	/**
	 * Login a user via user api endpoint.
	 * @returns JWT token after login.
	 */
	async function loginUser() {
		// login and get the jwt token
		const userLogin = await request(app)
			.post('/api/users/login')
			.set('Content-Type', 'application/json')
			.send({
				username: userName,
				password: userPassword,
			});
		const jwtToken = userLogin.body;
		return jwtToken;
	}

	async function deleteUser() {
		await knexInstance('users').del();
		return;
	}

	return { registerUser, loginUser, deleteUser };
}

module.exports = {
	setupTestDb,
	testDolphin,
	testUser,
};
