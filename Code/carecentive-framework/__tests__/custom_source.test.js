const { getOneMonthBefore } = require('../source/CustomSource');

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
