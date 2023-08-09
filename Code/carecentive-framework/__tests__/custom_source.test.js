const { getOneMonthBefore, getLastNMonths } = require('../source/CustomSource');

describe('getOneMonthBefore unit test', () => {
	test('should return one month before', () => {
		const { year, month } = getOneMonthBefore(2023, 7);
		expect(year).toBe(2023);
		expect(month).toBe(6);
	});

	test('Input of January should return last year', () => {
		const { year, month } = getOneMonthBefore(2023, 1);
		expect(year).toBe(2022);
		expect(month).toBe(12);
	});
});

describe('getLastNMonths unit test', () => {
	test('input with 3 should return 3 months before', () => {
		const lastThreeMonths = getLastNMonths(3);
		expect(typeof lastThreeMonths === 'object').toBeTruthy();
		expect(lastThreeMonths.length).toBe(3);
		expect(lastThreeMonths[0].year).toBe(2023);
		expect(lastThreeMonths[0].month).toBe(7);
		expect(lastThreeMonths[1].year).toBe(2023);
		expect(lastThreeMonths[1].month).toBe(6);
		expect(lastThreeMonths[2].year).toBe(2023);
		expect(lastThreeMonths[2].month).toBe(5);
	});

	test('input with 5 should return 5 months before', () => {
		const lastFiveMonths = getLastNMonths(5);
		expect(typeof lastFiveMonths === 'object').toBeTruthy();
		expect(lastFiveMonths.length).toBe(5);
	});

	test('should handle months that lead to a change in the year', () => {
		const lastEightMonths = getLastNMonths(8);
		expect(lastEightMonths).toEqual([
			{ year: 2023, month: 7 },
			{ year: 2023, month: 6 },
			{ year: 2023, month: 5 },
			{ year: 2023, month: 4 },
			{ year: 2023, month: 3 },
			{ year: 2023, month: 2 },
			{ year: 2023, month: 1 },
			{ year: 2022, month: 12 },
		]);
	});

	test('should return an empty array when number of months is 0', () => {
		const lastThreeMonths = getLastNMonths(0);
		expect(lastThreeMonths).toEqual([]);
	});

	test('should handle negative number of months', () => {
		const lastThreeMonths = getLastNMonths(-2);
		expect(lastThreeMonths).toEqual([]);
	});
});
