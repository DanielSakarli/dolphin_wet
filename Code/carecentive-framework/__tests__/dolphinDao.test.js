const dolphinDAO = require('../dao/dolphinDao');
const { setupTestDb, testDolphin } = require('./setup');
const { DolphinError } = require('../source/Errors');

const knexInstance = setupTestDb();

beforeAll(async () => {
	await testDolphin(knexInstance).deleteDolphins();
	await testDolphin(knexInstance).setDolphins();
});

afterAll(() => {
	testDolphin(knexInstance)
		.deleteDolphins()
		.then(() => {
			knexInstance.destroy();
		});
});

describe('DolphinDAO tests', () => {
	const test_dolphin_inserted = {
		name: 'test_dolphin_inserted1',
		sex: 1,
		on_site: 1,
		year_of_birth: 2012,
		place_of_birth: 'no where',
	};
	const test_dolphin_duplicated = {
		name: 'dolphin_test1',
		sex: 1,
		on_site: 1,
		year_of_birth: 2011,
		place_of_birth: 'Nuremberg',
	};
	test('createDolphin: create a dolphin in database and should be there', async () => {
		const myDolphinDao = new dolphinDAO();
		await myDolphinDao.createDolphin(test_dolphin_inserted);
		const dolphinInsertResult = await knexInstance
			.select('name')
			.from('dolphins')
			.where('name', 'test_dolphin_inserted1')
			.first();
		expect(dolphinInsertResult.name).toBeTruthy();
		expect(dolphinInsertResult.name).toBe(test_dolphin_inserted.name);
	});

	test('createDolphin: create a dolphin with duplicated name should throw error', async () => {
		const myDolphinDao = new dolphinDAO();
		await myDolphinDao.createDolphin(test_dolphin_duplicated).catch((e) => {
			expect(e instanceof DolphinError).toBeTruthy();
		});
	});

	test('getDolphins: get all dolphins should return a list dolphin all dolphins data', async () => {
		const myDolphinDao = new dolphinDAO();
		const allDolphins = await myDolphinDao.getAllDolphins();
		expect(allDolphins.length).toBe(4);
	});

	test('getDolphinByName: get dolphin by name should return the given dolphin data', async () => {
		const myDolphinDao = new dolphinDAO();
		const dolphinName = testDolphin(knexInstance).getAllTestDolphins()[0].name;
		const dolphinByName = await myDolphinDao.getDolphinByName(dolphinName);
		expect(dolphinByName instanceof Object).toBeTruthy();
		expect(dolphinByName.name).toBe(dolphinName);
	});

	test('getDolphinByName: get dolphin by name which is not in database should return undefined', async () => {
		const myDolphinDao = new dolphinDAO();
		const dolphinByName = await myDolphinDao.getDolphinByName('imagination');
		expect(dolphinByName).toBeFalsy();
	});

	test('updateDolphinByName: cannot update info for dolphin that is not existed in database', async () => {
		const myDolphinDao = new dolphinDAO();
		await myDolphinDao
			.updateDolphinByName('imagination', { sex: 1 })
			.catch((e) => {
				expect(e instanceof DolphinError);
			});
	});

	test('updateDolphinByName: information should update', async () => {
		const myDolphinDao = new dolphinDAO();
		const updatedDolphin = await myDolphinDao.updateDolphinByName(
			'dolphin_test1',
			{ on_site: 0 }
		);
		const toBeUpdatedDolphin = testDolphin().getAllTestDolphins()[0];
		toBeUpdatedDolphin.on_site = 0;
		expect(updatedDolphin.on_site).toBe(0);
	});

	test('deleteDolphinByName: should delete the dolphin data in database', async () => {
		const myDolphinDao = new dolphinDAO();
		const dolphinName = testDolphin().getAllTestDolphins()[0].name;
		await myDolphinDao.deleteDolphinByName(dolphinName);
		const queryDolphinAfterDelete = await myDolphinDao.getDolphinByName(
			dolphinName
		);
		expect(queryDolphinAfterDelete).toBeFalsy();
	});
});
