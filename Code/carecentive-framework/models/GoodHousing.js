const { Model } = require('objection');

// Base class for dynamic table names
class DynamicModel extends Model {
  static get tableName() {
    return `${this.city}_good_housing`; // table name pattern: city_good_housing
  }

  static get idColumn() {
    return 'housing_record_id'; // primary key column name of the table
  }
}

// Function to generate a model for a specific city
function createModel(city) {
  return class HousingModel extends DynamicModel {
    static city = city;
  };
}

module.exports = {
  createModel,
};



/*const { Model } = require('objection');

class GoodHousing extends Model {
	static get tableName() {
		return 'good_housing';
	}

	static get idColumn() {
		return 'housing_record_id';
	}
}

module.exports = GoodHousing;*/
