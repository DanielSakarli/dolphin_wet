const request = require('supertest');
const app = require('../app');

// CONSTANTS FOR TEST PURPOSE
const userName = 'jest_test_user';
const userEmail = 'jest_test@example.test';
const userPassword = '123456789';
const test_dolphin = {
	name: 'dolphin_test',
	sex: 1,
	on_site: 1,
	year_of_birth: 2010,
	place_of_birth: 'Nuremberg',
};

function setupTestBd() {
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

function registerUser() {
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

module.exports = {
	userName,
	userEmail,
	userPassword,
	test_dolphin,
	setupTestBd,
	registerUser,
	loginUser,
};
