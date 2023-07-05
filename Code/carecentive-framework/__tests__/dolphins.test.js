const request = require('supertest');
const app = require('../app');
const { setupTestDb, testUser, testDolphin } = require('./setup');
const isUserAuth = require('../controllers/authSwitch');

const knexInstance = setupTestDb();

// Set up test database.
beforeAll(async () => {
	await testUser(knexInstance).registerUser();
	await testDolphin(knexInstance).deleteDolphins();
	await testDolphin(knexInstance).setDolphins();
});

// Clean database.
afterAll(async () => {
	await testUser(knexInstance).deleteUser();
	await testDolphin(knexInstance).deleteDolphins();
	await knexInstance.destroy();
});

/**
 * Test dolphin api endpoint
 */
describe('dolphins api test', () => {
	const testDolphins = testDolphin(knexInstance).getAllTestDolphins();
	const apiTestDolphin = {
		name: 'api_test',
		sex: 1,
		on_site: 1,
		year_of_birth: 2000,
		place_of_birth: 'test',
	};
	const apiTestDolphinInvalid = {
		name: 'api_test_invalid',
		sex: 2,
		on_site: 1,
		year_of_birth: 2000,
		place_of_birth: 'test',
	};

	describe('GET /api/dolphins', () => {
		test('should response with a list of json object containing the dolphin info', async () => {
			const response = await request(app)
				.get('/api/dolphins')
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(200);
			expect(response.body[0].name).toEqual(testDolphins[0].name);
			expect(response.body[1].name).toEqual(testDolphins[1].name);
			expect(response.body[2].name).toEqual(testDolphins[2].name);
		});
	});

	describe('GET /api/dolphin/:name', () => {
		test('should response with a json object containing the info of the given dolphin name', async () => {
			const response = await request(app)
				.get(`/api/dolphins/${testDolphins[0].name}`)
				.set('Accept', 'application/json');
			expect(response.headers['content-type']).toMatch(/json/);
			expect(response.status).toEqual(200);
			expect(response.body.name).toEqual(testDolphins[0].name);
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
			// only test it when user auth sets to true.
			if (isUserAuth) {
				const response = await request(app)
					.post('/api/dolphins')
					.set('Accept', 'application/json')
					.send(testDolphins[0]);
				expect(response.status).toEqual(401);
			} else {
				expect(true).toBe(true);
			}
		});

		test('request with valid body should response with a json object containing the info of created dolphin ', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(apiTestDolphin);
			expect(response.header['content-type']).toMatch(/json/);
			expect(response.status).toEqual(201);
			expect(response.body.name).toEqual(apiTestDolphin.name);
		});
		test('request with invalid dolphin info body should response with error', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(apiTestDolphinInvalid);
			expect(response.status).toEqual(400);
		});
		test('request with the same dolphin name should response with error', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.post('/api/dolphins')
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send(testDolphins[0]);
			expect(response.status).toEqual(409);
		});
	});

	describe('PATCH /api/dolphins', () => {
		test('request without login should response with 401 unauthorized', async () => {
			const response = await request(app)
				.patch(`/api/dolphins/${testDolphins[1]}`)
				.set('Accept', 'application/json')
				.send({ on_site: 0 });
			expect(response.status).toEqual(401);
		});
		test('request with valid body should response with a json object containing the info of updated dolphin', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.patch(`/api/dolphins/${testDolphins[1].name}`)
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send({ on_site: 0 });
			expect(response.status).toEqual(200);
			expect(response.header['content-type']).toMatch(/json/);
			expect(response.body.name).toEqual(testDolphins[1].name);
			expect(response.body.on_site).toEqual(0);
		});
		test('request with invalid body should response with 400', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.patch(`/api/dolphins/${testDolphins[1]}`)
				.set('Accept', 'application/json')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.send({ dolphin_id: 999 });
			expect(response.status).toEqual(400);
		});
	});

	// describe('DELETE /api/dolphins', () => {
	// 	test('request without login should response with 401 unauthorized', async () => {
	// 		const response = await request(app)
	// 			.delete('/api/dolphins/jest_dolphin2')
	// 			.send();
	// 		expect(response.status).toEqual(401);
	// 	});
	// 	test('after delete the dolphin should not exist in database anymore', async () => {
	// 		const jwtTokenForTestUser = await loginUser();
	// 		const response = await request(app)
	// 			.delete('/api/dolphins/jest_dolphin2')
	// 			.set('Cookie', `token=${jwtTokenForTestUser}`)
	// 			.send();
	// 		expect(response.status).toEqual(204);
	// 		request(app)
	// 			.get('/api/dolphins/jest_dolphin2')
	// 			.set('Accept', 'application/json')
	// 			.send()
	// 			.expect(404);
	// 	});
	// });
});
