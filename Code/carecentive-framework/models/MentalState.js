const { Model } = require('objection');

// Base class for dynamic table names
class DynamicModel extends Model {
  static get tableName() {
    return `${this.city}_emotional_state`; // table name pattern: city_emotional_state
  }

  static get idColumn() {
    return 'emotional_state_record_id'; // primary key column name of the table
  }
}

// Function to generate a model for a specific city
function createModel(city) {
  return class MentalModel extends DynamicModel {
    static city = city;
  };
}

module.exports = {
  createModel,
};



/*const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'duisburg_emotional_state';
	}

	static get idColumn() {
		return 'emotional_state_record_id';
	}
}

module.exports = GoodHealth;
*/