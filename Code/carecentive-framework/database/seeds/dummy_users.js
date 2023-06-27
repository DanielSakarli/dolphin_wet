const request = require('supertest');
const app = require('../../app');

async function loadDummyUser() {
	// Insert dummy users.
	// Because of the design of user table, it only stores the hashed password,
	// we can directly insert password into the data,
	// therefore here we use supertest to make a post request.
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe1',
			email: 'john.doe@example.email',
			password: 'secret_password',
		});
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe2',
			email: 'john.doe2@example.email',
			password: 'secret_password',
		});
	await request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe3',
			email: 'john.doe@example.email',
			password: 'secret_password',
		});
	return;
}

module.exports = loadDummyUser;
