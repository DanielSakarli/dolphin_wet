const { Model } = require('objection');

// Base class for dynamic table names
class DynamicModel extends Model {
  static get tableName() {
    return `${this.city}_good_health`; // table name pattern: city_good_health
  }

  static get idColumn() {
    return 'health_record_id'; // primary key column name of the table
  }
}

// Function to generate a model for a specific city
function createModel(city) {
  return class HealthModel extends DynamicModel {
    static city = city;
  };
}

module.exports = {
  createModel,
};

/*const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'good_health';
	}

	static get idColumn() {
		return 'health_record_id';
	}
}

module.exports = GoodHealth;
*/