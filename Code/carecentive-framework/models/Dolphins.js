const { Model } = require('objection');

// Base class for dynamic table names
class DynamicModel extends Model {
  static get tableName() {
    return `${this.city}_dolphins`; // table name pattern: city_dolphins
  }

  static get idColumn() {
    return 'dolphin_id'; // primary key column name of the table
  }
}

// Function to generate a model for a specific city
function createModel(city) {
  return class DolphinModel extends DynamicModel {
    static city = city;
  };
}

module.exports = {
  createModel,
};


// A model is a class that represents a table in our database.
/*const { Model } = require('objection');

class Dolphins extends Model {
	static get tableName() { // https://vincit.github.io/objection.js/guide/models.html#model-settings
		return 'dolphins';
	}

	static get idColumn() {
		return 'dolphin_id';
	}
}

module.exports = Dolphins;*/