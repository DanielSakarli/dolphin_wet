const request = require('supertest');
const app = require('../app');
const { testUser, testDolphin, setupTestDb } = require('./setup');
const { getCurrentDate } = require('../source/CustomSource');
const { isUserAuth } = require('../controllers/authSwitch');

const knexInstance = setupTestDb();

// Set up test database.
beforeAll(async () => {
	await testUser(knexInstance).registerUser();
	await testDolphin(knexInstance).deleteDolphins();
	await testDolphin(knexInstance).setDolphins();
});

// Clean database.
afterAll(async () => {
	await knexInstance('good_feeding').del();
	await testUser(knexInstance).deleteUser();
	await testDolphin(knexInstance).deleteDolphins();
	await knexInstance.destroy();
});

describe('good_feeding api tests', () => {
	const dolphin_test = testDolphin().getAllTestDolphins()[0];
	describe('POST /api/good_feeding', () => {
		test('request without login should response with 401 unauthorized', async () => {
			if (isUserAuth) {
				const response = await request(app)
					.post('/api/good_feeding')
					.set('Accept', 'application/json')
					.send();
				expect(response.status).toEqual(401);
			} else {
				expect(true).toBe(true);
			}
		});
		test('request with login user and valid test info should response with 201 and the info of test', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const dolphinQueryResult = await knexInstance('dolphins')
				.select('dolphin_id')
				.where('name', dolphin_test.name);
			const dolphinId = dolphinQueryResult[0].dolphin_id;
			const testGoodFeedingResult = {
				// user_id: userId,
				dolphin_name: dolphin_test.name,
				body_condition_score: 3,
				weight: 3,
				weight_measured: 15.5,
				kcal_calculations: 3,
				blood_hydration: 1,
				fish_quality: 3,
				fish_variety: 3,
			};
			const response = await request(app)
				.post('/api/good_feeding')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.set('Accept', 'application/json')
				.send(testGoodFeedingResult);
			expect(response.status).toEqual(201);

			const userQueryResult = await knexInstance('users')
				.select('id')
				.where('name', 'jest_test_user');
			const userId = userQueryResult[0].id;
			const goodFeedingQueryResult = await knexInstance('good_feeding')
				.select('feeding_record_id')
				.where('dolphin_id', dolphinId);
			const goodFeedingId = goodFeedingQueryResult[0].feeding_record_id;
			const toBeGoodFeedingResultInDatabase = {
				...testGoodFeedingResult,
				user_id: userId,
				dolphin_id: dolphinId,
				feeding_record_id: goodFeedingId,
			};
			expect(response.body).toEqual(toBeGoodFeedingResultInDatabase);
		});

		test('request with invalid body should response with 400 bad request', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const response = await request(app)
				.post('/api/good_feeding')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.set('Accept', 'application/json')
				.send({});
			expect(response.status).toEqual(400);
		});

		test('request without values that are optional should response with 201', async () => {
			const jwtTokenForTestUser = await testUser().loginUser();
			const dolphinQueryResult = await knexInstance('dolphins')
				.select('dolphin_id')
				.where('name', dolphin_test.name);
			const dolphinId = dolphinQueryResult[0].dolphin_id;
			const testGoodFeedingResult = {
				// user_id: userId,
				dolphin_name: dolphin_test.name,
				body_condition_score: 3,
				// weight: 3,
				// weight_measured: 15.5,
				kcal_calculations: 3,
				blood_hydration: 1,
				fish_quality: 3,
				fish_variety: 3,
			};
			const response = await request(app)
				.post('/api/good_feeding')
				.set('Cookie', `token=${jwtTokenForTestUser}`)
				.set('Accept', 'application/json')
				.send(testGoodFeedingResult);
			expect(response.status).toEqual(201);
		});
	});

	describe('GET /api/good_feeding?date', () => {
		test('request without valid query params should response with 400 bad request', async () => {
			const response = await request(app)
				.get(`/api/good_feeding?233333`)
				.set('Accept', 'application/json')
				.send();
			expect(response.status).toEqual(400);
		});
		test('request with valid query params should response with result of good_feeding test of given date', async () => {
			const date = getCurrentDate();
			const response = await request(app)
				.get(`/api/good_feeding?date=${date}`)
				.set('Accept', 'application/json')
				.send();
			expect(response.status).toEqual(200);
		});
	});
});
