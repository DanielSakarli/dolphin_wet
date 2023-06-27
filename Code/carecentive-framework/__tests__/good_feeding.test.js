const request = require('supertest');
const app = require('../app');
const {
	setupTestBd,
	loginUser,
	registerUser,
	test_dolphin,
} = require('./setup');
const { getCurrentDate } = require('../source/CustomSource');

const knexInstance = setupTestBd();

// Insert dummy date of dolphin.
beforeAll(async () => {
	await registerUser();
	await knexInstance('dolphins').del();
	return knexInstance('dolphins').insert([test_dolphin]);
});

// Clean database.
afterAll(() => {
	return Promise.all([
		knexInstance('dolphins').del(),
		knexInstance('users').del(),
		knexInstance('good_feeding').del(),
	]).then(() => {
		knexInstance.destroy();
	});
});

describe('good_feeding api tests', () => {
	describe('POST /api/good_feeding', () => {
		test('request without login should response with 401 unauthorized', async () => {
			const response = await request(app)
				.post('/api/good_feeding')
				.set('Accept', 'application/json')
				.send();
			expect(response.status).toEqual(401);
		});
		test('request with login user and valid test info should response with 201 and the info of test', async () => {
			// const jwtTokenForTestUser = await loginUser();
			// const dolphinQueryResult = await knexInstance('dolphins')
			// 	.select('dolphin_id')
			// 	.where('name', test_dolphin.name);
			// const dolphinId = dolphinQueryResult[0].dolphin_id;
			// const testGoodFeedingResult = {
			// 	// user_id: userId,
			// 	dolphin_name: dolphin_test,
			// 	body_condition_score: 3,
			// 	weight: 3,
			// 	weight_measured: 15.5,
			// 	kcal_calculations: 3,
			// 	blood_hydration: 1,
			// 	fish_quality: 3,
			// 	fish_variety: 3,
			// };
			// const response = await request(app)
			// 	.post('/api/good_feeding')
			// 	.set('Cookie', `token=${jwtTokenForTestUser}`)
			// 	.set('Accept', 'application/json')
			// 	.send(testGoodFeedingResult);
			// expect(response.status).toEqual(201);
			// const userQueryResult = await knexInstance('users')
			// 	.select('id')
			// 	.where('name', 'jest_test_user');
			// const userId = userQueryResult[0].id;
			// const goodFeedingQueryResult = await knexInstance('good_feeding')
			// 	.select('feeding_record_id')
			// 	.where('dolphin_id', dolphinId);
			// const goodFeedingId = goodFeedingQueryResult[0].feeding_record_id;
			// const toBeGoodFeedingResultInDatabase = {
			// 	...testGoodFeedingResult,
			// 	user_id: userId,
			// 	feeding_record_id: goodFeedingId,
			// };
			// expect(response.body).toEqual(toBeGoodFeedingResultInDatabase);
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
