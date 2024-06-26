const request = require('supertest');
const app = require('../../app');
require('dotenv').config();

async function loadDummyUser() {
	// Insert dummy users.
	// Because of the design of user table, it only stores the hashed password,
	// we can directly insert password into the data,
	// therefore here we use supertest to make a post request.
	
	console.log('I got here');
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe1',
			email: 'john.doe@example.email',
			password: 'secret_password',
			roleName: 'Valencia',
			rolePassword: process.env.VALENCIA_USER_PASSWORD,
		});
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe2',
			email: 'john.doe2@example.email',
			password: 'secret_password',
			roleName: 'Duisburg',
			rolePassword: process.env.DUISBURG_USER_PASSWORD,
		});
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe3',
			email: 'john.doe@example.email',
			password: 'secret_password',
			roleName: 'Valencia',
			rolePassword: process.env.VALENCIA_USER_PASSWORD,
		});
		await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe4',
			email: 'doe4@gmx.de',
			password: '123456',
			roleName: 'Nuernberg',
			rolePassword: process.env.NUERNBERG_USER_PASSWORD,
		});
	return;
}

module.exports = loadDummyUser;
