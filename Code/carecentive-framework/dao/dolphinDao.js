const Dolphins = require('../models/Dolphins');
const { DolphinError } = require('../source/Errors');

class DolphinDAO {
	// Objection.js model of dolphin table in database.
	#dataModel;

	constructor() {
		this.#dataModel = Dolphins;
	}

	/**
	 * Sanitizes the dolphin name.
	 * @param {String} name
	 * @returns the lowercase string of dolphin name
	 */
	sanitizeName(name) {
		return name.toLowerCase();
	}

	/**
	 * Gets all dolphins in database.
	 * @returns {Promise<Array>} Array of all dolphin data in database,
	 * empty array if there is no dolphin in database.
	 */
	async getAllDolphins() {
		try {
			const dolphins = await this.#dataModel.query();
			return dolphins;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Gets the dolphin with given name.
	 * @param {String} name Name of dolphin
	 * @returns {Promise<Object>} Data of dolphin with given name in database,
	 * undefined if there is no dolphin data with given name.
	 */
	async getDolphinByName(name) {
		try {
			const lowerCaseName = this.sanitizeName(name);
			const dolphin = await this.#dataModel
				.query()
				.select()
				.where('name', '=', lowerCaseName)
				.first();

			// throws error if there is no dolphin with given name.
			// 404: not found
			if (!dolphin) {
				throw new DolphinError(`Dolphin "${name} not found"`, 404);
			}

			return dolphin;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Creates a new dolphin in database.
	 * @param {object}	dolphin				The dolphin data
	 * @param {String}	dolphin.name	The name of dolphin
	 * @param {Integer}	dolphin.sex		The sex of dolphin, 1 stands for female, 0 for male
	 * @param {Integer}	dolphin.on_site	Whether the dolphin is on site, 1 stands for yes, 0 for no
	 * @param {Integer} dolphin.year_of_birth	The birth year of dolphin
	 * @param {String}	dolphin.place_of_birth	The birth place of dolphin
	 * @returns {Promise<Object>} Inserted dolphin object
	 */
	async createDolphin(dolphin) {
		try {
			const lowerCaseName = this.sanitizeName(dolphin.name);

			const dolphinData = await this.#dataModel
				.query()
				.select()
				.where('name', '=', lowerCaseName)
				.first();

			// throws error when the given dolphin name already exists in database.
			// 409: conflict
			if (dolphinData) {
				throw new DolphinError(
					`Dolphin "${lowerCaseName}" already exists in database`,
					409
				);
			}

			const dolphinInserted = await Dolphins.query().insert(dolphin);
			return dolphinInserted;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update the information of a given dolphin by name.
	 * The updateInfo is only allowed in the field that exists in database.
	 * @param {String} name Name of dolphin
	 * @param {Object} updateInfo Information needed to update for this dolphin
	 * @returns {Promise<Object>} Dolphin data after update
	 */
	async updateDolphinByName(name, updateInfo) {
		try {
			const dolphinName = this.sanitizeName(name);
			const dolphinToBeUpdate = await this.getDolphinByName(dolphinName);

			const updatedDolphin = await dolphinToBeUpdate
				.$query()
				.patchAndFetch(updateInfo);
			return updatedDolphin;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Deletes the given dolphin by name in database.
	 * @param {String} name The name of dolphin
	 * @returns void
	 */
	async deleteDolphinByName(name) {
		try {
			const dolphinName = this.sanitizeName(name);
			await this.#dataModel.query().delete().where('name', '=', dolphinName);
			return;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DolphinDAO;
