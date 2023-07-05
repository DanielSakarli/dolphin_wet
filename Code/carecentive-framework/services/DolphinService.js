const DolphinDAO = require('../dao/dolphinDao');
const { DolphinError } = require('../source/Errors');

class DolphinService {
	/**
	 * Determines whether a dolphin with given name is in database.
	 * @param {String} name
	 * @returns {Promise<Boolean>} whether the dolphin with given name is in database.
	 */
	static async isDolphinExisted(name) {
		try {
			const myDolphinDao = new DolphinDAO();
			const dolphin = await myDolphinDao.getDolphinByName(name);
			if (dolphin) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Get all dolphins info from database.
	 * @returns {Promise<Array>} an array of all dolphin info in the database.
	 */
	static async getAllDolphins() {
		try {
			const myDolphinDao = new DolphinDAO();
			const dolphins = await myDolphinDao.getAllDolphins();
			return dolphins;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Get single dolphin based on name.
	 * @param {String} name - the name of dolphin.
	 * @returns {Promise<Object>} the info of dolphin in database.
	 */
	static async getOneDolphin(name) {
		try {
			const myDolphinDao = new DolphinDAO();
			const dolphin = await myDolphinDao.getDolphinByName(name);

			// If dolphin with given name doesn't exist in database,
			// 404: not found
			if (!dolphin) {
				throw new DolphinError(`Dolphin "${name}" not found`, 404);
			}

			return dolphin;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create a dolphin in the database
	 * @param {Object} 	dolphin  			the object contains all dolphin information
	 * @param {String}	dolphin.name	The name of dolphin
	 * @param {Integer}	dolphin.sex		The sex of dolphin, 1 stands for female, 0 for male
	 * @param {Integer}	dolphin.on_site	Whether the dolphin is on site, 1 stands for yes, 0 for no
	 * @param {Integer} dolphin.year_of_birth	The birth year of dolphin
	 * @param {String}	dolphin.place_of_birth	The birth place of dolphin
	 * @returns {Promise<Object>} Inserted dolphin object
	 */
	static async createDolphin(dolphin) {
		try {
			const myDolphinDao = new DolphinDAO();
			const dolphinCreated = await myDolphinDao.createDolphin(dolphin);
			return dolphinCreated;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update the information of the given dolphin in the database.
	 * @param {String} name - the name of dolphin.
	 * @param {Object} updateInfo - the information to be updated to a dolphin.
	 * @returns {Promise<Object>} updated dolphin object
	 */
	static async updateDolphin(name, updateInfo) {
		try {
			const myDolphinDao = new DolphinDAO();
			const dolphinUpdated = await myDolphinDao.updateDolphinByName(
				name,
				updateInfo
			);
			return dolphinUpdated;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete the given dolphin in database.
	 * @param {String} name - the name of dolphin.
	 */
	static async deleteDolphin(name) {
		try {
			const myDolphinDao = new DolphinDAO();
			await myDolphinDao.deleteDolphinByName(name);
			return;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DolphinService;
