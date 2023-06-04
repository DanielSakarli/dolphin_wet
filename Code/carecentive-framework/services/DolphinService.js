const Dolphins = require('../models/Dolphins');

class DolphinService {
	/**
	 * Get all dolphins info from database.
	 * @returns a list of all dolphin info in the database.
	 */
	static async getAllDolphins() {
		try {
			const dolphins = await Dolphins.query();
			return dolphins;
		} catch (error) {
			throw new Error('Error when getting all dolphins from database');
		}
	}

	/**
	 * Get single dolphin based on name.
	 * @params the name of dolphin.
	 * @returns the info of dolphin in database.
	 */
	static async getOneDolphin(name) {
		try {
			const lowerName = name.toLowerCase();
			const dolphin = await Dolphins.query()
				.select()
				.where('name', '=', lowerName);
			return dolphin;
		} catch (error) {
			throw new Error(`Error when getting dolphin ${name}`);
		}
	}

	/**
	 * Create a dolphin in the database
	 * @param {name, sex, on_site, year_of_birth, place_of_birth} dolphinObj
	 */
	static async createDolphin(dolphinObj) {
		try {
			const { name, sex, on_site, year_of_birth, place_of_birth } = dolphinObj;
			const dolphinExisted = await Dolphins.query()
				.select()
				.where('name', '=', name);
			if (dolphinExisted.length > 0) {
				const error = new Error(`Dolphin ${name} already existed!`);
				error.statusCode = 409;
				throw error;
			}
			const dolphin = await Dolphins.query().insert({
				name,
				sex,
				on_site,
				year_of_birth,
				place_of_birth,
			});
			return dolphin;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update the information of the given dolphin in the database.
	 * @param name the name of dolphin.
	 * @param {*} updateInfo
	 */
	static async updateDolphin(name, updateInfo) {
		try {
			const dolphinName = name.toLowerCase();
			const dolphinToBeUpdate = await Dolphins.query().findOne({
				name: dolphinName,
			});
			const updatedDolphin = await dolphinToBeUpdate
				.$query()
				.patchAndFetch(updateInfo);
			return updatedDolphin;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DolphinService;
