const request = require('supertest');
const app = require('../../app');

async function loadDummyUser() {
	// Insert dummy users.
	// Because of the design of user table, it only stores the hashed password,
	// we can directly insert password into the data,
	// therefore here we use supertest to make a post request.
	return request(app)
		.post('/api/users/register')
		.set('Content-Type', 'application/json')
		.send({
			name: 'john doe',
			email: 'john.doe@example.email',
			password: 'secret_password',
		});
}

module.exports = loadDummyUser;
