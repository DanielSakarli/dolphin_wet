const request = require('supertest');
const app = require('../app');
const {
	setupTestBd,
	loginUser,
	registerUser,
	test_dolphin,
} = require('./setup');

const knexInstance = setupTestBd();

// Set up test database.
beforeAll(async () => {
	await registerUser();
	await knexInstance('dolphins').del();
	return knexInstance('dolphins').insert([
		{
			name: 'jest_dolphin1',
			sex: 1,
			on_site: 1,
			year_of_birth: 2010,
			place_of_birth: 'somewhere',
		},
		{
			name: 'jest_dolphin2',
			sex: 0,
			on_site: 1,
			year_of_birth: 2050,
			place_of_birth: 'anywhere',
		},
	]);
});

// Clean database.
afterAll(() => {
	return Promise.all([
		knexInstance('dolphins').del(),
		knexInstance('users').del(),
	]).then(() => {
		knexInstance.destroy();
	});
});

/**
 * Test dolphin api endpoint
 */
describe('dolphins api test', () => {
	describe('GET /api/dolphins', () => {
		test('should response with a list of json object containing the dolphin info', async () => {
			const response = await request(app)
				.get('/api/dolphins')
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(200);
			expect(response.body[0].name).toEqual('jest_dolphin1');
			expect(response.body[1].name).toEqual('jest_dolphin2');
		});
	});

	describe('GET /api/dolphin/:name', () => {
		test('should response with a json object containing the info of the given dolphin name', async () => {
			const response = await request(app)
				.get('/api/dolphins/jest_dolphin1')
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(200);
			expect(response.body.name).toEqual('jest_dolphin1');
		});
		test('should response 404 when the dolphin does not exist in database', async () => {
			const response = await request(app)
				.get('/api/dolphins/jest_dolphin999')
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(404);
		});
	});

	describe('POST /api/dolphins', () => {
		test('request without valid login token should response with 401 unauthorized', async () => {
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.send(test_dolphin);
			expect(response.status).toEqual(401);
		});

		test('request with valid body should response with a json object containing the info of created dolphin ', async () => {
			const jwtTokenForTestUser = await loginUser();
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(test_dolphin);
			expect(response.header['content-type']).toMatch(/json/);
			expect(response.status).toEqual(201);
			expect(response.body.name).toEqual(test_dolphin.name);
		});
		test('request with invalid dolphin info body should response with error', async () => {
			const jwtTokenForTestUser = await loginUser();
			const { sex, ...test_dolphin_invalid } = test_dolphin;
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(test_dolphin_invalid);
			expect(response.status).toEqual(400);
		});
		test('request with the same dolphin name should response with error', async () => {
			const jwtTokenForTestUser = await loginUser();
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(test_dolphin);
			expect(response.status).toEqual(409);
		});
	});

	describe('PATCH /api/dolphins', () => {
		test('request without login should response with 401 unauthorized', async () => {
			const response = await request(app)
				.patch('/api/dolphins/jest_dolphin1')
				.set('Accept', 'application/json')
				.send({ on_site: 0 });
			expect(response.status).toEqual(401);
		});
		test('request with valid body should response with a json object containing the info of updated dolphin', async () => {
			const jwtTokenForTestUser = await loginUser();
			const response = await request(app)
				.patch('/api/dolphins/jest_dolphin1')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send({ on_site: 0 });
			expect(response.status).toEqual(200);
			expect(response.header['content-type']).toMatch(/json/);
			expect(response.body.name).toEqual('jest_dolphin1');
			expect(response.body.on_site).toEqual(0);
		});
		test('request with invalid body should response with 400', async () => {
			const jwtTokenForTestUser = await loginUser();
			const response = await request(app)
				.patch('/api/dolphins/jest_dolphin1')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send({ dolphin_id: 999 });
			expect(response.status).toEqual(400);
		});
	});

	describe('DELETE /api/dolphins', () => {
		test('request without login should response with 401 unauthorized', async () => {
			const response = await request(app)
				.delete('/api/dolphins/jest_dolphin2')
				.send();
			expect(response.status).toEqual(401);
		});
		test('after delete the dolphin should not exist in database anymore', async () => {
			const jwtTokenForTestUser = await loginUser();
			const response = await request(app)
				.delete('/api/dolphins/jest_dolphin2')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send();
			expect(response.status).toEqual(204);
			request(app)
				.get('/api/dolphins/jest_dolphin2')
				.set('Accept', 'application/json')
				.send()
				.expect(404);
		});
	});
});
