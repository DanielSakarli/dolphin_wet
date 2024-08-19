const { Model } = require('objection');

// Base class for dynamic table names
class DynamicModel extends Model {
  static get tableName() {
    return `${this.city}_good_feeding`; // table name pattern: city_good_feeding
  }

  static get idColumn() {
    return 'feeding_record_id'; // primary key column name of the table
  }
}

// Function to generate a model for a specific city
function createModel(city) {
  return class FeedingModel extends DynamicModel {
    static city = city;
  };
}

module.exports = {
  createModel,
};

/*const { Model } = require('objection');

class GoodFeeding extends Model {
	static get tableName() {
		return 'good_feeding';
	}

	static get idColumn() {
		return 'feeding_record_id';
	}
}

module.exports = GoodFeeding;
*/