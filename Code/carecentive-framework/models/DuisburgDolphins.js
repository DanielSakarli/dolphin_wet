// A model is a class that represents a table in our database.
const { Model } = require('objection');

class Dolphins extends Model {
	static get tableName() { // https://vincit.github.io/objection.js/guide/models.html#model-settings
		return 'duisburg_dolphins';
	}

	static get idColumn() {
		return 'dolphin_id';
	}
}

module.exports = Dolphins;